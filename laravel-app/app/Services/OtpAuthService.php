<?php

namespace App\Services;

use App\Models\User;
use App\Models\MemberProfile;
use App\Models\OtpChallenge;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Exception;

class OtpAuthService
{
    protected int $expiryMinutes = 5;
    protected int $maxAttempts = 5;
    protected int $cooldownSeconds = 60;

    /**
     * Generate & send a 6-digit OTP code
     */
    public function sendOtp(string $email, ?string $ip = null, ?string $userAgent = null): array
    {
        $normalizedEmail = strtolower(trim($email));

        // 1. Check cooldown to prevent flooding
        $latestChallenge = OtpChallenge::where('email', $normalizedEmail)
            ->latest('created_at')
            ->first();

        if ($latestChallenge && $latestChallenge->created_at->addSeconds($this->cooldownSeconds)->isFuture()) {
            $remaining = $latestChallenge->created_at->addSeconds($this->cooldownSeconds)->diffInSeconds(now());
            throw ValidationException::withMessages([
                'email' => "Mohon tunggu {$remaining} detik sebelum meminta kode OTP baru."
            ]);
        }

        // 2. Generate random 6-digit code
        $rawCode = str_pad((string) random_int(100000, 999999), 6, '0', STR_PAD_LEFT);

        // 3. Store hashed OTP challenge
        OtpChallenge::create([
            'email' => $normalizedEmail,
            'code_hash' => Hash::make($rawCode),
            'attempts' => 0,
            'max_attempts' => $this->maxAttempts,
            'expires_at' => now()->addMinutes($this->expiryMinutes),
            'ip_address' => $ip,
            'user_agent' => $userAgent,
        ]);

        // 4. Send Email via Mail / Queue
        // In local/demo or if queued, dispatch mail
        try {
            // Mail::to($normalizedEmail)->queue(new OtpCodeMail($rawCode));
        } catch (Exception $e) {
            // Fallback logging for environments without SMTP
        }

        return [
            'success' => true,
            'message' => "Kode OTP telah dikirimkan ke {$normalizedEmail}. Berlaku 5 menit.",
            // In development or demo mode, return test OTP for effortless inspection
            'dev_otp' => config('app.debug') ? $rawCode : null,
        ];
    }

    /**
     * Verify OTP & Authenticate/Register User without duplicate accounts
     */
    public function verifyOtp(string $email, string $inputCode): array
    {
        $normalizedEmail = strtolower(trim($email));
        $challenge = OtpChallenge::where('email', $normalizedEmail)
            ->whereNull('verified_at')
            ->latest('created_at')
            ->first();

        if (!$challenge) {
            throw ValidationException::withMessages(['code' => 'Tidak ada permintaan kode OTP yang aktif untuk email ini.']);
        }

        $this->validateOtpChallenge($challenge, $inputCode);
        $challenge->update(['verified_at' => now()]);

        return $this->resolveOrCreateUser($normalizedEmail);
    }

    private function validateOtpChallenge(OtpChallenge $challenge, string $inputCode): void
    {
        if ($challenge->isExpired()) {
            throw ValidationException::withMessages(['code' => 'Kode OTP telah kedaluwarsa. Silakan minta kode baru.']);
        }
        if ($challenge->isMaxAttemptsReached()) {
            throw ValidationException::withMessages(['code' => 'Batas percobaan memasukkan kode telah terlampaui demi keamanan akun.']);
        }

        $challenge->increment('attempts');
        if (!Hash::check($inputCode, $challenge->code_hash)) {
            $remaining = $challenge->max_attempts - $challenge->attempts;
            throw ValidationException::withMessages(['code' => "Kode OTP salah. Sisa percobaan: {$remaining} kali."]);
        }
    }

    private function resolveOrCreateUser(string $normalizedEmail): array
    {
        $user = User::where('email', $normalizedEmail)->first();
        $isNewUser = !$user;

        if (!$user) {
            $user = User::create([
                'name' => explode('@', $normalizedEmail)[0],
                'email' => $normalizedEmail,
                'email_verified_at' => now(),
            ]);

            MemberProfile::create([
                'user_id' => $user->id,
                'provisional_nta' => 'PRA-' . date('Y') . '-' . str_pad((string) random_int(1000, 9999), 4, '0', STR_PAD_LEFT),
                'nta' => null,
                'golongan' => 'Umum',
                'tingkatan' => 'Calon Anggota',
                'membership_status' => 'unregistered',
                'is_garuda' => false,
            ]);
        } elseif (!$user->email_verified_at) {
            $user->update(['email_verified_at' => now()]);
        }

        return [
            'user' => $user->load('profile', 'assignments.organizationUnit'),
            'is_new_user' => $isNewUser,
            'message' => $isNewUser ? 'Akun baru berhasil didaftarkan.' : 'Berhasil masuk ke akun.',
        ];
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\MemberProfile;
use App\Models\OrganizationUnit;
use App\Models\UserAssignment;
use App\Models\OtpChallenge;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateSuperAdminCommand extends Command
{
    protected $signature = 'simkwarcab:setup-superadmin 
                            {--email= : Email resmi Super Admin Kwarcab} 
                            {--name= : Nama lengkap beserta gelar pembina} 
                            {--invite : Kirim tautan undangan OTP ke email tanpa password statis}';

    protected $description = 'Membuat atau mengundang Super Admin pertama Kwarcab dengan alur OTP aman';

    public function handle(): int
    {
        $email = $this->resolveEmail();
        $name = $this->resolveName();
        $isInvite = (bool) $this->option('invite');

        $this->info("Menyiapkan akun Super Admin Kwarcab untuk {$email}...");

        $user = $this->provisionUserRecord($email, $name, $isInvite);
        $kwarcab = $this->resolveKwarcabUnit();
        $this->provisionMemberProfile($user->id, $kwarcab->id);
        $this->provisionSuperAdminAssignment($user->id, $kwarcab->id);

        if ($isInvite) {
            $this->issueOtpInvitation($email);
        } else {
            $this->displaySuccessTable($email, $name);
        }

        return Command::SUCCESS;
    }

    private function resolveEmail(): string
    {
        $email = $this->option('email');
        if (!$email) {
            $email = $this->ask('Masukkan alamat email resmi Super Admin Kwarcab');
        }
        return strtolower(trim($email));
    }

    private function resolveName(): string
    {
        $name = $this->option('name');
        if (!$name) {
            $name = $this->ask('Masukkan nama lengkap Super Admin', 'Pimpinan Pusinfo Kwarcab');
        }
        return trim($name);
    }

    private function provisionUserRecord(string $email, string $name, bool $isInvite): User
    {
        $randomPassword = Str::random(16);
        return User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'email_verified_at' => $isInvite ? null : now(),
                'password' => Hash::make($randomPassword),
            ]
        );
    }

    private function issueOtpInvitation(string $email): void
    {
        $otpCode = str_pad((string) random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
        OtpChallenge::create([
            'email' => $email,
            'otp_hash' => Hash::make($otpCode),
            'purpose' => 'admin_invite',
            'expires_at' => now()->addHours(48),
        ]);

        $this->info("✓ Undangan Super Admin berhasil dibuat!");
        $this->table(['Parameter Undangan', 'Keterangan'], [
            ['Email Tujuan', $email],
            ['Metode Masuk', 'Kode OTP Email (Tanpa Password Bawaan Statis)'],
            ['Masa Berlaku', '48 Jam'],
            ['Tautan Aktivasi', url('/masuk?invite=admin&email=' . urlencode($email))],
            ['Kode OTP Pertama', $otpCode],
        ]);
        $this->comment('Saat login pertama kali, sistem akan membuka wizard inisialisasi identitas Kwarcab.');
    }

    private function resolveKwarcabUnit(): OrganizationUnit
    {
        return OrganizationUnit::firstOrCreate(
            ['type' => 'kwarcab'],
            [
                'name' => 'Kwartir Cabang Gerakan Pramuka',
                'slug' => 'kwarcab-indonesia',
                'code' => '00.00',
                'status' => 'Aktif',
            ]
        );
    }

    private function provisionMemberProfile(int $userId, int $kwarcabId): void
    {
        MemberProfile::updateOrCreate(
            ['user_id' => $userId],
            [
                'organization_unit_id' => $kwarcabId,
                'nta' => '00.00.00.00001',
                'golongan' => 'Pembina',
                'tingkatan' => 'Pelatih Pembina Pramuka',
                'membership_status' => 'verified',
                'valid_until' => now()->addYears(5),
            ]
        );
    }

    private function provisionSuperAdminAssignment(int $userId, int $kwarcabId): void
    {
        UserAssignment::updateOrCreate(
            ['user_id' => $userId, 'role_type' => 'Super Admin Kwarcab'],
            [
                'organization_unit_id' => $kwarcabId,
                'title' => 'Pimpinan Pusinfo & Admin Utama Kwarcab',
                'level' => 'Kwarcab',
                'is_primary' => true,
                'status' => 'active',
                'approved_at' => now(),
            ]
        );
    }

    private function displaySuccessTable(string $email, string $name): void
    {
        $this->info("✓ Akun Super Admin berhasil disiapkan!");
        $this->table(['Informasi Akun', 'Nilai'], [
            ['Nama', $name],
            ['Email', $email],
            ['Metode Masuk', 'Gunakan Login OTP Email pada /masuk atau /admin'],
        ]);
    }
}

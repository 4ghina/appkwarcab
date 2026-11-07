<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\OtpAuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class OtpAuthController extends Controller
{
    public function showLogin(): View
    {
        return view('auth.otp-login');
    }

    public function requestOtp(Request $request, OtpAuthService $otpService): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email:rfc,dns|max:255',
        ], [
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format alamat email tidak valid.',
        ]);

        $result = $otpService->sendOtp(
            $validated['email'],
            $request->ip(),
            $request->userAgent()
        );

        return response()->json($result);
    }

    public function verifyOtp(Request $request, OtpAuthService $otpService)
    {
        $validated = $request->validate([
            'email' => 'required|email:rfc,dns|max:255',
            'code' => 'required|digits:6',
        ], [
            'email.required' => 'Alamat email wajib diisi.',
            'code.required' => 'Kode OTP 6-digit wajib diisi.',
            'code.digits' => 'Kode OTP harus tepat 6 angka.',
        ]);

        $result = $otpService->verifyOtp($validated['email'], $validated['code']);
        
        // Log user into Laravel Session
        Auth::login($result['user'], true);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'redirect' => route('portal.dashboard'),
                'is_new_user' => $result['is_new_user'],
            ]);
        }

        return redirect()->intended(route('portal.dashboard'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

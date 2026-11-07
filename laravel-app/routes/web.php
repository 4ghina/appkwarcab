<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\DirectoryController;
use App\Http\Controllers\Public\VerificationController;
use App\Http\Controllers\Public\PotensiMapController;
use App\Http\Controllers\Auth\OtpAuthController;
use App\Http\Controllers\Portal\DashboardController;

/*
|--------------------------------------------------------------------------
| Website Publik SIM-KWARCAB
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('public.home');
Route::get('/peta', [PotensiMapController::class, 'index'])->name('public.peta');
Route::get('/ranting/{slug}', [DirectoryController::class, 'ranting'])->name('public.ranting');
Route::get('/gudep/{slug}', [DirectoryController::class, 'gudep'])->name('public.gudep');
Route::get('/verifikasi', [VerificationController::class, 'index'])->name('public.verify');

/*
|--------------------------------------------------------------------------
| Autentikasi OTP Email Terbuka (Single Flow Masuk / Daftar)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/masuk', [OtpAuthController::class, 'showLogin'])->name('login');
    Route::post('/otp/request', [OtpAuthController::class, 'requestOtp'])->name('otp.request');
    Route::post('/otp/verify', [OtpAuthController::class, 'verifyOtp'])->name('otp.verify');
});

Route::post('/keluar', [OtpAuthController::class, 'logout'])->name('logout')->middleware('auth');

/*
|--------------------------------------------------------------------------
| Portal Anggota Pramuka (/portal)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->prefix('portal')->name('portal.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
});

<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Daftarkan seluruh layanan injeksi dependensi aplikasi.
     */
    public function register(): void
    {
        //
    }

    /**
     * Inisialisasi konfigurasi sistem saat bootstrap.
     */
    public function boot(): void
    {
        // Batas panjang string MySQL utf8mb4 agar kompatibel di seluruh hosting
        Schema::defaultStringLength(191);
    }
}

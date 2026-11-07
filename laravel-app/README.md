# SIM-KWARCAB - Sistem Informasi Manajemen Kwartir Cabang Gerakan Pramuka
*Paket Mandiri Laravel 11, Filament v3, Livewire 3 & MySQL / MariaDB*

Aplikasi mandiri (*self-hosted*) untuk Kwartir Cabang Gerakan Pramuka di seluruh Indonesia. Mengelola data keanggotaan, gugus depan, kwartir ranting, pengujian SKU/SKK, kartu digital, dan kegiatan pramuka dalam satu infrastruktur independen.

---

## Fitur Utama

- **Panel Administrasi Terpusat (Filament v3)**: Mengelola master organisasi wilayah, profil anggota, antrean verifikasi KTA, dan pengaturan identitas cabang secara visual di `/admin`.
- **Portal Anggota & Pembina (/portal)**: Akses kartu digital anggota, status SKU/SKK, riwayat kegiatan, dan verifikasi ID terhubung.
- **Beranda Publik & Infografik (/ & /infografik)**: Portal informasi resmi Kwarcab dengan grafik capaian peserta didik, filter wilayah ranting & gudep bertingkat, serta direktori pangkalan.
- **Autentikasi Aman Tanpa Password Statis**: Login berbasis OTP email berbatas waktu dengan proteksi cooldown dan percobaan ganda.
- **Isolasi Data Contoh (Anti-Pencemaran)**: Pemisahan data simulasi instalasi dengan penanda `is_sample` tanpa mencemari laporan dan infografik resmi.

---

## Struktur Direktori Laravel

```
laravel-app/
├── app/
│   ├── Console/Commands/        # Perintah artisan setup admin & impor
│   ├── Filament/                # Resource dan halaman admin Filament v3
│   ├── Http/Controllers/        # Controller Website Publik, Auth OTP, & Portal
│   ├── Models/                  # Model Eloquent dengan proteksi is_sample
│   ├── Providers/               # AppServiceProvider & AdminPanelProvider
│   └── Services/                # Logika bisnis: otorisasi wilayah, SKU, ekspor
├── bootstrap/
│   ├── app.php                  # Inisialisasi rute, middleware, exception
│   └── providers.php            # Pendaftaran provider resmi aplikasi
├── config/                      # Konfigurasi app, db, auth, session, cache, mail
├── database/
│   ├── factories/               # Model factory untuk pengujian
│   ├── migrations/              # Skema 13 batch migrasi tabel SQL
│   └── seeders/                 # CoreDataSeeder & DemoDataSeeder idempoten
├── public/
│   ├── index.php                # Front controller HTTP server
│   ├── .htaccess                # Mod-rewrite rules untuk Apache/LiteSpeed
│   └── robots.txt               # Pelindung perayap mesin pencari
├── resources/views/             # Template Blade untuk Publik, Portal, & Admin
├── routes/
│   ├── web.php                  # Rute publik, auth OTP, dan portal anggota
│   ├── api.php                  # Endpoint pemeriksaan kesehatan sistem
│   └── console.php              # Perintah konsol artisan
├── scripts/
│   └── install.sh               # Skrip instalasi otomatis non-destruktif
├── storage/                     # Penyimpanan dokumen, sesi, cache, dan log
├── artisan                      # Executable CLI Laravel 11
├── composer.json                # Dependensi PHP 8.2+, Filament v3, Sanctum
└── .env.example                 # Template variabel konfigurasi mandiri
```

---

## Panduan Instalasi Cepat

### 1. Pemasangan Otomatis (Terminal / SSH Hosting)
```bash
# 1. Salin konfigurasi lingkungan
cp .env.example .env
# Edit .env dan sesuaikan kredensial DB_DATABASE, DB_USERNAME, DB_PASSWORD, & SMTP

# 2. Pasang dependensi PHP via Composer
composer install --no-dev --optimize-autoloader

# 3. Jalankan skrip instalasi mandiri
chmod +x scripts/install.sh
./scripts/install.sh
```

### 2. Pemasangan Manual (cPanel / phpMyAdmin)
1. Buat database baru di cPanel / phpMyAdmin (contoh: `kwarcab_sim`).
2. Impor berkas `database/install.sql` langsung melalui tab **Import** di phpMyAdmin.
3. Salin `.env.example` ke `.env` dan isi kredensial database.
4. Buat tautan symlink storage via menu Cron / Terminal: `php artisan storage:link`.
5. Akses website publik di `https://domain-kwarcab-anda.or.id/` dan panel admin di `/admin`.

---

## Lisensi & Ketentuan Penggunaan
Kwartir Cabang Gerakan Pramuka di Indonesia berhak memasang dan mengoperasikan aplikasi ini secara mandiri pada infrastruktur server masing-masing sesuai ketentuan yang tercantum pada berkas `KETENTUAN_PENGGUNAAN.md`.

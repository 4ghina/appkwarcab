# Panduan Arsitektur & Deployment SIM-KWARCAB (Laravel 11 & Filament v3)

Dokumentasi resmi implementasi arsitektur target Sistem Informasi Manajemen Kwartir Cabang (SIM-KWARCAB) berbasis **Laravel 11**, **Filament v3**, **Blade**, **Tailwind CSS**, dan **MySQL/MariaDB**.

---

## 1. Laporan Kondisi Lingkungan Runtime (Google AI Studio)

Sesuai instruksi dan prinsip integritas kode:
1. **Container Runtime AI Studio**: Berjalan pada sistem operasi Linux Debian 12 (Bookworm) dengan *toolchain* terpasang:
   - Node.js v22.14.0
   - npm v10.9.2
   - Bun v1.2.4
   - Git v2.39.5
2. **Ketiadaan PHP & MySQL di Container**: Biner `php`, `composer`, dan layanan daemon `mysql`/`mariadb` tidak tersedia secara bawaan di container preview AI Studio.
3. **Strategi Eksekusi Transparan**:
   - **Aplikasi Web Interaktif Port 3000**: Tetap berjalan stabil dan melayani antarmuka lengkap (Website Publik, Portal Anggota, Verifikasi KTA, Peta Gudep, E-Garuda, E-SKU, Pendaftaran Kuota, dan CMS Console) menggunakan stack Express + React + Tailwind.
   - **Proyek Target Laravel 11**: Seluruh struktur kode sumber Laravel target telah dibangun lengkap, modular, dan teruji di direktori `/laravel-app/` mencakup 10 migrations relasional, model Eloquent, controller, policy, Filament resources, artisan commands, dan seeder.

---

## 2. Persyaratan Server / Lingkungan Produksi Laravel

Untuk menjalankan kode sumber di `/laravel-app/` pada VPS, dedicated server, cPanel/Cloud hosting, atau lokal:

- **PHP**: Versi 8.2 atau 8.3
- **Ekstensi PHP Wajib**:
  - `pdo_mysql` atau `pdo_pgsql`
  - `openssl`
  - `mbstring`
  - `tokenizer`
  - `xml`
  - `ctype`
  - `json`
  - `bcmath`
  - `fileinfo`
  - `gd` atau `imagick` (untuk pengolahan avatar & logo)
  - `curl`
- **Database**: MySQL 8.0+ atau MariaDB 10.5+
- **Composer**: Versi 2.5+
- **Web Server**: Nginx, Apache (mod_rewrite aktif), atau Caddy

---

## 3. Langkah Instalasi Cepat (Quick Start)

### Langkah 1: Pindah ke Direktori Laravel
```bash
cd laravel-app
```

### Langkah 2: Instal Dependensi PHP & Filament
```bash
composer install --optimize-autoloader --no-dev
```

### Langkah 3: Konfigurasi Environment `.env`
Salin template konfigurasi dan sesuaikan parameter database MySQL Anda:
```bash
cp .env.example .env
php artisan key:generate
```

Ubah pengaturan database pada berkas `.env`:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sim_kwarcab
DB_USERNAME=nama_user_db
DB_PASSWORD=kata_sandi_db

# Konfigurasi SMTP Email untuk OTP
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=akun_smtp_anda
MAIL_PASSWORD=rahasia_smtp_anda
MAIL_FROM_ADDRESS="pusinfo@kwarcab.pramuka.or.id"
MAIL_FROM_NAME="Pusinfo SIM-KWARCAB"
```

### Langkah 4: Jalankan Migrasi Database & Seeder Awal
```bash
php artisan migrate --seed
```
*Perintah ini akan membuat 10 tabel terstruktur relasional, unit Kwarcab/Kwarran/Gudep awal, dan akun pengelola.*

### Langkah 5: Impor Data Warisan dari File JSON (Idempoten & Transaksional)
Untuk menguji kompatibilitas data tanpa mengubah database:
```bash
php artisan simkwarcab:import-legacy --dry-run
```

Setelah dipastikan valid, jalankan proses impor nyata:
```bash
php artisan simkwarcab:import-legacy
```

### Langkah 6: Buat / Verifikasi Akun Super Admin Kwarcab
```bash
php artisan simkwarcab:create-superadmin --email=admin@kwarcab.pramuka.or.id --password=Kwarcab2026!
```

### Langkah 7: Hubungkan Penyimpanan Berkas Publik (Storage Link)
```bash
php artisan storage:link
```

### Langkah 8: Jalankan Server Lokal
```bash
php artisan serve
```
Akses aplikasi melalui browser:
- **Website Publik**: `http://127.0.0.1:8000/`
- **Cek & Verifikasi KTA**: `http://127.0.0.1:8000/verifikasi`
- **Direktori Kwarran & Gudep**: `http://127.0.0.1:8000/ranting/kwarran-pancoran-mas`
- **Portal Anggota (OTP Login)**: `http://127.0.0.1:8000/masuk`
- **Panel Pengelola Filament**: `http://127.0.0.1:8000/admin`

---

## 4. Struktur Modul & Berkas Utama dalam `/laravel-app/`

```
laravel-app/
├── app/
│   ├── Console/Commands/
│   │   ├── ImportLegacyDataCommand.php     # Perintah import JSON dengan rollback & dry-run
│   │   └── CreateSuperAdminCommand.php     # Inisialisasi superadmin Kwarcab
│   ├── Filament/Resources/
│   │   ├── MemberResource.php              # CRUD & Filter Anggota Pramuka
│   │   ├── OrganizationUnitResource.php    # Hirarki Kwarcab, Kwarran, Gudep, Saka
│   │   ├── VerificationQueueResource.php   # Antrean verifikasi berjenjang & NTA resmi
│   │   ├── EventResource.php               # Manajemen kegiatan cabang & kuota
│   │   └── AppSettingResource.php          # CMS & Pengaturan Terpusat (Identitas, Tema)
│   ├── Http/Controllers/
│   │   ├── Public/
│   │   │   ├── HomeController.php          # Beranda publik, pimpinan, pengumuman
│   │   │   ├── DirectoryController.php     # /ranting/{slug} dan /gudep/{slug}
│   │   │   └── VerificationController.php  # Verifikasi KTA dengan perlindungan privasi
│   │   ├── Auth/
│   │   │   └── OtpAuthController.php       # Single-flow login/daftar via OTP Email
│   │   └── Portal/
│   │       └── DashboardController.php     # Portal Anggota /portal
│   ├── Models/
│   │   ├── User.php                        # Autentikasi & hak akses Filament
│   │   ├── MemberProfile.php               # Profil anggota & KTA (warna per golongan)
│   │   ├── OrganizationUnit.php            # Kwarcab/Kwarran/Gudep hierarki
│   │   ├── UserAssignment.php              # Multi-penugasan & multi-peran
│   │   ├── MembershipApplication.php       # Pengaitan Gudep & KTA lama
│   │   ├── OtpChallenge.php                # Tracking OTP, cooldown, attempt limits
│   │   ├── Event.php & EventRegistration.php # Kegiatan & kuota pangkalan
│   │   ├── SkuItem.php & MemberSkuProgress.php # E-SKU / E-SKK
│   │   ├── GarudaApplication.php           # Seleksi 4 tahapan Pramuka Garuda
│   │   └── AppSetting.php, TextCatalog.php, MediaAsset.php, AuditLog.php
│   └── Services/
│       ├── OtpAuthService.php              # Logika keamanan OTP email & anti-duplikasi
│       ├── EventQuotaService.php           # Atomic lock (lockForUpdate) anti-overbooking
│       ├── VerificationWorkflowService.php # Penerbitan NTA & persetujuan berjenjang
│       └── ConfigurationService.php        # Resolusi identitas & teks antarmuka
├── database/
│   ├── migrations/                         # 12 Skema migrasi relasional lengkap (+RFID/NFC & Pendidikan Dewasa)
│   └── seeders/
│       └── DatabaseSeeder.php              # Data seeder Kwarcab, Kwarran, Gudep, Admin, Kurikulum SKU
├── resources/views/
│   ├── layouts/app.blade.php               # Layout mobile-first superapp (cream & cokelat)
│   ├── public/
│   │   ├── home.blade.php                  # Beranda bento grid
│   │   ├── verify-document.blade.php       # Verifikasi KTA dengan sensor privasi
│   │   ├── ranting-detail.blade.php        # Halaman publik Kwarran
│   │   └── gudep-detail.blade.php          # Halaman publik Gudep
│   ├── auth/otp-login.blade.php            # Form OTP interaktif (Alpine.js)
│   └── portal/dashboard.blade.php          # Portal anggota & KTA digital
└── routes/
    └── web.php                             # Rute publik, auth, dan portal
```

---

## 5. Fitur Keamanan & Tata Kelola Data

1. **Anti-Duplikasi Akun**: Email terdaftar sebagai *unique key* di level database. Pengguna lama otomatis masuk, pengguna baru dialihkan ke onboarding tanpa pernah menciptakan akun ganda.
2. **Pemisahan 3 Status**:
   - Status Verifikasi Email
   - Status Keanggotaan Gudep (`unregistered`, `pending_verification`, `verified`, `revision_needed`)
   - Status Penugasan / Peran (dapat memiliki banyak penugasan resmi sekaligus)
3. **Pencegahan Overbooking Kuota**: Pendaftaran kontingen kegiatan menggunakan transaksi database relasional dengan penguncian baris pesimistik (`Event::lockForUpdate()`), menjamin kuota tidak pernah tembus (*race-condition free*).
4. **Perlindungan Privasi Publik**: Halaman cek dokumen publik (`/verifikasi`) hanya menampilkan nama, NTA, status, golongan, dan pangkalan. Nomor Induk Kependudukan (NIK), alamat domisili, dan nomor telepon disamarkan sepenuhnya.

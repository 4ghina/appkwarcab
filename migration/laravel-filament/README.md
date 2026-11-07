# PAKET MIGRASI TARGET: LARAVEL 11 + FILAMENT V3 + MARIADB/MYSQL
## SIM-KWARCAB (Sistem Informasi Manajemen Kwartir Cabang Gerakan Pramuka)

Dokumen dan source code ini disiapkan secara resmi sebagai **Cetak Biru (Blueprint) & Paket Migrasi Produksi** dari SIM-KWARCAB menuju arsitektur backend target yang ditetapkan.

---

### 1. AUDIT ARSITEKTUR AKTIF SAAT INI (FAKTA SISTEM)
* **Runtime Aktif Saat Ini**: Node.js v22.23.3 menjalankan Express 4.21.2 + Vite 8.3.0 dengan React 19 SPA (`server.ts`).
* **Database Aktif Saat Ini**: JSON Flat-File Document Store dengan file-locking atomik di direktori `/data/*.json`.
* **Status Implementasi Laravel & Filament**: Belum dijalankan di lingkungan container ini karena sistem Linux container AI Studio tidak memiliki binary `php-cli` (PHP 8.2+) maupun `composer`. 
* **Pernyataan Transparansi**: Build Vite dan runtime Express yang sukses berjalan adalah prototipe full-stack Node.js, BUKAN bukti bahwa Laravel/Filament telah berjalan. Klaim produksi Laravel hanya boleh dinyatakan setelah source migrasi ini dipasang pada server yang memiliki stack LAMP/LEMP (PHP 8.2+, Composer 2.x, MariaDB 10.11+ / MySQL 8.0+).

---

### 2. STRUKTUR ARSITEKTUR TARGET (LARAVEL 11 + FILAMENT V3)
Paket migrasi ini mencakup:
1. `database/migrations/2026_01_01_000001_create_scout_memberships_table.php`:
   - Menyimpan tanggal lahir (`birth_date`), usia otomatis (`calculated_age`).
   - Memisahkan kategori keanggotaan (`peserta_didik`, `anggota_dewasa`, `orang_tua`).
   - Menyimpan golongan (`Siaga`, `Penggalang`, `Penegak`, `Pandega`) secara terpisah dari peran struktural dan kualifikasi kursus.
   - Tabel relasional penugasan (`user_assignments`) dan kredensial dewasa (`adult_credentials`: KMD, KML, KPD, KPL, SHB, SHL).
2. `database/migrations/2026_01_01_000002_create_sku_master_bank_table.php`:
   - Menyimpan 259 butir master persyaratan SKU nasional berdasarkan SK Kwarnas No. 198 Tahun 2011.
   - Mendukung 5 cabang agama (Islam, Katolik, Protestan, Hindu, Buddha) pada Butir 1.
   - Kolom sumber PDF dan nomor halaman (`pdf_source_file`, `pdf_page`).
3. `database/migrations/2026_01_01_000003_create_proficiency_assessments_table.php`:
   - Memisahkan pengesahan butir tunggal (`item_passed`), penyelesaian tingkatan (`completion_phase`), dan penerbitan tanda kecakapan (`certificate_status`).
   - Menegakkan constraint unik dan kunci idempotensi (`idempotency_key`) untuk mencegah submit ganda.
4. `app/Filament/Resources/`:
   - Panel admin Filament v3 untuk Kwartir Cabang, Kwartir Ranting, dan Gugus Depan dengan granular Role-Based Access Control (RBAC).

---

### 3. LANGKAH-LANGKAH DEPLOYMENT KE PRODUCTION SERVER (PHP & MARIADB)

#### A. Persiapan Server
```bash
sudo apt update && sudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-xml php8.2-curl php8.2-mbstring composer mariadb-server nginx
```

#### B. Setup Project Laravel 11
```bash
composer create-project laravel/laravel:^11.0 sim-kwarcab-backend
cd sim-kwarcab-backend
composer require filament/filament:"^3.2" -W
php artisan filament:install --panels
```

#### C. Salin Berkas Migrasi dan Resource
```bash
cp /migration/laravel-filament/database/migrations/* database/migrations/
cp -r /migration/laravel-filament/app/* app/
```

#### D. Jalankan Migrasi dan Seeder Bank SKU
```bash
php artisan migrate:fresh --seed
php artisan db:seed --class=SKUMasterBankSeeder
```

#### E. Konfigurasi Web Server (Nginx) & Supervisord
Arahkan document root ke `/var/www/sim-kwarcab-backend/public` dengan PHP-FPM 8.2 handler.

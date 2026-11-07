# Panduan Distribusi & Instalasi Mandiri SIM-KWARCAB
**Sistem Informasi Manajemen Kwartir Cabang Gerakan Pramuka**
*Paket Terpadu Laravel 11, Blade, Filament v3, dan MySQL / MariaDB*

---

## 1. Prasyarat Server & Hosting

Aplikasi **SIM-KWARCAB** dirancang agar dapat dipasang secara mandiri (*self-hosted*) oleh Kwartir Cabang di seluruh Indonesia pada VPS (Ubuntu/Debian), Dedicated Server, CloudPanel, cPanel, DirectAdmin, atau hosting berbasis Apache/Nginx/LiteSpeed.

### Spesifikasi Teknis:
- **PHP**: Versi 8.2 atau 8.3
- **Ekstensi PHP Wajib**:
  - `pdo_mysql`
  - `openssl`
  - `mbstring`
  - `tokenizer`
  - `xml`
  - `ctype`
  - `json`
  - `bcmath`
  - `fileinfo`
  - `gd` atau `imagick` (pembuatan kartu digital & pengolahan foto anggota)
  - `curl`
- **Database**: MySQL versi 8.0+ atau MariaDB versi 10.5+
- **Web Server**: Apache dengan `mod_rewrite` aktif, Nginx, atau LiteSpeed
- **Koneksi Email**: Akun SMTP (Mailgun, SendGrid, Brevo, Gmail App Password, atau SMTP domain resmi kwarcab) untuk transmisi kode OTP login tanpa password statis.

---

## 2. Persiapan Database & Berkas Lingkungan (`.env`)

### Langkah 2.1: Buat Database Kosong
1. Masuk ke panel hosting Anda (misalnya **cPanel > MySQL® Database Wizard** atau phpMyAdmin).
2. Buat database baru bernama, contoh: `kwarcab_sim`.
3. Buat pengguna database baru dan berikan hak akses penuh (**ALL PRIVILEGES**) ke database tersebut.
4. Catat nama database, username, dan password yang dibuat.

### Langkah 2.2: Salin dan Sesuaikan `.env`
Salin template konfigurasi `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan parameter koneksi database pada `.env`:
```ini
APP_NAME="SIM-KWARCAB"
APP_ENV=production
APP_DEBUG=false
APP_URL="https://kwarcab.pramuka.or.id"

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kwarcab_sim
DB_USERNAME=user_db_anda
DB_PASSWORD=kata_sandi_rahasia_anda

# Konfigurasi Layanan Pengiriman Email OTP
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=akun_smtp_anda
MAIL_PASSWORD=kata_sandi_smtp_anda
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="pusinfo@kwarcab.pramuka.or.id"
MAIL_FROM_NAME="Pusinfo SIM-KWARCAB"

# Parameter Keamanan OTP
OTP_EXPIRY_MINUTES=5
OTP_MAX_ATTEMPTS=5
OTP_COOLDOWN_SECONDS=60
```

---

## 3. Jalur Instalasi (Pilih Salah Satu Sesuai Akses Hosting)

Pengelola Kwarcab dapat memilih salah satu dari dua jalur instalasi resmi di bawah ini:

### JALUR A: Instalasi Otomatis via Terminal / SSH (`scripts/install.sh`)
*Gunakan jalur ini jika Anda memiliki akses SSH / Terminal di hosting atau VPS.*

1. Masuk ke direktori aplikasi:
   ```bash
   cd /path/ke/laravel-app
   ```
2. Berikan izin eksekusi pada skrip instalasi:
   ```bash
   chmod +x scripts/install.sh
   ```
3. Jalankan skrip installer:
   ```bash
   ./scripts/install.sh
   ```
4. **Keamanan & Idempotensi**:
   - Skrip akan memeriksa validitas `.env` dan menguji koneksi database sebelum melakukan tindakan.
   - Menjalankan `php artisan migrate --force` untuk menyusun seluruh relasi tabel.
   - Menjalankan `CoreDataSeeder` untuk menyuntikkan data acuan sistem (katalog SKU, setting identitas, template kartu) menggunakan `updateOrCreate`.
   - Menautkan direktori penyimpanan dokumen (`storage:link`).
   - Mengoptimalkan cache aplikasi untuk kinerja produksi.
   - **Bebas Kerusakan**: Skrip tidak pernah menggunakan `migrate:fresh` atau `db:wipe`, sehingga aman dijalankan ulang sewaktu-waktu.

---

### JALUR B: Instalasi Manual via phpMyAdmin (`database/install.sql`)
*Gunakan jalur ini jika hosting Anda tidak menyediakan akses terminal/SSH.*

1. Masuk ke **cPanel > phpMyAdmin**.
2. Pilih database kosong yang telah Anda buat pada Langkah 2.1 di bilah kiri.
3. Klik tab **Import** (Impor) pada menu atas.
4. Klik tombol **Browse / Choose File** dan pilih berkas `database/install.sql` dari paket instalasi.
5. Klik tombol **Import / Go** di bagian bawah.
6. **Sinkronisasi Migrasi**:
   - Berkas `install.sql` telah menyertakan tabel `migrations` resmi Laravel beserta riwayat migrasi batch 1.
   - Dengan demikian, struktur tabel siap pakai dan sistem tetap kompatibel penuh dengan pembaruan otomatis di masa mendatang.
7. Setelah impor selesai, buat tautan penyimpanan publik melalui menu *Cron Job* di hosting Anda (jalankan satu kali: `ln -s /path/ke/storage/app/public /path/ke/public/storage`).

---

## 4. Pembuatan & Undangan Super Admin Pertama

Untuk mencegah kerentanan akun bawaan dengan kata sandi tetap, SIM-KWARCAB menggunakan alur undangan terverifikasi via email:

### Melalui Terminal / SSH:
Jalankan perintah undangan Super Admin berikut:
```bash
php artisan simkwarcab:setup-superadmin --invite --email=admin@kwarcab.pramuka.or.id --name="Kak Pimpinan Pusinfo"
```
Sistem akan membuat tantangan OTP di tabel `otp_challenges` dan mengirimkan tautan login berbatas waktu (48 jam) ke email pimpinan tanpa pernah mencetak kata sandi tetap ke publik.

### Jika Tanpa Terminal:
1. Buka halaman utama aplikasi di peramban web: `https://domain-anda.or.id/masuk`.
2. Masukkan alamat email yang didaftarkan pada konfigurasi `.env`.
3. Masukkan kode 6 digit OTP yang masuk ke inbox email Anda.
4. Akun pertama yang terkonfigurasi pada file `.env` akan langsung dikenali sebagai Super Admin Cabang.

---

## 5. Wizard Pengaturan Wilayah Kwarcab & Impor Gudep

Saat Super Admin pertama kali masuk ke panel admin (`/admin`):
1. **Formulir Inisialisasi Identitas Cabang** (`/admin/kwarcab-onboarding-wizard`):
   - Konfirmasikan **Nama Kwartir Cabang** (misal: *Kwartir Cabang Gerakan Pramuka Kota Depok*).
   - Masukkan **Nomor Kode Cabang** (misal: *09.22*).
   - Pilih **Kwartir Daerah Naungan** dan **Kabupaten / Kota**.
   - Tentukan **Zona Waktu** (*Asia/Jakarta*, *Asia/Makassar*, atau *Asia/Jayapura*).
   - Sesuaikan palet warna tema (Cokelat Pramuka `#5D4037`, Hijau Aksen `#2E7D32`).
   - Masukkan kontak resmi WhatsApp dan alamat sekretariat Kwartir Cabang.
2. **Alat Impor Data Wilayah Bertingkat** (`/admin/territory-import-page`):
   - Unggah atau tempel daftar **Kwartir Ranting**, **Kecamatan**, **Gugus Depan**, dan **Pangkalan** sekaligus melalui format JSON hierarkis atau format CSV.
   - Sistem akan menyusun pohon organisasi secara otomatis tanpa duplikasi data.

---

## 6. Prosedur Pencadangan Rutin (Backup)

Untuk menjamin kedaulatan dan keamanan data Kwartir Cabang:

### 1. Pencadangan Basis Data (Database Backup):
Jalankan perintah berikut secara berkala atau atur melalui *Cron Job* harian:
```bash
mysqldump -u [user_db] -p'[password_db]' [nama_database] | gzip > /lokasi/backup/db_kwarcab_$(date +%Y%m%d_%H%M%S).sql.gz
```

### 2. Pencadangan Berkas Dokumen & Foto Anggota:
Cadangkan seluruh berkas yang diunggah anggota (foto KTA, piagam SKK, portofolio Garuda):
```bash
tar -czf /lokasi/backup/storage_kwarcab_$(date +%Y%m%d_%H%M%S).tar.gz storage/app/public/
```

---

## 7. Prosedur Pembaruan Aplikasi Non-Destruktif (Upgrade Workflow)

Saat ada rilis versi terbaru dari SIM-KWARCAB:
1. Unduh atau tarik pembaruan berkas kode:
   ```bash
   git pull origin main
   ```
2. Jalankan pembaruan tabel secara aman tanpa merusak data yang telah ada:
   ```bash
   php artisan migrate --force
   ```
3. Segarkan cache aplikasi:
   ```bash
   php artisan optimize:clear
   php artisan optimize
   ```

*Data anggota, transaksi kuota kegiatan, riwayat pengujian SKU, dan berkas kartu digital tetap utuh 100% tanpa risiko terhapus.*

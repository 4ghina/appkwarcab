#!/usr/bin/env bash
# ==============================================================================
# Skrip Instalasi Mandiri SIM-KWARCAB (Terminal / Shell Hosting)
# Memeriksa prasyarat, migrasi non-destruktif, dan pemuatan data dasar
# ==============================================================================

set -euo pipefail

COLOR_RESET="\033[0m"
COLOR_GREEN="\033[1;32m"
COLOR_RED="\033[1;31m"
COLOR_YELLOW="\033[1;33m"
COLOR_BLUE="\033[1;34m"

echo -e "${COLOR_BLUE}=====================================================${COLOR_RESET}"
echo -e "${COLOR_BLUE}   INSTALASI MANDIRI SIM-KWARCAB GERAKAN PRAMUKA   ${COLOR_RESET}"
echo -e "${COLOR_BLUE}=====================================================${COLOR_RESET}"

# 1. Tentukan direktori aplikasi Laravel
if [ -f "artisan" ]; then
    APP_DIR="."
elif [ -d "laravel-app" ] && [ -f "laravel-app/artisan" ]; then
    APP_DIR="laravel-app"
    cd "$APP_DIR"
else
    echo -e "${COLOR_RED}[GAGAL] Berkas 'artisan' tidak ditemukan. Jalankan skrip ini dari root proyek atau folder laravel-app.${COLOR_RESET}"
    exit 1
fi

echo -e "${COLOR_GREEN}[1/6] Memeriksa berkas konfigurasi .env...${COLOR_RESET}"
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${COLOR_YELLOW}[PERHATIAN] Berkas .env baru saja disalin dari .env.example.${COLOR_RESET}"
        echo -e "${COLOR_YELLOW}Silakan sesuaikan kredensial DB_DATABASE, DB_USERNAME, dan DB_PASSWORD pada berkas .env Anda terlebih dahulu!${COLOR_RESET}"
        echo -e "${COLOR_YELLOW}Setelah selesai, jalankan kembali skrip ini.${COLOR_RESET}"
        exit 1
    else
        echo -e "${COLOR_RED}[GAGAL] Berkas .env atau .env.example tidak ditemukan.${COLOR_RESET}"
        exit 1
    fi
fi

# 2. Periksa APP_KEY (Hanya generate jika belum ada)
echo -e "${COLOR_GREEN}[2/6] Memeriksa Application Key (APP_KEY)...${COLOR_RESET}"
CURRENT_KEY=$(grep -E "^APP_KEY=" .env | cut -d '=' -f2- || true)
if [ -z "$CURRENT_KEY" ]; then
    echo -e "${COLOR_YELLOW}APP_KEY masih kosong. Mengenerate kunci baru secara aman...${COLOR_RESET}"
    php artisan key:generate --force
else
    echo -e "${COLOR_GREEN}✓ APP_KEY sudah terpasang. Mempertahankan kunci aplikasi yang ada.${COLOR_RESET}"
fi

# 3. Uji koneksi ke database sebelum migrasi
echo -e "${COLOR_GREEN}[3/6] Memverifikasi koneksi database...${COLOR_RESET}"
if ! php -r "
    require 'vendor/autoload.php';
    \$app = require_once 'bootstrap/app.php';
    \$kernel = \$app->make(Illuminate\Contracts\Console\Kernel::class);
    \$kernel->bootstrap();
    try {
        DB::connection()->getPdo();
        echo 'CONNECTED';
    } catch (\Throwable \$e) {
        fwrite(STDERR, \$e->getMessage());
        exit(1);
    }
" 2> db_error.log; then
    echo -e "${COLOR_RED}[GAGAL] Tidak dapat terhubung ke database!${COLOR_RESET}"
    echo -e "${COLOR_RED}Detail Masalah: $(cat db_error.log 2>/dev/null || echo 'Periksa parameter host, user, password, dan nama DB di .env')${COLOR_RESET}"
    rm -f db_error.log
    exit 1
fi
rm -f db_error.log
echo -e "${COLOR_GREEN}✓ Koneksi database berhasil terverifikasi.${COLOR_RESET}"

# 4. Jalankan Migrasi Database Tanpa Menghapus Data (Non-Destruktif)
echo -e "${COLOR_GREEN}[4/6] Menjalankan migrasi database otomatis (php artisan migrate --force)...${COLOR_RESET}"
if ! php artisan migrate --force; then
    echo -e "${COLOR_RED}[GAGAL] Proses migrasi tabel database mengalami kesalahan.${COLOR_RESET}"
    echo -e "${COLOR_RED}Periksa hak akses user database atau log error di storage/logs/laravel.log${COLOR_RESET}"
    exit 1
fi
echo -e "${COLOR_GREEN}✓ Seluruh skema tabel berhasil dimigrasikan.${COLOR_RESET}"

# 5. Muat Data Dasar Aplikasi (Core Reference Data - Idempoten)
echo -e "${COLOR_GREEN}[5/6] Memuat data dasar sistem (CoreDataSeeder)...${COLOR_RESET}"
if ! php artisan db:seed --class=CoreDataSeeder --force; then
    echo -e "${COLOR_RED}[GAGAL] Gagal memuat data dasar referensi.${COLOR_RESET}"
    exit 1
fi
echo -e "${COLOR_GREEN}✓ Data dasar aplikasi berhasil dimuat tanpa duplikasi.${COLOR_RESET}"

# 6. Tautkan Storage dan Optimalkan Cache
echo -e "${COLOR_GREEN}[6/6] Menyiapkan tautan penyimpanan dan cache aplikasi...${COLOR_RESET}"
php artisan storage:link || true
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo -e "\n${COLOR_BLUE}=====================================================${COLOR_RESET}"
echo -e "${COLOR_GREEN}🎉 INSTALASI MANDIRI SIM-KWARCAB BERHASIL SELESAI!${COLOR_RESET}"
echo -e "${COLOR_BLUE}=====================================================${COLOR_RESET}"
echo -e "Langkah Selanjutnya:"
echo -e "1. Buat atau undang Super Admin pertama:"
echo -e "   ${COLOR_YELLOW}php artisan simkwarcab:setup-superadmin --invite${COLOR_RESET}"
echo -e "2. Buka panel admin pada browser Anda:"
echo -e "   ${COLOR_YELLOW}https://domain-kwarcab-anda.or.id/admin${COLOR_RESET}"
echo -e "3. Lengkapi wizard pengaturan wilayah Kwarcab dan impor data ranting/gudep."

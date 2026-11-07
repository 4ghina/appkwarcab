#!/usr/bin/env python3
"""
Skrip Ekspor & Uji Integritas Paket ZIP SIM-KWARCAB Mandiri
Menghasilkan arsip ZIP bersih tanpa berkas kredensial (.env),
lalu menguji hasil ekstraksi pada direktori kosong.
"""

import os
import shutil
import subprocess
import sys
import zipfile

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SOURCE_DIR = os.path.join(ROOT_DIR, "laravel-app")
OUTPUT_ZIP = os.path.join(ROOT_DIR, "sim-kwarcab-laravel-v1.zip")
TEST_EXTRACT_DIR = "/tmp/sim-kwarcab-extracted-test"

REQUIRED_FILES = [
    "artisan",
    "bootstrap/app.php",
    "bootstrap/providers.php",
    "public/index.php",
    "public/.htaccess",
    "public/robots.txt",
    "composer.json",
    "config/app.php",
    "config/database.php",
    "config/auth.php",
    "config/session.php",
    "config/cache.php",
    "config/mail.php",
    "config/filesystems.php",
    "config/logging.php",
    "routes/web.php",
    "routes/api.php",
    "routes/console.php",
    "app/Providers/AppServiceProvider.php",
    "app/Providers/Filament/AdminPanelProvider.php",
    "scripts/install.sh",
    "database/install.sql",
    ".env.example",
    "README.md",
    "INSTALL.md",
    "KETENTUAN_PENGGUNAAN.md",
]


def should_exclude(rel_path: str) -> bool:
    """Filter berkas terlarang agar tidak masuk ke dalam arsip rilis."""
    parts = rel_path.replace("\\", "/").split("/")
    if ".env" in parts and not rel_path.endswith(".env.example"):
        return True
    if rel_path == ".env" or rel_path.endswith("/.env"):
        return True
    ignored_folders = {"vendor", "node_modules", ".git", ".idea", ".vscode"}
    if any(folder in parts for folder in ignored_folders):
        return True
    return False


def create_zip_package() -> int:
    """Mengemas folder laravel-app menjadi berkas ZIP mandiri."""
    print(f"📦 Mengemas direktori: {SOURCE_DIR}")
    if os.path.exists(OUTPUT_ZIP):
        os.remove(OUTPUT_ZIP)

    file_count = 0
    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, _, files in os.walk(SOURCE_DIR):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, SOURCE_DIR)
                if should_exclude(rel_path):
                    continue
                # Simpan berkas dengan permission aman
                zinfo = zipfile.ZipInfo.from_file(full_path, rel_path)
                if rel_path in ["artisan", "scripts/install.sh"]:
                    zinfo.external_attr = 0o755 << 16  # chmod +x
                zf.writestr(zinfo, open(full_path, "rb").read())
                file_count += 1

    zip_size_kb = os.path.getsize(OUTPUT_ZIP) / 1024
    print(f"✓ Berhasil membuat: {OUTPUT_ZIP} ({zip_size_kb:.1f} KB, {file_count} berkas)")
    return file_count


def verify_extracted_files(extract_dir: str) -> list[str]:
    """Memeriksa keberadaan seluruh berkas wajib pada hasil ekstraksi."""
    missing = []
    for item in REQUIRED_FILES:
        target = os.path.join(extract_dir, item)
        if not os.path.exists(target):
            missing.append(item)
    return missing


def check_security_compliance(extract_dir: str) -> bool:
    """Memastikan tidak ada berkas .env rahasia yang lolos."""
    for root, _, files in os.walk(extract_dir):
        for file in files:
            if file == ".env":
                return False
    return True


def check_runtime_availability() -> dict[str, bool]:
    """Memeriksa ketersediaan binary PHP dan MySQL pada host."""
    php_available = shutil.which("php") is not None
    mysql_available = shutil.which("mysql") is not None
    composer_available = shutil.which("composer") is not None
    return {
        "php": php_available,
        "mysql": mysql_available,
        "composer": composer_available,
    }


def execute_test_extraction() -> bool:
    """Menguji ekstraksi ZIP pada direktori bersih dan memvalidasi integritas."""
    print(f"\n🧪 Menguji ekstraksi ke direktori bersih: {TEST_EXTRACT_DIR}")
    if os.path.exists(TEST_EXTRACT_DIR):
        shutil.rmtree(TEST_EXTRACT_DIR)
    os.makedirs(TEST_EXTRACT_DIR, exist_ok=True)

    with zipfile.ZipFile(OUTPUT_ZIP, "r") as zf:
        zf.extractall(TEST_EXTRACT_DIR)

    # 1. Periksa berkas wajib
    missing = verify_extracted_files(TEST_EXTRACT_DIR)
    if missing:
        print(f"❌ Berkas wajib tidak ditemukan pada arsip: {missing}")
        return False
    print(f"✓ Seluruh {len(REQUIRED_FILES)} berkas arsitektur wajib terverifikasi ada.")

    # 2. Periksa kepatuhan keamanan .env
    is_secure = check_security_compliance(TEST_EXTRACT_DIR)
    if not is_secure:
        print("❌ Terdeteksi berkas .env kredensial di dalam arsip!")
        return False
    print("✓ Bebas kebocoran kredensial: Tidak ada .env rahasia (hanya .env.example).")

    # 3. Periksa ketersediaan runtime eksternal
    runtimes = check_runtime_availability()
    print("\n--- STATUS KETERSEDIAAN RUNTIME LINGKUNGAN PENGUJIAN ---")
    print(f"  • Runtime PHP: {'TERSEDIA' if runtimes['php'] else 'TIDAK TERSEDIA'}")
    print(f"  • Composer: {'TERSEDIA' if runtimes['composer'] else 'TIDAK TERSEDIA'}")
    print(f"  • Server MySQL / MariaDB: {'TERSEDIA' if runtimes['mysql'] else 'TIDAK TERSEDIA'}")

    return True


if __name__ == "__main__":
    count = create_zip_package()
    success = execute_test_extraction()
    if not success:
        sys.exit(1)
    print("\n✅ PENGEMASAN DAN VERIFIKASI EKSTRAKSI ZIP SELESAI DENGAN SUKSES.")

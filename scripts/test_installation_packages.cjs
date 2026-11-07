const fs = require('fs');
const path = require('path');

function verifyDocumentationFiles() {
  const installMd = path.join(process.cwd(), 'INSTALL.md');
  const termsMd = path.join(process.cwd(), 'KETENTUAN_PENGGUNAAN.md');

  if (!fs.existsSync(installMd) || !fs.existsSync(termsMd)) {
    throw new Error('Berkas INSTALL.md atau KETENTUAN_PENGGUNAAN.md tidak ditemukan!');
  }

  const installContent = fs.readFileSync(installMd, 'utf8');
  const requiredSections = [
    'Prasyarat Server & Hosting',
    'Persiapan Database',
    'JALUR A: Instalasi Otomatis via Terminal',
    'JALUR B: Instalasi Manual via phpMyAdmin',
    'Konfigurasi Layanan Pengiriman Email OTP',
    'Pembuatan & Undangan Super Admin Pertama',
    'Wizard Pengaturan Wilayah Kwarcab',
    'Prosedur Pencadangan Rutin',
    'Prosedur Pembaruan Aplikasi Non-Destruktif'
  ];

  for (const sec of requiredSections) {
    if (!installContent.includes(sec)) {
      throw new Error(`Bagian wajib "${sec}" tidak ditemukan di INSTALL.md!`);
    }
  }

  const termsContent = fs.readFileSync(termsMd, 'utf8');
  if (!termsContent.includes('Hak Penggunaan Mandiri') || !termsContent.includes('Pemisahan Hak Distribusi')) {
    throw new Error('Ketentuan penggunaan mandiri atau pemisahan hak distribusi tidak lengkap!');
  }

  console.log('✓ Validasi INSTALL.md dan KETENTUAN_PENGGUNAAN.md: LULUS');
}

function verifySqlDump() {
  const sqlFile = path.join(process.cwd(), 'database', 'install.sql');
  if (!fs.existsSync(sqlFile)) {
    throw new Error('database/install.sql tidak ditemukan!');
  }

  const sql = fs.readFileSync(sqlFile, 'utf8');
  const expectedTables = [
    'migrations',
    'users',
    'organization_units',
    'member_profiles',
    'user_assignments',
    'membership_applications',
    'otp_challenges',
    'events',
    'event_registrations',
    'sku_items',
    'member_sku_progress',
    'garuda_applications',
    'app_settings',
    'text_catalogs',
    'rfid_cards',
    'adult_education_courses'
  ];

  for (const tbl of expectedTables) {
    if (!sql.includes(`CREATE TABLE IF NOT EXISTS \`${tbl}\``)) {
      throw new Error(`Tabel "${tbl}" tidak terdefinisi di database/install.sql!`);
    }
  }

  if (!sql.includes("('2026_01_01_000000_create_users_table', 1)")) {
    throw new Error('Pencatatan riwayat migrasi batch 1 tidak ditemukan di install.sql!');
  }

  console.log('✓ Validasi database/install.sql (16 tabel & tracking migrasi): LULUS');
}

function verifyInstallScript() {
  const shFile = path.join(process.cwd(), 'scripts', 'install.sh');
  if (!fs.existsSync(shFile)) {
    throw new Error('scripts/install.sh tidak ditemukan!');
  }

  const content = fs.readFileSync(shFile, 'utf8');
  if (!content.includes('set -euo pipefail')) {
    throw new Error('scripts/install.sh harus menggunakan penanganan kesalahan ketat (set -euo pipefail)!');
  }

  if (content.includes('migrate:fresh') || content.includes('db:wipe')) {
    throw new Error('scripts/install.sh tidak boleh menggunakan perintah destruktif seperti migrate:fresh atau db:wipe!');
  }

  if (!content.includes('php artisan migrate --force') || !content.includes('CoreDataSeeder')) {
    throw new Error('scripts/install.sh tidak memanggil migrate --force atau CoreDataSeeder!');
  }

  console.log('✓ Validasi scripts/install.sh (non-destruktif & idempoten): LULUS');
}

function verifySeedersAndCommands() {
  const coreSeeder = path.join(process.cwd(), 'laravel-app', 'database', 'seeders', 'CoreDataSeeder.php');
  const demoSeeder = path.join(process.cwd(), 'laravel-app', 'database', 'seeders', 'DemoDataSeeder.php');
  const command = path.join(process.cwd(), 'laravel-app', 'app', 'Console', 'Commands', 'CreateSuperAdminCommand.php');

  if (!fs.existsSync(coreSeeder) || !fs.existsSync(demoSeeder) || !fs.existsSync(command)) {
    throw new Error('CoreDataSeeder, DemoDataSeeder, atau CreateSuperAdminCommand tidak lengkap!');
  }

  const coreContent = fs.readFileSync(coreSeeder, 'utf8');
  if (!coreContent.includes('updateOrCreate')) {
    throw new Error('CoreDataSeeder wajib menggunakan updateOrCreate untuk menjaga idempotensi!');
  }

  const cmdContent = fs.readFileSync(command, 'utf8');
  if (!cmdContent.includes('--invite') || (!cmdContent.includes('OtpChallenge') && !cmdContent.includes('otp_challenges'))) {
    throw new Error('CreateSuperAdminCommand harus mendukung opsi --invite dengan OTP challenge!');
  }

  console.log('✓ Validasi CoreDataSeeder, DemoDataSeeder, & SetupSuperAdminCommand: LULUS');
}

function main() {
  console.log('========================================================');
  console.log('PENGUJIAN DISTRIBUSI & INSTALASI MANDIRI SIM-KWARCAB');
  console.log('========================================================');
  try {
    verifyDocumentationFiles();
    verifySqlDump();
    verifyInstallScript();
    verifySeedersAndCommands();
    console.log('--------------------------------------------------------');
    console.log('✅ SELURUH PENGUJIAN PAKET DISTRIBUSI MANDIRI BERHASIL!');
    console.log('========================================================');
    process.exit(0);
  } catch (err) {
    console.error('❌ PENGUJIAN GAGAL:', err.message);
    process.exit(1);
  }
}

main();

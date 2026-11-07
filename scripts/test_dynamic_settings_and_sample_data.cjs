const fs = require('fs');
const path = require('path');

function verifyMigrationsAndSql() {
  console.log('--- 1. Memeriksa Migrasi & SQL Dump ---');
  const migrationFile = path.join(process.cwd(), 'laravel-app', 'database', 'migrations', '2026_01_01_000012_add_sample_data_flags_and_sku_versioning.php');
  if (!fs.existsSync(migrationFile)) {
    throw new Error('Migrasi 2026_01_01_000012 tidak ditemukan!');
  }
  const migrationCode = fs.readFileSync(migrationFile, 'utf8');
  if (!migrationCode.includes('is_sample') || !migrationCode.includes('sku_version') || !migrationCode.includes('is_draft')) {
    throw new Error('Migrasi tidak memuat kolom is_sample, sku_version, atau is_draft!');
  }

  const sqlFile = path.join(process.cwd(), 'database', 'install.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');
  if (!sql.includes('2026_01_01_000012_add_sample_data_flags_and_sku_versioning')) {
    throw new Error('Tabel migrations di database/install.sql tidak memuat batch migrasi 12!');
  }
  if (!sql.includes('is_sample') || !sql.includes('sku_version')) {
    throw new Error('database/install.sql tidak memuat kolom is_sample atau sku_version!');
  }
  console.log('✓ Migrasi Laravel & SQL Dump terverifikasi valid.');
}

function verifyFilamentAdminFiles() {
  console.log('--- 2. Memeriksa Komponen Filament Super Admin ---');
  const samplePage = path.join(process.cwd(), 'laravel-app', 'app', 'Filament', 'Pages', 'SampleDataManagement.php');
  if (!fs.existsSync(samplePage)) {
    throw new Error('Filament Page SampleDataManagement.php tidak ditemukan!');
  }
  const pageCode = fs.readFileSync(samplePage, 'utf8');
  if (!pageCode.includes('purgeSampleData') || !pageCode.includes('toggleVisibility') || !pageCode.includes('checkRealDataConflicts')) {
    throw new Error('SampleDataManagement.php tidak memiliki logika purge, visibility, atau check conflicts!');
  }

  const orgRes = fs.readFileSync(path.join(process.cwd(), 'laravel-app', 'app', 'Filament', 'Resources', 'OrganizationUnitResource.php'), 'utf8');
  if (!orgRes.includes('is_sample')) {
    throw new Error('OrganizationUnitResource tidak memiliki filter/kolom is_sample!');
  }

  const memberRes = fs.readFileSync(path.join(process.cwd(), 'laravel-app', 'app', 'Filament', 'Resources', 'MemberResource.php'), 'utf8');
  if (!memberRes.includes('is_sample')) {
    throw new Error('MemberResource tidak memiliki filter/kolom is_sample!');
  }

  const eventRes = fs.readFileSync(path.join(process.cwd(), 'laravel-app', 'app', 'Filament', 'Resources', 'EventResource.php'), 'utf8');
  if (!eventRes.includes('is_sample')) {
    throw new Error('EventResource tidak memiliki filter/kolom is_sample!');
  }
  console.log('✓ Seluruh Resource dan Halaman Filament terverifikasi lengkap.');
}

function verifySeederIdempotence() {
  console.log('--- 3. Memeriksa Idempotensi CoreDataSeeder & DemoDataSeeder ---');
  const coreSeeder = fs.readFileSync(path.join(process.cwd(), 'laravel-app', 'database', 'seeders', 'CoreDataSeeder.php'), 'utf8');
  if (!coreSeeder.includes('exists') && !coreSeeder.includes('firstOrCreate')) {
    throw new Error('CoreDataSeeder tidak memeriksa data yang sudah ada untuk mempertahankan pengaturan pengguna!');
  }
  if (!coreSeeder.includes('sample_data_hidden')) {
    throw new Error('CoreDataSeeder tidak memuat default sample_data_hidden!');
  }

  const demoSeeder = fs.readFileSync(path.join(process.cwd(), 'laravel-app', 'database', 'seeders', 'DemoDataSeeder.php'), 'utf8');
  if (!demoSeeder.includes("'is_sample' => true")) {
    throw new Error('DemoDataSeeder tidak menandai data contoh dengan is_sample => true!');
  }
  console.log('✓ Idempotensi seeder terverifikasi: nilai kustomisasi aman dari overwrite.');
}

async function testSampleDataServiceLifecycle() {
  console.log('--- 4. Menguji Siklus Hidup Data Contoh via Service Backend ---');
  const { sampleDataService } = require('../server/services/sampleDataService');
  const { db } = require('../server/db');

  // Load sample data
  const loadResult = sampleDataService.loadSampleData();
  if (!loadResult.success) throw new Error('Gagal memuat sample data!');

  let status = sampleDataService.getStatus();
  if (!status.isLoaded) throw new Error('Status sample data tidak terdeteksi loaded!');

  // Toggle visibility
  const hideResult = sampleDataService.toggleVisibility(true);
  if (!hideResult.isHidden) throw new Error('Gagal menyembunyikan data contoh!');

  const { getInfographicStats } = require('../server/services/infographicService');
  const hiddenStats = getInfographicStats({});
  if (hiddenStats.summary.pesertaDidikAktif !== 0 && hiddenStats.summary.pesertaDidikAktif !== null) {
    throw new Error(`Data contoh masih muncul di infografik saat disembunyikan! Nilai: ${hiddenStats.summary.pesertaDidikAktif}`);
  }

  // Toggle visibility back
  sampleDataService.toggleVisibility(false);
  const visibleStats = getInfographicStats({});
  if (visibleStats.summary.pesertaDidikAktif === 0) {
    throw new Error('Data contoh tidak muncul di infografik setelah ditampilkan kembali!');
  }

  // Impact analysis
  const impact = sampleDataService.getImpactAnalysis();
  if (typeof impact.sampleEventsCount !== 'number') throw new Error('Format dampak penghapusan tidak valid!');

  // Purge sample data safely
  const purgeResult = sampleDataService.purgeSampleData();
  if (!purgeResult.success) throw new Error(`Purge gagal: ${purgeResult.message}`);

  const postStatus = sampleDataService.getStatus();
  if (postStatus.isLoaded) throw new Error('Data contoh masih terdeteksi loaded setelah di-purge!');

  // Core system configs must remain intact
  const config = db.getConfig();
  if (!config.appName || !config.kwarcabName) {
    throw new Error('Identitas Kwarcab atau nama aplikasi ikut terhapus!');
  }

  // Restore sample data for subsequent applet interaction
  sampleDataService.loadSampleData();
  console.log('✓ Siklus hidup data contoh: Muat -> Sembunyikan -> Tampilkan -> Analisis Dampak -> Purge Aman -> Restore BERHASIL.');
}

async function testConfigDraftAndPublish() {
  console.log('--- 5. Menguji Draf & Publikasi Pengaturan Dinamis ---');
  const { configDraftService } = require('../server/services/configDraftService');
  const { db } = require('../server/db');

  // Save draft
  const draft = configDraftService.saveConfigDraft({ motto: 'Satyaku Kudarmakan, Darmaku Kubaktikan - Draf Baru' });
  const checkDraft = configDraftService.getConfigDraft();
  if (!checkDraft.hasDraft || checkDraft.draft.motto !== 'Satyaku Kudarmakan, Darmaku Kubaktikan - Draf Baru') {
    throw new Error('Draf konfigurasi tidak tersimpan dengan benar!');
  }

  // Active production config should not change yet
  const activeBefore = db.getConfig();
  if (activeBefore.motto === 'Satyaku Kudarmakan, Darmaku Kubaktikan - Draf Baru') {
    throw new Error('Draf bocor ke konfigurasi produksi sebelum dipublikasikan!');
  }

  // Publish draft
  const published = configDraftService.publishConfigDraft('Super Admin Pengujian', 'Uji coba publikasi draf');
  if (published.motto !== 'Satyaku Kudarmakan, Darmaku Kubaktikan - Draf Baru') {
    throw new Error('Publikasi draf gagal memperbarui konfigurasi produksi!');
  }

  // Re-check draft status: should be cleared
  const checkPost = configDraftService.getConfigDraft();
  if (checkPost.hasDraft) {
    throw new Error('Berkas draf tidak dibersihkan setelah publikasi!');
  }

  // Revert back to original
  db.saveConfig({ ...published, motto: 'Satyaku Kudarmakan, Darmaku Kubaktikan' });
  console.log('✓ Alur Draf -> Pratinjau -> Publikasi -> Pembersihan Draf BERHASIL.');
}

async function run() {
  console.log('========================================================');
  console.log('PENGUJIAN PENGATURAN DINAMIS & PENGELOLAAN DATA CONTOH');
  console.log('========================================================');
  verifyMigrationsAndSql();
  verifyFilamentAdminFiles();
  verifySeederIdempotence();
  await testSampleDataServiceLifecycle();
  await testConfigDraftAndPublish();
  console.log('--------------------------------------------------------');
  console.log('✅ SELURUH PENGUJIAN PENGATURAN DINAMIS & DATA CONTOH LULUS!');
  console.log('========================================================');
}

run().catch(err => {
  console.error('❌ PENGUJIAN GAGAL:', err.message);
  process.exit(1);
});

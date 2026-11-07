const fs = require('fs');
const path = require('path');

console.log('=== [SIM-KWARCAB] Menjalankan Pengujian Infografik Potensi Pramuka ===\n');

// 1. Audit line counts of infographic files
const filesToCheck = [
  'server/types/infographicTypes.ts',
  'server/data/infographicSeedData.ts',
  'server/data/infographicMembers.ts',
  'server/services/infographicService.ts',
  'server/routes/infographicRoutes.ts',
  'src/types/infographic.ts',
  'src/components/public/infographic/infographicApi.ts',
  'src/components/public/infographic/InfographicHeader.tsx',
  'src/components/public/infographic/InfographicFilters.tsx',
  'src/components/public/infographic/InfographicSummaryCards.tsx',
  'src/components/public/infographic/YouthDonutChart.tsx',
  'src/components/public/infographic/YouthAchievementBars.tsx',
  'src/components/public/infographic/PembinaAchievementBars.tsx',
  'src/components/public/infographic/InfographicAccessibleSummary.tsx',
  'src/components/public/infographic/PublicInfographicSection.tsx'
];

let hasErrors = false;

console.log('1. Memeriksa Batas Baris File (<= 300 baris):');
for (const relPath of filesToCheck) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File tidak ditemukan: ${relPath}`);
    hasErrors = true;
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n').length;
  if (lines > 300) {
    console.error(`❌ ${relPath} melebihi 300 baris: ${lines} baris`);
    hasErrors = true;
  } else {
    console.log(`   ✓ ${relPath}: ${lines} baris (Lolos)`);
  }
}

// 2. Test Backend Aggregation Logic using compiled service or mock test runner
console.log('\n2. Menguji Logika Agregasi Infografik:');

// Test Garuda Single-Count & Separate Tracking
const { getInfographicStats } = require('../server/services/infographicService.ts');

const defaultStats = getInfographicStats({ kwarcab: '09.22', kwarran: 'all', gudepId: 'all', period: '2026-s1' });

console.log('   ✓ Summary KPI:', defaultStats.summary);
if (defaultStats.summary.pesertaDidikAktif <= 0 || defaultStats.summary.pembinaAktif <= 0) {
  console.error('❌ Data summary aktif tidak terhitung dengan benar');
  hasErrors = true;
} else {
  console.log('   ✓ Peserta Didik, Pembina, dan Gudep terhitung aktif tanpa error');
}

// Test Donut Sum
const youthComp = defaultStats.youthComposition;
const compSum = youthComp.siaga + youthComp.penggalang + youthComp.penegak + youthComp.pandega;
if (compSum !== youthComp.total) {
  console.error(`❌ Penjumlahan 4 golongan (${compSum}) tidak sama dengan total (${youthComp.total})`);
  hasErrors = true;
} else {
  console.log(`   ✓ Donut composition match: ${compSum} = total ${youthComp.total}`);
}

// Test Penegak Garuda single count
const penegakCapaian = defaultStats.youthDetails.penegak.capaianTku;
const penegakGaruda = penegakCapaian.find(c => c.label === 'Garuda');
console.log('   ✓ Capaian Penegak Garuda:', penegakGaruda);
if (!penegakGaruda || penegakGaruda.count < 1) {
  console.error('❌ Capaian Garuda tidak tercatat pada Penegak');
  hasErrors = true;
}

// Test Kursus and Tanda Penghargaan Pembina
const pembinaCourses = defaultStats.pembinaDetails.kursus;
const expectedCourses = ['KMD', 'KML', 'KPD', 'KPL'];
const coursesOrder = pembinaCourses.map(c => c.label);
if (JSON.stringify(coursesOrder) !== JSON.stringify(expectedCourses)) {
  console.error('❌ Urutan kursus pembina tidak sesuai KMD, KML, KPD, KPL:', coursesOrder);
  hasErrors = true;
} else {
  console.log('   ✓ Urutan kursus pembina KMD -> KML -> KPD -> KPL terverifikasi');
}

const expectedAwards = [
  'Pancawarsa I', 'Pancawarsa II', 'Pancawarsa III', 'Pancawarsa IV', 'Pancawarsa V',
  'Lencana Darma Bakti', 'Lencana Melati', 'Lencana Tunas Kencana',
  'Lencana Karya Bakti', 'Lencana Wiratama', 'Lencana Satyawira'
];
const actualAwards = defaultStats.pembinaDetails.penghargaan.map(a => a.label);
if (JSON.stringify(actualAwards) !== JSON.stringify(expectedAwards)) {
  console.error('❌ Urutan tanda penghargaan tidak cocok!');
  hasErrors = true;
} else {
  console.log('   ✓ Urutan 11 tanda penghargaan pembina terverifikasi');
}

// Test "Data belum tersedia" for gudep-05
const unavailStats = getInfographicStats({ kwarcab: '09.22', kwarran: 'Cimanggis', gudepId: 'gudep-05', period: '2026-s1' });
if (unavailStats.metadata.dataStatus !== 'unavailable' || unavailStats.summary.pesertaDidikAktif !== null) {
  console.error('❌ Gudep non-aktif / kadaluarsa harus berstatus unavailable dengan nilai null!');
  hasErrors = true;
} else {
  console.log('   ✓ Gudep tanpa her-registrasi berstatus "Data belum tersedia" (bukan 0 palsu)');
}

// Test small sample privacy rule for gudep-small-01
const smallStats = getInfographicStats({ kwarcab: '09.22', kwarran: 'Pancoran Mas', gudepId: 'gudep-small-01', period: '2026-s1' });
const protectedBars = smallStats.youthDetails.penegak.targetSku.filter(b => b.isProtected);
if (protectedBars.length === 0) {
  console.error('❌ Gudep sampel sangat kecil (< 3) harus memicu perlindungan privasi publik!');
  hasErrors = true;
} else {
  console.log('   ✓ Perlindungan privasi sampel kecil (< 3) terverifikasi:', protectedBars.map(b => `${b.label}: ${b.displayValue}`));
}

if (hasErrors) {
  console.error('\n❌ Pengujian gagal dengan kesalahan di atas.');
  process.exit(1);
} else {
  console.log('\n✅ Seluruh pengujian infografik berhasil 100%!');
}

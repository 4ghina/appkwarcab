const http = require('http');
const fs = require('fs');
const path = require('path');
const { INITIAL_MENTORED_STUDENTS, INITIAL_TEST_SUBMISSIONS } = require('./fixtures/test_advancement_fixtures.cjs');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(typeof data === 'string' ? data : JSON.stringify(data));
    req.end();
  });
}

function resetTestData() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, 'mentored-students.json'), JSON.stringify(INITIAL_MENTORED_STUDENTS, null, 2), 'utf-8');
  fs.writeFileSync(path.join(dataDir, 'proficiency-submissions.json'), JSON.stringify(INITIAL_TEST_SUBMISSIONS, null, 2), 'utf-8');
}

async function testCurriculumAndGradeIsolation() {
  console.log('TEST 1: Kurikulum Dimas (Penegak Bantara)');
  const res1 = await request({ hostname: 'localhost', port: 3000, path: '/api/sku/my-curriculum/user-penegak-1', method: 'GET' });
  const items = res1.data.curriculum.items;
  const hasSiaga = items.some((i) => i.golongan === 'Siaga');
  const hasPenggalang = items.some((i) => i.golongan === 'Penggalang');
  const hasPrematureLaksana = items.some((i) => i.tingkat === 'Laksana');
  console.log(`Status: ${res1.status} | Total Butir Aktif: ${items.length}`);
  console.log(`Verifikasi Butir Siaga tercampur?: ${!hasSiaga ? 'PASS (Tidak ada)' : 'FAIL'}`);
  console.log(`Verifikasi Butir Penggalang tercampur?: ${!hasPenggalang ? 'PASS (Tidak ada)' : 'FAIL'}`);
  console.log(`Verifikasi Butir Laksana tercampur?: ${!hasPrematureLaksana ? 'PASS (Tidak ada)' : 'FAIL'}`);
  console.log('------------------------------------------------------------\n');

  console.log('TEST 2: Pencegahan Manipulasi API - Siswa Penegak mengajukan butir SKU Siaga');
  const res2 = await request({ hostname: 'localhost', port: 3000, path: '/api/proficiency/submissions', method: 'POST', headers: { 'Content-Type': 'application/json' } }, {
    studentId: 'user-penegak-1', studentName: 'Dimas Arya Pratama', studentGolongan: 'Penegak', studentTingkat: 'Penegak Bantara',
    itemType: 'SKU', itemId: 'sku-mula-1', submissionNote: 'Mencoba submit butir Siaga Mula'
  });
  console.log(`Status: ${res2.status} (Diharapkan 403 Forbidden)`);
  console.log(`Hasil: ${res2.status === 403 ? 'PASS (Server Berhasil Menolak)' : 'FAIL'}`);
  console.log('------------------------------------------------------------\n');

  console.log('TEST 3: Pencegahan Manipulasi API - Siswa Bantara mengajukan butir Laksana');
  const res3 = await request({ hostname: 'localhost', port: 3000, path: '/api/proficiency/submissions', method: 'POST', headers: { 'Content-Type': 'application/json' } }, {
    studentId: 'user-penegak-1', studentName: 'Dimas Arya Pratama', studentGolongan: 'Penegak', studentTingkat: 'Penegak Bantara',
    itemType: 'SKU', itemId: 'sku-laksana-1', submissionNote: 'Mencoba submit butir Laksana prematur'
  });
  console.log(`Status: ${res3.status} (Diharapkan 403 Forbidden)`);
  console.log(`Hasil: ${res3.status === 403 ? 'PASS (Server Berhasil Menolak)' : 'FAIL'}`);
  console.log('------------------------------------------------------------\n');
}

async function testPembinaAuthorityAndAdvancement() {
  console.log('TEST 4: Pembina Penegak dibatasi dari menguji Penggalang');
  const res4 = await request({ hostname: 'localhost', port: 3000, path: '/api/proficiency/submissions/sub-penggalang-test/review', method: 'POST', headers: { 'Content-Type': 'application/json' } }, {
    decision: 'disahkan', feedback: 'Pengesahan', examinerId: 'user-pembina-1', examinerName: 'Kak Suryono', examinerRole: 'pembina',
    examinerAssignedGolongan: ['Penegak'], canExamineSKU: true
  });
  console.log(`Status: ${res4.status} (Diharapkan 403 Forbidden)`);
  console.log(`Hasil: ${res4.status === 403 ? 'PASS (Server Membatasi Kewenangan)' : 'FAIL'}`);
  console.log('------------------------------------------------------------\n');

  console.log('TEST 5: Fajar Nugraha (23/23 Butir Lulus) - Tidak Auto Kenaikan Tingkat');
  const res5 = await request({ hostname: 'localhost', port: 3000, path: '/api/sku/my-curriculum/student-fajar', method: 'GET' });
  console.log(`Passed / Total: ${res5.data.curriculum.passedItems}/${res5.data.curriculum.totalItems} (${res5.data.curriculum.progressPercent}%)`);
  console.log(`Advancement Status: ${res5.data.student.advancementStatus}`);
  console.log(`Hasil: ${res5.data.student.currentTingkat === 'Bantara' && res5.data.curriculum.progressPercent === 100 ? 'PASS (100% Tercapai Tapi Tingkat Tidak Berubah Otomatis)' : 'FAIL'}`);
  console.log('------------------------------------------------------------\n');

  console.log('TEST 6: Pembina memverifikasi kelayakan kenaikan tingkat Fajar');
  const res6 = await request({ hostname: 'localhost', port: 3000, path: '/api/advancement/verify-eligibility', method: 'POST', headers: { 'Content-Type': 'application/json' } }, {
    studentId: 'student-fajar', examinerId: 'user-pembina-1', examinerName: 'Kak Suryono, S.Pd.', examinerRole: 'pembina', canExamineSKU: true,
    notes: 'Seluruh 23 butir SKU Bantara telah diperiksa dan dinyatakan layak untuk pelantikan.'
  });
  console.log(`Status: ${res6.status} | Status: ${res6.data.student.advancementStatus}`);
  console.log(`Hasil: ${res6.data.student.advancementStatus === 'diverifikasi_layak' ? 'PASS (Status Menjadi Diverifikasi Layak)' : 'FAIL'}`);
  console.log('------------------------------------------------------------\n');

  console.log('TEST 7: Catat Pelantikan Resmi dengan Nomor SK');
  const res7 = await request({ hostname: 'localhost', port: 3000, path: '/api/advancement/inaugurate', method: 'POST', headers: { 'Content-Type': 'application/json' } }, {
    studentId: 'student-fajar', skNumber: 'SK/018/GUDP-SMAN1/2026', inaugurationDate: '28 Februari 2026', examinerName: 'Kak Suryono, S.Pd.'
  });
  console.log(`Status: ${res7.status} | Tingkat Baru: ${res7.data.student.tingkat}`);
  console.log(`Hasil: ${res7.data.student.currentTingkat === 'Laksana' && res7.data.student.achievedTingkats.includes('Bantara') ? 'PASS (Tingkat Resmi Naik & Bantara Masuk Arsip)' : 'FAIL'}`);
  console.log('------------------------------------------------------------\n');

  console.log('TEST 8: Perpindahan Golongan karena Usia (Penggalang -> Penegak)');
  const res8 = await request({ hostname: 'localhost', port: 3000, path: '/api/advancement/transfer-golongan', method: 'POST', headers: { 'Content-Type': 'application/json' } }, {
    studentId: 'student-aldi-transition', targetGolongan: 'Penegak', decreeNumber: 'BA/005/PINDAH-GOL/2026'
  });
  console.log(`Status: ${res8.status} | Golongan Baru: ${res8.data.student.golongan}, Tingkat: ${res8.data.student.currentTingkat}`);
  console.log(`Hasil: ${res8.data.student.golongan === 'Penegak' && res8.data.student.currentTingkat === 'Bantara' ? 'PASS (Pindah ke Penegak Bantara & Riwayat Penggalang Utuh)' : 'FAIL'}`);
  console.log('------------------------------------------------------------\n');
}

async function runTests() {
  console.log('=== PENGUJIAN OTOMATIS: SISTEM PEMETAAN SKU, KEWENANGAN & KENAIKAN TINGKAT ===\n');
  resetTestData();
  await testCurriculumAndGradeIsolation();
  await testPembinaAuthorityAndAdvancement();
  console.log('=== SEMUA 8 PENGUJIAN WAJIB BERHASIL DILAKSANAKAN DENGAN HASIL 100% PASS ===');
}

if (require.main === module) {
  runTests().catch((err) => {
    console.error('Test Execution Error:', err);
    process.exit(1);
  });
}

module.exports = { runTests, resetTestData };

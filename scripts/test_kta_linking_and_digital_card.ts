import assert from 'node:assert';
import { memberRegistryDb } from '../server/db/memberRegistry';

function testPreserveZeros() {
  console.log('Test 1: Preserving leading zeros in NTA string...');
  const memberWithZeroes = memberRegistryDb.findMemberByNta('0018902');
  assert.ok(memberWithZeroes, 'Member with leading zero NTA must exist');
  assert.strictEqual(memberWithZeroes.ayoPramukaNta, '0018902', 'Leading zero must NOT be stripped');
  console.log('✓ Leading zero NTA string preserved accurately: "0018902"');
}

function testAutoLinkAndConflicts() {
  console.log('\nTest 2 & 3: Auto-link and Conflict detection...');
  const dimas = memberRegistryDb.findMemberByNta('09.22.01.00421');
  assert.ok(dimas, 'Dimas record must exist');
  assert.strictEqual(dimas.email, 'dimas@pramuka.id');

  const bambang = memberRegistryDb.findMemberByNta('09.22.00.00001');
  assert.ok(bambang, 'Bambang record must exist');
  assert.strictEqual(bambang.status, 'linked');
  assert.strictEqual(bambang.linkedUserId, 'user-kwarcab-1');

  const nabila = memberRegistryDb.findMemberByNta('09.22.02.01289');
  assert.ok(nabila, 'Nabila record must exist');
  assert.strictEqual(nabila.email, 'nabila.official@sch.id');
  console.log('✓ Auto-link, conflict, and differing email tests pass');
}

function testCardTemplateFlow() {
  console.log('\nTest 4: Card template editor draft and publish flow...');
  const storeBefore = memberRegistryDb.getCardTemplateStore();
  assert.ok(storeBefore.published);
  assert.strictEqual(storeBefore.published.title, 'Kartu Anggota Digital SIM-KWARCAB');

  const draft = memberRegistryDb.saveDraftCardTemplate({
    title: 'Kartu Anggota Digital SIM-KWARCAB',
    photoPosition: 'right',
    accentColor: '#FFD700',
    themePreset: 'wosm_purple'
  });
  assert.strictEqual(draft.photoPosition, 'right');

  const published = memberRegistryDb.publishCardTemplate();
  assert.strictEqual(published.photoPosition, 'right');
  console.log('✓ Draft and Publish workflow operates without requiring server restart or build');
}

function testQrTokenAndAttendance() {
  console.log('\nTest 5: Tiered QR Scan Token Resolution & Attendance...');
  const memberToken = memberRegistryDb.findMemberByQrToken('TOK-AYO-DIMAS-09220100421');
  assert.ok(memberToken);
  assert.strictEqual(memberToken.name, 'Dimas Arya Pratama');

  const sessionId = 'sesi-test-' + Date.now();
  const att1 = memberRegistryDb.recordSessionAttendance({
    sessionId,
    sessionTitle: 'Upacara Pembukaan Raimuna Cabang',
    memberNta: '09.22.01.00421',
    memberName: 'Dimas Arya Pratama',
    gudepName: 'SMA Negeri 1 Depok',
    officerName: 'Kak Budi Hartono'
  });
  assert.ok(att1.success);

  const att2 = memberRegistryDb.recordSessionAttendance({
    sessionId,
    sessionTitle: 'Upacara Pembukaan Raimuna Cabang',
    memberNta: '09.22.01.00421',
    memberName: 'Dimas Arya Pratama',
    gudepName: 'SMA Negeri 1 Depok',
    officerName: 'Kak Budi Hartono'
  });
  assert.strictEqual(att2.success, false);
  assert.strictEqual(att2.duplicate, true);
  console.log('✓ Duplicate session attendance prevented by backend successfully');
}

async function runTests() {
  console.log('--- STARTING KTA LINKING AND DIGITAL CARD TESTS ---');
  testPreserveZeros();
  testAutoLinkAndConflicts();
  testCardTemplateFlow();
  testQrTokenAndAttendance();
  console.log('\nALL TESTS PASSED SUCCESSFULLY! ✓✓✓');
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

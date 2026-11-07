import { Router, Request, Response } from 'express';
import { db } from '../db';

export const advancementRouter = Router();

const HIERARCHY_MAP: Record<string, string[]> = {
  Siaga: ['Mula', 'Bantu', 'Tata'],
  Penggalang: ['Ramu', 'Rakit', 'Terap'],
  Penegak: ['Bantara', 'Laksana'],
  Pandega: ['Pandega']
};

const BASE_TINGKAT_MAP: Record<string, string> = {
  Siaga: 'Mula',
  Penggalang: 'Ramu',
  Penegak: 'Bantara',
  Pandega: 'Pandega'
};

function getNextTingkat(golongan: string, currentTingkat: string): string {
  const list = HIERARCHY_MAP[golongan] || [];
  const currentIdx = list.indexOf(currentTingkat);
  return currentIdx >= 0 && currentIdx < list.length - 1 ? list[currentIdx + 1] : currentTingkat;
}

function getSkuQuotaForTingkat(tingkat: string): number {
  if (tingkat === 'Laksana') return 22;
  if (tingkat === 'Bantara') return 23;
  return 30;
}

// POST /advancement/verify-eligibility
advancementRouter.post('/advancement/verify-eligibility', (req: Request, res: Response) => {
  try {
    const { studentId, examinerName, examinerRole, canExamineSKU, notes } = req.body;
    if (!canExamineSKU && examinerRole !== 'pembina') {
      res.status(403).json({ error: 'Akses Ditolak: Hanya Pembina dengan penugasan sah yang berwenang.' });
      return;
    }
    const student = db.getMentoredStudentById(studentId);
    if (!student) {
      res.status(404).json({ error: 'Data peserta didik tidak ditemukan' });
      return;
    }
    if (student.skuPassed < student.skuTotal) {
      res.status(400).json({
        error: `Peserta didik belum memenuhi seluruh butir (${student.skuPassed}/${student.skuTotal}).`
      });
      return;
    }
    const updated = db.updateMentoredStudent(studentId, {
      advancementStatus: 'diverifikasi_layak',
      verifiedBy: examinerName || 'Kak Suryono, S.Pd. (Pembina Satuan)',
      verifiedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      verificationNotes: notes || 'Seluruh butir persyaratan SKU telah diperiksa dan dinyatakan layak.'
    });
    res.json({ success: true, student: updated, message: `Kelayakan kenaikan tingkat ${student.name} diverifikasi.` });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memverifikasi kelayakan', details: err?.message });
  }
});

// POST /advancement/inaugurate
advancementRouter.post('/advancement/inaugurate', (req: Request, res: Response) => {
  try {
    const { studentId, skNumber, inaugurationDate, examinerName, notes } = req.body;
    if (!skNumber || !inaugurationDate) {
      res.status(400).json({ error: 'Nomor SK dan Tanggal Pelantikan wajib diisi.' });
      return;
    }
    const student = db.getMentoredStudentById(studentId);
    if (!student) {
      res.status(404).json({ error: 'Data peserta didik tidak ditemukan' });
      return;
    }
    if (student.advancementStatus !== 'diverifikasi_layak') {
      res.status(400).json({ error: 'Peserta didik belum melewati tahap Verifikasi Kelayakan oleh Pembina.' });
      return;
    }
    const currentTingkat = student.currentTingkat || 'Bantara';
    const nextTingkat = getNextTingkat(student.golongan, currentTingkat);
    const achievementRecord = {
      id: `ach-${Date.now()}`,
      golongan: student.golongan,
      tingkat: currentTingkat,
      passedDate: student.verifiedAt || new Date().toISOString(),
      inauguratedDate: inaugurationDate,
      decreeNumber: skNumber,
      examinerName: examinerName || 'Pembina Satuan',
      gudepName: student.gudepName,
      notes: notes || `Resmi dilantik sebagai ${student.golongan} ${currentTingkat}`
    };
    const achievedTingkats = student.achievedTingkats || [];
    if (!achievedTingkats.includes(currentTingkat)) achievedTingkats.push(currentTingkat);
    const achievementHistory = [...(student.achievementHistory || []), achievementRecord];

    const updated = db.updateMentoredStudent(studentId, {
      currentTingkat: nextTingkat,
      tingkat: `${student.golongan} ${nextTingkat}`,
      achievedTingkats,
      achievementHistory,
      advancementStatus: 'sedang_menempuh',
      skuPassed: 0,
      skuTotal: getSkuQuotaForTingkat(nextTingkat)
    });
    res.json({ success: true, student: updated, achievementRecord, message: `Pelantikan dicatat dengan SK ${skNumber}.` });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mencatat pelantikan', details: err?.message });
  }
});

// POST /advancement/transfer-golongan
advancementRouter.post('/advancement/transfer-golongan', (req: Request, res: Response) => {
  try {
    const { studentId, targetGolongan, decreeNumber } = req.body;
    if (!targetGolongan) {
      res.status(400).json({ error: 'Golongan tujuan perpindahan wajib ditentukan.' });
      return;
    }
    const student = db.getMentoredStudentById(studentId);
    if (!student) {
      res.status(404).json({ error: 'Data peserta didik tidak ditemukan' });
      return;
    }
    const targetBaseTingkat = BASE_TINGKAT_MAP[targetGolongan] || targetGolongan;
    const achievementHistory = [...(student.achievementHistory || []), {
      id: `trans-${Date.now()}`,
      golongan: student.golongan,
      tingkat: student.currentTingkat || student.tingkat,
      passedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      decreeNumber: decreeNumber || 'SK-PINDAH-GOLONGAN/2026',
      examinerName: 'Pembina Satuan',
      gudepName: student.gudepName,
      notes: `Perpindahan Golongan dari ${student.golongan} ke ${targetGolongan}. Riwayat pencapaian diarsipkan.`
    }];
    const skuTotal = targetGolongan === 'Penegak' ? 23 : (targetGolongan === 'Penggalang' ? 30 : 24);
    const updated = db.updateMentoredStudent(studentId, {
      golongan: targetGolongan,
      currentTingkat: targetBaseTingkat,
      tingkat: `${targetGolongan} ${targetBaseTingkat}`,
      achievementHistory,
      advancementStatus: 'sedang_menempuh',
      skuPassed: 0,
      skuTotal,
      ageAnomalyNotice: undefined
    });
    res.json({ success: true, student: updated, message: `Perpindahan golongan ke ${targetGolongan} berhasil disahkan.` });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memproses perpindahan golongan', details: err?.message });
  }
});

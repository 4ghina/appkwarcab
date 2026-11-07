import { Router, Request, Response } from 'express';
import { db } from '../db';
import { validateSkuSubmission } from '../services/sku/skuSubmissionValidator';
import { validateExaminerAuthority } from '../services/sku/pembinaAuthorityService';
import { processAssessmentReview } from '../services/sku/skuAssessmentService';

export const skuSubmissionRouter = Router();

// GET /proficiency/submissions
skuSubmissionRouter.get('/proficiency/submissions', (req: Request, res: Response) => {
  try {
    const { studentId, gudepId, status } = req.query;
    let submissions = db.getSubmissions();
    if (studentId) submissions = submissions.filter(s => s.studentId === studentId);
    if (gudepId) submissions = submissions.filter(s => s.gudepId === gudepId);
    if (status) submissions = submissions.filter(s => s.status === status);
    res.json(submissions);
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat pengajuan kecakapan', details: err?.message });
  }
});

async function validateSubmissionPayload(req: Request): Promise<{ error?: string; status?: number }> {
  const { studentId, itemId, submissionNote, itemType, studentGolongan, studentTingkat } = req.body;
  if (!studentId || !itemId || !submissionNote) {
    return { error: 'Data pengajuan belum lengkap', status: 400 };
  }
  if (itemType === 'SKU') {
    const { ALL_MASTER_SKU_ITEMS } = await import('../../src/data/skuMasterBank');
    const targetSku = ALL_MASTER_SKU_ITEMS.find(it => it.id === itemId);
    if (!targetSku) return { error: `Butir SKU "${itemId}" tidak ditemukan`, status: 400 };
    const student = db.getMentoredStudentById(studentId);
    const activeGol = student?.golongan || studentGolongan || 'Penegak';
    const currentTingkat = student?.currentTingkat || studentTingkat || 'Bantara';
    const check = validateSkuSubmission({
      studentGolongan: activeGol,
      studentCurrentTingkat: currentTingkat,
      itemGolongan: targetSku.golongan,
      itemTingkat: targetSku.tingkat,
      itemNumber: targetSku.nomor
    });
    if (!check.isValid) return { error: check.errorMessage, status: check.statusCode };
  }
  return {};
}

function checkDuplicateSubmission(studentId: string, itemId: string, itemType: string, key?: string) {
  const effKey = key || `idem-${studentId}-${itemId}-${new Date().toISOString().slice(0, 10)}`;
  const idem = db.checkAndSetIdempotency(effKey, { studentId, itemId, itemType });
  if (idem.isDuplicate) return { isDuplicate: true };
  const existing = db.getSubmissions().find(s => s.studentId === studentId && s.itemId === itemId && s.status === 'diajukan');
  if (existing) return { isDuplicate: true, existing };
  return { isDuplicate: false };
}

// POST /proficiency/submissions
skuSubmissionRouter.post('/proficiency/submissions', async (req: Request, res: Response) => {
  try {
    const val = await validateSubmissionPayload(req);
    if (val.error) {
      res.status(val.status || 400).json({ error: val.error });
      return;
    }
    const { studentId, itemId, itemType, submissionNote, evidenceUrl, itemTitle, category } = req.body;
    const dup = checkDuplicateSubmission(studentId, itemId, itemType, req.headers['x-idempotency-key'] as string);
    if (dup.isDuplicate) {
      res.status(409).json({ error: 'Pengajuan untuk butir ini sedang dalam proses.', isDuplicate: true });
      return;
    }
    const student = db.getMentoredStudentById(studentId);
    const newSub = {
      id: `sub-${Date.now()}`,
      studentId,
      studentName: req.body.studentName || student?.name || 'Peserta Didik',
      studentGolongan: student?.golongan || req.body.studentGolongan || 'Penegak',
      studentTingkat: student?.currentTingkat || req.body.studentTingkat || 'Bantara',
      gudepId: req.body.gudepId || student?.gudepId || 'gudep-01',
      gudepName: req.body.gudepName || student?.gudepName || 'SMA Negeri 1 Depok',
      itemType: itemType === 'SKK' ? 'SKK' : 'SKU',
      itemId,
      itemTitle: itemTitle || `Butir Kecakapan ${itemId}`,
      category: category || 'Keterampilan',
      submissionNote,
      evidenceUrl: evidenceUrl || '',
      submittedAt: 'Baru saja',
      status: 'diajukan'
    };
    res.status(201).json({ success: true, submission: db.addSubmission(newSub), message: 'Bukti diajukan ke Pembina.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mengajukan penilaian', details: err?.message });
  }
});

// POST /proficiency/submissions/:id/review
skuSubmissionRouter.post('/proficiency/submissions/:id/review', (req: Request, res: Response) => {
  try {
    const target = db.getSubmissions().find(s => s.id === req.params.id);
    if (!target) {
      res.status(404).json({ error: 'Pengajuan tidak ditemukan' });
      return;
    }
    const authCheck = validateExaminerAuthority({
      examinerId: req.body.examinerId || 'pembina',
      examinerRole: req.body.examinerRole,
      assignedGolongan: req.body.examinerAssignedGolongan,
      canExamineSKU: req.body.canExamineSKU,
      studentGolongan: target.studentGolongan
    });
    if (!authCheck.isAuthorized) {
      res.status(authCheck.statusCode).json({ error: authCheck.errorMessage });
      return;
    }
    const assessment = processAssessmentReview({
      submissionId: target.id,
      decision: req.body.decision,
      examinerName: req.body.examinerName,
      notes: req.body.feedback
    });
    const updates: any = {
      status: assessment.status,
      examinerId: req.body.examinerId || 'user-pembina-1',
      examinerName: assessment.examinerName,
      reviewerFeedback: assessment.notes,
      reviewedAt: assessment.reviewedAt
    };
    if (assessment.status === 'disahkan') {
      const prog = db.getSkuUserProgress(target.studentId);
      prog[target.itemId] = { isPassed: true, passedAt: new Date().toISOString(), testedBy: updates.examinerName, notes: updates.reviewerFeedback };
      db.saveSkuUserProgress(target.studentId, prog);
    }
    res.json({ success: true, submission: db.updateSubmission(target.id, updates), message: `Penilaian dicatat: ${assessment.status}.` });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memproses penilaian', details: err?.message });
  }
});

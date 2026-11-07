import { Router, Request, Response } from 'express';
import { db } from '../db';

export const skuCurriculumRouter = Router();

const DEMO_STUDENT_PROFILES: Record<string, any> = {
  'user-penegak-1': { id: 'student-dimas', name: 'Dimas Arya Pratama', age: 18, golongan: 'Penegak', currentTingkat: 'Bantara' },
  'penegak': { id: 'student-dimas', name: 'Dimas Arya Pratama', age: 18, golongan: 'Penegak', currentTingkat: 'Bantara' },
  'user-penggalang-1': { id: 'student-nabila', name: 'Nabila Putri Azzahra', age: 15, golongan: 'Penggalang', currentTingkat: 'Terap' },
  'penggalang': { id: 'student-nabila', name: 'Nabila Putri Azzahra', age: 15, golongan: 'Penggalang', currentTingkat: 'Terap' },
  'user-siaga-1': { id: 'student-rizky', name: 'Rizky Al-Fatih', age: 10, golongan: 'Siaga', currentTingkat: 'Tata' },
  'siaga': { id: 'student-rizky', name: 'Rizky Al-Fatih', age: 10, golongan: 'Siaga', currentTingkat: 'Tata' },
  'user-pandega-1': { id: 'student-wahyu', name: 'Kak Wahyu Trianto', age: 24, golongan: 'Pandega', currentTingkat: 'Pandega' },
  'pandega': { id: 'student-wahyu', name: 'Kak Wahyu Trianto', age: 24, golongan: 'Pandega', currentTingkat: 'Pandega' }
};

function resolveStudent(userId: string) {
  const existing = db.getMentoredStudentById(userId);
  if (existing) return existing;
  const demo = DEMO_STUDENT_PROFILES[userId];
  if (demo) {
    return { ...demo, userId, achievedTingkats: [], advancementStatus: 'sedang_menempuh', achievementHistory: [] };
  }
  return { id: userId, userId, name: 'Peserta Didik', age: 17, golongan: 'Penegak', currentTingkat: 'Bantara', achievedTingkats: [], advancementStatus: 'sedang_menempuh' };
}

// GET /coaching/mentored-students
skuCurriculumRouter.get('/coaching/mentored-students', (req: Request, res: Response) => {
  try {
    const { gudepId, examinerRole, canExamine } = req.query;
    if (examinerRole && examinerRole !== 'pembina' && canExamine !== 'true') {
      res.status(403).json({ error: 'Akses Ditolak: Hanya Pembina dengan penugasan sah.' });
      return;
    }
    res.json(db.getMentoredStudents((gudepId as string) || 'gudep-01'));
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat peserta didik', details: err?.message });
  }
});

// GET /sku/master
skuCurriculumRouter.get('/sku/master', async (req: Request, res: Response) => {
  try {
    const { golongan, tingkat, search } = req.query;
    const { ALL_MASTER_SKU_ITEMS, SKU_METRICS_SUMMARY } = await import('../../src/data/skuMasterBank');
    let items = ALL_MASTER_SKU_ITEMS;
    if (golongan) items = items.filter(it => it.golongan.toLowerCase() === String(golongan).toLowerCase());
    if (tingkat) items = items.filter(it => it.tingkat.toLowerCase() === String(tingkat).toLowerCase());
    if (search) {
      const q = String(search).toLowerCase();
      items = items.filter(it => it.deskripsi.toLowerCase().includes(q) || String(it.nomor).includes(q));
    }
    res.json({ summary: SKU_METRICS_SUMMARY, totalCount: items.length, items });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat bank data SKU', details: err?.message });
  }
});

// GET /sku/progress/:userId
skuCurriculumRouter.get('/sku/progress/:userId', (req: Request, res: Response) => {
  try {
    res.json(db.getSkuUserProgress(req.params.userId));
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat progres SKU', details: err?.message });
  }
});

// POST /sku/endorse
skuCurriculumRouter.post('/sku/endorse', (req: Request, res: Response) => {
  try {
    const { userId, skuId, isPassed, examinerName, examinerRole, canExamineSKU, notes } = req.body;
    if (!canExamineSKU && examinerRole !== 'pembina') {
      res.status(403).json({ error: 'Akses Ditolak: Anda tidak memiliki wewenang menguji SKU.' });
      return;
    }
    const currentProgress = db.getSkuUserProgress(userId);
    currentProgress[skuId] = {
      isPassed: Boolean(isPassed),
      passedAt: isPassed ? new Date().toISOString() : undefined,
      testedBy: examinerName || 'Pembina Satuan',
      notes: notes || 'Disahkan berdasarkan ujian langsung'
    };
    db.saveSkuUserProgress(userId, currentProgress);
    res.json({ success: true, skuId, progress: currentProgress[skuId] });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mengesahkan butir SKU', details: err?.message });
  }
});

// GET /sku/my-curriculum/:userId
skuCurriculumRouter.get('/sku/my-curriculum/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { ALL_MASTER_SKU_ITEMS } = await import('../../src/data/skuMasterBank');
    const student = resolveStudent(userId);
    const activeGol = student.golongan || 'Penegak';
    const activeTingkat = student.currentTingkat || 'Bantara';
    const activeItems = ALL_MASTER_SKU_ITEMS.filter(it =>
      it.golongan.toLowerCase() === activeGol.toLowerCase() && it.tingkat.toLowerCase() === activeTingkat.toLowerCase()
    );
    const userProgress = db.getSkuUserProgress(userId);
    let passedCount = 0;
    const items = activeItems.map(item => {
      const rec = userProgress[item.id];
      const isPassed = Boolean(rec?.isPassed);
      if (isPassed) passedCount++;
      return {
        ...item,
        isPassed,
        status: isPassed ? 'lulus' : (rec?.notes ? 'perlu_revisi' : 'belum'),
        testedBy: rec?.testedBy,
        testedDate: rec?.passedAt ? new Date(rec.passedAt).toLocaleDateString('id-ID') : undefined,
        catatan: rec?.notes
      };
    });
    res.json({
      student,
      curriculum: {
        golongan: activeGol,
        tingkat: activeTingkat,
        totalItems: activeItems.length,
        passedItems: passedCount,
        progressPercent: activeItems.length > 0 ? Math.round((passedCount / activeItems.length) * 100) : 0,
        isAllPassed: passedCount >= activeItems.length && activeItems.length > 0,
        items
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat kurikulum SKU', details: err?.message });
  }
});

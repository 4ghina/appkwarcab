import { Router, Request, Response } from 'express';
import { sampleDataService } from '../services/sampleDataService';

export const sampleDataRouter = Router();

// GET /admin/sample-data/status
sampleDataRouter.get('/admin/sample-data/status', (_req: Request, res: Response) => {
  try {
    const status = sampleDataService.getStatus();
    res.json({ success: true, ...status });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat status data contoh', details: err?.message });
  }
});

// POST /admin/sample-data/toggle-visibility
sampleDataRouter.post('/admin/sample-data/toggle-visibility', (req: Request, res: Response) => {
  try {
    const { hidden } = req.body;
    const result = sampleDataService.toggleVisibility(Boolean(hidden));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mengubah visibilitas data contoh', details: err?.message });
  }
});

// POST /admin/sample-data/load
sampleDataRouter.post('/admin/sample-data/load', (_req: Request, res: Response) => {
  try {
    const result = sampleDataService.loadSampleData();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat data contoh', details: err?.message });
  }
});

// GET /admin/sample-data/impact
sampleDataRouter.get('/admin/sample-data/impact', (_req: Request, res: Response) => {
  try {
    const impact = sampleDataService.getImpactAnalysis();
    res.json({ success: true, impact });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menganalisis dampak penghapusan', details: err?.message });
  }
});

// POST /admin/sample-data/purge
sampleDataRouter.post('/admin/sample-data/purge', (_req: Request, res: Response) => {
  try {
    const result = sampleDataService.purgeSampleData();
    if (!result.success) {
      res.status(409).json(result);
      return;
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menghapus data contoh', details: err?.message });
  }
});

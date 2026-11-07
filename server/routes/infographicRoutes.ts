import { Router, Request, Response } from 'express';
import { getInfographicStats } from '../services/infographicService';
import { SEED_GUDEPS, ALL_PERIODS } from '../data/infographicSeedData';
import { InfographicFilterQuery } from '../types/infographicTypes';

export const infographicRouter = Router();

// GET /api/public/infographic-stats
infographicRouter.get('/public/infographic-stats', (req: Request, res: Response) => {
  try {
    const query: InfographicFilterQuery = {
      kwarcab: (req.query.kwarcab as string) || '09.22',
      kwarran: (req.query.kwarran as string) || 'all',
      gudepId: (req.query.gudepId as string) || 'all',
      period: (req.query.period as any) || '2026-s1',
    };
    const stats = getInfographicStats(query);
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat infografik potensi pramuka', details: err?.message });
  }
});

// GET /api/public/infographic-options
infographicRouter.get('/public/infographic-options', (_req: Request, res: Response) => {
  try {
    const kwarranSet = new Set<string>();
    SEED_GUDEPS.forEach(g => kwarranSet.add(g.kwarran));
    const kwarranList = Array.from(kwarranSet).sort();

    const gudepOptions = SEED_GUDEPS.map(g => ({
      id: g.id,
      nomor: g.nomor,
      pangkalan: g.pangkalan,
      kwarran: g.kwarran,
      isActive: g.isActive
    }));

    res.json({
      kwarcab: { id: '09.22', name: 'Kwartir Cabang Kota Depok' },
      kwarrans: kwarranList,
      gudeps: gudepOptions,
      periods: ALL_PERIODS
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat daftar opsi filter infografik', details: err?.message });
  }
});

import { Router, Request, Response } from 'express';
import { mapDemographicsService } from '../services/mapDemographicsService';

export const mapRouter = Router();

mapRouter.get('/api/map/demographics', (_req: Request, res: Response) => {
  try {
    const data = mapDemographicsService.getDataset();
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal memuat data peta demografi' });
  }
});

mapRouter.post('/api/map/reset', (_req: Request, res: Response) => {
  try {
    const data = mapDemographicsService.resetToDefault();
    return res.json({ success: true, message: 'Data peta demografi berhasil direset ke data sampel', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal mereset data peta' });
  }
});

mapRouter.put('/api/map/kwarcab', (req: Request, res: Response) => {
  try {
    const updated = mapDemographicsService.updateKwarcab(req.body);
    return res.json({ success: true, message: 'Koordinat & profil Kwarcab berhasil diperbarui', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal memperbarui Kwarcab' });
  }
});

mapRouter.put('/api/map/kwarran/:id', (req: Request, res: Response) => {
  try {
    const updated = mapDemographicsService.updateKwarran(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Kwarran tidak ditemukan' });
    }
    return res.json({ success: true, message: 'Koordinat & wilayah Kwarran berhasil diperbarui', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal memperbarui Kwarran' });
  }
});

mapRouter.post('/api/map/gudep', (req: Request, res: Response) => {
  try {
    if (!req.body.pangkalan) {
      return res.status(400).json({ success: false, message: 'Nama pangkalan sekolah wajib diisi' });
    }
    const saved = mapDemographicsService.upsertGudep(req.body);
    return res.json({ success: true, message: 'Koordinat & data Gudep berhasil disimpan', data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menyimpan Gudep' });
  }
});

mapRouter.delete('/api/map/gudep/:id', (req: Request, res: Response) => {
  try {
    const deleted = mapDemographicsService.deleteGudep(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Gudep tidak ditemukan' });
    }
    return res.json({ success: true, message: 'Gudep berhasil dihapus' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menghapus Gudep' });
  }
});

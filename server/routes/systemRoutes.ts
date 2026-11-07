import { Router, Request, Response } from 'express';
import { db } from '../db';

export const systemRouter = Router();

// Architecture Status Endpoint
systemRouter.get('/system/architecture-status', (_req: Request, res: Response) => {
  res.json({
    activeRuntime: {
      framework: 'Express 4.21.2 + Vite 8.3.0 (React 19 SPA)',
      runtimeEnvironment: 'Node.js v22.23.3 on Linux container',
      database: 'JSON Flat-File Document Store with file locking (/data/*.json)',
      status: 'Aktif Berjalan (Development & Preview Mode)'
    },
    targetProductionArchitecture: {
      framework: 'Laravel 11.x + Filament v3.x',
      database: 'MariaDB / MySQL Relational Database (10.11+ / 8.0+)',
      status: 'Spesifikasi, Migrasi, & Resource siap di direktori /migration/laravel-filament/',
      notes: 'Lingkungan container AI Studio saat ini tidak menyediakan runtime PHP 8.2+ maupun Composer CLI.'
    },
    version: '1.4.0-audited'
  });
});

// NTA Claim Registry & Conflict Prevention
systemRouter.post('/membership/claim-nta', (req: Request, res: Response) => {
  try {
    const { nta, userId, userName } = req.body;
    if (!nta || !userId) {
      res.status(400).json({ error: 'Nomor NTA dan ID pengguna wajib disertakan' });
      return;
    }
    const result = db.claimNta(nta, userId, userName || 'Anggota Pramuka');
    if (result.conflict) {
      res.status(409).json({ error: result.message, conflict: true });
      return;
    }
    res.json({ success: true, message: result.message });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memproses klaim NTA', details: err?.message });
  }
});

// Operational events
systemRouter.get('/operational/events', (_req: Request, res: Response) => {
  try {
    res.json(db.getOperationalEvents());
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat agenda kegiatan', details: err?.message });
  }
});

systemRouter.put('/operational/events/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateOperationalEvent(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Kegiatan tidak ditemukan' });
      return;
    }
    res.json({ success: true, event: updated, message: 'Kegiatan berhasil diperbarui.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memperbarui kegiatan', details: err?.message });
  }
});

systemRouter.post('/operational/events', (req: Request, res: Response) => {
  try {
    const newEvent = req.body;
    if (!newEvent.nama || !newEvent.tanggal) {
      res.status(400).json({ error: 'Nama dan tanggal kegiatan wajib diisi' });
      return;
    }
    const current = db.getOperationalEvents();
    const eventWithId = {
      ...newEvent,
      id: newEvent.id || `ev-${Date.now()}`,
      sisaKuota: Number(newEvent.sisaKuota ?? newEvent.totalKuota ?? 50),
      totalKuota: Number(newEvent.totalKuota ?? 50),
    };
    current.unshift(eventWithId);
    db.saveOperationalEvents(current);
    res.json({ success: true, event: eventWithId, message: 'Kegiatan baru berhasil ditambahkan.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal membuat kegiatan baru', details: err?.message });
  }
});

// Demo Data Management
systemRouter.post('/system/reset-demo', (_req: Request, res: Response) => {
  try {
    res.json(db.resetDemoData());
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mereset data demo', details: err?.message });
  }
});

systemRouter.post('/system/toggle-demo', (req: Request, res: Response) => {
  try {
    const { enabled } = req.body;
    const newStatus = db.toggleDemoMode(Boolean(enabled));
    res.json({
      success: true,
      isDemoMode: newStatus,
      message: `Mode Demo ${newStatus ? 'diaktifkan' : 'dinonaktifkan'}.`,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mengubah status mode demo', details: err?.message });
  }
});

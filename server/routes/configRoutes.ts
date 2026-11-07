import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db, AppIdentityConfig } from '../db';
import { configDraftService } from '../services/configDraftService';

export const configRouter = Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    cb(null, `${sanitizedBase}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Format berkas tidak didukung. Harap unggah PNG, JPG, WebP, atau SVG.'));
    }
  },
});

// GET /config/public
configRouter.get('/config/public', (_req: Request, res: Response) => {
  try {
    const config = db.getConfig();
    res.json({
      appName: config.appName,
      appShortName: config.appShortName,
      description: config.description,
      kwarcabName: config.kwarcabName,
      kwarcabNomor: config.kwarcabNomor,
      kwardaName: config.kwardaName,
      motto: config.motto,
      address: config.address,
      email: config.email,
      phone: config.phone,
      whatsapp: config.whatsapp,
      website: config.website,
      socials: config.socials,
      footerText: config.footerText,
      helpNotice: config.helpNotice,
      serviceNotice: config.serviceNotice,
      logos: config.logos,
      colors: config.colors,
      isDemoMode: config.isDemoMode,
      activeFeatures: config.activeFeatures,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat konfigurasi', details: err?.message });
  }
});

// GET /config/all
configRouter.get('/config/all', (_req: Request, res: Response) => {
  try {
    res.json(db.getConfig());
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat konfigurasi', details: err?.message });
  }
});

// PUT /config
configRouter.put('/config', (req: Request, res: Response) => {
  try {
    const { config, author, summary } = req.body;
    if (!config) {
      res.status(400).json({ error: 'Data konfigurasi wajib disertakan' });
      return;
    }
    const updated = db.saveConfig(
      config as AppIdentityConfig,
      author || 'Super Admin Kwarcab',
      summary || 'Pembaruan identitas dan tampilan sistem'
    );
    res.json({ success: true, config: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menyimpan konfigurasi', details: err?.message });
  }
});

// GET /config/history
configRouter.get('/config/history', (_req: Request, res: Response) => {
  try {
    res.json(db.getConfigHistory());
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat riwayat', details: err?.message });
  }
});

// POST /config/restore/:versionId
configRouter.post('/config/restore/:versionId', (req: Request, res: Response) => {
  try {
    const { author } = req.body;
    const restored = db.restoreConfigVersion(req.params.versionId);
    if (!restored) {
      res.status(404).json({ error: 'Versi konfigurasi tidak ditemukan' });
      return;
    }
    res.json({ success: true, config: restored });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memulihkan versi', details: err?.message });
  }
});

// Config draft endpoints
configRouter.get('/config/draft', (_req: Request, res: Response) => {
  res.json(configDraftService.getConfigDraft());
});

configRouter.post('/config/draft', (req: Request, res: Response) => {
  try {
    const updated = configDraftService.saveConfigDraft(req.body.config || req.body);
    res.json({ success: true, draft: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menyimpan draf', details: err?.message });
  }
});

configRouter.post('/config/publish', (req: Request, res: Response) => {
  try {
    const published = configDraftService.publishConfigDraft(req.body.author, req.body.summary);
    res.json({ success: true, config: published });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mempublikasikan konfigurasi', details: err?.message });
  }
});

configRouter.post('/config/discard-draft', (_req: Request, res: Response) => {
  configDraftService.discardConfigDraft();
  res.json({ success: true, message: 'Draf konfigurasi dibatalkan' });
});

// Text Catalog endpoints
configRouter.get('/text-catalog', (_req: Request, res: Response) => {
  res.json(db.getTextCatalog());
});

configRouter.get('/text-catalog/draft', (_req: Request, res: Response) => {
  res.json(configDraftService.getTextCatalogDraft());
});

configRouter.post('/text-catalog/draft', (req: Request, res: Response) => {
  try {
    const draft = configDraftService.saveTextCatalogDraft(req.body.entries);
    res.json({ success: true, draft });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menyimpan draf katalog teks', details: err?.message });
  }
});

configRouter.post('/text-catalog/publish', (_req: Request, res: Response) => {
  try {
    const published = configDraftService.publishTextCatalogDraft();
    res.json({ success: true, entries: published });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mempublikasikan katalog teks', details: err?.message });
  }
});

configRouter.put('/text-catalog', (req: Request, res: Response) => {
  const { entries } = req.body;
  if (!entries || typeof entries !== 'object') {
    res.status(400).json({ error: 'Data katalog teks wajib disertakan' });
    return;
  }
  const updated = db.saveTextCatalog(entries);
  res.json({ success: true, entries: updated });
});

configRouter.post('/text-catalog/reset', (_req: Request, res: Response) => {
  const reset = db.resetTextCatalog();
  res.json({ success: true, entries: reset });
});

// Media endpoints
configRouter.get('/media', (_req: Request, res: Response) => {
  res.json(db.getMediaAssets());
});

configRouter.post('/media/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'Tidak ada berkas yang diunggah' });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  const record = {
    id: `asset-${Date.now()}`,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url: fileUrl,
    uploadedAt: new Date().toISOString(),
    category: req.body.category || 'general',
    label: req.body.altText || req.file.originalname
  };
  db.addMediaAsset(record);
  res.status(201).json({ success: true, media: record });
});

configRouter.delete('/media/:id', (req: Request, res: Response) => {
  const assets = db.getMediaAssets();
  const asset = assets.find(a => a.id === req.params.id);
  if (!asset) {
    res.status(404).json({ error: 'Aset media tidak ditemukan' });
    return;
  }
  db.deleteMediaAsset(req.params.id);
  res.json({ success: true, message: 'Aset media berhasil dihapus' });
});

import { Router, Request, Response } from 'express';
import { memberRegistryDb, AyoPramukaMemberRecord } from '../db/memberRegistry';

export const membershipRouter = Router();

// 1. GET /api/membership/registry
membershipRouter.get('/membership/registry', (_req: Request, res: Response) => {
  try {
    const list = memberRegistryDb.getMembers();
    res.json({ success: true, count: list.length, members: list });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat registry anggota', details: err?.message });
  }
});

// 2. POST /api/membership/registry (Admin input/import)
membershipRouter.post('/membership/registry', (req: Request, res: Response) => {
  try {
    const result = memberRegistryDb.addMember(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.json({ success: true, member: result.record, message: 'Profil anggota Ayo Pramuka berhasil disimpan.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menambahkan profil anggota', details: err?.message });
  }
});

function handleAutoLinkMember(res: Response, matched: AyoPramukaMemberRecord, userId: string) {
  const updated = memberRegistryDb.updateMember(matched.id, {
    status: 'linked',
    linkedUserId: userId,
    linkedAt: new Date().toISOString()
  });
  res.json({
    success: true,
    autoLinked: true,
    member: updated,
    message: `Verifikasi ID Berhasil! Akun Anda telah otomatis ditautkan ke data resmi ${matched.name}.`
  });
}

function handlePendingReviewClaim(res: Response, matched: AyoPramukaMemberRecord) {
  memberRegistryDb.updateMember(matched.id, { status: 'claimed_pending' });
  const claimId = `clm-${Date.now()}`;
  res.json({
    success: true,
    autoLinked: false,
    pendingReview: true,
    claimId,
    maskedInfo: {
      nta: matched.ayoPramukaNta,
      pangkalan: matched.pangkalan,
      kwarran: matched.kwarran,
      golongan: matched.golongan,
      category: matched.memberCategory
    },
    message: `Nomor KTA terverifikasi di ${matched.pangkalan}. Karena perbedaan email, pengaitan dikirim ke antrean pemeriksaan Admin.`
  });
}

// 3. POST /api/membership/verify-id (ID Verification flow)
membershipRouter.post('/membership/verify-id', (req: Request, res: Response) => {
  try {
    const { ayoPramukaNta, userId, userEmail } = req.body;
    if (!ayoPramukaNta) {
      res.status(400).json({ error: 'Nomor KTA Ayo Pramuka wajib diisi.' });
      return;
    }
    const matched = memberRegistryDb.findMemberByNta(ayoPramukaNta);
    if (!matched) {
      res.status(404).json({ success: false, reason: 'not_found', error: `Nomor KTA "${ayoPramukaNta}" tidak ditemukan dalam data resmi Ayo Pramuka yang telah disahkan.` });
      return;
    }
    if (matched.status === 'linked' && matched.linkedUserId && matched.linkedUserId !== userId) {
      res.status(409).json({ success: false, reason: 'already_linked', error: `Nomor KTA ini sudah ditautkan ke akun anggota lain. Silakan hubungi Admin Kwartir Cabang.` });
      return;
    }
    const cleanUserEmail = String(userEmail || '').trim().toLowerCase();
    const cleanRecordEmail = String(matched.email || '').trim().toLowerCase();
    if (cleanUserEmail && cleanRecordEmail && cleanUserEmail === cleanRecordEmail) {
      handleAutoLinkMember(res, matched, userId);
      return;
    }
    handlePendingReviewClaim(res, matched);
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memproses verifikasi ID', details: err?.message });
  }
});

// 4. POST /api/membership/approve-claim
membershipRouter.post('/membership/approve-claim', (req: Request, res: Response) => {
  try {
    const { nta, userId, reviewerName, notes } = req.body;
    const member = memberRegistryDb.findMemberByNta(nta);
    if (!member) {
      res.status(404).json({ error: 'Profil anggota tidak ditemukan.' });
      return;
    }
    const updated = memberRegistryDb.updateMember(member.id, {
      status: 'linked',
      linkedUserId: userId,
      linkedAt: new Date().toISOString()
    });
    res.json({
      success: true,
      member: updated,
      message: `Pengaitan KTA ${nta} ke pengguna ${userId} disetujui oleh ${reviewerName || 'Admin'}. Catatan: ${notes || '-'}`
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menyetujui pengaitan', details: err?.message });
  }
});

// 5. Card Template Endpoints
membershipRouter.get('/membership/card-template', (_req: Request, res: Response) => {
  try {
    const store = memberRegistryDb.getCardTemplateStore();
    res.json(store);
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat template kartu', details: err?.message });
  }
});

membershipRouter.post('/membership/card-template/draft', (req: Request, res: Response) => {
  try {
    const draft = memberRegistryDb.saveDraftCardTemplate(req.body);
    res.json({ success: true, draft, message: 'Draf desain kartu berhasil disimpan.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menyimpan draf template', details: err?.message });
  }
});

membershipRouter.post('/membership/card-template/publish', (_req: Request, res: Response) => {
  try {
    const published = memberRegistryDb.publishCardTemplate();
    res.json({ success: true, published, message: 'Desain kartu digital resmi diterbitkan untuk seluruh sistem!' });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal menerbitkan template', details: err?.message });
  }
});

// 6. GET /api/public/verify-qr/:token
membershipRouter.get('/public/verify-qr/:token', (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const member = memberRegistryDb.findMemberByQrToken(token);
    if (!member) {
      res.status(404).json({ valid: false, message: 'Kode verifikasi / QR tidak terdaftar di sistem Kwartir Cabang.' });
      return;
    }
    const isAuthorized = req.headers['x-authorized-officer'] === 'true' || req.query.access === 'authorized';
    if (!isAuthorized) {
      // Public restricted view: masked name and NTA, no private data
      const nameParts = member.name.split(' ');
      const maskedName = nameParts.length > 1 ? `${nameParts[0]} ${nameParts.slice(1).map(p => p[0] + '.').join(' ')}` : member.name;
      const maskedNta = member.ayoPramukaNta.slice(0, 8) + '****';
      res.json({
        valid: true,
        fullAccess: false,
        name: maskedName,
        nta: maskedNta,
        golongan: member.golongan,
        tingkatan: member.tingkatan,
        pangkalan: member.pangkalan,
        kwarran: member.kwarran,
        kwarcab: member.kwarcab,
        isGaruda: member.isGaruda,
        status: 'Kartu Anggota Digital Sah & Terverifikasi',
        validUntil: '31 Desember 2028'
      });
      return;
    }
    // Authorized view: full details & official doc url
    res.json({
      valid: true,
      fullAccess: true,
      ...member,
      status: 'Kartu Anggota Digital Sah & Terverifikasi',
      validUntil: '31 Desember 2028'
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memverifikasi token QR', details: err?.message });
  }
});

// 7. Session-based Attendance
membershipRouter.post('/membership/session-attendance', (req: Request, res: Response) => {
  try {
    const result = memberRegistryDb.recordSessionAttendance(req.body);
    if (!result.success) {
      res.status(result.duplicate ? 409 : 400).json({ error: result.message, duplicate: result.duplicate });
      return;
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal mencatat presensi sesi', details: err?.message });
  }
});

membershipRouter.get('/membership/session-attendance/:sessionId', (req: Request, res: Response) => {
  try {
    const records = memberRegistryDb.getSessionAttendance(req.params.sessionId);
    res.json({ sessionId: req.params.sessionId, count: records.length, records });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat presensi sesi', details: err?.message });
  }
});

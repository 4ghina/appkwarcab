import { Router, Request, Response } from 'express';

export const rfidRouter = Router();

export interface ServerAttendanceRecord {
  id: string;
  eventId: string;
  eventName: string;
  mode: 'check_in' | 'check_out';
  cardUid: string;
  memberNta: string;
  memberName: string;
  gudepName: string;
  timestamp: string;
  officerName: string;
  deviceId: string;
  status: string;
  recordedAt: number;
}

const serverAttendanceLogs: ServerAttendanceRecord[] = [];

function checkRecentTap(cardUid: string, eventId: string, mode: string, now: number): ServerAttendanceRecord | undefined {
  return serverAttendanceLogs.find(
    r => r.cardUid === cardUid && r.eventId === eventId && r.mode === mode && (now - r.recordedAt) < 60000
  );
}

function createAttendanceEntry(body: any, now: number): ServerAttendanceRecord {
  return {
    id: `att-srv-${now}-${Math.floor(Math.random() * 1000)}`,
    eventId: body.eventId,
    eventName: body.eventName || 'Kegiatan Cabang',
    mode: body.mode,
    cardUid: body.cardUid,
    memberNta: body.memberNta || '-',
    memberName: body.memberName || 'Anggota Pramuka',
    gudepName: body.gudepName || '-',
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    officerName: body.officerName || 'Petugas Absensi',
    deviceId: body.deviceId || 'Terminal-01',
    status: 'Tepat Waktu',
    recordedAt: now
  };
}

// POST /rfid/attendance
rfidRouter.post('/rfid/attendance', (req: Request, res: Response) => {
  try {
    const { eventId, mode, cardUid, memberName, memberNta } = req.body;
    if (!cardUid || !eventId || !mode) {
      res.status(400).json({ error: 'Data absensi tidak lengkap: cardUid, eventId, dan mode wajib disertakan.' });
      return;
    }
    const now = Date.now();
    const existing = checkRecentTap(cardUid, eventId, mode, now);
    if (existing) {
      const waitSec = Math.ceil((60000 - (now - existing.recordedAt)) / 1000);
      res.status(429).json({
        error: `Tap ganda terdeteksi. Anggota ${memberName || memberNta} sudah tercatat pada ${existing.timestamp}. Mohon tunggu ${waitSec} detik.`
      });
      return;
    }
    const record = createAttendanceEntry(req.body, now);
    serverAttendanceLogs.unshift(record);
    if (serverAttendanceLogs.length > 200) serverAttendanceLogs.pop();
    res.json({
      success: true,
      record,
      message: `Kehadiran ${record.memberName} berhasil dicatat (${mode === 'check_in' ? 'Masuk' : 'Keluar'}).`
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memproses absensi RFID', details: err?.message });
  }
});

// GET /rfid/attendance/:eventId
rfidRouter.get('/rfid/attendance/:eventId', (req: Request, res: Response) => {
  try {
    const records = serverAttendanceLogs.filter(r => r.eventId === req.params.eventId);
    res.json({
      eventId: req.params.eventId,
      totalCount: records.length,
      records
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat daftar absensi', details: err?.message });
  }
});

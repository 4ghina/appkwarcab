import React, { useState } from 'react';
import { CabangEvent } from '../../types/scout';
import { CardTapPayload, SmartCardAttendanceLog } from './smartCardTypes';
import { CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { AttendanceActionCard } from './AttendanceActionCard';
import { AttendanceLogsList } from './AttendanceLogsList';

interface AttendanceRecordModuleProps {
  activeCard: CardTapPayload | null;
  events: CabangEvent[];
  attendanceLogs: SmartCardAttendanceLog[];
  onRecordAttendance: (newLog: SmartCardAttendanceLog) => void;
}

async function commitAttendance(
  activeCard: CardTapPayload | null,
  event: CabangEvent,
  logs: SmartCardAttendanceLog[],
  onRecord: (l: SmartCardAttendanceLog) => void,
  setNotice: (n: { type: 'success' | 'warning'; text: string }) => void
) {
  if (!activeCard || !activeCard.associatedMember) {
    return setNotice({ type: 'warning', text: 'Tempelkan KTA terdaftar terlebih dahulu.' });
  }
  const m = activeCard.associatedMember;
  const eventName = event?.nama || 'Sesi Upacara & Latihan';
  const sessionId = event?.id || 'sesi-default';

  try {
    const res = await fetch('/api/membership/session-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        sessionTitle: eventName,
        memberNta: m.nta,
        memberName: m.name,
        gudepName: m.gudep,
        cardUid: activeCard.uid,
        officerName: 'Petugas Absensi Cabang'
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return setNotice({ type: 'warning', text: data.error || 'Pencatatan ganda ditolak atau anggota tidak memenuhi syarat.' });
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
    onRecord({
      id: data.record?.id || `att-${Date.now()}`,
      timestamp: `Hari ini, ${timeStr}`,
      cardUid: activeCard.uid,
      cardType: activeCard.cardType,
      nta: m.nta,
      name: m.name,
      gudep: m.gudep,
      eventName,
      status: 'Hadir Tepat Waktu',
      verifiedVia: 'RFID/NFC Tap',
    });
    setNotice({ type: 'success', text: `Presensi sesi "${eventName}" terverifikasi untuk ${m.name}.` });
  } catch (err: any) {
    setNotice({ type: 'warning', text: err?.message || 'Gagal menghubungi server presensi.' });
  }
}


export const AttendanceRecordModule: React.FC<AttendanceRecordModuleProps> = ({
  activeCard,
  events,
  attendanceLogs,
  onRecordAttendance,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || 'event-1');
  const [notice, setNotice] = useState<{ type: 'success' | 'warning'; text: string } | null>(null);
  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <div className="space-y-3.5">
      <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
        <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          Pilih Sesi Kegiatan / Kontingen Cabang
        </label>
        <select
          value={selectedEventId}
          onChange={(e) => { setSelectedEventId(e.target.value); setNotice(null); }}
          className="w-full text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#5D4037]"
        >
          {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.nama} ({ev.tanggal})</option>)}
        </select>
      </div>

      {notice && (
        <div className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 ${notice.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-amber-50 border border-amber-200 text-amber-900'}`}>
          {notice.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
          <span>{notice.text}</span>
        </div>
      )}

      <AttendanceActionCard
        activeCard={activeCard}
        onCommit={() => commitAttendance(activeCard, selectedEvent, attendanceLogs, onRecordAttendance, setNotice)}
      />
      <AttendanceLogsList logs={attendanceLogs} />
    </div>
  );
};

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CardTapPayload } from './smartCardTypes';

interface AttendanceActionCardProps {
  activeCard: CardTapPayload | null;
  onCommit: () => void;
}

export const AttendanceActionCard: React.FC<AttendanceActionCardProps> = ({
  activeCard,
  onCommit,
}) => {
  if (!activeCard?.associatedMember) {
    return (
      <div className="p-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
        Tempelkan kartu RFID/NFC fisik pada sensor untuk mencatat absensi anggota.
      </div>
    );
  }

  const member = activeCard.associatedMember;

  return (
    <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-300 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-emerald-800 font-bold">Kartu Siap Absen:</span>
        <span className="font-mono font-bold text-emerald-950">{activeCard.uid}</span>
      </div>
      <p className="text-xs font-black text-stone-900">
        {member.name} ({member.nta})
      </p>
      <p className="text-[11px] text-stone-600">{member.gudep}</p>
      <button
        type="button"
        onClick={onCommit}
        className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
      >
        <ShieldCheck className="w-4 h-4" />
        <span>Catat Kehadiran pada Kegiatan Ini</span>
      </button>
    </div>
  );
};

import React from 'react';
import { CabangEvent } from '../../types/scout';
import { Calendar, Users, CheckCircle2, Ticket, Beaker } from 'lucide-react';

export const EventItemCard: React.FC<{
  evt: CabangEvent;
  onRegister: (evt: CabangEvent) => void;
}> = ({ evt, onRegister }) => {
  const totalQuota = evt.kuotaTotal || (evt.kuotaPerGudep * 10);
  const percentFilled = Math.min(100, Math.round((evt.terdaftar / totalQuota) * 100));
  const isSample = (evt as any).isSample ?? true;

  return (
    <div className="p-4 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            {isSample && (
              <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                <Beaker className="w-2.5 h-2.5 text-amber-700" />
                Data Contoh
              </span>
            )}
            {evt.kategoriGolongan.map((g: string) => (
              <span key={g} className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-stone-100 text-stone-800">{g}</span>
            ))}
            <span className="text-[10px] text-stone-400 font-mono">• Kontingen {evt.biaya}</span>
          </div>
          <h4 className="text-xs font-bold text-stone-900 leading-tight">{evt.nama}</h4>
        </div>
        <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 shrink-0">{evt.lokasi}</span>
      </div>
      <div className="flex items-center gap-4 text-[11px] text-stone-600">
        <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-stone-400" /><span>{evt.tanggal}</span></div>
        <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-stone-400" /><span>{evt.terdaftar}/{totalQuota} Kuota</span></div>
      </div>
      <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${percentFilled > 80 ? 'bg-rose-500' : 'bg-emerald-600'}`} style={{ width: `${percentFilled}%` }} />
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-stone-500">Pendaftaran ditutup: <strong>{evt.deadlineDaftar || evt.tanggal}</strong></span>
        {evt.isRegistered ? (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Terdaftar Kontingen</span></span>
        ) : (
          <button onClick={() => onRegister(evt)} className="px-3.5 py-1.5 rounded-xl bg-[#1E3A8A] hover:bg-[#1E40AF] text-white text-xs font-bold shadow-xs active:scale-95 flex items-center gap-1">
            <Ticket className="w-3.5 h-3.5" /><span>Daftar Kontingen</span>
          </button>
        )}
      </div>
    </div>
  );
};

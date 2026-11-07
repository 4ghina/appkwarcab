import React from 'react';
import { Calendar } from 'lucide-react';
import { OperationalEvent } from '../../types/config';

interface OperationalRulesTabProps {
  events: OperationalEvent[];
  onOpenNewEventModal(): void;
  onUpdateEvent(id: string, updates: Partial<OperationalEvent>): void;
}

export const OperationalRulesTab: React.FC<OperationalRulesTabProps> = ({
  events,
  onOpenNewEventModal,
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base font-bold text-stone-900">Aturan Operasional Kegiatan & Kuota Cabang</h3>
        <p className="text-xs text-stone-500">Kelola kuota peserta, batas usia, dan persyaratan kegiatan kepramukaan.</p>
      </div>
      <button
        onClick={onOpenNewEventModal}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold"
      >
        <Calendar className="w-3.5 h-3.5" /> Tambah Kegiatan
      </button>
    </div>

    <div className="space-y-3">
      {events.map((ev) => (
        <div key={ev.id} className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xs font-bold text-stone-900">{ev.nama}</h4>
              <p className="text-[11px] text-stone-500">{ev.tanggal} • {ev.lokasi}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              ev.status === 'Pendaftaran Dibuka'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {ev.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
            <span className="text-stone-500">Golongan: {ev.golonganPeserta?.join(', ')}</span>
            <span className="font-mono font-bold text-stone-800">
              Sisa Kuota: {ev.sisaKuota} / {ev.totalKuota}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

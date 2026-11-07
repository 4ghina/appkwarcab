import React from 'react';
import { School } from 'lucide-react';
import { GudepData } from '../../types/scout';
import { GudepMapCardBody } from './GudepMapCardBody';

interface GudepMapCardProps {
  gudep: GudepData;
  onSelect(): void;
}

export const GudepMapCard: React.FC<GudepMapCardProps> = ({ gudep, onSelect }) => {
  const totalAnggota = gudep.jumlahAnggota.siaga + gudep.jumlahAnggota.penggalang + gudep.jumlahAnggota.penegak + gudep.jumlahAnggota.pandega;
  const isAktif = gudep.status === 'Aktif';

  return (
    <div
      onClick={onSelect}
      className="p-4 bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:border-[#2E7D32] transition-all cursor-pointer space-y-3"
    >
      <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200 shrink-0">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 leading-tight">{gudep.pangkalan}</h4>
            <p className="text-[10px] text-stone-500 font-mono mt-0.5">Gudep Pa: {gudep.nomorPa} · Pi: {gudep.nomorPi}</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${
          isAktif ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
        }`}>
          {gudep.status}
        </span>
      </div>
      <GudepMapCardBody gudep={gudep} totalAnggota={totalAnggota} />
    </div>
  );
};

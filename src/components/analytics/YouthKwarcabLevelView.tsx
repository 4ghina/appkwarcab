import React from 'react';
import { Award } from 'lucide-react';
import { DEPOK_KWARRAN_STATS } from './analyticsData';

export const YouthKwarcabLevelView: React.FC = () => (
  <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="text-xs font-black text-stone-900 flex items-center gap-1.5">
        <Award className="w-3.5 h-3.5 text-amber-600" />
        Pencapaian Pramuka Garuda & SKU per Kwarran Kota Depok
      </h4>
      <span className="text-[10px] text-stone-500 font-mono">11 Kwarran</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
      {DEPOK_KWARRAN_STATS.map((k) => (
        <div key={k.name} className="p-2 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
          <div>
            <p className="font-bold text-[11px] text-stone-900">{k.name}</p>
            <p className="text-[9px] text-stone-500">{k.studentsCount.toLocaleString('id-ID')} Siswa · {k.gudepCount} Gudep</p>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono font-bold text-[10px]">
            {k.garudaCount} Garuda
          </span>
        </div>
      ))}
    </div>
  </div>
);

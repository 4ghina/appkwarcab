import React from 'react';
import { GraduationCap } from 'lucide-react';
import { PUSDIKLAT_GRADUATES } from './analyticsData';

export const PembinaKwarcabView: React.FC = () => (
  <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="text-xs font-black text-stone-900 flex items-center gap-1.5">
        <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
        Tren Lulusan Kursus Pusdiklatcab Wijayakusuma (Tahun ke Tahun)
      </h4>
      <span className="text-[10px] text-stone-500 font-mono">2023 - 2026</span>
    </div>

    <div className="grid grid-cols-4 gap-2 pt-1">
      {PUSDIKLAT_GRADUATES.map((gr) => (
        <div key={gr.year} className="p-2 bg-white rounded-xl border border-stone-200 text-center space-y-1">
          <span className="font-bold text-[11px] text-stone-800 block border-b border-stone-100 pb-1">
            {gr.year}
          </span>
          <div className="space-y-0.5 text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-stone-500">KMD:</span>
              <span className="font-mono font-bold text-emerald-700">{gr.kmd}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">KML:</span>
              <span className="font-mono font-bold text-amber-700">{gr.kml}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">KPD:</span>
              <span className="font-mono font-bold text-purple-700">{gr.kpd}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

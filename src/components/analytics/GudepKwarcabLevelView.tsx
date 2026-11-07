import React from 'react';
import { Building2 } from 'lucide-react';
import { DEPOK_KWARRAN_STATS } from './analyticsData';

export const GudepKwarcabLevelView: React.FC = () => (
  <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-2.5">
    <div className="flex items-center justify-between">
      <h4 className="text-xs font-black text-stone-900 flex items-center gap-1.5">
        <Building2 className="w-3.5 h-3.5 text-[#5D4037]" />
        Sebaran Jumlah Gudep per Kwarran di Kota Depok
      </h4>
      <span className="text-[10px] text-stone-500 font-mono">348 Gudep</span>
    </div>

    <div className="space-y-1.5 text-xs">
      {DEPOK_KWARRAN_STATS.map((kw) => {
        const pct = Math.round((kw.gudepCount / 48) * 100);
        return (
          <div key={kw.name} className="flex items-center gap-2">
            <span className="w-24 text-[10px] font-semibold text-stone-700 truncate">{kw.name}</span>
            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-600 to-[#5D4037]" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-14 text-right font-mono font-bold text-[10px] text-stone-800">
              {kw.gudepCount} Gudep
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

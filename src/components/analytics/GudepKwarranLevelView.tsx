import React from 'react';
import { ChevronRight } from 'lucide-react';

interface GudepKwarranLevelViewProps {
  kwarranData: { name: string; gudepCount: number };
  onOpenGudepMap?: () => void;
}

export const GudepKwarranLevelView: React.FC<GudepKwarranLevelViewProps> = ({ kwarranData, onOpenGudepMap }) => (
  <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-2.5">
    <h4 className="text-xs font-black text-stone-900 flex items-center justify-between">
      <span>Keaktifan Gudep (Kwarran {kwarranData.name})</span>
      <span className="text-[10px] text-stone-500 font-mono">Total {kwarranData.gudepCount} Pangkalan</span>
    </h4>
    <div className="space-y-2 text-xs">
      <div className="space-y-1">
        <div className="flex justify-between text-[11px]">
          <span className="font-semibold text-emerald-900">Aktif & Tertib Registrasi</span>
          <span className="font-mono font-bold text-stone-700">34 Gudep (82%)</span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: '82%' }} />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-[11px]">
          <span className="font-semibold text-amber-900">Kurang Aktif / Pembina Mutasi</span>
          <span className="font-mono font-bold text-stone-700">5 Gudep (12%)</span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500" style={{ width: '12%' }} />
        </div>
      </div>
    </div>

    {onOpenGudepMap && (
      <button
        type="button"
        onClick={onOpenGudepMap}
        className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#5D4037] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>Buka Peta Gudep Interaktif</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    )}
  </div>
);

import React from 'react';
import { BinaanStudent } from '../../types/scout';
import { ChevronRight } from 'lucide-react';

interface YouthPembinaLevelViewProps {
  binaanStudents: BinaanStudent[];
  overallSkuPercent: number;
  onOpenPembinaan?: () => void;
}

export const YouthPembinaLevelView: React.FC<YouthPembinaLevelViewProps> = ({
  binaanStudents,
  overallSkuPercent,
  onOpenPembinaan,
}) => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200">
        <span className="text-[10px] text-stone-500 font-medium block">Total Binaan</span>
        <div className="flex items-baseline gap-1 mt-0.5"><span className="text-xl font-black font-mono text-stone-900">{binaanStudents.length}</span><span className="text-[10px] text-stone-500">Anggota</span></div>
        <span className="text-[9px] text-emerald-700 font-semibold mt-1 block">Aktif Latihan</span>
      </div>
      <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
        <span className="text-[10px] text-emerald-800 font-medium block">Pencapaian SKU</span>
        <div className="flex items-baseline gap-1 mt-0.5"><span className="text-xl font-black font-mono text-emerald-950">{overallSkuPercent}%</span><span className="text-[10px] text-emerald-800">Tuntas</span></div>
        <span className="text-[9px] text-emerald-700 font-semibold mt-1 block">Rata-rata Regu</span>
      </div>
      <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
        <span className="text-[10px] text-amber-800 font-medium block">TKK Dikeluarkan</span>
        <div className="flex items-baseline gap-1 mt-0.5"><span className="text-xl font-black font-mono text-amber-950">{binaanStudents.reduce((acc, s) => acc + (s.tkkCount || 0), 0)}</span><span className="text-[10px] text-amber-800">Lencana</span></div>
        <span className="text-[9px] text-amber-700 font-semibold mt-1 block">Purwa & Madya</span>
      </div>
      <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200">
        <span className="text-[10px] text-purple-800 font-medium block">Siap Kenaikan Tingkat</span>
        <div className="flex items-baseline gap-1 mt-0.5"><span className="text-xl font-black font-mono text-purple-950">{binaanStudents.filter((s) => s.advancementStatus === 'siap_diverifikasi').length}</span><span className="text-[10px] text-purple-800">Kandidat</span></div>
        <span className="text-[9px] text-purple-700 font-semibold mt-1 block">100% SKU terpenuhi</span>
      </div>
    </div>

    <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-2">
      <h4 className="text-xs font-black text-stone-900 flex items-center justify-between">
        <span>Grafik Kemajuan SKU Per Binaan</span>
        <span className="text-[10px] text-stone-500 font-mono">Standar Bantara</span>
      </h4>
      <div className="space-y-1.5">
        {binaanStudents.map((st) => {
          const pct = Math.round((st.skuPassed / (st.skuTotal || 23)) * 100);
          return (
            <div key={st.id} className="p-2 bg-white rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 text-[11px] truncate">{st.name}</span>
                <span className="font-mono font-bold text-[10px] text-stone-700">{st.skuPassed}/{st.skuTotal} ({pct}%)</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${pct >= 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      {onOpenPembinaan && (
        <button type="button" onClick={onOpenPembinaan} className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#5D4037] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
          <span>Buka Lembar Pengujian SKU & SKK</span><ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  </div>
);

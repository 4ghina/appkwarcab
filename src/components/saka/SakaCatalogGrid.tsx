import React from 'react';
import { SAKA_LIST } from '../../data/mockData';
import { Shield, ChevronRight } from 'lucide-react';

export const SakaCatalogGrid: React.FC<{
  onSelectSaka: (s: typeof SAKA_LIST[0]) => void;
}> = ({ onSelectSaka }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between px-1">
      <span className="text-xs font-black uppercase tracking-wider text-stone-700">Daftar Satuan Karya di Kota Depok</span>
      <span className="text-[10px] text-stone-400 font-bold">{SAKA_LIST.length} Saka Aktif</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {SAKA_LIST.map((saka) => (
        <div
          key={saka.id}
          onClick={() => onSelectSaka(saka)}
          className="p-3.5 rounded-2xl bg-white border border-stone-200/80 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-stone-900 group-hover:text-blue-900 truncate">{saka.nama}</h4>
              <p className="text-[10px] text-stone-500 truncate">{saka.mitra}</p>
              <span className="text-[9px] font-semibold text-blue-700">{saka.krida.length} Krida Kejuruan</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>
      ))}
    </div>
  </div>
);

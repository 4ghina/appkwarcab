import React from 'react';
import { School, ChevronRight } from 'lucide-react';
import { GudepData } from '../../../types/scout';

export const KwarranGudepList: React.FC<{
  kwarranName: string;
  matchingGudep: GudepData[];
  onSelectGudep: (g: GudepData) => void;
}> = ({ kwarranName, matchingGudep, onSelectGudep }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-base font-black text-stone-900">Daftar Gugus Depan Terakreditasi di Kwarran {kwarranName}</h2>
      <span className="text-xs font-semibold text-stone-500">{matchingGudep.length} Pangkalan</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {matchingGudep.map((gudep) => (
        <div
          key={gudep.id}
          onClick={() => onSelectGudep(gudep)}
          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#5D4037] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <School className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-800">{gudep.pangkalan}</h3>
              <p className="text-[10px] text-stone-500 font-mono">Gudep: {gudep.nomorPa} / {gudep.nomorPi}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 transition-colors shrink-0" />
        </div>
      ))}
    </div>
  </div>
);

import React from 'react';
import { MapPin } from 'lucide-react';
import { GudepData } from '../../types/scout';

interface GudepInteractiveMapProps {
  filteredGudep: GudepData[];
  onSelectGudep: (g: GudepData) => void;
}

export const GudepInteractiveMap: React.FC<GudepInteractiveMapProps> = ({
  filteredGudep,
  onSelectGudep
}) => {
  return (
    <div className="p-4 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-stone-900 uppercase">Peta Sebaran Gugus Depan Kota Depok</h4>
        <span className="text-[10px] text-stone-500 font-mono">{filteredGudep.length} Titik</span>
      </div>
      <div className="w-full h-44 bg-gradient-to-br from-emerald-50 via-teal-50 to-stone-100 rounded-2xl border border-emerald-200/80 relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="flex flex-wrap gap-2 justify-center max-w-sm z-10">
          {filteredGudep.slice(0, 8).map((g) => (
            <button
              key={g.id}
              onClick={() => onSelectGudep(g)}
              className="px-2.5 py-1 rounded-xl bg-white shadow-xs border border-emerald-300 text-[10px] font-bold text-stone-800 flex items-center gap-1 hover:border-emerald-600 transition-all"
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span className="truncate max-w-[100px]">{g.pangkalan.split(' ')[0]} {g.pangkalan.split(' ')[1] || ''}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

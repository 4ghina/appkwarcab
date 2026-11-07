import React from 'react';
import { MapGudepEntity } from '../mapTypes';
import { School, X } from 'lucide-react';

interface GudepDrawerHeaderProps {
  gudep: MapGudepEntity;
  onClose: () => void;
}

export const GudepDrawerHeader: React.FC<GudepDrawerHeaderProps> = ({ gudep, onClose }) => {
  return (
    <div className="flex items-start justify-between border-b border-stone-100 pb-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-black">
          <School className="w-6 h-6 text-amber-800" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
              {gudep.jenjang}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold text-[10px]">
              Akreditasi {gudep.akreditasi}
            </span>
          </div>
          <h3 className="text-base font-black text-stone-900 leading-tight mt-0.5">{gudep.pangkalan}</h3>
          <p className="text-xs text-stone-500 font-medium">Gudep Pa {gudep.nomorPa} • Pi {gudep.nomorPi} • {gudep.kwarranName}</p>
        </div>
      </div>
      <button onClick={onClose} className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

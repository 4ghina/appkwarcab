import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';

interface MapHeaderBannerProps {
  kwarcabName: string;
  onClose?: () => void;
}

export const MapHeaderBanner: React.FC<MapHeaderBannerProps> = ({ kwarcabName, onClose }) => {
  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#5D4037] via-[#4E342E] to-[#2E7D32] text-white shadow-md flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl bg-amber-400 text-stone-950 font-black">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PETA DEMOGRAFI BERTINGKAT REALTIME</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">{kwarcabName}</h2>
          <p className="text-xs text-stone-200">Kwarcab (Kab/Kota) → Kwarran (Kecamatan) → Gugus Depan (Sekolah)</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold">
          Tutup
        </button>
      )}
    </div>
  );
};

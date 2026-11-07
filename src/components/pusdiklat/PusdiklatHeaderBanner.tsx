import React from 'react';
import { GraduationCap, X } from 'lucide-react';

export const PusdiklatHeaderBanner: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className="p-4 rounded-3xl bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#271612] text-white shadow-lg relative overflow-hidden mb-4">
    <div className="absolute right-[-10px] top-[-10px] opacity-15"><GraduationCap className="w-36 h-36" /></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between pb-2 border-b border-white/20">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-400 text-stone-950 font-black"><GraduationCap className="w-4 h-4" /></span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">Pusdiklatcab Chandrabratha</h3>
            <p className="text-sm font-extrabold text-white">Pusat Pendidikan & Pelatihan Kepramukaan</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-white/80 leading-relaxed">
        Pengelolaan jenjang kualifikasi Pembina (KMD, KML) dan Pelatih (KPD, KPL), masa bimbingan Narakarya, serta penerbitan Surat Hak Bina (SHB).
      </p>
    </div>
  </div>
);

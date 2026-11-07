import React from 'react';
import { School } from 'lucide-react';
import { GudepData } from '../../../types/scout';

export const GudepHeroCard: React.FC<{ gudep: GudepData }> = ({ gudep }) => {
  const totalAnggota = Object.values(gudep.jumlahAnggota || {}).reduce((a, b) => a + b, 0);
  return (
    <div className="p-6 bg-gradient-to-br from-[#2E7D32] via-[#1B5E20] to-[#0D3813] text-white rounded-3xl shadow-lg relative overflow-hidden space-y-4">
      <div className="absolute right-[-10px] top-[-10px] opacity-15"><School className="w-44 h-44" /></div>
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950">Gugus Depan Terdaftar</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">Kwarran {gudep.kwarran}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">{gudep.pangkalan}</h1>
        <p className="text-xs sm:text-sm text-emerald-100 font-mono">Nomor Gudep: Putra {gudep.nomorPa} • Putri {gudep.nomorPi}</p>
      </div>
      <div className="pt-3 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div><span className="text-white/60 block text-[10px]">Akreditasi</span><strong className="text-base font-bold text-amber-300">Tingkat {gudep.akreditasi || 'A'}</strong></div>
        <div><span className="text-white/60 block text-[10px]">Peserta Didik Aktif</span><strong className="text-base font-bold text-white">{totalAnggota} Orang</strong></div>
        <div><span className="text-white/60 block text-[10px]">Status Operasional</span><strong className="text-base font-bold text-emerald-300">{gudep.status}</strong></div>
        <div><span className="text-white/60 block text-[10px]">Her-Registrasi 2026</span><strong className="text-base font-bold text-white">Terverifikasi</strong></div>
      </div>
    </div>
  );
};

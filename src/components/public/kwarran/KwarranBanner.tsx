import React from 'react';
import { Building2 } from 'lucide-react';

export const KwarranBanner: React.FC<{
  kwarranName: string;
  totalGudep: number;
  totalStudents: number;
}> = ({ kwarranName, totalGudep, totalStudents }) => (
  <div className="p-6 bg-gradient-to-br from-[#5D4037] via-[#4E342E] to-[#271612] text-white rounded-3xl shadow-lg relative overflow-hidden space-y-3">
    <div className="absolute right-[-10px] top-[-10px] opacity-15"><Building2 className="w-48 h-48" /></div>
    <div className="relative z-10 space-y-2">
      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950 inline-block">Kwartir Ranting Wilayah</span>
      <h1 className="text-2xl sm:text-3xl font-black">Kwartir Ranting {kwarranName}</h1>
      <p className="text-xs sm:text-sm text-amber-100 max-w-xl">Pusat koordinasi dan pembinaan Gugus Depan pangkalan sekolah serta komunitas di wilayah {kwarranName}.</p>
    </div>
    <div className="pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
      <div><span className="text-white/60 block text-[10px]">Total Gudep</span><strong className="text-base font-bold text-amber-300">{totalGudep} Pangkalan</strong></div>
      <div><span className="text-white/60 block text-[10px]">Total Anggota</span><strong className="text-base font-bold text-amber-300">{totalStudents} Anggota</strong></div>
      <div><span className="text-white/60 block text-[10px]">Status Wilayah</span><strong className="text-base font-bold text-emerald-400">Aktif Beroperasi</strong></div>
      <div><span className="text-white/60 block text-[10px]">Induk Organisasi</span><strong className="text-base font-bold text-white">Kwarcab Kota Depok</strong></div>
    </div>
  </div>
);

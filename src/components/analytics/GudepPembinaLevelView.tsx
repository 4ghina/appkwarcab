import React from 'react';
import { GudepData } from '../../types/scout';
import { GudepEightStandardsCard } from './GudepEightStandardsCard';

interface GudepPembinaLevelViewProps {
  myGudep: GudepData;
}

export const GudepPembinaLevelView: React.FC<GudepPembinaLevelViewProps> = ({ myGudep }) => {
  const totalStudents = Object.values(myGudep.jumlahAnggota || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
          <span className="text-[10px] text-emerald-800 font-medium block">Nomor Gudep</span>
          <div className="flex items-baseline gap-1 mt-0.5"><span className="text-sm font-black font-mono text-emerald-950">{myGudep.nomorPa} - {myGudep.nomorPi}</span></div>
          <span className="text-[9px] text-emerald-700 font-semibold mt-1 block">Status: {myGudep.status}</span>
        </div>
        <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200">
          <span className="text-[10px] text-stone-500 font-medium block">Akreditasi Gudep</span>
          <div className="flex items-baseline gap-1 mt-0.5"><span className="text-xl font-black font-mono text-stone-900">Tingkat {myGudep.akreditasi}</span></div>
          <span className="text-[9px] text-stone-500 mt-1 block">8 Standar Kwarnas</span>
        </div>
        <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
          <span className="text-[10px] text-amber-800 font-medium block">Peserta Didik</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black font-mono text-amber-950">{totalStudents}</span>
            <span className="text-[10px] text-amber-800">Siswa</span>
          </div>
          <span className="text-[9px] text-amber-700 font-semibold mt-1 block">Penegak Pa & Pi</span>
        </div>
        <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200">
          <span className="text-[10px] text-purple-800 font-medium block">Her-Registrasi</span>
          <div className="flex items-baseline gap-1 mt-0.5"><span className="text-sm font-black text-purple-950">Tertib (2026)</span></div>
          <span className="text-[9px] text-purple-700 font-semibold mt-1 block">{myGudep.terakhirHerRegistrasi}</span>
        </div>
      </div>
      <GudepEightStandardsCard />
    </div>
  );
};

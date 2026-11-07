import React from 'react';
import { GudepData } from '../../types/scout';

interface GudepDetailModalBodyProps {
  gudep: GudepData;
}

export const GudepDetailModalBody: React.FC<GudepDetailModalBodyProps> = ({ gudep }) => (
  <div className="my-4 space-y-3 text-xs text-stone-700">
    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
      <p><strong>Nomor Gudep:</strong> Pa {gudep.nomorPa} / Pi {gudep.nomorPi}</p>
      <p><strong>Kwartir Ranting:</strong> {gudep.kwarran}</p>
      <p><strong>Alamat:</strong> {gudep.alamat}</p>
      <p><strong>Her-Registrasi Terakhir:</strong> {gudep.terakhirHerRegistrasi}</p>
    </div>
    <div>
      <p className="text-[11px] font-bold text-stone-900 mb-1.5">Distribusi Potensi Anggota:</p>
      <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
        <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
          <span className="block font-bold text-emerald-800">{gudep.jumlahAnggota.siaga}</span><span className="text-emerald-700 text-[9px]">Siaga</span>
        </div>
        <div className="p-2 bg-rose-50 rounded-xl border border-rose-200">
          <span className="block font-bold text-rose-800">{gudep.jumlahAnggota.penggalang}</span><span className="text-rose-700 text-[9px]">Penggalang</span>
        </div>
        <div className="p-2 bg-amber-50 rounded-xl border border-amber-200">
          <span className="block font-bold text-amber-800">{gudep.jumlahAnggota.penegak}</span><span className="text-amber-700 text-[9px]">Penegak</span>
        </div>
        <div className="p-2 bg-stone-100 rounded-xl border border-stone-200">
          <span className="block font-bold text-stone-800">{gudep.jumlahAnggota.pandega}</span><span className="text-stone-700 text-[9px]">Pandega</span>
        </div>
      </div>
    </div>
    <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
      <p className="text-[11px] font-bold text-emerald-950">Pembina Gugus Depan:</p>
      <p className="font-semibold text-stone-900 mt-0.5">{gudep.pembina}</p>
      <p className="text-[11px] text-stone-600 mt-0.5 font-mono">No. WA: {gudep.kontakWa}</p>
    </div>
  </div>
);

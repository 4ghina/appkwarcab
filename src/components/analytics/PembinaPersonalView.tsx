import React from 'react';
import { CheckCircle2, Clock, Shield } from 'lucide-react';

export const PembinaPersonalView: React.FC = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
        <span className="text-[10px] text-emerald-800 font-medium block">Jenjang Kursus Mahir</span>
        <div className="flex items-baseline gap-1 mt-0.5"><span className="text-base font-black text-emerald-950">KML (Lanjutan)</span></div>
        <span className="text-[9px] text-emerald-700 font-semibold mt-1 block">Tahun 2022</span>
      </div>
      <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200">
        <span className="text-[10px] text-stone-500 font-medium block">Surat Hak Bina (SHB)</span>
        <div className="flex items-baseline gap-1 mt-0.5"><span className="text-base font-black text-stone-900">AKTIF</span></div>
        <span className="text-[9px] text-stone-500 mt-1 block">s.d. Agu 2027</span>
      </div>
      <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
        <span className="text-[10px] text-amber-800 font-medium block">Pengujian Disahkan</span>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-xl font-black font-mono text-amber-950">48</span>
          <span className="text-[10px] text-amber-800">Butir</span>
        </div>
        <span className="text-[9px] text-amber-700 font-semibold mt-1 block">Semester Ini</span>
      </div>
      <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200">
        <span className="text-[10px] text-purple-800 font-medium block">Jam Terbang Membina</span>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-xl font-black font-mono text-purple-950">140</span>
          <span className="text-[10px] text-purple-800">Jam</span>
        </div>
        <span className="text-[9px] text-purple-700 font-semibold mt-1 block">Latihan & Kemah</span>
      </div>
    </div>
    <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-2">
      <h4 className="text-xs font-black text-stone-900 flex items-center justify-between">
        <span>Kualifikasi Kursus Pusdiklatcab</span>
        <span className="text-[10px] text-stone-500 font-mono">Pusdiklatcab Wijayakusuma</span>
      </h4>
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950">
          <CheckCircle2 className="w-4 h-4 mx-auto mb-0.5 text-emerald-700" /><span className="font-mono font-bold block text-xs">KMD</span>
          <span className="text-[8px] text-emerald-800 block">Lulus 2018</span>
        </div>
        <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950">
          <CheckCircle2 className="w-4 h-4 mx-auto mb-0.5 text-emerald-700" /><span className="font-mono font-bold block text-xs">KML</span>
          <span className="text-[8px] text-emerald-800 block">Lulus 2022</span>
        </div>
        <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
          <Clock className="w-4 h-4 mx-auto mb-0.5 text-amber-600" /><span className="font-mono font-bold block text-xs">KPD</span>
          <span className="text-[8px] text-amber-800 block">Persiapan</span>
        </div>
        <div className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-400">
          <Shield className="w-4 h-4 mx-auto mb-0.5 text-stone-400" /><span className="font-mono font-bold block text-xs">KPL</span>
          <span className="text-[8px] text-stone-500 block">Lanjutan</span>
        </div>
      </div>
    </div>
  </div>
);

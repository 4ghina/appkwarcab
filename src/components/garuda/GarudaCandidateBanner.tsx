import React from 'react';
import { Award, X } from 'lucide-react';
import { GarudaApplication } from '../../types/scout';

export const GarudaCandidateBanner: React.FC<{
  currentApp: GarudaApplication;
  onClose?: () => void;
}> = ({ currentApp, onClose }) => (
  <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-600 via-amber-700 to-yellow-800 text-white shadow-xl relative overflow-hidden">
    <div className="flex items-center justify-between pb-2 border-b border-white/20">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-xl bg-white text-amber-800 font-black shadow-sm">
          <Award className="w-5 h-5 fill-amber-700" />
        </span>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200">Seleksi E-Garuda Cabang</h3>
          <p className="text-sm font-extrabold text-white">Tingkatan Tertinggi Gerakan Pramuka</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="mt-3 bg-black/20 p-3 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-amber-200">Kandidat Terdaftar:</p>
          <p className="text-sm font-extrabold">{currentApp.applicantName}</p>
          <p className="text-[10px] text-white/80">{currentApp.gudep}</p>
        </div>
        <div className="text-right">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-white text-stone-900 shadow-sm">{currentApp.status}</span>
          <p className="text-[9px] text-amber-200 mt-1">Diajukan: {currentApp.tanggalPengajuan}</p>
        </div>
      </div>
    </div>
  </div>
);

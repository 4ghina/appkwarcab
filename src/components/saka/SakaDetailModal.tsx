import React from 'react';
import { SAKA_LIST } from '../../data/mockData';
import { Shield, X, Award, Building2 } from 'lucide-react';

export const SakaDetailModal: React.FC<{
  saka: typeof SAKA_LIST[0] | null;
  onClose: () => void;
  onJoinKrida: (k: string) => void;
}> = ({ saka, onClose, onJoinKrida }) => {
  if (!saka) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold"><Shield className="w-5 h-5" /></div>
            <div>
              <h3 className="text-sm font-extrabold text-stone-900">{saka.nama}</h3>
              <p className="text-[11px] text-stone-500">{saka.mitra}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500"><X className="w-4 h-4" /></button>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">{saka.deskripsi}</p>
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-2 text-xs">
          <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
          <div><span className="text-[10px] text-stone-400 block font-bold">Pangkalan / Sanggar Bakti:</span><span className="font-semibold text-stone-800">{saka.mitra}</span></div>
        </div>
        <div>
          <span className="text-[11px] font-bold text-stone-800 block mb-2">Pilihan Krida Spesialisasi:</span>
          <div className="space-y-1.5">
            {saka.krida.map((krida: string) => (
              <div key={krida} className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-blue-700" /><span className="font-bold text-blue-950">{krida}</span></div>
                <button onClick={() => onJoinKrida(krida)} className="px-3 py-1 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-[10px] shadow-xs">Daftar Minat</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

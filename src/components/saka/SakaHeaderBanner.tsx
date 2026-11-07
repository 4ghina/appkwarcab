import React from 'react';
import { Shield, X, Sparkles } from 'lucide-react';

export const SakaHeaderBanner: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#0F172A] text-white shadow-lg relative overflow-hidden mb-4">
    <div className="absolute right-[-10px] bottom-[-20px] opacity-15"><Shield className="w-36 h-36" /></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between pb-2 border-b border-white/20">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-400 text-stone-950 font-black"><Shield className="w-4 h-4" /></span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200">Satuan Karya (SAKA) & KRIDA</h3>
            <p className="text-sm font-extrabold text-white">Spesialisasi Kejuruan Penegak & Pandega</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="mt-3 p-3 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-xs text-xs">
        <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-0.5">
          <Sparkles className="w-3.5 h-3.5" /><span>Sistem Keanggotaan Ganda (Dual-Membership):</span>
        </div>
        <p className="text-white/80 leading-relaxed text-[11px]">
          Setiap Pramuka Penegak & Pandega tetap berpangkalan di Gudep asal dan dapat bergabung dalam 1 Satuan Karya pilihan.
        </p>
      </div>
    </div>
  </div>
);

import React from 'react';
import { Phone, X } from 'lucide-react';
import { GudepData } from '../../types/scout';
import { GudepDetailModalBody } from './GudepDetailModalBody';

interface GudepDetailModalProps {
  gudep: GudepData;
  onClose(): void;
}

export const GudepDetailModal: React.FC<GudepDetailModalProps> = ({ gudep, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto">
      <div className="flex items-start justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E7D32]">Profil Gugus Depan</span>
          <h4 className="text-sm font-extrabold text-stone-900 leading-tight">{gudep.pangkalan}</h4>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
          <X className="w-4 h-4" />
        </button>
      </div>
      <GudepDetailModalBody gudep={gudep} />
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`https://wa.me/${gudep.kontakWa}`}
          target="_blank"
          rel="noreferrer"
          className="py-2.5 px-3 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-800"
        >
          <Phone className="w-4 h-4" />
          <span>Hubungi WA</span>
        </a>
        <button onClick={onClose} className="py-2.5 px-3 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs hover:bg-stone-200">
          Tutup
        </button>
      </div>
    </div>
  </div>
);

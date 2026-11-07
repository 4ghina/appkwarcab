import React from 'react';
import { Ticket, X } from 'lucide-react';

export const EventsHeaderBanner: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#0F172A] text-white shadow-lg relative overflow-hidden mb-4">
    <div className="absolute right-[-10px] top-[-10px] opacity-15"><Ticket className="w-36 h-36" /></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between pb-2 border-b border-white/20">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-400 text-stone-950 font-black"><Ticket className="w-4 h-4" /></span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200">Event & Kontingen Cabang</h3>
            <p className="text-sm font-extrabold text-white">Pendaftaran Kegiatan Paperless Bebas Berkas Fisik</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
        )}
      </div>
      <p className="mt-3 text-xs text-white/80 leading-relaxed">
        Pemeriksaan otomatis kualifikasi SKU, keaktifan KTA, serta kuota kontingen tanpa penumpukan formulir manual.
      </p>
    </div>
  </div>
);

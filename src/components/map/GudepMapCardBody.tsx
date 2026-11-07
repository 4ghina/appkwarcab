import React from 'react';
import { Users, Phone } from 'lucide-react';
import { GudepData } from '../../types/scout';

interface GudepMapCardBodyProps {
  gudep: GudepData;
  totalAnggota: number;
}

export const GudepMapCardBody: React.FC<GudepMapCardBodyProps> = ({ gudep, totalAnggota }) => (
  <>
    <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
      <div>
        <span className="text-[10px] text-stone-400 block">Kwartir Ranting:</span>
        <strong className="text-stone-800">{gudep.kwarran}</strong>
      </div>
      <div>
        <span className="text-[10px] text-stone-400 block">Akreditasi:</span>
        <strong className="text-emerald-700">Predikat {gudep.akreditasi}</strong>
      </div>
      <div className="col-span-2">
        <span className="text-[10px] text-stone-400 block">Pembina Satuan:</span>
        <span className="text-stone-800 font-medium">{gudep.pembina}</span>
      </div>
    </div>
    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
      <div className="flex items-center gap-1.5 text-stone-500">
        <Users className="w-3.5 h-3.5" />
        <span>Total <strong>{totalAnggota}</strong> Anggota</span>
      </div>
      <a
        href={`https://wa.me/${gudep.kontakWa}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 transition-colors"
      >
        <Phone className="w-3 h-3" />
        <span>WhatsApp</span>
      </a>
    </div>
  </>
);

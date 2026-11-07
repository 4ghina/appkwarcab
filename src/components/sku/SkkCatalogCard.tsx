import React from 'react';
import { Send } from 'lucide-react';
import { SKKRequirement } from '../../types/scout';

interface SkkCatalogCardProps {
  skk: SKKRequirement;
  onSubmittingItem(item: any): void;
}

export const SkkCatalogCard: React.FC<SkkCatalogCardProps> = ({ skk, onSubmittingItem }) => (
  <div className="p-3.5 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
    <div className="flex items-center justify-between">
      <div>
        <span className="text-[9px] font-extrabold uppercase text-stone-500 block">Bidang: {skk.bidang}</span>
        <h4 className="text-xs font-bold text-stone-900">{skk.nama} (Tingkat {skk.tingkat})</h4>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
        skk.status === 'disahkan' ? 'bg-emerald-100 text-emerald-800' :
        skk.status === 'diajukan' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-700'
      }`}>
        {skk.status === 'disahkan' ? 'Telah Tuntas' : skk.status === 'diajukan' ? 'Menunggu Pemeriksaan' : 'Tersedia Diambil'}
      </span>
    </div>

    <div className="space-y-1">
      <p className="text-[10px] font-bold text-stone-600 uppercase">Butir Syarat:</p>
      <ul className="space-y-0.5 pl-3 list-disc text-[11px] text-stone-700">
        {skk.syaratPoin.map((pt, idx) => <li key={idx}>{pt}</li>)}
      </ul>
    </div>

    {skk.status !== 'disahkan' && skk.status !== 'diajukan' && (
      <button onClick={() => onSubmittingItem(skk)} className="w-full py-2 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs">
        <Send className="w-3.5 h-3.5" /><span>Ajukan Bukti Pemenuhan SKK ke Pembina</span>
      </button>
    )}
  </div>
);

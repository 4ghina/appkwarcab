import React from 'react';
import { School, ChevronRight } from 'lucide-react';
import { ChildWardProfile } from '../../types/scout';

export const WardItemCard: React.FC<{
  ward: ChildWardProfile;
  isActive: boolean;
  onSelect: () => void;
}> = ({ ward, isActive, onSelect }) => {
  const passed = ward.skuProgress?.passed || 0;
  const total = ward.skuProgress?.total || 8;
  return (
    <div
      onClick={onSelect}
      className={`p-4 bg-white rounded-3xl border transition-all cursor-pointer space-y-3 ${
        isActive ? 'border-rose-400 ring-2 ring-rose-200' : 'border-stone-200 hover:border-rose-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={ward.avatar} alt={ward.name} className="w-12 h-12 rounded-2xl object-cover border border-stone-200" />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-stone-900">{ward.name}</h4>
              <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-rose-100 text-rose-900">{ward.golongan}</span>
            </div>
            <p className="text-[10px] text-stone-500">Relasi: {ward.relation} • NTA: {ward.nta || ward.provisionalNta}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
      </div>
      <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-2xl border border-stone-100">
        <p className="flex items-center gap-1.5 text-[11px]"><School className="w-3.5 h-3.5 text-stone-400 shrink-0" /><span>Pangkalan: <strong>{ward.gudepName}</strong></span></p>
        <p className="text-[10px] text-stone-500 pl-5">Kwarran: {ward.kwarran} · Gudep: {ward.gudepNomor}</p>
      </div>
      <div className="pt-1">
        <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1">
          <span>Progres Syarat Kecakapan (SKU):</span>
          <span className="font-bold text-emerald-800">{passed} / {total} Butir</span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(passed / total) * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

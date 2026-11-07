import React from 'react';
import { Compass } from 'lucide-react';
import { SKKRequirement } from '../../types/scout';
import { SkkCatalogCard } from './SkkCatalogCard';

interface SkkCatalogTabProps {
  skkCatalog: SKKRequirement[];
  onSubmittingItem(item: any): void;
}

export const SkkCatalogTab: React.FC<SkkCatalogTabProps> = ({ skkCatalog, onSubmittingItem }) => (
  <div className="space-y-3">
    <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-stone-800">
      <h4 className="font-bold text-amber-950 flex items-center gap-1">
        <Compass className="w-3.5 h-3.5 text-amber-800" />
        Persyaratan Kecakapan Khusus (SKK)
      </h4>
      <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
        SKK adalah butir-butir syarat kecakapan yang harus dipenuhi peserta didik sebelum berhak menerima lencana TKK dari Pembina.
      </p>
    </div>

    <div className="space-y-2.5">
      {skkCatalog.map((skk) => (
        <SkkCatalogCard key={skk.id} skk={skk} onSubmittingItem={onSubmittingItem} />
      ))}
    </div>
  </div>
);

import React, { useState } from 'react';
import { TextCatalogHeader } from './TextCatalogHeader';

interface TextCatalogTabProps {
  draftTexts: Record<string, string>;
  setDraftTexts: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  textSearch: string;
  setTextSearch(s: string): void;
  onSave(): void;
  onPublish?(): void;
  onReset(): void;
  isSaving: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'Semua Kunci' },
  { id: 'nav.', label: 'Menu Navigasi' },
  { id: 'cta.', label: 'Tombol Aksi' },
  { id: 'status.', label: 'Status Anggota' },
  { id: 'infographic.', label: 'Infografik' },
  { id: 'banner.', label: 'Banner & Teks' },
];

const CategoryButtonsBar: React.FC<{ selected: string; onSelect(c: string): void }> = ({ selected, onSelect }) => (
  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
    {CATEGORIES.map(c => (
      <button
        key={c.id}
        type="button"
        onClick={() => onSelect(c.id)}
        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
          selected === c.id ? 'bg-[#5D4037] text-white shadow-xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
        }`}
      >
        {c.label}
      </button>
    ))}
  </div>
);

const CatalogItemsList: React.FC<{
  keys: string[];
  draftTexts: Record<string, string>;
  onChange(k: string, v: string): void;
}> = ({ keys, draftTexts, onChange }) => {
  if (keys.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl">
        Tidak ada kunci teks yang cocok dengan pencarian atau filter.
      </div>
    );
  }
  return (
    <div className="space-y-2.5">
      {keys.map((key) => (
        <div key={key} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold text-stone-600">{key}</span>
            {key.startsWith('status.') && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                Label Tampilan Status
              </span>
            )}
          </div>
          <input
            type="text"
            value={draftTexts[key] || ''}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#5D4037]"
          />
        </div>
      ))}
    </div>
  );
};

export const TextCatalogTab: React.FC<TextCatalogTabProps> = (p) => {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredKeys = Object.keys(p.draftTexts).filter(key => {
    const matchesCat = selectedCat === 'all' || key.startsWith(selectedCat);
    const matchesSearch =
      key.toLowerCase().includes(p.textSearch.toLowerCase()) ||
      p.draftTexts[key]?.toLowerCase().includes(p.textSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <TextCatalogHeader
        textSearch={p.textSearch} setTextSearch={p.setTextSearch}
        onSave={p.onSave} onPublish={p.onPublish} onReset={p.onReset} isSaving={p.isSaving}
      />
      <CategoryButtonsBar selected={selectedCat} onSelect={setSelectedCat} />
      <CatalogItemsList
        keys={filteredKeys} draftTexts={p.draftTexts}
        onChange={(k, v) => p.setDraftTexts(prev => ({ ...prev, [k]: v }))}
      />
    </div>
  );
};

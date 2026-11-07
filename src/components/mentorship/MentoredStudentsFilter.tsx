import React from 'react';
import { Search } from 'lucide-react';

export const CATEGORIES = ['Semua', 'Siaga', 'Penggalang', 'Penegak', 'Pandega'] as const;

interface MentoredStudentsFilterProps {
  searchQuery: string;
  onSearchChange(q: string): void;
  categoryFilter: string;
  onCategoryFilterChange(cat: string): void;
}

export const MentoredStudentsFilter: React.FC<MentoredStudentsFilterProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
}) => (
  <div className="flex items-center gap-2">
    <div className="relative flex-1">
      <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cari peserta didik binaan (nama, NTA, tingkat)..."
        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-[#5D4037]"
      />
    </div>
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onCategoryFilterChange(cat)}
          className={`px-2.5 py-1.5 text-[10px] font-bold rounded-xl whitespace-nowrap ${
            categoryFilter === cat ? 'bg-[#5D4037] text-white' : 'bg-white border text-stone-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

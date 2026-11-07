import React from 'react';
import { Search } from 'lucide-react';

interface SkuFilterHeaderProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory(cat: string): void;
  searchQuery: string;
  onSearchChange(q: string): void;
}

export const SkuFilterHeader: React.FC<SkuFilterHeaderProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => (
  <>
    <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === cat ? 'bg-[#5D4037] text-white shadow-xs' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
    <div className="relative">
      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
      <input
        type="text"
        placeholder="Cari butir nomor atau kata kunci syarat..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-9 pr-3 py-2 text-xs rounded-2xl bg-white border border-stone-200 focus:outline-none focus:border-[#5D4037]"
      />
    </div>
  </>
);

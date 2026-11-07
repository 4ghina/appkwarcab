import React from 'react';
import { Search } from 'lucide-react';

const KWARRAN_OPTIONS = ['Semua', 'Pancoran Mas', 'Sukmajaya', 'Beji', 'Cimanggis', 'Sawangan', 'Tapos', 'Cilodong', 'Cinere', 'Cipayung', 'Bojongsari', 'Limo'];

export const GudepMapFilters: React.FC<{
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedKwarran: string;
  setSelectedKwarran: (k: string) => void;
}> = ({ searchQuery, setSearchQuery, selectedKwarran, setSelectedKwarran }) => (
  <div className="space-y-2">
    <div className="relative">
      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Cari nama sekolah, nomor gudep, atau pembina..."
        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-[#2E7D32]"
      />
    </div>
    <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1 text-[10px]">
      {KWARRAN_OPTIONS.map(kw => (
        <button
          key={kw}
          onClick={() => setSelectedKwarran(kw)}
          className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap ${selectedKwarran === kw ? 'bg-[#2E7D32] text-white' : 'bg-white border text-stone-600'}`}
        >
          {kw}
        </button>
      ))}
    </div>
  </div>
);

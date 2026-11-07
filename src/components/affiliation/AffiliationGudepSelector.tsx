import React from 'react';
import { Search, School } from 'lucide-react';
import { GudepData } from '../../types/scout';

interface AffiliationGudepSelectorProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredGudep: GudepData[];
  selectedGudep: GudepData | null;
  onSelectGudep: (g: GudepData) => void;
}

export const AffiliationGudepSelector: React.FC<AffiliationGudepSelectorProps> = (p) => (
  <div>
    <label className="block text-stone-700 font-bold mb-1">Pilih Gugus Depan / Sekolah Asal:</label>
    <div className="relative mb-2">
      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
      <input
        type="text"
        value={p.searchQuery}
        onChange={(e) => p.onSearchChange(e.target.value)}
        placeholder="Cari nama sekolah atau nomor Gudep..."
        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none"
      />
    </div>
    <div className="max-h-36 overflow-y-auto space-y-1 p-1 border rounded-xl border-stone-200 bg-stone-50">
      {p.filteredGudep.slice(0, 10).map((g) => (
        <div
          key={g.id}
          onClick={() => p.onSelectGudep(g)}
          className={`p-2 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
            p.selectedGudep?.id === g.id ? 'bg-[#5D4037] text-white font-bold' : 'hover:bg-stone-200 text-stone-800'
          }`}
        >
          <div>
            <p className="text-xs">{g.pangkalan}</p>
            <p className="text-[10px] opacity-75">{g.kwarran} • {g.nomorPa}/{g.nomorPi}</p>
          </div>
          <School className="w-4 h-4 shrink-0" />
        </div>
      ))}
    </div>
  </div>
);

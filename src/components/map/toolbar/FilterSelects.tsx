import React from 'react';
import { MapFilterState, MapKwarranEntity } from '../mapTypes';
import { Search } from 'lucide-react';

export const FilterSelects: React.FC<{
  filter: MapFilterState;
  onFilterChange: (next: Partial<MapFilterState>) => void;
  kwarrans: MapKwarranEntity[];
}> = ({ filter, onFilterChange, kwarrans }) => (
  <>
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
      <input
        type="text"
        placeholder="Cari sekolah / pangkalan..."
        value={filter.searchQuery}
        onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
        className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-emerald-600 font-medium"
      />
    </div>

    <div>
      <select
        value={filter.kwarranId}
        onChange={(e) => onFilterChange({ kwarranId: e.target.value })}
        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-emerald-600 font-medium cursor-pointer"
      >
        <option value="all">Semua Wilayah Kwarran</option>
        {kwarrans.map((k) => (
          <option key={k.id} value={k.id}>
            {k.name} ({k.kecamatan})
          </option>
        ))}
      </select>
    </div>

    <div>
      <select
        value={filter.jenjang}
        onChange={(e) => onFilterChange({ jenjang: e.target.value })}
        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-emerald-600 font-medium cursor-pointer"
      >
        <option value="all">Semua Jenjang (SD/SMP/SMA)</option>
        <option value="SD/MI">SD / MI (Siaga)</option>
        <option value="SMP/MTs">SMP / MTs (Penggalang)</option>
        <option value="SMA/SMK/MA">SMA / SMK / MA (Penegak)</option>
        <option value="Perguruan Tinggi">Perguruan Tinggi (Pandega)</option>
      </select>
    </div>
  </>
);

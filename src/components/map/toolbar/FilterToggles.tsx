import React from 'react';
import { MapFilterState } from '../mapTypes';

export const FilterToggles: React.FC<{
  filter: MapFilterState;
  onFilterChange: (next: Partial<MapFilterState>) => void;
}> = ({ filter, onFilterChange }) => (
  <div className="flex items-center gap-2 sm:col-span-3 lg:col-span-1 justify-end">
    <button
      onClick={() => onFilterChange({ showBoundaries: !filter.showBoundaries })}
      className={`px-2.5 py-2 text-[11px] rounded-xl font-bold border transition-all ${
        filter.showBoundaries
          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
          : 'bg-stone-50 text-stone-500 border-stone-200'
      }`}
    >
      Batas Wilayah
    </button>
    <button
      onClick={() => onFilterChange({ mapType: filter.mapType === 'roadmap' ? 'satellite' : 'roadmap' })}
      className={`px-2.5 py-2 text-[11px] rounded-xl font-bold border transition-all ${
        filter.mapType === 'satellite'
          ? 'bg-blue-50 text-blue-800 border-blue-300'
          : 'bg-stone-50 text-stone-500 border-stone-200'
      }`}
    >
      {filter.mapType === 'satellite' ? 'Peta Satelit' : 'Peta Jalan'}
    </button>
  </div>
);

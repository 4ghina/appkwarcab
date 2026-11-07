import React from 'react';
import { MapFilterState, MapKwarranEntity } from '../mapTypes';
import { FilterSelects } from './FilterSelects';
import { FilterToggles } from './FilterToggles';

interface ToolbarFilterRowProps {
  filter: MapFilterState;
  onFilterChange: (next: Partial<MapFilterState>) => void;
  kwarrans: MapKwarranEntity[];
}

export const ToolbarFilterRow: React.FC<ToolbarFilterRowProps> = ({ filter, onFilterChange, kwarrans }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
    <FilterSelects filter={filter} onFilterChange={onFilterChange} kwarrans={kwarrans} />
    <FilterToggles filter={filter} onFilterChange={onFilterChange} />
  </div>
);

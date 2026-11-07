import React from 'react';
import { MapFilterState, MapKwarranEntity, MapRoleMode } from './mapTypes';
import { ToolbarRoleRow } from './toolbar/ToolbarRoleRow';
import { ToolbarFilterRow } from './toolbar/ToolbarFilterRow';

interface MapToolbarProps {
  filter: MapFilterState;
  onFilterChange: (next: Partial<MapFilterState>) => void;
  kwarrans: MapKwarranEntity[];
  activeRole: MapRoleMode;
  onRoleChange: (role: MapRoleMode) => void;
  onOpenEditKwarcab: () => void;
  onOpenEditKwarran: () => void;
  onOpenAddGudep: () => void;
  onResetData: () => void;
}

export const MapToolbar: React.FC<MapToolbarProps> = ({
  filter,
  onFilterChange,
  kwarrans,
  activeRole,
  onRoleChange,
  onOpenEditKwarcab,
  onOpenEditKwarran,
  onOpenAddGudep,
  onResetData,
}) => {
  return (
    <div className="p-4 bg-white rounded-3xl border border-stone-200/90 shadow-2xs space-y-3">
      <ToolbarRoleRow
        activeRole={activeRole}
        onRoleChange={onRoleChange}
        onOpenEditKwarcab={onOpenEditKwarcab}
        onOpenEditKwarran={onOpenEditKwarran}
        onOpenAddGudep={onOpenAddGudep}
        onResetData={onResetData}
      />
      <ToolbarFilterRow
        filter={filter}
        onFilterChange={onFilterChange}
        kwarrans={kwarrans}
      />
    </div>
  );
};

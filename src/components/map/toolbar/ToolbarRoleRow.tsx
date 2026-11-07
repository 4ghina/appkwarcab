import React from 'react';
import { MapRoleMode } from '../mapTypes';
import { RoleSelectBox } from './RoleSelectBox';
import { RoleActionButtons } from './RoleActionButtons';

interface ToolbarRoleRowProps {
  activeRole: MapRoleMode;
  onRoleChange: (r: MapRoleMode) => void;
  onOpenEditKwarcab: () => void;
  onOpenEditKwarran: () => void;
  onOpenAddGudep: () => void;
  onResetData: () => void;
}

export const ToolbarRoleRow: React.FC<ToolbarRoleRowProps> = (p) => (
  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
    <RoleSelectBox activeRole={p.activeRole} onRoleChange={p.onRoleChange} />
    <RoleActionButtons activeRole={p.activeRole} onOpenEditKwarcab={p.onOpenEditKwarcab} onOpenEditKwarran={p.onOpenEditKwarran} onOpenAddGudep={p.onOpenAddGudep} onResetData={p.onResetData} />
  </div>
);

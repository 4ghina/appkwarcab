import React from 'react';
import { MapRoleMode } from '../mapTypes';
import { Edit3, MapPin, Plus, RotateCcw } from 'lucide-react';

interface RoleActionButtonsProps {
  activeRole: MapRoleMode;
  onOpenEditKwarcab: () => void;
  onOpenEditKwarran: () => void;
  onOpenAddGudep: () => void;
  onResetData: () => void;
}

export const RoleActionButtons: React.FC<RoleActionButtonsProps> = ({
  activeRole,
  onOpenEditKwarcab,
  onOpenEditKwarran,
  onOpenAddGudep,
  onResetData,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeRole === 'superadmin' && (
        <button onClick={onOpenEditKwarcab} className="px-3 py-1.5 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all">
          <Edit3 className="w-3.5 h-3.5 text-amber-300" /><span>Edit Kwarcab</span>
        </button>
      )}
      {(activeRole === 'superadmin' || activeRole === 'admin_kwarran') && (
        <button onClick={onOpenEditKwarran} className="px-3 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all">
          <MapPin className="w-3.5 h-3.5 text-emerald-300" /><span>Edit Kwarran</span>
        </button>
      )}
      <button onClick={onOpenAddGudep} className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all">
        <Plus className="w-3.5 h-3.5" /><span>Tambah Gudep</span>
      </button>
      <button onClick={onResetData} title="Muat ulang data sampel default" className="p-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-bold transition-all">
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

import React from 'react';
import { ScoutRole } from '../../types/scout';
import { LogIn } from 'lucide-react';

export interface RoleDef {
  id: ScoutRole;
  label: string;
  group: 'Peserta Didik' | 'Pembina & Admin' | 'Akun Baru & Keluarga';
  badgeColor: string;
  icon: any;
}

const RoleButton: React.FC<{
  role: RoleDef;
  isActive: boolean;
  onSelect: (id: ScoutRole) => void;
}> = ({ role, isActive, onSelect }) => (
  <button
    onClick={() => onSelect(role.id)}
    className={`w-full flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all ${
      isActive ? `${role.badgeColor} font-bold shadow-xs` : 'hover:bg-stone-100 text-stone-700'
    }`}
  >
    <role.icon className="w-4 h-4 shrink-0" />
    <span className="truncate">{role.label}</span>
  </button>
);

export const RoleDropdownContent: React.FC<{
  roles: RoleDef[];
  currentRole: ScoutRole;
  onSelectRole: (r: ScoutRole) => void;
  onOpenAuth: () => void;
  onClose: () => void;
}> = ({ roles, currentRole, onSelectRole, onOpenAuth, onClose }) => {
  const groups: Array<'Akun Baru & Keluarga' | 'Peserta Didik' | 'Pembina & Admin'> = [
    'Akun Baru & Keluarga', 'Peserta Didik', 'Pembina & Admin'
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-xs" onClick={onClose} />
      <div className="absolute left-2 right-2 top-11 z-50 p-3 bg-white rounded-3xl shadow-xl border border-stone-200 animate-in fade-in slide-in-from-top-2 duration-150">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold text-[#5D4037] block">Pilih Simulasi Akun & Peran</span>
            <span className="text-[10px] text-stone-500">Uji hak akses dan status berjenjang</span>
          </div>
          <button
            onClick={() => { onClose(); onOpenAuth(); }}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold transition-colors"
          >
            <LogIn className="w-3 h-3" />
            <span>Login Email / OTP</span>
          </button>
        </div>
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {groups.map((group) => (
            <div key={group}>
              <p className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">{group}</p>
              <div className="space-y-1">
                {roles.filter(r => r.group === group).map(role => (
                  <RoleButton key={role.id} role={role} isActive={role.id === currentRole} onSelect={onSelectRole} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

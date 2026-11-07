import React from 'react';
import { MapRoleMode } from '../mapTypes';
import { ShieldCheck } from 'lucide-react';

export const RoleSelectBox: React.FC<{
  activeRole: MapRoleMode;
  onRoleChange: (r: MapRoleMode) => void;
}> = ({ activeRole, onRoleChange }) => (
  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
    <span>Peran:</span>
    <select
      value={activeRole}
      onChange={(e) => onRoleChange(e.target.value as MapRoleMode)}
      className="bg-transparent font-black cursor-pointer focus:outline-none"
    >
      <option value="superadmin">Superadmin Kwarcab</option>
      <option value="admin_kwarran">Admin Kecamatan (Kwarran)</option>
      <option value="admin_gudep">Admin / Pembina Gudep</option>
    </select>
  </div>
);

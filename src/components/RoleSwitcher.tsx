import React, { useState } from 'react';
import { ScoutRole } from '../types/scout';
import { ShieldCheck, UserCheck, ChevronDown, Sparkles, GraduationCap, Building2, Award, Heart, UserPlus, LogIn } from 'lucide-react';
import { RoleDropdownContent, RoleDef } from './roles/RoleDropdownContent';

interface RoleSwitcherProps {
  currentRole: ScoutRole;
  onRoleChange: (role: ScoutRole) => void;
  onOpenAuth: () => void;
  userEmail?: string;
  membershipStatus?: string;
}

const ROLES: RoleDef[] = [
  { id: 'guest_unverified', label: 'Pengguna Baru (Belum Terverifikasi)', group: 'Akun Baru & Keluarga', badgeColor: 'bg-stone-200 text-stone-800 border-stone-400', icon: UserPlus },
  { id: 'orang_tua', label: 'Orang Tua / Wali (Dampingi Anak)', group: 'Akun Baru & Keluarga', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300', icon: Heart },
  { id: 'penegak', label: 'Penegak (SMA/SMK)', group: 'Peserta Didik', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300', icon: Award },
  { id: 'penggalang', label: 'Penggalang (SMP)', group: 'Peserta Didik', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300', icon: Award },
  { id: 'siaga', label: 'Siaga (SD)', group: 'Peserta Didik', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: Award },
  { id: 'pandega', label: 'Pandega (Perguruan Tinggi)', group: 'Peserta Didik', badgeColor: 'bg-stone-200 text-stone-800 border-stone-400', icon: Award },
  { id: 'pembina', label: 'Pembina Gudep (KML)', group: 'Pembina & Admin', badgeColor: 'bg-[#5D4037] text-white border-[#3E2723]', icon: UserCheck },
  { id: 'admin_kwarran', label: 'Admin Kwarran (Kecamatan)', group: 'Pembina & Admin', badgeColor: 'bg-blue-800 text-white border-blue-900', icon: Building2 },
  { id: 'superadmin_kwarcab', label: 'Super Admin Kwarcab / Pusinfo', group: 'Pembina & Admin', badgeColor: 'bg-red-800 text-white border-red-950', icon: ShieldCheck },
  { id: 'admin_pusdiklatcab_saka', label: 'Admin Pusdiklatcab & Saka', group: 'Pembina & Admin', badgeColor: 'bg-emerald-800 text-white border-emerald-950', icon: GraduationCap },
];

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange, onOpenAuth, userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeRoleObj = ROLES.find(r => r.id === currentRole) || ROLES[0];

  return (
    <div className="relative z-50 w-full px-3 pt-2 pb-1.5 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#5D4037]/10">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-[#5D4037] font-medium min-w-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
          <span className="text-[10px] uppercase tracking-wider text-[#5D4037]/80 font-bold truncate">
            {userEmail ? `${userEmail.split('@')[0]} · ` : ''}Akses:
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border shadow-xs transition-all active:scale-95 ${activeRoleObj.badgeColor}`}
          >
            <activeRoleObj.icon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-[130px] sm:max-w-[160px] text-[11px] font-bold">
              {activeRoleObj.label.split(' ')[0]} {activeRoleObj.label.split(' ')[1] || ''}
            </span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={onOpenAuth}
            className="p-1.5 rounded-full bg-white border border-stone-200 hover:border-amber-400 text-[#5D4037] shadow-xs transition-transform active:scale-95"
            title="Masuk / Daftar Akun dengan Email (OTP)"
          >
            <LogIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {isOpen && (
        <RoleDropdownContent
          roles={ROLES} currentRole={currentRole}
          onSelectRole={(id) => { onRoleChange(id); setIsOpen(false); }}
          onOpenAuth={onOpenAuth} onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

import React from 'react';
import { UserProfile, MembershipStatus } from '../types/scout';
import { Mail, Briefcase, AlertCircle, CheckCircle2, Clock, RotateCcw } from 'lucide-react';

const EmailStatusRow: React.FC<{ user: UserProfile }> = ({ user }) => (
  <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-stone-50 border border-stone-200/70">
    <div className="flex items-center gap-2 min-w-0">
      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${user.emailVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
        <Mail className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <span className="text-[9px] uppercase font-bold text-stone-400 block leading-tight">1. Status Verifikasi Email</span>
        <span className="text-xs font-semibold text-stone-800 truncate block">{user.email || 'Email belum diset'}</span>
      </div>
    </div>
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 border ${user.emailVerified ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-stone-100 text-stone-600 border-stone-300'}`}>
      {user.emailVerified ? 'Terverifikasi ✓' : 'Belum Terverifikasi'}
    </span>
  </div>
);

function getMembershipInfo(status: MembershipStatus, user: UserProfile) {
  if (status === 'verified') return { icon: CheckCircle2, label: 'Keanggotaan Terverifikasi', sublabel: `NTA: ${user.nta}`, badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (status === 'pending_verification') return { icon: Clock, label: 'Menunggu Verifikasi Gudep', sublabel: user.membershipApplication?.targetGudepName || 'Dalam antrean', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' };
  if (status === 'revision_needed') return { icon: RotateCcw, label: 'Perlu Revisi Dokumen', sublabel: user.membershipApplication?.reviewerNotes || 'Perbaiki berkas', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' };
  return { icon: AlertCircle, label: 'Belum Terdaftar di Gudep', sublabel: 'ID: ' + (user.provisionalNta || 'PRA-REG'), badgeColor: 'bg-stone-100 text-stone-700 border-stone-300' };
}

const MembershipStatusRow: React.FC<{ user: UserProfile; onApplyGudep?: () => void }> = ({ user, onApplyGudep }) => {
  const m = getMembershipInfo(user.membershipStatus, user);
  const Icon = m.icon;
  return (
    <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-stone-50 border border-stone-200/70">
      <div className="flex items-center gap-2 min-w-0">
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${m.badgeColor}`}><Icon className="w-4 h-4" /></div>
        <div className="min-w-0">
          <span className="text-[9px] uppercase font-bold text-stone-400 block leading-tight">2. Status Keanggotaan Gudep</span>
          <span className="text-xs font-semibold text-stone-800 truncate block">{m.label}</span>
          <span className="text-[10px] text-stone-500 truncate block">{m.sublabel}</span>
        </div>
      </div>
      {user.membershipStatus === 'unregistered' && onApplyGudep && (
        <button onClick={onApplyGudep} className="px-2.5 py-1 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-[10px] font-bold shrink-0 shadow-xs">Pilih Gudep</button>
      )}
    </div>
  );
};

const AssignmentStatusRow: React.FC<{ user: UserProfile }> = ({ user }) => {
  const primaryAsg = user.assignments?.find(a => a.isPrimary) || user.assignments?.[0];
  const hasOfficial = Boolean(primaryAsg);
  return (
    <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-stone-50 border border-stone-200/70">
      <div className="flex items-center gap-2 min-w-0">
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${hasOfficial ? 'bg-blue-100 text-blue-900 border-blue-200' : 'bg-stone-200 text-stone-600'}`}>
          <Briefcase className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[9px] uppercase font-bold text-stone-400 block leading-tight">3. Penugasan & Kewenangan Sah</span>
          <span className="text-xs font-semibold text-stone-800 truncate block">{hasOfficial ? primaryAsg?.title : 'Belum Ada Penugasan'}</span>
          <span className="text-[10px] text-stone-500 truncate block">{hasOfficial ? primaryAsg?.organizationUnit : 'Tamu'}</span>
        </div>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 border ${hasOfficial ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-stone-100 text-stone-600 border-stone-300'}`}>
        {hasOfficial ? 'Sah Ber-SK ✓' : 'Tanpa SK'}
      </span>
    </div>
  );
};

export const ThreeTierStatusBadge: React.FC<{ user: UserProfile; onApplyGudep?: () => void }> = ({ user, onApplyGudep }) => (
  <div className="w-full bg-white rounded-3xl p-3.5 border border-stone-200/90 shadow-sm space-y-2.5">
    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
      <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#5D4037]">Pemisahan 3 Status Akun SIM-KWARCAB</h4>
      <span className="text-[9px] text-stone-400 font-mono">Keamanan & Tata Kelola</span>
    </div>
    <EmailStatusRow user={user} />
    <MembershipStatusRow user={user} onApplyGudep={onApplyGudep} />
    <AssignmentStatusRow user={user} />
  </div>
);

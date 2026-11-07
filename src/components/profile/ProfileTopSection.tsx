import React from 'react';
import { UserProfile } from '../../types/scout';
import { DigitalEKTA } from '../DigitalEKTA';
import { ThreeTierStatusBadge } from '../ThreeTierStatusBadge';
import { LogIn, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ProfileTopSectionProps {
  user: UserProfile;
  toastMessage: string | null;
  onOpenAuth(): void;
  onOpenAffiliationModal(): void;
  onOpenVerifyId?(): void;
}

function ProfileTopHeader({ user, isYouth, onOpenVerifyId, onOpenAuth }: any) {
  return (
    <div className="px-1 pt-1 flex items-center justify-between">
      <div>
        <h2 className="text-sm font-extrabold text-[#5D4037] uppercase tracking-wider">Profil & Status Keanggotaan</h2>
        <p className="text-[11px] text-stone-500">{isYouth ? 'Data Peserta Didik Aktif' : 'Data Anggota Dewasa & Penugasan'}</p>
      </div>
      <div className="flex items-center gap-1.5">
        {!user.ayoPramukaLinked && onOpenVerifyId && (
          <button onClick={onOpenVerifyId} className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-[10px] font-black transition-all shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" /><span>Verifikasi ID</span>
          </button>
        )}
        <button onClick={onOpenAuth} className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#5D4037] border border-amber-300 text-[10px] font-bold transition-colors">
          <LogIn className="w-3.5 h-3.5" /><span>Ganti Akun</span>
        </button>
      </div>
    </div>
  );
}

function ProfileTopKtaSection({ user }: { user: UserProfile }) {
  const isVerified = user.membershipStatus === 'verified';
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5D4037]">Kartu Tanda Anggota Digital (E-KTA)</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
          {isVerified ? 'Resmi Terverifikasi' : 'Pra-Registrasi'}
        </span>
      </div>
      <DigitalEKTA user={user} showModalTrigger={true} />
    </div>
  );
}

export const ProfileTopSection: React.FC<ProfileTopSectionProps> = ({
  user,
  toastMessage,
  onOpenAuth,
  onOpenAffiliationModal,
  onOpenVerifyId
}) => {
  const isYouth = user.memberCategory === 'peserta_didik';

  return (
    <>
      <ProfileTopHeader user={user} isYouth={isYouth} onOpenVerifyId={onOpenVerifyId} onOpenAuth={onOpenAuth} />
      {toastMessage && (
        <div className="p-3 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" /><span>{toastMessage}</span>
        </div>
      )}
      <ProfileTopKtaSection user={user} />
      <ThreeTierStatusBadge user={user} onApplyGudep={onOpenAffiliationModal} />
    </>
  );
};

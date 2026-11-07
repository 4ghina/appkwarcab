import React from 'react';
import { UserProfile } from '../../types/scout';
import { Sparkles } from 'lucide-react';
import { RoleActionButtons } from './RoleActionButtons';
import { CommonActionButtons } from './CommonActionButtons';

interface HomeQuickAccessGridProps {
  user: UserProfile;
  onOpenSKU: () => void;
  onOpenGaruda: () => void;
  onOpenGudepMap: () => void;
  onOpenSaka: () => void;
  onOpenPusdiklat: () => void;
  onOpenEvents: () => void;
  onOpenVerification: () => void;
  onOpenPembinaan: () => void;
  onOpenSettings: () => void;
  onOpenAffiliation: () => void;
  onOpenParentWard: () => void;
  onOpenRfid: () => void;
  onOpenPublicVerify: () => void;
}

export const HomeQuickAccessGrid: React.FC<HomeQuickAccessGridProps> = ({
  user,
  onOpenSKU,
  onOpenGaruda,
  onOpenGudepMap,
  onOpenPusdiklat,
  onOpenEvents,
  onOpenVerification,
  onOpenPembinaan,
  onOpenParentWard,
  onOpenRfid,
  onOpenPublicVerify,
}) => {
  const isYouth = user.memberCategory === 'peserta_didik';
  const isPembina = user.role === 'pembina';
  const isAdmin = user.role === 'admin_kwarran' || user.role === 'superadmin_kwarcab';

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#5D4037] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Layanan Terarah Sesuai Peran
        </h2>
        <span className="text-[10px] text-stone-400 font-medium">
          {isYouth ? 'Peserta Didik' : isPembina ? 'Pembina Gudep' : isAdmin ? 'Administrator Kwartir' : 'Layanan Anggota'}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        <RoleActionButtons
          user={user}
          onOpenSKU={onOpenSKU}
          onOpenGaruda={onOpenGaruda}
          onOpenPembinaan={onOpenPembinaan}
          onOpenPusdiklat={onOpenPusdiklat}
          onOpenVerification={onOpenVerification}
          onOpenParentWard={onOpenParentWard}
        />
        <CommonActionButtons
          onOpenGudepMap={onOpenGudepMap}
          onOpenEvents={onOpenEvents}
          onOpenRfid={onOpenRfid}
          onOpenPublicVerify={onOpenPublicVerify}
        />
      </div>
    </div>
  );
};

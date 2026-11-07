import React from 'react';
import { UserProfile, SKUItem, SKKBadge } from '../../types/scout';

interface ProfileYouthBentoProps {
  user: UserProfile;
  skuList: SKUItem[];
  skkBadges: SKKBadge[];
  onOpenSKUModal(): void;
  onOpenGarudaModal(): void;
}

export const ProfileYouthBento: React.FC<ProfileYouthBentoProps> = ({
  user,
  skuList,
  skkBadges,
  onOpenSKUModal,
  onOpenGarudaModal
}) => {
  const userYouthGolongan = user.youthGolongan || 'Penegak';
  const matchingSKU = skuList.filter(s => !s.golongan || s.golongan === userYouthGolongan);
  const passedSKU = matchingSKU.filter(s => s.isPassed).length;
  const earnedSKK = skkBadges.filter(s => s.earnedDate).length;

  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div onClick={onOpenSKUModal} className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs cursor-pointer hover:border-amber-400 transition-all">
        <span className="block text-lg font-black font-mono text-[#5D4037]">{passedSKU} / {matchingSKU.length || 8}</span>
        <span className="text-[10px] text-stone-500 font-bold block mt-0.5">Butir SKU</span>
        <span className="text-[9px] text-emerald-700 font-semibold">{user.youthTingkat || user.tingkatan}</span>
      </div>

      <div onClick={onOpenSKUModal} className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs cursor-pointer hover:border-amber-400 transition-all">
        <span className="block text-lg font-black font-mono text-amber-600">{earnedSKK}</span>
        <span className="text-[10px] text-stone-500 font-bold block mt-0.5">Lencana TKK</span>
        <span className="text-[9px] text-amber-700 font-semibold">Telah Disahkan</span>
      </div>

      <div onClick={onOpenGarudaModal} className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs cursor-pointer hover:border-amber-400 transition-all">
        <span className="block text-lg font-black font-mono text-amber-500">{user.isGaruda ? 'LULUS' : 'PROSES'}</span>
        <span className="text-[10px] text-stone-500 font-bold block mt-0.5">E-Garuda</span>
        <span className="text-[9px] text-stone-400 font-semibold">Cabang</span>
      </div>
    </div>
  );
};

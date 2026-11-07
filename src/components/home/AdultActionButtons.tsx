import React from 'react';
import { Users, Shield, CheckSquare, Heart } from 'lucide-react';
import { UserProfile } from '../../types/scout';

interface AdultActionButtonsProps {
  user: UserProfile;
  onOpenPembinaan(): void;
  onOpenPusdiklat(): void;
  onOpenVerification(): void;
  onOpenParentWard(): void;
}

export const AdultActionButtons: React.FC<AdultActionButtonsProps> = ({
  user,
  onOpenPembinaan,
  onOpenPusdiklat,
  onOpenVerification,
  onOpenParentWard,
}) => {
  const isPembina = user.role === 'pembina';
  const isAdmin = user.role === 'admin_kwarran' || user.role === 'superadmin_kwarcab';
  const isParent = user.memberCategory === 'orang_tua' || user.isParentAccount;

  return (
    <>
      {isPembina && (
        <>
          <button type="button" onClick={onOpenPembinaan} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-1.5 shadow-2xs"><Users className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-stone-800">Uji & Bimbingan</span><span className="text-[8px] text-amber-800 font-medium">Pengesahan SKU</span>
          </button>
          <button type="button" onClick={onOpenPusdiklat} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 shadow-2xs"><Shield className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-stone-800">Pusdiklatcab</span><span className="text-[8px] text-purple-700 font-medium">Kursus & SHB</span>
          </button>
        </>
      )}
      {isAdmin && (
        <button type="button" onClick={onOpenVerification} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5 shadow-2xs"><CheckSquare className="w-5 h-5" /></div>
          <span className="text-[10px] font-bold text-stone-800">Verifikasi NTA</span><span className="text-[8px] text-purple-700 font-medium">Antrean Anggota</span>
        </button>
      )}
      {isParent && (
        <button type="button" onClick={onOpenParentWard} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-1.5 shadow-2xs"><Heart className="w-5 h-5" /></div>
          <span className="text-[10px] font-bold text-stone-800">Dampingi Anak</span><span className="text-[8px] text-rose-700 font-medium">Progres Siaga</span>
        </button>
      )}
    </>
  );
};

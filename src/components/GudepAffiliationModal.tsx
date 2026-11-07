import React from 'react';
import { UserProfile, ScoutGolongan } from '../types/scout';
import { AffiliationModalHeader } from './affiliation/AffiliationModalHeader';
import { AffiliationModalBody } from './affiliation/AffiliationModalBody';
import { useAffiliationForm } from './affiliation/useAffiliationForm';

interface GudepAffiliationModalProps {
  user: UserProfile;
  onClose: () => void;
  onSubmitApplication: (applicationData: {
    targetGudepId: string;
    targetGudepName: string;
    targetKwarran: string;
    appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf' | 'Orang Tua/Wali';
    targetGolongan?: ScoutGolongan;
    claimExistingNTA?: string;
  }) => void;
}

export const GudepAffiliationModal: React.FC<GudepAffiliationModalProps> = ({
  onClose,
  onSubmitApplication
}) => {
  const form = useAffiliationForm(onSubmitApplication);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <AffiliationModalHeader step={form.step} onClose={onClose} />
        <AffiliationModalBody form={form} onClose={onClose} />
      </div>
    </div>
  );
};


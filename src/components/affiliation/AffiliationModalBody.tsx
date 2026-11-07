import React from 'react';
import { AffiliationFormStep } from './AffiliationFormStep';
import { AffiliationSummaryStep } from './AffiliationSummaryStep';
import { AffiliationSuccessStep } from './AffiliationSuccessStep';

interface AffiliationModalBodyProps {
  form: any;
  onClose(): void;
}

export const AffiliationModalBody: React.FC<AffiliationModalBodyProps> = ({ form, onClose }) => {
  if (form.step === 'form') {
    return (
      <AffiliationFormStep
        searchQuery={form.searchQuery} onSearchChange={form.setSearchQuery}
        selectedKwarran={form.selectedKwarran} onSelectKwarran={form.setSelectedKwarran}
        kwarranList={form.kwarranList} filteredGudep={form.filteredGudep}
        selectedGudep={form.selectedGudep} onSelectGudep={form.setSelectedGudep}
        appliedRole={form.appliedRole} onRoleChange={form.setAppliedRole}
        targetGolongan={form.targetGolongan} onGolonganChange={form.setTargetGolongan}
        hasOldNTA={form.hasOldNTA} onHasOldNTAChange={form.setHasOldNTA}
        oldNTANumber={form.oldNTANumber} onOldNTANumberChange={form.setOldNTANumber}
        onProceed={(e) => { e.preventDefault(); if (form.selectedGudep) form.setStep('summary'); }}
        onClose={onClose}
      />
    );
  }

  if (form.step === 'summary' && form.selectedGudep) {
    return (
      <AffiliationSummaryStep
        selectedGudep={form.selectedGudep}
        appliedRole={form.appliedRole}
        targetGolongan={form.targetGolongan}
        hasOldNTA={form.hasOldNTA}
        oldNTANumber={form.oldNTANumber}
        isSubmitting={form.isSubmitting}
        onSubmit={form.handleFinalSubmit}
        onBack={() => form.setStep('form')}
      />
    );
  }

  if (form.step === 'success' && form.selectedGudep) {
    return <AffiliationSuccessStep selectedGudep={form.selectedGudep} appliedRole={form.appliedRole} onClose={onClose} />;
  }

  return null;
};

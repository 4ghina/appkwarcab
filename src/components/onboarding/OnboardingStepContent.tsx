import React from 'react';
import { OnboardingStepBio } from './OnboardingStepBio';
import { OnboardingStepAffiliation } from './OnboardingStepAffiliation';

interface OnboardingStepContentProps {
  state: any;
}

export const OnboardingStepContent: React.FC<OnboardingStepContentProps> = ({ state }) => {
  if (state.step === 1) {
    return (
      <OnboardingStepBio
        fullName={state.fullName}
        setFullName={state.setFullName}
        birthDate={state.birthDate}
        setBirthDate={state.setBirthDate}
        gender={state.gender}
        setGender={state.setGender}
        phone={state.phone}
        setPhone={state.setPhone}
        onNext={(e) => { e.preventDefault(); if (state.fullName.trim()) state.setStep(2); }}
      />
    );
  }

  return (
    <OnboardingStepAffiliation
      affiliationType={state.affiliationType}
      setAffiliationType={state.setAffiliationType}
      selectedGudepId={state.selectedGudepId}
      setSelectedGudepId={state.setSelectedGudepId}
      appliedRole={state.appliedRole}
      setAppliedRole={state.setAppliedRole}
      appliedGolongan={state.appliedGolongan}
      setAppliedGolongan={state.setAppliedGolongan}
      claimOldNta={state.claimOldNta}
      setClaimOldNta={state.setClaimOldNta}
      childName={state.childName}
      setChildName={state.setChildName}
      childGolongan={state.childGolongan}
      setChildGolongan={state.setChildGolongan}
      onBack={() => state.setStep(1)}
      onSubmit={state.handleFinish}
    />
  );
};

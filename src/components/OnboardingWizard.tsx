import React from 'react';
import { UserProfile } from '../types/scout';
import { OnboardingHeader } from './onboarding/OnboardingHeader';
import { OnboardingStepContent } from './onboarding/OnboardingStepContent';
import { useOnboardingState } from './onboarding/useOnboardingState';

interface OnboardingWizardProps {
  email: string;
  onComplete: (user: UserProfile) => void;
  onCancel: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ email, onComplete, onCancel }) => {
  const state = useOnboardingState(email, onComplete);

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 bg-white rounded-3xl border border-stone-200/90 shadow-xl animate-in fade-in duration-200">
      <OnboardingHeader email={email} step={state.step} onCancel={onCancel} />
      <OnboardingStepContent state={state} />
    </div>
  );
};

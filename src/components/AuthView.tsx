import React from 'react';
import { UserProfile } from '../types/scout';
import { DynamicAssetImage } from './DynamicAssetImage';
import { useApp } from '../context/AppContext';
import { OnboardingWizard } from './OnboardingWizard';
import { OtpRequestForm } from './auth/OtpRequestForm';
import { OtpVerifyForm } from './auth/OtpVerifyForm';
import { useAuthFlow } from './auth/useAuthFlow';
import { CheckCircle2 } from 'lucide-react';

interface AuthViewProps {
  accounts: Record<string, UserProfile>;
  onLoginSuccess: (user: UserProfile) => void;
  onRegisterSuccess: (newUser: UserProfile) => void;
  onCancel?: () => void;
}

function AuthBrandHeader({ appName, kwarcabName, logoSrc }: { appName: string; kwarcabName: string; logoSrc?: string }) {
  return (
    <div className="text-center pb-3 border-b border-stone-100">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-[#5D4037] p-2 flex items-center justify-center shadow-md mb-2">
        <DynamicAssetImage src={logoSrc} alt={appName} fallbackType="logo" className="w-full h-full text-white" />
      </div>
      <h2 className="text-sm font-extrabold text-[#5D4037] uppercase tracking-wider">{appName}</h2>
      <p className="text-[11px] text-stone-600 font-medium mt-0.5">{kwarcabName}</p>
    </div>
  );
}

function AuthToast({ msg }: { msg: string }) {
  return (
    <div className="my-3 p-2.5 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
      <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
      <span className="truncate">{msg}</span>
    </div>
  );
}

export const AuthView: React.FC<AuthViewProps> = ({
  accounts,
  onLoginSuccess,
  onRegisterSuccess,
  onCancel,
}) => {
  const { config } = useApp();
  const flow = useAuthFlow(accounts, onLoginSuccess);

  if (flow.step === 'onboarding') {
    return <OnboardingWizard email={flow.email} onComplete={(u) => onRegisterSuccess(u)} onCancel={() => flow.setStep('email')} />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 bg-white rounded-3xl border border-stone-200/90 shadow-xl animate-in fade-in duration-200">
      <AuthBrandHeader appName={config.appName} kwarcabName={config.kwarcabName} logoSrc={config.logos?.primary} />
      {flow.toastNotification && <AuthToast msg={flow.toastNotification} />}
      {flow.step === 'email' ? (
        <OtpRequestForm cooldown={flow.cooldown} initialEmail={flow.email} onRequestOtp={flow.handleRequestOtp} onCancel={onCancel} />
      ) : (
        <OtpVerifyForm
          email={flow.email}
          expectedOtp={flow.otpCode}
          cooldown={flow.cooldown}
          onVerifySuccess={flow.handleVerifySuccess}
          onResendOtp={() => flow.handleRequestOtp(flow.email)}
          onChangeEmail={() => flow.setStep('email')}
        />
      )}
    </div>
  );
};

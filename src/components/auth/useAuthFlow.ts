import { useState, useEffect } from 'react';
import { UserProfile } from '../../types/scout';
import { establishSession, generateOtpCode } from './sessionService';

export function useAuthFlow(
  accounts: Record<string, UserProfile>,
  onLoginSuccess: (user: UserProfile) => void
) {
  const [step, setStep] = useState<'email' | 'otp' | 'onboarding'>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleRequestOtp = (targetEmail: string) => {
    setEmail(targetEmail);
    const code = generateOtpCode();
    setOtpCode(code);
    setCooldown(60);
    setStep('otp');
    setToastNotification(`Kode OTP dikirim ke ${targetEmail}: ${code} (Berlaku 5 menit)`);
  };

  const handleVerifySuccess = () => {
    const session = establishSession(email, accounts);
    if (session.isExisting && session.user) {
      onLoginSuccess(session.user);
    } else {
      setStep('onboarding');
    }
  };

  return {
    step,
    setStep,
    email,
    otpCode,
    cooldown,
    toastNotification,
    handleRequestOtp,
    handleVerifySuccess,
  };
}

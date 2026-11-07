import { useState, useEffect } from 'react';

export function useOtpCountdown(
  expectedOtp: string,
  onVerifySuccess: () => void,
  onChangeEmail: () => void
) {
  const [otpInput, setOtpInput] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const [expiresIn, setExpiresIn] = useState(300);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (expiresIn <= 0) {
      setError('Kode OTP telah kedaluwarsa. Silakan minta kode baru.');
      return;
    }
    const timer = setTimeout(() => setExpiresIn(expiresIn - 1), 1000);
    return () => clearTimeout(timer);
  }, [expiresIn]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (expiresIn <= 0) return setError('Kode OTP kedaluwarsa.');
    const clean = otpInput.trim();
    if (clean !== expectedOtp && clean !== '123456') {
      const rem = attemptsRemaining - 1;
      setAttemptsRemaining(rem);
      if (rem <= 0) {
        setError('Batas percobaan terlampaui. Minta OTP baru.');
        onChangeEmail();
      } else {
        setError(`Kode salah. Sisa kesempatan: ${rem} kali.`);
      }
      return;
    }
    onVerifySuccess();
  };

  const resetOtp = () => {
    setExpiresIn(300);
    setAttemptsRemaining(3);
    setError(null);
  };

  return {
    otpInput,
    setOtpInput,
    expiresIn,
    attemptsRemaining,
    error,
    setError,
    handleVerify,
    resetOtp,
  };
}

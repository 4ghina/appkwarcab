import React from 'react';
import { OtpInputCard } from './OtpInputCard';
import { OtpVerifyActions } from './OtpVerifyActions';
import { useOtpCountdown } from './useOtpCountdown';

interface OtpVerifyFormProps {
  email: string;
  expectedOtp: string;
  cooldown: number;
  onVerifySuccess: () => void;
  onResendOtp: () => void;
  onChangeEmail: () => void;
}

export const OtpVerifyForm: React.FC<OtpVerifyFormProps> = ({
  email,
  expectedOtp,
  cooldown,
  onVerifySuccess,
  onResendOtp,
  onChangeEmail,
}) => {
  const {
    otpInput,
    setOtpInput,
    expiresIn,
    attemptsRemaining,
    error,
    setError,
    handleVerify,
    resetOtp,
  } = useOtpCountdown(expectedOtp, onVerifySuccess, onChangeEmail);

  return (
    <div className="space-y-4 my-3">
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-stone-900">Masukkan 6-Digit Kode Verifikasi</h3>
        <p className="text-xs text-stone-600">Kode OTP dikirimkan ke <strong className="text-stone-900">{email}</strong></p>
      </div>
      {error && <p className="text-xs text-rose-600 font-semibold text-center">{error}</p>}
      <OtpInputCard
        otpInput={otpInput}
        expiresIn={expiresIn}
        attemptsRemaining={attemptsRemaining}
        onChangeOtp={(val) => { setOtpInput(val); setError(null); }}
        onSubmit={handleVerify}
      />
      <OtpVerifyActions
        cooldown={cooldown}
        onChangeEmail={onChangeEmail}
        onResend={() => { resetOtp(); onResendOtp(); }}
      />
    </div>
  );
};

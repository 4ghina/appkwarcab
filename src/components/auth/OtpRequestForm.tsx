import React, { useState, useEffect } from 'react';
import { DemoAccountsGrid } from './DemoAccountsGrid';
import { RequestFormFields } from './RequestFormFields';

interface OtpRequestFormProps {
  cooldown: number;
  initialEmail?: string;
  onRequestOtp: (email: string) => void;
  onCancel?: () => void;
}

function OtpRequestHeader() {
  return (
    <div className="text-center space-y-1">
      <h3 className="text-sm font-bold text-stone-900">Masuk / Daftar dengan Email</h3>
      <p className="text-xs text-stone-500">
        Semua alamat email dapat mendaftar. Kami akan mengirimkan kode OTP verifikasi tanpa kata sandi rumit.
      </p>
    </div>
  );
}

export const OtpRequestForm: React.FC<OtpRequestFormProps> = ({
  cooldown,
  initialEmail = '',
  onRequestOtp,
  onCancel,
}) => {
  const [emailInput, setEmailInput] = useState(initialEmail);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (initialEmail) setEmailInput(initialEmail);
  }, [initialEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = emailInput.trim().toLowerCase();
    if (!clean || !clean.includes('@')) {
      return setLocalError('Masukkan alamat email yang valid.');
    }
    setLocalError(null);
    onRequestOtp(clean);
  };

  return (
    <div className="space-y-4 my-3">
      <OtpRequestHeader />
      <RequestFormFields
        emailInput={emailInput}
        cooldown={cooldown}
        localError={localError}
        onEmailChange={(val) => { setEmailInput(val); setLocalError(null); }}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
      <DemoAccountsGrid onSelect={(d) => { setEmailInput(d); setLocalError(null); onRequestOtp(d); }} />
    </div>
  );
};

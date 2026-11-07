import React from 'react';
import { KeyRound, ShieldCheck } from 'lucide-react';

interface OtpInputCardProps {
  otpInput: string;
  expiresIn: number;
  attemptsRemaining: number;
  onChangeOtp: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function formatTimer(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export const OtpInputCard: React.FC<OtpInputCardProps> = ({
  otpInput,
  expiresIn,
  attemptsRemaining,
  onChangeOtp,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1">
        <div className="relative">
          <input
            type="text"
            maxLength={6}
            value={otpInput}
            onChange={(e) => onChangeOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            autoFocus
            required
            className="w-full px-4 py-3 text-center tracking-[0.5em] font-mono text-xl font-black rounded-2xl border-2 border-amber-300 focus:outline-none focus:border-[#5D4037] bg-amber-50/40 text-stone-900"
          />
          <KeyRound className="w-4 h-4 text-amber-600 absolute left-4 top-4" />
        </div>
        <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
          <span>Kedaluwarsa: {formatTimer(expiresIn)}</span>
          <span>Percobaan: {attemptsRemaining} kali</span>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2.5 rounded-2xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
      >
        <ShieldCheck className="w-4 h-4" />
        <span>Verifikasi & Masuk</span>
      </button>
    </form>
  );
};

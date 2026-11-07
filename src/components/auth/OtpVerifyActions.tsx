import React from 'react';
import { RefreshCw } from 'lucide-react';

interface OtpVerifyActionsProps {
  cooldown: number;
  onChangeEmail: () => void;
  onResend: () => void;
}

export const OtpVerifyActions: React.FC<OtpVerifyActionsProps> = ({
  cooldown,
  onChangeEmail,
  onResend,
}) => {
  return (
    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
      <button
        type="button"
        onClick={onChangeEmail}
        className="text-stone-500 hover:text-stone-800 font-semibold"
      >
        Ganti Alamat Email
      </button>

      <button
        type="button"
        disabled={cooldown > 0}
        onClick={onResend}
        className="text-[#5D4037] hover:underline font-bold flex items-center gap-1 disabled:opacity-50"
      >
        <RefreshCw className="w-3 h-3" />
        <span>{cooldown > 0 ? `Kirim ulang (${cooldown}s)` : 'Kirim Ulang OTP'}</span>
      </button>
    </div>
  );
};

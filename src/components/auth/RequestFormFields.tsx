import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

interface RequestFormFieldsProps {
  emailInput: string;
  cooldown: number;
  localError: string | null;
  onEmailChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

export const RequestFormFields: React.FC<RequestFormFieldsProps> = ({
  emailInput,
  cooldown,
  localError,
  onEmailChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {localError && <p className="text-xs text-rose-600 font-semibold text-center">{localError}</p>}
      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-700 block">Alamat Email Aktif</label>
        <div className="relative">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="nama@email.com"
            required
            className="w-full px-3 py-2.5 pl-10 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5D4037] text-xs font-medium"
          />
          <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
        </div>
      </div>
      <button
        type="submit"
        disabled={cooldown > 0}
        className="w-full py-2.5 rounded-2xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
      >
        <span>{cooldown > 0 ? `Tunggu ${cooldown}d` : 'Kirim Kode OTP'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} className="w-full py-2 text-center text-xs font-bold text-stone-500 hover:text-stone-800">
          Batal
        </button>
      )}
    </form>
  );
};

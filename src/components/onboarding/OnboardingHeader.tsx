import React from 'react';

export const OnboardingHeader: React.FC<{ email: string; step: 1 | 2; onCancel: () => void }> = ({ email, step, onCancel }) => (
  <>
    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#5D4037] flex items-center justify-center font-bold text-xs">
          {step}/2
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-stone-900 leading-tight">Lengkapi Profil Pengguna Baru</h3>
          <p className="text-[11px] text-stone-500 font-mono">{email}</p>
        </div>
      </div>
      <button onClick={onCancel} className="text-xs text-stone-400 hover:text-stone-600 font-medium">Batal</button>
    </div>
    <div className="grid grid-cols-2 gap-2 my-3">
      <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-[#5D4037]' : 'bg-stone-200'}`} />
      <div className={`h-1.5 rounded-full ${step >= 2 ? 'bg-[#5D4037]' : 'bg-stone-200'}`} />
    </div>
  </>
);

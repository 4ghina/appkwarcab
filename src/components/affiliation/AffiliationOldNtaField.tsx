import React from 'react';

interface AffiliationOldNtaFieldProps {
  hasOldNTA: boolean;
  onHasOldNTAChange: (has: boolean) => void;
  oldNTANumber: string;
  onOldNTANumberChange: (n: string) => void;
}

export const AffiliationOldNtaField: React.FC<AffiliationOldNtaFieldProps> = (p) => (
  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={p.hasOldNTA}
        onChange={(e) => p.onHasOldNTAChange(e.target.checked)}
        className="rounded text-[#5D4037]"
      />
      <span className="text-stone-800 font-bold">Saya sudah memiliki Nomor NTA Lama</span>
    </label>
    {p.hasOldNTA && (
      <input
        type="text"
        value={p.oldNTANumber}
        onChange={(e) => p.onOldNTANumberChange(e.target.value)}
        placeholder="Contoh: 09.22.01.00421"
        className="w-full p-2 bg-white rounded-xl border border-stone-300 font-mono"
      />
    )}
  </div>
);

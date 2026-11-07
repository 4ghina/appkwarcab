import React from 'react';

interface SkuSubmissionFormBodyProps {
  description: string;
  note: string;
  setNote(n: string): void;
}

export const SkuSubmissionFormBody: React.FC<SkuSubmissionFormBodyProps> = ({ description, note, setNote }) => (
  <div className="space-y-2 text-xs">
    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
      <p className="font-bold text-stone-900">{description}</p>
    </div>
    <div>
      <label className="block text-[11px] font-bold text-stone-700 mb-1">
        Catatan Pengamalan / Bukti Pelaksanaan:
      </label>
      <textarea
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ceritakan kapan, di mana, dan bagaimana Anda mengamalkan atau mempraktikkan syarat ini..."
        className="w-full p-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#5D4037]"
      />
    </div>
    <div className="p-2 rounded-xl bg-amber-50 text-[10px] text-amber-900 border border-amber-200">
      Sesuai aturan, pengujian dan pengesahan butir hanya dapat dilakukan oleh Pembina Satuan yang sah.
    </div>
  </div>
);

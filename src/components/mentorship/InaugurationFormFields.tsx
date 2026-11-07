import React from 'react';

interface InaugurationFormFieldsProps {
  skNumber: string;
  onSkNumberChange(n: string): void;
  inaugurationDate: string;
  onInaugurationDateChange(d: string): void;
  notes: string;
  onNotesChange(n: string): void;
}

export const InaugurationFormFields: React.FC<InaugurationFormFieldsProps> = ({
  skNumber,
  onSkNumberChange,
  inaugurationDate,
  onInaugurationDateChange,
  notes,
  onNotesChange,
}) => (
  <div className="space-y-3 text-xs">
    <div>
      <label className="block text-[11px] font-bold text-stone-700 mb-1">
        Nomor Surat Keputusan (SK) Gugus Depan:
      </label>
      <input
        type="text"
        value={skNumber}
        onChange={(e) => onSkNumberChange(e.target.value)}
        placeholder="Contoh: SK/015/GUDP-045/2026"
        className="w-full p-2.5 text-xs rounded-xl bg-white border border-stone-200 font-mono focus:outline-none"
      />
    </div>
    <div>
      <label className="block text-[11px] font-bold text-stone-700 mb-1">
        Tanggal Upacara Pelantikan:
      </label>
      <input
        type="text"
        value={inaugurationDate}
        onChange={(e) => onInaugurationDateChange(e.target.value)}
        className="w-full p-2.5 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none"
      />
    </div>
    <div>
      <label className="block text-[11px] font-bold text-stone-700 mb-1">
        Catatan Pelantikan:
      </label>
      <textarea
        rows={2}
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Tempat upacara, saksi, atau pesan pembinaan..."
        className="w-full p-2.5 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none"
      />
    </div>
  </div>
);

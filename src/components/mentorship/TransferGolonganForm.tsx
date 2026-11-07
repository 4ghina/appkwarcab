import React from 'react';
import { YouthGolongan } from '../../types/scout';

interface TransferGolonganFormProps {
  targetGolongan: YouthGolongan;
  onTargetGolonganChange(g: YouthGolongan): void;
  decreeNumber: string;
  onDecreeNumberChange(n: string): void;
}

export const TransferGolonganForm: React.FC<TransferGolonganFormProps> = ({
  targetGolongan,
  onTargetGolonganChange,
  decreeNumber,
  onDecreeNumberChange,
}) => (
  <div className="space-y-3 text-xs">
    <div>
      <label className="block text-[11px] font-bold text-stone-700 mb-1">Golongan Baru:</label>
      <select
        value={targetGolongan}
        onChange={(e) => onTargetGolonganChange(e.target.value as YouthGolongan)}
        className="w-full p-2.5 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none"
      >
        <option value="Penggalang">Penggalang (11 - 15 Tahun)</option>
        <option value="Penegak">Penegak (16 - 20 Tahun)</option>
        <option value="Pandega">Pandega (21 - 25 Tahun)</option>
      </select>
    </div>
    <div>
      <label className="block text-[11px] font-bold text-stone-700 mb-1">
        Nomor Berita Acara / Rekomendasi Pindah Golongan:
      </label>
      <input
        type="text"
        value={decreeNumber}
        onChange={(e) => onDecreeNumberChange(e.target.value)}
        placeholder="Contoh: BA/004/PINDAH-GOL/2026"
        className="w-full p-2.5 text-xs rounded-xl bg-white border border-stone-200 font-mono focus:outline-none"
      />
    </div>
  </div>
);

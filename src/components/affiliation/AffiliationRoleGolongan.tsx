import React from 'react';
import { ScoutGolongan } from '../../types/scout';

interface AffiliationRoleGolonganProps {
  appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf' | 'Orang Tua/Wali';
  onRoleChange: (r: any) => void;
  targetGolongan: ScoutGolongan;
  onGolonganChange: (g: ScoutGolongan) => void;
}

export const AffiliationRoleGolongan: React.FC<AffiliationRoleGolonganProps> = (p) => (
  <div className="grid grid-cols-2 gap-2">
    <div>
      <label className="block text-stone-700 font-bold mb-1">Peran Diajukan:</label>
      <select
        value={p.appliedRole}
        onChange={(e) => p.onRoleChange(e.target.value)}
        className="w-full p-2 bg-white rounded-xl border border-stone-300"
      >
        <option value="Peserta Didik">Peserta Didik</option>
        <option value="Pembina Satuan">Pembina Satuan</option>
        <option value="Pengurus Gudep/Staf">Pengurus Gudep</option>
        <option value="Orang Tua/Wali">Orang Tua / Wali</option>
      </select>
    </div>
    <div>
      <label className="block text-stone-700 font-bold mb-1">Golongan:</label>
      <select
        value={p.targetGolongan}
        onChange={(e) => p.onGolonganChange(e.target.value as any)}
        className="w-full p-2 bg-white rounded-xl border border-stone-300"
      >
        <option value="Siaga">Siaga</option>
        <option value="Penggalang">Penggalang</option>
        <option value="Penegak">Penegak</option>
        <option value="Pandega">Pandega</option>
      </select>
    </div>
  </div>
);

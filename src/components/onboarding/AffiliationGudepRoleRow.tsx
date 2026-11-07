import React from 'react';
import { ScoutGolongan } from '../../types/scout';

interface AffiliationGudepRoleRowProps {
  appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf';
  setAppliedRole(role: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf'): void;
  appliedGolongan: ScoutGolongan;
  setAppliedGolongan(gol: ScoutGolongan): void;
}

export const AffiliationGudepRoleRow: React.FC<AffiliationGudepRoleRowProps> = (p) => (
  <div className="grid grid-cols-2 gap-2">
    <div>
      <label className="text-[10px] font-bold text-stone-700 block mb-1">Peran Diajukan:</label>
      <select
        value={p.appliedRole}
        onChange={(e) => p.setAppliedRole(e.target.value as any)}
        className="w-full p-2 text-xs bg-white rounded-xl border border-stone-300 text-stone-900"
      >
        <option value="Peserta Didik">Peserta Didik</option>
        <option value="Pembina Satuan">Pembina Satuan</option>
        <option value="Pengurus Gudep/Staf">Pengurus / Staf</option>
      </select>
    </div>
    <div>
      <label className="text-[10px] font-bold text-stone-700 block mb-1">Golongan:</label>
      <select
        value={p.appliedGolongan}
        onChange={(e) => p.setAppliedGolongan(e.target.value as any)}
        className="w-full p-2 text-xs bg-white rounded-xl border border-stone-300 text-stone-900"
      >
        <option value="Siaga">Siaga (7-10 th)</option>
        <option value="Penggalang">Penggalang (11-15 th)</option>
        <option value="Penegak">Penegak (16-20 th)</option>
        <option value="Pandega">Pandega (21-25 th)</option>
      </select>
    </div>
  </div>
);

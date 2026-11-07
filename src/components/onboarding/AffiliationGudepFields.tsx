import React from 'react';
import { MOCK_GUDEP_LIST } from '../../data/mockData';
import { ScoutGolongan } from '../../types/scout';
import { AffiliationGudepRoleRow } from './AffiliationGudepRoleRow';

interface AffiliationGudepFieldsProps {
  selectedGudepId: string;
  setSelectedGudepId(id: string): void;
  appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf';
  setAppliedRole(role: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf'): void;
  appliedGolongan: ScoutGolongan;
  setAppliedGolongan(gol: ScoutGolongan): void;
  claimOldNta: string;
  setClaimOldNta(nta: string): void;
}

export const AffiliationGudepFields: React.FC<AffiliationGudepFieldsProps> = (p) => (
  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5 text-xs animate-in fade-in duration-150">
    <div>
      <label className="text-[10px] font-bold text-stone-700 block mb-1">Pilih Gugus Depan Pangkalan:</label>
      <select
        value={p.selectedGudepId}
        onChange={(e) => p.setSelectedGudepId(e.target.value)}
        className="w-full p-2 text-xs bg-white rounded-xl border border-stone-300 text-stone-900"
      >
        {MOCK_GUDEP_LIST.map((g) => (
          <option key={g.id} value={g.id}>
            {g.pangkalan} (Gudep {g.nomorPa}/{g.nomorPi} - Kwarran {g.kwarran})
          </option>
        ))}
      </select>
    </div>

    <AffiliationGudepRoleRow
      appliedRole={p.appliedRole}
      setAppliedRole={p.setAppliedRole}
      appliedGolongan={p.appliedGolongan}
      setAppliedGolongan={p.setAppliedGolongan}
    />

    <div>
      <label className="text-[10px] font-bold text-stone-700 block mb-1">Klaim NTA Lama (Opsional):</label>
      <input
        type="text"
        value={p.claimOldNta}
        onChange={(e) => p.setClaimOldNta(e.target.value)}
        placeholder="Contoh: 11.23.01.00421"
        className="w-full p-2 text-xs bg-white rounded-xl border border-stone-300 font-mono text-stone-900"
      />
    </div>
  </div>
);

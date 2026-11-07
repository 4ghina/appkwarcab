import React from 'react';
import { MOCK_GUDEP_LIST } from '../../data/mockData';

interface AffiliationParentFieldsProps {
  childName: string;
  setChildName(name: string): void;
  childGolongan: 'Siaga' | 'Penggalang';
  setChildGolongan(gol: 'Siaga' | 'Penggalang'): void;
  selectedGudepId: string;
  setSelectedGudepId(id: string): void;
}

export const AffiliationParentFields: React.FC<AffiliationParentFieldsProps> = (p) => (
  <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-2 text-xs animate-in fade-in duration-150">
    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900 block">
      Data Anak yang Didampingi (Binaan 1)
    </span>

    <div>
      <label className="text-[10px] font-bold text-stone-700 block mb-1">Nama Lengkap Anak:</label>
      <input
        type="text"
        required
        value={p.childName}
        onChange={(e) => p.setChildName(e.target.value)}
        placeholder="Contoh: Muhammad Rizky Al-Fatih"
        className="w-full p-2 text-xs bg-white rounded-xl border border-stone-300 text-stone-900"
      />
    </div>

    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="text-[10px] font-bold text-stone-700 block mb-1">Golongan Anak:</label>
        <select
          value={p.childGolongan}
          onChange={(e) => p.setChildGolongan(e.target.value as any)}
          className="w-full p-2 text-xs bg-white rounded-xl border border-stone-300 text-stone-900"
        >
          <option value="Siaga">Siaga (SD)</option>
          <option value="Penggalang">Penggalang (SMP)</option>
        </select>
      </div>
      <div>
        <label className="text-[10px] font-bold text-stone-700 block mb-1">Gudep Sekolah:</label>
        <select
          value={p.selectedGudepId}
          onChange={(e) => p.setSelectedGudepId(e.target.value)}
          className="w-full p-2 text-xs bg-white rounded-xl border border-stone-300 text-stone-900"
        >
          {MOCK_GUDEP_LIST.map((g) => (
            <option key={g.id} value={g.id}>{g.pangkalan}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

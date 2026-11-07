import React from 'react';

interface BioDateGenderProps {
  birthDate: string;
  setBirthDate(v: string): void;
  gender: 'L' | 'P';
  setGender(v: 'L' | 'P'): void;
}

export const BioDateGenderFields: React.FC<BioDateGenderProps> = ({
  birthDate,
  setBirthDate,
  gender,
  setGender
}) => (
  <div className="grid grid-cols-2 gap-2.5">
    <div className="space-y-1">
      <label className="text-xs font-bold text-stone-700 block">Tanggal Lahir *</label>
      <input
        type="date"
        required
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        className="w-full p-2 text-xs bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#5D4037]/30 text-stone-900"
      />
    </div>

    <div className="space-y-1">
      <label className="text-xs font-bold text-stone-700 block">Jenis Kelamin *</label>
      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => setGender('L')}
          className={`py-2 text-xs rounded-xl font-bold border transition-all ${
            gender === 'L' ? 'bg-[#5D4037] text-white border-[#5D4037] shadow-xs' : 'bg-stone-50 text-stone-700 border-stone-200'
          }`}
        >
          Putra (L)
        </button>
        <button
          type="button"
          onClick={() => setGender('P')}
          className={`py-2 text-xs rounded-xl font-bold border transition-all ${
            gender === 'P' ? 'bg-[#5D4037] text-white border-[#5D4037] shadow-xs' : 'bg-stone-50 text-stone-700 border-stone-200'
          }`}
        >
          Putri (P)
        </button>
      </div>
    </div>
  </div>
);

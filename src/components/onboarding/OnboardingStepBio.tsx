import React from 'react';
import { Info, ChevronRight } from 'lucide-react';
import { BioDateGenderFields } from './BioDateGenderFields';

interface OnboardingStepBioProps {
  fullName: string;
  setFullName(v: string): void;
  birthDate: string;
  setBirthDate(v: string): void;
  gender: 'L' | 'P';
  setGender(v: 'L' | 'P'): void;
  phone: string;
  setPhone(v: string): void;
  onNext(e: React.FormEvent): void;
}

export const OnboardingStepBio: React.FC<OnboardingStepBioProps> = (p) => (
  <form onSubmit={p.onNext} className="space-y-3.5">
    <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2">
      <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
      <p className="leading-tight">
        Email Anda telah terverifikasi. Silakan masukkan data dasar identitas Anda untuk pendaftaran SIM-KWARCAB.
      </p>
    </div>

    <div className="space-y-1">
      <label className="text-xs font-bold text-stone-700 block">Nama Lengkap Sesuai Akta / KTP / Ijazah *</label>
      <input
        type="text"
        required
        value={p.fullName}
        onChange={(e) => p.setFullName(e.target.value)}
        placeholder="Contoh: Ananda Bagas Pratama"
        className="w-full p-2.5 text-xs bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#5D4037]/30 text-stone-900 font-medium"
      />
    </div>

    <BioDateGenderFields birthDate={p.birthDate} setBirthDate={p.setBirthDate} gender={p.gender} setGender={p.setGender} />

    <div className="space-y-1">
      <label className="text-xs font-bold text-stone-700 block">Nomor WhatsApp / HP Aktif</label>
      <input
        type="tel"
        value={p.phone}
        onChange={(e) => p.setPhone(e.target.value)}
        placeholder="Contoh: 081234567890"
        className="w-full p-2.5 text-xs bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#5D4037]/30 text-stone-900"
      />
    </div>

    <button
      type="submit"
      disabled={!p.fullName.trim()}
      className={`w-full mt-2 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all ${
        p.fullName.trim() ? 'bg-[#5D4037] hover:bg-[#4E342E] text-white active:scale-95' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
      }`}
    >
      <span>Lanjut: Keterkaitan Organisasi</span>
      <ChevronRight className="w-4 h-4" />
    </button>
  </form>
);

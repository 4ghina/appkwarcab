import React from 'react';
import { Heart } from 'lucide-react';

interface AffiliationTypeSelectorProps {
  type: 'none' | 'gudep' | 'parent';
  onChange(t: 'none' | 'gudep' | 'parent'): void;
}

const OPTIONS = [
  {
    key: 'none' as const,
    title: 'Belum bergabung dengan Gugus Depan',
    desc: 'Selesaikan pendaftaran sebagai Tamu Terdaftar. Anda tetap dapat membaca info publik dan mengajukan pangkalan nanti.'
  },
  {
    key: 'gudep' as const,
    title: 'Ajukan pengaitan ke Gugus Depan sekarang',
    desc: 'Pilih pangkalan sekolah Anda. Berkas akan masuk ke antrean verifikasi Pembina untuk penerbitan NTA resmi.'
  },
  {
    key: 'parent' as const,
    title: 'Akun Orang Tua / Wali Murid',
    desc: 'Khusus mendampingi anggota anak (Siaga/Penggalang) yang belum memiliki email atau smartphone pribadi.',
    isParent: true
  }
];

export const AffiliationTypeSelector: React.FC<AffiliationTypeSelectorProps> = ({ type, onChange }) => (
  <div className="space-y-2">
    {OPTIONS.map((opt) => (
      <div
        key={opt.key}
        onClick={() => onChange(opt.key)}
        className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
          type === opt.key ? 'border-amber-600 bg-amber-50/70 shadow-xs' : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            {opt.isParent && <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
            <h4 className="font-bold text-stone-900 text-xs">{opt.title}</h4>
          </div>
          {type === opt.key && <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0 mt-1" />}
        </div>
        <p className={`text-[10px] text-stone-500 mt-0.5 leading-relaxed ${opt.isParent ? 'pl-5' : ''}`}>
          {opt.desc}
        </p>
      </div>
    ))}
  </div>
);

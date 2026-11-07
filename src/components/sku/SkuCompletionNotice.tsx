import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface SkuCompletionNoticeProps {
  targetGolongan: string;
  targetTingkat: string;
}

export const SkuCompletionNotice: React.FC<SkuCompletionNoticeProps> = ({ targetGolongan, targetTingkat }) => (
  <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border border-emerald-300 text-emerald-950 shadow-xs space-y-2">
    <div className="flex items-center gap-2">
      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
        Seluruh Butir SKU {targetGolongan} {targetTingkat} Terpenuhi (100%)
      </h4>
    </div>
    <p className="text-xs text-emerald-800 leading-relaxed">
      Selamat! Anda telah menyelesaikan seluruh butir persyaratan tingkat <strong>{targetTingkat}</strong>. Sesuai petunjuk penyelenggaraan, capaian 100% tidak otomatis menaikkan tingkat anggota di sistem. Pembina Satuan berwenang akan melakukan Verifikasi Kelayakan Kenaikan Tingkat.
    </p>
    <div className="flex items-center gap-2 pt-1">
      <span className="px-2.5 py-1 rounded-full bg-emerald-200/80 text-emerald-900 font-bold text-[10px]">
        Status: Menunggu Verifikasi Kelayakan oleh Pembina
      </span>
    </div>
  </div>
);

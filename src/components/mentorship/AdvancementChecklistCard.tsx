import React from 'react';
import { Check } from 'lucide-react';
import { BinaanStudent } from '../../types/scout';

export const AdvancementChecklistCard: React.FC<{ student: BinaanStudent }> = ({ student }) => (
  <div className="p-3 bg-emerald-50 rounded-2xl text-xs space-y-2 border border-emerald-200">
    <div className="flex items-center justify-between font-bold text-emerald-950">
      <span>Pemeriksaan Kelengkapan:</span>
      <span className="font-mono text-emerald-800">{student.skuPassed}/{student.skuTotal} Butir (Lengkap)</span>
    </div>
    <div className="space-y-1 text-[11px] text-emerald-900">
      <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" /><span>Seluruh butir wajib telah lulus ujian</span></div>
      <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" /><span>Cabang persyaratan agama telah diverifikasi</span></div>
      <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" /><span>Tidak ada pengajuan wajib yang tertunda atau direvisi</span></div>
    </div>
  </div>
);

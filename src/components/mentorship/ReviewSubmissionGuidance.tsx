import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ReviewSubmissionGuidanceProps {
  examinerName: string;
  examinerNta?: string;
}

export const ReviewSubmissionGuidance: React.FC<ReviewSubmissionGuidanceProps> = ({ examinerName, examinerNta }) => (
  <>
    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-700 space-y-1">
      <div className="flex items-center justify-between font-bold text-stone-900">
        <span>Alur Pengesahan:</span>
        <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 text-[10px]">Tahap 1: Pengesahan Butir Tunggal</span>
      </div>
      <p className="text-[10px] leading-relaxed text-stone-600">
        Pengesahan butir SKU mencatat pemenuhan syarat dalam buku saku digital peserta didik. Kenaikan tingkat resmi dan penyematan tanda kecakapan dilakukan terpisah setelah seluruh syarat lengkap.
      </p>
    </div>
    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2">
      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
      <div><strong>Pengesah Sah:</strong> {examinerName} (NTA: {examinerNta || '09.22.00.00012'}).</div>
    </div>
  </>
);

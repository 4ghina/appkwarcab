import React from 'react';
import { GudepData, ScoutGolongan } from '../../types/scout';

interface AffiliationSummaryStepProps {
  selectedGudep: GudepData;
  appliedRole: string;
  targetGolongan: ScoutGolongan;
  hasOldNTA: boolean;
  oldNTANumber: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export const AffiliationSummaryStep: React.FC<AffiliationSummaryStepProps> = ({
  selectedGudep,
  appliedRole,
  targetGolongan,
  hasOldNTA,
  oldNTANumber,
  isSubmitting,
  onSubmit,
  onBack
}) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
        <h4 className="font-bold text-stone-900">Ringkasan Pengajuan Pengaitan</h4>
        <p><strong>Gudep Tujuan:</strong> {selectedGudep.pangkalan}</p>
        <p><strong>Kwartir Ranting:</strong> {selectedGudep.kwarran}</p>
        <p><strong>Peran Diajukan:</strong> {appliedRole}</p>
        <p><strong>Golongan:</strong> {targetGolongan}</p>
        {hasOldNTA && oldNTANumber && <p><strong>Klaim NTA Lama:</strong> {oldNTANumber}</p>}
      </div>

      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
        Permohonan akan diproses oleh Pembina Satuan di Gugus Depan terkait. Setelah disetujui, NTA resmi dan hak akses kepanduan akan aktif.
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Permohonan Pengaitan'}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 font-bold"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

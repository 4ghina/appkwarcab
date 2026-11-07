import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { GudepData } from '../../types/scout';
import { AffiliationSuccessNotice } from './AffiliationSuccessNotice';

interface AffiliationSuccessStepProps {
  selectedGudep: GudepData;
  appliedRole: string;
  onClose: () => void;
}

export const AffiliationSuccessStep: React.FC<AffiliationSuccessStepProps> = ({
  selectedGudep,
  appliedRole,
  onClose
}) => (
  <div className="my-4 space-y-4 animate-in zoom-in-95 duration-150">
    <div className="text-center space-y-2 py-2">
      <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
        <CheckCircle2 className="w-7 h-7" />
      </div>
      <h4 className="text-base font-extrabold text-stone-900">
        Pengajuan Berhasil Dikirim ke Gudep!
      </h4>
      <p className="text-xs text-stone-600">
        Permohonan pengaitan Anda telah masuk ke antrean verifikasi Pembina Satuan.
      </p>
    </div>
    <AffiliationSuccessNotice selectedGudep={selectedGudep} appliedRole={appliedRole} />
    <button
      type="button"
      onClick={onClose}
      className="w-full py-3 px-4 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold transition-all shadow-md active:scale-95"
    >
      Lihat Status di Beranda
    </button>
  </div>
);

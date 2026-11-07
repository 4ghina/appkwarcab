import React from 'react';
import { School, X } from 'lucide-react';

interface AffiliationModalHeaderProps {
  step: 'form' | 'summary' | 'success';
  onClose: () => void;
}

export const AffiliationModalHeader: React.FC<AffiliationModalHeaderProps> = ({ step, onClose }) => {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-stone-100 rounded-xl text-stone-800">
          <School className="w-5 h-5 text-[#5D4037]" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-stone-900">
            {step === 'form' && 'Pengaitan Gugus Depan'}
            {step === 'summary' && 'Konfirmasi Pengajuan'}
            {step === 'success' && 'Pengajuan Terkirim'}
          </h3>
          <p className="text-[11px] text-stone-500">
            {step === 'form' && 'Pilih pangkalan sekolah & tentukan peran'}
            {step === 'summary' && 'Periksa kembali data pengajuan Anda'}
            {step === 'success' && 'Tunggu verifikasi oleh Pembina Satuan'}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

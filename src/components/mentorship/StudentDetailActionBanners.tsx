import React from 'react';
import { AlertCircle } from 'lucide-react';
import { BinaanStudent, YouthGolongan } from '../../types/scout';

interface StudentDetailActionBannersProps {
  student: BinaanStudent;
  isAuthorized: boolean;
  assignedGolongan: YouthGolongan[];
  is100Percent: boolean;
  onOpenTransfer(): void;
  onOpenAdvancement(): void;
  onOpenInauguration(): void;
}

export const StudentDetailActionBanners: React.FC<StudentDetailActionBannersProps> = ({
  student,
  isAuthorized,
  assignedGolongan,
  is100Percent,
  onOpenTransfer,
  onOpenAdvancement,
  onOpenInauguration,
}) => (
  <>
    {!isAuthorized && (
      <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <div><strong>Pembatasan Kewenangan:</strong> Penugasan Anda [{assignedGolongan.join(', ')}] tidak mencakup Golongan {student.golongan}.</div>
      </div>
    )}

    {student.ageAnomalyNotice && (
      <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">{student.ageAnomalyNotice}</p>
        </div>
        <button onClick={onOpenTransfer} className="px-3 py-1.5 bg-amber-800 text-white rounded-xl text-[10px] font-bold shrink-0 hover:bg-amber-900">
          Proses Pindah Golongan
        </button>
      </div>
    )}

    {is100Percent && isAuthorized && (
      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3">
        <div>
          <h5 className="text-xs font-bold text-emerald-950">
            {student.advancementStatus === 'diverifikasi_layak' ? 'Kelayakan Telah Disahkan' : 'Seluruh Syarat SKU Terpenuhi (100%)'}
          </h5>
          <p className="text-[10px] text-emerald-800">
            {student.advancementStatus === 'diverifikasi_layak' ? 'Langkah berikutnya: Catat SK dan Pelantikan.' : 'Periksa dan sahkan kelayakan.'}
          </p>
        </div>
        {student.advancementStatus === 'diverifikasi_layak' ? (
          <button onClick={onOpenInauguration} className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold">
            Catat SK Pelantikan
          </button>
        ) : (
          <button onClick={onOpenAdvancement} className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold">
            Verifikasi Kelayakan
          </button>
        )}
      </div>
    )}
  </>
);

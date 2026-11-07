import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { BinaanStudent, YouthGolongan } from '../../types/scout';
import { TransferGolonganForm } from './TransferGolonganForm';

interface TransferGolonganModalProps {
  student: BinaanStudent;
  targetGolongan: YouthGolongan;
  onTargetGolonganChange(g: YouthGolongan): void;
  decreeNumber: string;
  onDecreeNumberChange(n: string): void;
  onSubmit(): void;
  onClose(): void;
}

export const TransferGolonganModal: React.FC<TransferGolonganModalProps> = ({
  student,
  targetGolongan,
  onTargetGolonganChange,
  decreeNumber,
  onDecreeNumberChange,
  onSubmit,
  onClose
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-amber-600" />
          <div>
            <h4 className="text-xs font-bold text-stone-900">Proses Perpindahan Golongan</h4>
            <p className="text-[10px] text-stone-500">{student.name} (Usia {student.age} Tahun)</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-full text-stone-400"><X className="w-4 h-4" /></button>
      </div>

      <div className="p-3 bg-amber-50 rounded-2xl text-xs space-y-1.5 border border-amber-200">
        <span className="font-bold text-amber-900 block">Ketentuan Perpindahan Golongan:</span>
        <p className="text-[11px] text-stone-700 leading-relaxed">
          Perpindahan golongan terjadi ketika usia peserta didik melampaui batas atas golongannya.
          Seluruh riwayat pencapaian lama ({student.golongan}) <strong>tetap tersimpan utuh dan tidak dikonversi otomatis</strong> menjadi kelulusan pada golongan baru.
        </p>
      </div>

      <TransferGolonganForm
        targetGolongan={targetGolongan}
        onTargetGolonganChange={onTargetGolonganChange}
        decreeNumber={decreeNumber}
        onDecreeNumberChange={onDecreeNumberChange}
      />

      <div className="flex items-center gap-2 pt-1">
        <button onClick={onSubmit} className="flex-1 py-2.5 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold">
          Sahkan Perpindahan Golongan
        </button>
        <button onClick={onClose} className="py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
          Batal
        </button>
      </div>
    </div>
  </div>
);

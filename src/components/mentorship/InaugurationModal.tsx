import React from 'react';
import { Award, X } from 'lucide-react';
import { BinaanStudent } from '../../types/scout';
import { InaugurationFormFields } from './InaugurationFormFields';

interface InaugurationModalProps {
  student: BinaanStudent;
  skNumber: string;
  onSkNumberChange(n: string): void;
  inaugurationDate: string;
  onInaugurationDateChange(d: string): void;
  notes: string;
  onNotesChange(n: string): void;
  onSubmit(): void;
  onClose(): void;
}

export const InaugurationModal: React.FC<InaugurationModalProps> = ({
  student,
  skNumber,
  onSkNumberChange,
  inaugurationDate,
  onInaugurationDateChange,
  notes,
  onNotesChange,
  onSubmit,
  onClose
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-600" />
          <div>
            <h4 className="text-xs font-bold text-stone-900">Catat Pelantikan & SK Kenaikan Tingkat</h4>
            <p className="text-[10px] text-stone-500">{student.name}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-full text-stone-400"><X className="w-4 h-4" /></button>
      </div>

      <InaugurationFormFields
        skNumber={skNumber}
        onSkNumberChange={onSkNumberChange}
        inaugurationDate={inaugurationDate}
        onInaugurationDateChange={onInaugurationDateChange}
        notes={notes}
        onNotesChange={onNotesChange}
      />

      <div className="p-2.5 bg-amber-50 rounded-xl text-[10px] text-amber-950">
        Setelah pelantikan dicatat, tingkat saat ini akan diarsipkan ke <strong>Riwayat Pencapaian</strong>, dan tingkat aktif diperbarui.
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onSubmit}
          disabled={!skNumber.trim()}
          className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
        >
          Simpan & Lantik Kenaikan Tingkat
        </button>
        <button onClick={onClose} className="py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
          Batal
        </button>
      </div>
    </div>
  </div>
);

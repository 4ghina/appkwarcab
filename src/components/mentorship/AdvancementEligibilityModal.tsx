import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { BinaanStudent } from '../../types/scout';
import { AdvancementChecklistCard } from './AdvancementChecklistCard';

interface AdvancementEligibilityModalProps {
  student: BinaanStudent;
  notes: string;
  onNotesChange(n: string): void;
  onSubmit(): void;
  onClose(): void;
}

export const AdvancementEligibilityModal: React.FC<AdvancementEligibilityModalProps> = ({
  student,
  notes,
  onNotesChange,
  onSubmit,
  onClose
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <div>
            <h4 className="text-xs font-bold text-stone-900">Verifikasi Kelayakan Kenaikan Tingkat</h4>
            <p className="text-[10px] text-stone-500">{student.name} ({student.golongan} {student.currentTingkat || student.tingkat})</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-full text-stone-400"><X className="w-4 h-4" /></button>
      </div>

      <AdvancementChecklistCard student={student} />

      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Catatan Rekomendasi Pembina Satuan:</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Rekomendasi kelayakan untuk pelantikan..."
          className="w-full p-2.5 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none"
        />
      </div>

      <div className="p-2.5 bg-stone-50 rounded-xl text-[10px] text-stone-600">
        <strong>Catatan Prosedural:</strong> Verifikasi ini menyatakan peserta didik layak untuk dilantik. Perubahan tingkat resmi di sistem akan berlaku setelah pencatatan Surat Keputusan (SK) dan Upacara Pelantikan.
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button onClick={onSubmit} className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold">
          Sahkan Status Diverifikasi Layak
        </button>
        <button onClick={onClose} className="py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
          Batal
        </button>
      </div>
    </div>
  </div>
);

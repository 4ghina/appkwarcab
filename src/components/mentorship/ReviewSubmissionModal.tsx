import React from 'react';
import { X } from 'lucide-react';
import { AssessmentSubmission } from '../../types/scout';
import { ReviewSubmissionGuidance } from './ReviewSubmissionGuidance';

interface ReviewSubmissionModalProps {
  item: AssessmentSubmission;
  decision: 'disahkan' | 'perlu_revisi';
  feedback: string;
  onFeedbackChange(f: string): void;
  examinerName: string;
  examinerNta?: string;
  onSubmit(): void;
  onClose(): void;
}

export const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({
  item,
  decision,
  feedback,
  onFeedbackChange,
  examinerName,
  examinerNta,
  onSubmit,
  onClose
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#5D4037]">Uji Penilaian Resmi</span>
          <h3 className="text-sm font-extrabold text-stone-900">
            {decision === 'disahkan' ? 'Pengesahan Butir SKU' : 'Kirim Catatan Perbaikan'}
          </h3>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 bg-stone-50 rounded-2xl text-xs space-y-1">
        <p className="font-bold text-stone-900">{item.itemTitle}</p>
        <p className="text-stone-600">Peserta: {item.studentName} ({item.studentTingkat})</p>
        <p className="text-stone-600">Gudep: {item.gudepName}</p>
      </div>

      <ReviewSubmissionGuidance examinerName={examinerName} examinerNta={examinerNta} />

      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Catatan Penguji / Arahan Pembina:</label>
        <textarea
          rows={3}
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          placeholder="Tuliskan catatan hasil ujian atau arahan..."
          className="w-full p-3 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-[#5D4037]"
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onSubmit}
          className={`flex-1 py-2.5 rounded-xl text-white text-xs font-bold shadow-xs ${
            decision === 'disahkan' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-rose-700 hover:bg-rose-800'
          }`}
        >
          {decision === 'disahkan' ? 'Sahkan Kelulusan Butir' : 'Kirim Catatan Perbaikan'}
        </button>
        <button onClick={onClose} className="py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200">
          Batal
        </button>
      </div>
    </div>
  </div>
);

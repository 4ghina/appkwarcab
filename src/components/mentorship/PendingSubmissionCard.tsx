import React from 'react';
import { AssessmentSubmission } from '../../types/scout';

interface PendingSubmissionCardProps {
  sub: AssessmentSubmission;
  isAuthorized: boolean;
  onOpenReview(sub: AssessmentSubmission, decision: 'disahkan' | 'perlu_revisi'): void;
}

export const PendingSubmissionCard: React.FC<PendingSubmissionCardProps> = ({ sub, isAuthorized, onOpenReview }) => (
  <div className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-2xs space-y-2">
    <div className="flex items-start justify-between gap-2">
      <div>
        <span className="text-[9px] font-bold text-amber-800 uppercase bg-amber-50 px-1.5 py-0.5 rounded">
          {sub.itemType} • {sub.category}
        </span>
        <h5 className="text-xs font-bold text-stone-900 mt-0.5">{sub.itemTitle}</h5>
      </div>
      <span className="text-[10px] text-stone-400 font-mono">{sub.submittedAt}</span>
    </div>
    <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl">"{sub.submissionNote}"</p>
    {isAuthorized && (
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onOpenReview(sub, 'disahkan')}
          className="flex-1 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs"
        >
          Sahkan Butir SKU
        </button>
        <button
          onClick={() => onOpenReview(sub, 'perlu_revisi')}
          className="flex-1 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-xs"
        >
          Kirim Catatan Perbaikan
        </button>
      </div>
    )}
  </div>
);

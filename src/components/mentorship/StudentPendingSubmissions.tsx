import React from 'react';
import { Clock } from 'lucide-react';
import { AssessmentSubmission } from '../../types/scout';
import { PendingSubmissionCard } from './PendingSubmissionCard';

interface StudentPendingSubmissionsProps {
  submissions: AssessmentSubmission[];
  isAuthorized: boolean;
  onOpenReview(sub: AssessmentSubmission, decision: 'disahkan' | 'perlu_revisi'): void;
}

export const StudentPendingSubmissions: React.FC<StudentPendingSubmissionsProps> = ({
  submissions,
  isAuthorized,
  onOpenReview
}) => {
  const pending = submissions.filter(s => s.status === 'diajukan');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D4037] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span>Pengajuan Uji Menunggu Pemeriksaan ({pending.length})</span>
        </h4>
      </div>

      {pending.length === 0 ? (
        <div className="p-3.5 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
          Tidak ada pengajuan uji butir yang sedang menunggu dari peserta didik ini.
        </div>
      ) : (
        pending.map((sub) => (
          <PendingSubmissionCard
            key={sub.id}
            sub={sub}
            isAuthorized={isAuthorized}
            onOpenReview={onOpenReview}
          />
        ))
      )}
    </div>
  );
};

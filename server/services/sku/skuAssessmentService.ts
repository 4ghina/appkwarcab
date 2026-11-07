export interface ReviewAssessmentInput {
  submissionId: string;
  decision: 'disahkan' | 'perlu_revisi';
  examinerName: string;
  examinerNta?: string;
  notes?: string;
}

export interface ReviewAssessmentOutput {
  status: 'disahkan' | 'perlu_revisi';
  reviewedAt: string;
  examinerName: string;
  examinerNta: string;
  notes: string;
}

/**
 * Tanggung Jawab: Melakukan penilaian butir uji kecakapan oleh Pembina berwenang.
 */
export function processAssessmentReview(input: ReviewAssessmentInput): ReviewAssessmentOutput {
  const now = new Date();
  const dateStr = `${now.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'][now.getMonth()]} ${now.getFullYear()}`;

  return {
    status: input.decision,
    reviewedAt: dateStr,
    examinerName: input.examinerName || 'Kak Suryono, S.Pd.',
    examinerNta: input.examinerNta || '09.22.00.00012',
    notes: input.notes || (input.decision === 'disahkan' ? 'Lulus pengujian dengan baik.' : 'Lengkapi dokumentasi portofolio.'),
  };
}

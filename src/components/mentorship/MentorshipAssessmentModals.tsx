import React from 'react';
import { UserProfile, BinaanStudent, AssessmentSubmission } from '../../types/scout';
import { SKUMasterItem } from '../../data/skuMasterBank';
import { ReviewSubmissionModal } from './ReviewSubmissionModal';
import { DirectTestingModal } from './DirectTestingModal';

interface MentorshipAssessmentModalsProps {
  user: UserProfile;
  selectedStudent: BinaanStudent | null;
  activeReviewItem: AssessmentSubmission | null;
  reviewDecision: 'disahkan' | 'perlu_revisi';
  reviewerFeedback: string;
  onReviewerFeedbackChange(f: string): void;
  onSubmitReview(): void;
  onCloseReview(): void;
  testingItem: SKUMasterItem | null;
  testMethod: 'praktek' | 'pengamatan' | 'wawancara' | 'tertulis';
  onTestMethodChange(m: 'praktek' | 'pengamatan' | 'wawancara' | 'tertulis'): void;
  testNotes: string;
  onTestNotesChange(n: string): void;
  onSubmitDirectTest(): void;
  onCloseDirectTest(): void;
}

export const MentorshipAssessmentModals: React.FC<MentorshipAssessmentModalsProps> = (p) => (
  <>
    {p.activeReviewItem && (
      <ReviewSubmissionModal
        item={p.activeReviewItem}
        decision={p.reviewDecision}
        feedback={p.reviewerFeedback}
        onFeedbackChange={p.onReviewerFeedbackChange}
        examinerName={p.user.name}
        examinerNta={p.user.nta || undefined}
        onSubmit={p.onSubmitReview}
        onClose={p.onCloseReview}
      />
    )}
    {p.testingItem && p.selectedStudent && (
      <DirectTestingModal
        item={p.testingItem}
        studentName={p.selectedStudent.name}
        testMethod={p.testMethod}
        onTestMethodChange={p.onTestMethodChange}
        notes={p.testNotes}
        onNotesChange={p.onTestNotesChange}
        onSubmit={p.onSubmitDirectTest}
        onClose={p.onCloseDirectTest}
      />
    )}
  </>
);

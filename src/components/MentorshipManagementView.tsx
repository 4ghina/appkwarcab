import React from 'react';
import { UserProfile, BinaanStudent, AssessmentSubmission } from '../types/scout';
import { CheckCircle2 } from 'lucide-react';
import { MentorshipHeader } from './mentorship/MentorshipHeader';
import { StudentOrListSwitcher } from './mentorship/StudentOrListSwitcher';
import { MentorshipModalsHub } from './mentorship/MentorshipModalsHub';
import { useMentorshipWorkspace } from './mentorship/useMentorshipWorkspace';

export interface MentorshipManagementViewProps {
  user: UserProfile;
  students?: BinaanStudent[];
  binaanStudents?: BinaanStudent[];
  submissions?: AssessmentSubmission[];
  assessmentQueue?: AssessmentSubmission[];
  onReviewSubmission?: (id: string, dec: 'disahkan' | 'perlu_revisi', fb: string, cert?: string) => void;
  onApproveAssessment?: (submissionId: string, notes?: string) => void;
  onReviseAssessment?: (submissionId: string, feedback: string) => void;
  onDirectTestPass?: (studentId: string, skuNumber: number, notes?: string) => void;
  onClose?: () => void;
}

export const MentorshipManagementView: React.FC<MentorshipManagementViewProps> = (p) => {
  const studentsList = p.students || p.binaanStudents || [];
  const submissionsList = p.submissions || p.assessmentQueue || [];
  const handleReview = p.onReviewSubmission || ((id: string, dec: 'disahkan' | 'perlu_revisi', fb: string) => {
    if (dec === 'disahkan') p.onApproveAssessment?.(id, fb);
    else p.onReviseAssessment?.(id, fb);
  });
  const ws = useMentorshipWorkspace(p.user, studentsList, submissionsList, handleReview);
  const filteredStudents = ws.students.filter(s => {
    const match = s.name.toLowerCase().includes(ws.searchQuery.toLowerCase()) || (s.nta && s.nta.includes(ws.searchQuery));
    return match && (ws.categoryFilter === 'Semua' || s.golongan === ws.categoryFilter);
  });
  const pendingSubmissions = ws.submissions.filter(s => s.status === 'diajukan');

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150 space-y-4">
      <MentorshipHeader user={p.user} gudepScope={ws.gudepScope} totalStudents={ws.students.length} pendingCount={pendingSubmissions.length} onClose={p.onClose} />
      {ws.toastMessage && (
        <div className="p-3 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" /><span>{ws.toastMessage}</span>
        </div>
      )}
      <StudentOrListSwitcher ws={ws} user={p.user} filteredStudents={filteredStudents} />
      <MentorshipModalsHub
        activeReviewItem={ws.activeReviewItem} reviewDecision={ws.reviewDecision} reviewerFeedback={ws.reviewerFeedback}
        onReviewDecisionChange={ws.setReviewDecision} onReviewerFeedbackChange={ws.setReviewerFeedback}
        onSubmitReview={ws.handleSubmitReview} onCloseReview={() => ws.setActiveReviewItem(null)}
        testingItem={ws.testingItem} testMethod={ws.testMethod} testNotes={ws.testNotes}
        onTestMethodChange={ws.setTestMethod} onTestNotesChange={ws.setTestNotes}
        onConfirmDirectEndorse={ws.handleDirectPointEndorse} onCloseTesting={() => ws.setTestingItem(null)}
        selectedStudent={ws.selectedStudent} showAdvancementModal={ws.showAdvancementModal}
        advancementNotes={ws.advancementNotes} onAdvancementNotesChange={ws.setAdvancementNotes}
        onConfirmVerifyEligibility={() => ws.setShowAdvancementModal(false)} onCloseAdvancement={() => ws.setShowAdvancementModal(false)}
        showInaugurationModal={ws.showInaugurationModal} skNumber={ws.skNumber} inaugurationDate={ws.inaugurationDate}
        inaugurationNotes={ws.inaugurationNotes} onSkNumberChange={ws.setSkNumber} onInaugurationDateChange={ws.setInaugurationDate}
        onInaugurationNotesChange={ws.setInaugurationNotes} onConfirmInauguration={() => ws.setShowInaugurationModal(false)}
        onCloseInauguration={() => ws.setShowInaugurationModal(false)} showTransferModal={ws.showTransferModal}
        transferTargetGolongan={ws.transferTargetGolongan} transferDecreeNumber={ws.transferDecreeNumber}
        onTransferTargetGolonganChange={ws.setTransferTargetGolongan} onTransferDecreeNumberChange={ws.setTransferDecreeNumber}
        onConfirmTransfer={() => ws.setShowTransferModal(false)} onCloseTransfer={() => ws.setShowTransferModal(false)}
      />
    </div>
  );
};

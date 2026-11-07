import React from 'react';
import { BinaanStudent, AssessmentSubmission, YouthGolongan } from '../../types/scout';
import { SKUMasterItem } from '../../data/skuMasterBank';
import { StudentDetailHeader } from './StudentDetailHeader';
import { StudentPendingSubmissions } from './StudentPendingSubmissions';
import { StudentMasterSkuBank } from './StudentMasterSkuBank';

interface StudentWorkspaceViewProps {
  selectedStudent: BinaanStudent;
  isExaminerAuthorized: boolean;
  assignedGolongan: YouthGolongan[];
  submissions: AssessmentSubmission[];
  masterItems: SKUMasterItem[];
  onBack: () => void;
  onOpenTransfer: () => void;
  onOpenAdvancement: () => void;
  onOpenInauguration: () => void;
  onOpenReview: (sub: AssessmentSubmission, dec: 'disahkan' | 'perlu_revisi') => void;
  onStartDirectTest: (item: SKUMasterItem) => void;
}

export const StudentWorkspaceView: React.FC<StudentWorkspaceViewProps> = ({
  selectedStudent,
  isExaminerAuthorized,
  assignedGolongan,
  submissions,
  masterItems,
  onBack,
  onOpenTransfer,
  onOpenAdvancement,
  onOpenInauguration,
  onOpenReview,
  onStartDirectTest
}) => {
  const sGol = selectedStudent.golongan || 'Penegak';
  const sTingkat = selectedStudent.currentTingkat || 'Bantara';

  return (
    <div className="space-y-4">
      <StudentDetailHeader
        student={selectedStudent}
        isAuthorized={isExaminerAuthorized}
        assignedGolongan={assignedGolongan}
        onBack={onBack}
        onOpenTransfer={onOpenTransfer}
        onOpenAdvancement={onOpenAdvancement}
        onOpenInauguration={onOpenInauguration}
      />
      <StudentPendingSubmissions
        submissions={submissions.filter(s => s.studentId === selectedStudent.userId)}
        isAuthorized={isExaminerAuthorized}
        onOpenReview={onOpenReview}
      />
      <StudentMasterSkuBank
        golongan={sGol}
        tingkat={sTingkat}
        items={masterItems}
        passedCount={selectedStudent.skuPassed}
        isAuthorized={isExaminerAuthorized}
        onStartDirectTest={onStartDirectTest}
      />
    </div>
  );
};

import React from 'react';
import { UserProfile, BinaanStudent, AssessmentSubmission } from '../types/scout';
import { MentorshipManagementView } from './MentorshipManagementView';

export interface PembinaanPesertaDidikViewProps {
  user: UserProfile;
  binaanStudents: BinaanStudent[];
  assessmentQueue: AssessmentSubmission[];
  onApproveAssessment: (submissionId: string, notes?: string) => void;
  onReviseAssessment: (submissionId: string, feedback: string) => void;
  onDirectTestPass?: (studentId: string, skuNumber: number, notes?: string) => void;
  onClose?: () => void;
}

export const PembinaanPesertaDidikView: React.FC<PembinaanPesertaDidikViewProps> = (props) => {
  return (
    <MentorshipManagementView
      user={props.user}
      binaanStudents={props.binaanStudents}
      assessmentQueue={props.assessmentQueue}
      onApproveAssessment={props.onApproveAssessment}
      onReviseAssessment={props.onReviseAssessment}
      onDirectTestPass={props.onDirectTestPass}
      onClose={props.onClose}
    />
  );
};

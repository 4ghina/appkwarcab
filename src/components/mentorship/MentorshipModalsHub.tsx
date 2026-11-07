import React from 'react';
import { MentorshipAssessmentModals } from './MentorshipAssessmentModals';
import { MentorshipAdvancementModals } from './MentorshipAdvancementModals';

export const MentorshipModalsHub: React.FC<any> = (props) => (
  <>
    <MentorshipAssessmentModals {...props} />
    <MentorshipAdvancementModals {...props} />
  </>
);

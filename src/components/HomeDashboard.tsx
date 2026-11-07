import React, { useState } from 'react';
import {
  UserProfile,
  SKUItem,
  SKKBadge,
  SKKRequirement,
  CabangEvent,
  VerificationItem,
  BinaanStudent,
  AssessmentSubmission,
  GudepData
} from '../types/scout';
import { ContextualHelpModal } from './ContextualHelpModal';
import { HomeHeaderAndActions, HomeTasksAndTools, HomeSectionsProps } from './home/HomeMainSections';

interface HomeDashboardProps {
  user: UserProfile;
  skuList: SKUItem[];
  skkBadges: SKKBadge[];
  skkRequirements?: SKKRequirement[];
  assessmentQueue?: AssessmentSubmission[];
  binaanStudents?: BinaanStudent[];
  events: CabangEvent[];
  verificationQueue: VerificationItem[];
  gudepList?: GudepData[];
  onUpdateUser?: (updatedUser: UserProfile) => void;
  onNavigateTab: (tabId: string) => void;
  onOpenSKUModal: () => void;
  onOpenGarudaModal: () => void;
  onOpenGudepMapModal: () => void;
  onOpenSakaModal: () => void;
  onOpenPusdiklatModal: () => void;
  onOpenEventsModal: () => void;
  onOpenVerificationModal: () => void;
  onOpenPembinaanModal?: () => void;
  onOpenSettingsModal?: () => void;
  onOpenAffiliationModal?: () => void;
  onOpenParentWardModal?: () => void;
  onOpenAuth?: () => void;
  onOpenPublicVerifyModal?: () => void;
  onOpenRfidModal?: () => void;
  onOpenPublicWebsite?: () => void;
  onChangeActiveContext?: (contextId: string) => void;
  onOpenVerifyIdModal?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = (props) => {
  const [helpTopic, setHelpTopic] = useState<string | null>(null);

  const sectionsProps: HomeSectionsProps = {
    ...props,
    assessmentQueue: props.assessmentQueue || [],
    binaanStudents: props.binaanStudents || [],
    gudepList: props.gudepList || [],
    onOpenHelp: (topic) => setHelpTopic(topic),
    onOpenVerifyId: props.onOpenVerifyIdModal,
  };

  return (
    <div className="w-full space-y-4 pb-20 animate-in fade-in duration-150">
      <HomeHeaderAndActions {...sectionsProps} />
      <HomeTasksAndTools {...sectionsProps} />
      {helpTopic && (
        <ContextualHelpModal
          isOpen={true}
          onClose={() => setHelpTopic(null)}
          initialTopic={helpTopic}
          currentUser={props.user}
        />
      )}
    </div>
  );
};

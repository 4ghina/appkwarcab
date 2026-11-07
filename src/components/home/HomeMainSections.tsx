import React from 'react';
import {
  UserProfile,
  SKUItem,
  CabangEvent,
  VerificationItem,
  BinaanStudent,
  AssessmentSubmission,
  GudepData
} from '../../types/scout';
import { HomeMembershipSummary } from './HomeMembershipSummary';
import { HomeNextActionCard } from './HomeNextActionCard';
import { HomeRoleTaskSection } from './HomeRoleTaskSection';
import { HomeQuickAccessGrid } from './HomeQuickAccessGrid';
import { HeroCarousel } from '../HeroCarousel';
import { ScoutAnalyticsDashboard } from '../ScoutAnalyticsDashboard';

export interface HomeSectionsProps {
  user: UserProfile;
  skuList: SKUItem[];
  assessmentQueue: AssessmentSubmission[];
  binaanStudents: BinaanStudent[];
  verificationQueue: VerificationItem[];
  gudepList: GudepData[];
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
  onOpenPublicVerifyModal?: () => void;
  onOpenRfidModal?: () => void;
  onChangeActiveContext?: (contextId: string) => void;
  onOpenHelp: (topic: string) => void;
  onOpenVerifyId?: () => void;
}

export const HomeHeaderAndActions: React.FC<HomeSectionsProps> = (p) => {
  const pendingCount = p.verificationQueue.filter((v) => v.status === 'Pending').length;
  return (
    <>
      <HomeMembershipSummary
        user={p.user}
        onOpenHelp={p.onOpenHelp}
        onChangeActiveContext={p.onChangeActiveContext}
        onOpenVerifyId={p.onOpenVerifyId}
      />
      <HomeNextActionCard
        user={p.user}
        skuList={p.skuList}
        assessmentQueue={p.assessmentQueue}
        pendingVerifCount={pendingCount}
        onOpenSKU={p.onOpenSKUModal}
        onOpenAffiliation={() => p.onOpenAffiliationModal?.()}
        onOpenProfile={() => p.onNavigateTab('profil')}
        onOpenPembinaan={() => p.onOpenPembinaanModal?.()}
        onOpenVerification={p.onOpenVerificationModal}
        onOpenEvents={p.onOpenEventsModal}
        onOpenVerifyId={p.onOpenVerifyId}
      />
      <HeroCarousel />
    </>
  );
};

export const HomeTasksAndTools: React.FC<HomeSectionsProps> = (p) => {
  const pendingCount = p.verificationQueue.filter((v) => v.status === 'Pending').length;
  return (
    <>
      <HomeRoleTaskSection
        user={p.user}
        skuList={p.skuList}
        assessmentQueue={p.assessmentQueue}
        binaanStudents={p.binaanStudents}
        pendingVerifCount={pendingCount}
        onOpenSKU={p.onOpenSKUModal}
        onOpenPembinaan={() => p.onOpenPembinaanModal?.()}
        onOpenVerification={p.onOpenVerificationModal}
      />
      <ScoutAnalyticsDashboard
        user={p.user}
        binaanStudents={p.binaanStudents}
        assessmentQueue={p.assessmentQueue}
        gudepList={p.gudepList}
        onOpenPembinaan={p.onOpenPembinaanModal}
        onOpenGudepMap={p.onOpenGudepMapModal}
        onOpenGaruda={p.onOpenGarudaModal}
      />
      <HomeQuickAccessGrid
        user={p.user}
        onOpenSKU={p.onOpenSKUModal}
        onOpenGaruda={p.onOpenGarudaModal}
        onOpenGudepMap={p.onOpenGudepMapModal}
        onOpenSaka={p.onOpenSakaModal}
        onOpenPusdiklat={p.onOpenPusdiklatModal}
        onOpenEvents={p.onOpenEventsModal}
        onOpenVerification={p.onOpenVerificationModal}
        onOpenPembinaan={() => p.onOpenPembinaanModal?.()}
        onOpenSettings={() => p.onOpenSettingsModal?.()}
        onOpenAffiliation={() => p.onOpenAffiliationModal?.()}
        onOpenParentWard={() => p.onOpenParentWardModal?.()}
        onOpenRfid={() => p.onOpenRfidModal?.()}
        onOpenPublicVerify={() => p.onOpenPublicVerifyModal?.()}
      />
    </>
  );
};

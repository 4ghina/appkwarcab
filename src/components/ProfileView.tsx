import React from 'react';
import { UserProfile, SKUItem, SKKBadge } from '../types/scout';
import { ContextualHelpModal } from './ContextualHelpModal';
import { ProfileTopSection } from './profile/ProfileTopSection';
import { AyoPramukaOfficialCopyCard } from './profile/AyoPramukaOfficialCopyCard';
import { ProfileYouthBento } from './profile/ProfileYouthBento';

import { ProfileAdultCredentials } from './profile/ProfileAdultCredentials';
import { ProfileBioDetailsCard } from './profile/ProfileBioDetailsCard';
import { ProfileAssignmentsCard } from './profile/ProfileAssignmentsCard';
import { ProfileBottomActions } from './profile/ProfileBottomActions';
import { ProfileEditModal } from './profile/ProfileEditModal';
import { useProfileState } from './profile/useProfileState';

interface ProfileViewProps {
  user: UserProfile;
  skuList: SKUItem[];
  skkBadges: SKKBadge[];
  onUpdateUser?(updatedUser: UserProfile): void;
  onOpenSKUModal(): void;
  onOpenGarudaModal(): void;
  onOpenSakaModal(): void;
  onOpenAffiliationModal(): void;
  onOpenAuth(): void;
  onOpenPembinaanModal?(): void;
  onOpenVerifyId?(): void;
}

function ProfileCredentialsSection({ user, skuList, skkBadges, onOpenSKUModal, onOpenGarudaModal }: any) {
  if (user.memberCategory === 'peserta_didik') {
    return (
      <ProfileYouthBento
        user={user}
        skuList={skuList}
        skkBadges={skkBadges}
        onOpenSKUModal={onOpenSKUModal}
        onOpenGarudaModal={onOpenGarudaModal}
      />
    );
  }
  return <ProfileAdultCredentials user={user} />;
}

function ProfileModals({ s, user }: any) {
  return (
    <>
      <ContextualHelpModal isOpen={s.showHelpModal} onClose={() => s.setShowHelpModal(false)} currentUser={user} initialTopic="profil" />
      <ProfileEditModal user={user} isOpen={s.showEditModal} onClose={() => s.setShowEditModal(false)} onSave={s.handleSaveUser} />
    </>
  );
}

export const ProfileView: React.FC<ProfileViewProps> = (p) => {
  const s = useProfileState(p.onUpdateUser);

  return (
    <div className="w-full space-y-4 pb-24 animate-in fade-in duration-150">
      <ProfileTopSection user={p.user} toastMessage={s.toastMessage} onOpenAuth={p.onOpenAuth} onOpenAffiliationModal={p.onOpenAffiliationModal} onOpenVerifyId={p.onOpenVerifyId} />
      <AyoPramukaOfficialCopyCard user={p.user} />
      <ProfileCredentialsSection user={p.user} skuList={p.skuList} skkBadges={p.skkBadges} onOpenSKUModal={p.onOpenSKUModal} onOpenGarudaModal={p.onOpenGarudaModal} />
      <ProfileBioDetailsCard user={p.user} onEdit={() => s.setShowEditModal(true)} />
      <ProfileAssignmentsCard assignments={p.user.assignments} />
      <ProfileBottomActions onDownloadPdf={s.handleDownloadPdf} onOpenHelp={() => s.setShowHelpModal(true)} />
      <ProfileModals s={s} user={p.user} />
    </div>
  );
};

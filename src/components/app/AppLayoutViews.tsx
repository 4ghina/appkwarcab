import React from 'react';
import { UserProfile, ScoutRole } from '../../types/scout';
import { TabId, BottomNavBar } from '../BottomNavBar';
import { DesktopLayout } from '../DesktopLayout';
import { MobileFrame } from '../MobileFrame';
import { RoleSwitcher } from '../RoleSwitcher';
import { AppPortalRouter, PortalRouterProps } from './AppPortalRouter';
import { AppGlobalModals } from './AppGlobalModals';
import { Globe } from 'lucide-react';

interface LayoutViewProps {
  routerProps: PortalRouterProps;
  currentRole: ScoutRole;
  handleRoleChange: (r: ScoutRole) => void;
  pendingCount: number;
  globalModalProps: any;
}

export const AppDesktopView: React.FC<LayoutViewProps> = ({
  routerProps,
  currentRole,
  handleRoleChange,
  pendingCount,
  globalModalProps
}) => {
  const { activeUser, activeTab, setActiveModal, setActiveTab, navigateTo, setShowAuthModal, setShowAffiliationModal, setShowParentWardModal } = routerProps;
  return (
    <DesktopLayout
      currentUser={activeUser}
      currentRole={currentRole}
      onRoleChange={handleRoleChange}
      activeTab={activeTab}
      onSelectTab={(tab) => { setActiveModal(null); setActiveTab(tab); }}
      onOpenAuth={() => setShowAuthModal(true)}
      onOpenAffiliation={() => setShowAffiliationModal(true)}
      onOpenParentWard={() => setShowParentWardModal(true)}
      onOpenModal={(modalId) => setActiveModal(modalId)}
      onOpenPublicWebsite={() => navigateTo('public')}
      pendingVerificationsCount={pendingCount}
    >
      <div className="mb-4">
        <RoleSwitcher
          currentRole={activeUser.role}
          onRoleChange={handleRoleChange}
          onOpenAuth={() => setShowAuthModal(true)}
          userEmail={activeUser.email}
          membershipStatus={activeUser.membershipStatus}
        />
      </div>
      <AppPortalRouter {...routerProps} />
      <AppGlobalModals {...globalModalProps} />
    </DesktopLayout>
  );
};

export const AppMobileView: React.FC<LayoutViewProps> = ({
  routerProps,
  handleRoleChange,
  globalModalProps
}) => {
  const { activeUser, activeModal, activeTab, setActiveModal, setActiveTab, navigateTo, setShowAuthModal } = routerProps;
  return (
    <MobileFrame>
      <div className="mb-2 flex items-center justify-between px-2 py-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
        <span className="font-extrabold text-[#5D4037] flex items-center gap-1">
          <span>⚜️ Portal Anggota</span>
        </span>
        <button onClick={() => navigateTo('public')} className="font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1 text-[11px]">
          <Globe className="w-3.5 h-3.5 text-amber-700" />
          <span>Lihat Website Publik</span>
        </button>
      </div>
      <RoleSwitcher
        currentRole={activeUser.role}
        onRoleChange={handleRoleChange}
        onOpenAuth={() => setShowAuthModal(true)}
        userEmail={activeUser.email}
        membershipStatus={activeUser.membershipStatus}
      />
      <div className="pt-2">
        <AppPortalRouter {...routerProps} />
      </div>
      <BottomNavBar
        activeTab={activeModal ? (activeModal as TabId) : activeTab}
        onTabChange={(tab) => { setActiveModal(null); setActiveTab(tab); }}
        hasGarudaActive={activeUser.isGaruda}
      />
      <AppGlobalModals {...globalModalProps} />
    </MobileFrame>
  );
};

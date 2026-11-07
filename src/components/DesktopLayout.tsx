import React from 'react';
import { useApp } from '../context/AppContext';
import { ScoutRole, UserProfile } from '../types/scout';
import { TabId } from './BottomNavBar';
import { DesktopHeader } from './desktop/DesktopHeader';
import { DesktopSidebar } from './desktop/DesktopSidebar';
import { buildPrimaryNav, buildSecondaryNav } from './desktop/desktopNavHelper';

interface DesktopLayoutProps {
  currentUser: UserProfile | null;
  currentRole: ScoutRole;
  onRoleChange: (role: ScoutRole) => void;
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onOpenAuth: () => void;
  onOpenAffiliation: () => void;
  onOpenParentWard: () => void;
  onOpenModal: (modalId: string) => void;
  onOpenPublicWebsite?: () => void;
  pendingVerificationsCount: number;
  children: React.ReactNode;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = (p) => {
  const { config, t, viewportMode, setViewportMode } = useApp();
  const navItems = buildPrimaryNav(t);
  const secondaryNavItems = buildSecondaryNav(t, p.currentUser, p.pendingVerificationsCount);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      <DesktopHeader
        currentUser={p.currentUser}
        currentRole={p.currentRole}
        onRoleChange={p.onRoleChange}
        config={config}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        onOpenPublicWebsite={p.onOpenPublicWebsite}
        onOpenAuth={p.onOpenAuth}
        onOpenModal={p.onOpenModal}
      />
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 flex-1 flex gap-6">
        <DesktopSidebar
          navItems={navItems}
          secondaryNavItems={secondaryNavItems}
          activeTab={p.activeTab}
          onSelectTab={p.onSelectTab}
          onOpenModal={p.onOpenModal}
        />
        <main className="flex-1 min-w-0">{p.children}</main>
      </div>
      <footer className="bg-white border-t border-stone-200/80 py-4 px-4 text-center text-xs text-stone-500">
        <p>{config?.footerText || '© 2026 Kwartir Cabang Gerakan Pramuka Kota Depok.'}</p>
      </footer>
    </div>
  );
};

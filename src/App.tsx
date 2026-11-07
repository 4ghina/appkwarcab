/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserProfile } from './types/scout';
import { INITIAL_SKU_ITEMS_BY_GOLONGAN } from './data/mockData';
import { AppProvider, useApp } from './context/AppContext';
import { useAppNavigation } from './components/app/useAppNavigation';
import { useScoutAppState } from './components/app/useScoutAppState';
import { PublicWebsiteView, KwarranPublicView, GudepPublicView } from './components/app/AppPublicRouteImports';
import { PublicVerifierRouteView, PublicMasukRouteView, AdminRouteView, PortalUnauthPrompt } from './components/app/AppPublicRoutes';
import { submitSkuForTestingAction, submitSkkForApprovalAction, reviewSubmissionAction } from './components/app/appActionHandlers';
import { submitAffiliationAction, approveVerificationAction, rejectVerificationAction } from './components/app/appVerificationHandlers';
import { AppDesktopView, AppMobileView } from './components/app/AppLayoutViews';

function renderPublicRoute(nav: any, state: any, onLogin: (u: UserProfile) => void) {
  if (nav.currentRoute === 'public') {
    return <PublicWebsiteView currentUser={state.currentUser} events={state.eventsList} gudepList={state.gudepList} onOpenAuth={(r) => { if (r) nav.setReturnToUrl(r); nav.navigateTo('masuk'); }} onOpenPortal={() => nav.navigateTo('portal')} onOpenVerifier={() => nav.navigateTo('verifikasi')} onSelectKwarranDetail={(k) => nav.navigateTo('ranting', k)} onSelectGudepDetail={(g) => nav.navigateTo('gudep', g.id)} />;
  }
  if (nav.currentRoute === 'ranting') return <KwarranPublicView kwarranName={nav.routeSlug || 'Pancoran Mas'} gudepList={state.gudepList} onBack={() => nav.navigateTo('public')} onSelectGudep={(g) => nav.navigateTo('gudep', g.id)} />;
  if (nav.currentRoute === 'gudep') {
    const matched = state.gudepList.find((g: any) => g.id === nav.routeSlug) || state.gudepList[0];
    return <GudepPublicView gudep={matched} currentUser={state.currentUser} onBack={() => nav.navigateTo('public')} onApplyAffiliation={() => { state.setShowAffiliationModal(true); nav.navigateTo('portal'); }} onOpenAuth={() => nav.navigateTo('masuk')} />;
  }
  if (nav.currentRoute === 'verifikasi') return <PublicVerifierRouteView currentUser={state.currentUser} onBack={() => nav.navigateTo('public')} />;
  if (nav.currentRoute === 'masuk') return <PublicMasukRouteView accounts={state.accountsDb} onLoginSuccess={onLogin} onRegisterSuccess={state.handleRegisterAccount} onBack={() => nav.navigateTo('public')} />;
  if (nav.currentRoute === 'admin') return <AdminRouteView onBackToPortal={() => nav.navigateTo('portal')} onBackToPublic={() => nav.navigateTo('public')} />;
  if (!state.currentUser) return <PortalUnauthPrompt accounts={state.accountsDb} onLoginSuccess={onLogin} onRegisterSuccess={state.handleRegisterAccount} onBackToPublic={() => nav.navigateTo('public')} />;
  return null;
}

function createAppRouterProps(state: any, nav: any, activeUser: UserProfile) {
  return {
    activeModal: state.activeModal, activeTab: state.activeTab, activeUser,
    eventsList: state.eventsList, binaanStudents: state.binaanStudents, assessmentQueue: state.assessmentQueue,
    skuList: state.skuList, skkBadges: state.skkBadges, skkRequirements: state.skkRequirements,
    gudepList: state.gudepList, garudaApplications: state.garudaApplications, verificationQueue: state.verificationQueue,
    setActiveModal: state.setActiveModal, setActiveTab: state.setActiveTab,
    handleReviewSubmission: (id: string, dec: any, fb: string, c?: string) => reviewSubmissionAction(activeUser, state.assessmentQueue, id, dec, fb, c, state.setAssessmentQueue, state.setSkuList, state.setSkkBadges, state.setSkkRequirements),
    handleSubmitSKUForTesting: (id: string, note: string) => submitSkuForTestingAction(activeUser, state.skuList, id, note, state.setAssessmentQueue, state.setSkuList),
    handleSubmitSKKForApproval: (id: string, note: string) => submitSkkForApprovalAction(activeUser, state.skkRequirements, id, note, state.setAssessmentQueue, state.setSkkRequirements),
    handleApproveVerification: (id: string) => approveVerificationAction(activeUser, id, state.setCurrentUser, state.handleRegisterAccount, state.setVerificationQueue),
    handleRejectVerification: (id: string, note: string) => rejectVerificationAction(activeUser, id, note, state.setCurrentUser, state.handleRegisterAccount, state.setVerificationQueue),
    onUpdateUser: (u: UserProfile) => { state.setCurrentUser(u); state.handleRegisterAccount(u); },
    setShowAffiliationModal: state.setShowAffiliationModal, setShowParentWardModal: state.setShowParentWardModal,
    setShowAuthModal: state.setShowAuthModal, navigateTo: nav.navigateTo, handleActiveContextChange: state.handleActiveContextChange,
    setSkuList: state.setSkuList
  };
}

function createGlobalModalProps(state: any, activeUser: UserProfile, onLogin: (u: UserProfile) => void) {
  return {
    showAuthModal: state.showAuthModal, setShowAuthModal: state.setShowAuthModal,
    showAffiliationModal: state.showAffiliationModal, setShowAffiliationModal: state.setShowAffiliationModal,
    showParentWardModal: state.showParentWardModal, setShowParentWardModal: state.setShowParentWardModal,
    currentUser: activeUser, accountsDb: state.accountsDb, onLoginSuccess: onLogin,
    onRegisterAccount: state.handleRegisterAccount,
    onSubmitAffiliation: (d: any) => submitAffiliationAction(activeUser, d, state.setCurrentUser, state.handleRegisterAccount, state.setVerificationQueue, state.setShowAffiliationModal),
    onUpdateCurrentUser: (u: UserProfile) => { state.setCurrentUser(u); state.handleRegisterAccount(u); }
  };
}

function AppContent() {
  const { viewportMode } = useApp();
  const nav = useAppNavigation();
  const state = useScoutAppState();

  const handleLoginSuccess = (user: UserProfile) => {
    state.setCurrentUser(user);
    state.setCurrentRole(user.role);
    state.setShowAuthModal(false);
    state.setActiveModal(null);
    if (user.memberCategory === 'peserta_didik') {
      const g = user.youthGolongan || 'Penegak';
      state.setSkuList(INITIAL_SKU_ITEMS_BY_GOLONGAN[g] || INITIAL_SKU_ITEMS_BY_GOLONGAN.Penegak);
    }
    nav.navigateTo(nav.returnToUrl === '/portal' ? 'portal' : nav.returnToUrl);
  };

  const publicView = renderPublicRoute(nav, state, handleLoginSuccess);
  if (publicView) return publicView;

  const activeUser = state.currentUser!;
  const routerProps = createAppRouterProps(state, nav, activeUser);
  const globalModalProps = createGlobalModalProps(state, activeUser, handleLoginSuccess);
  const pendingCount = state.verificationQueue.filter((v: any) => v.status === 'Pending').length;
  const layoutProps = { routerProps, currentRole: state.currentRole, handleRoleChange: state.handleRoleChange, pendingCount, globalModalProps };

  return viewportMode === 'desktop' ? <AppDesktopView {...layoutProps} /> : <AppMobileView {...layoutProps} />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

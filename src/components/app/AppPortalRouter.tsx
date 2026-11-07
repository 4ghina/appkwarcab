import React from 'react';
import {
  UserProfile, SKUItem, SKKBadge, SKKRequirement, AssessmentSubmission,
  BinaanStudent, GudepData, GarudaApplication, CabangEvent, VerificationItem
} from '../../types/scout';
import { TabId } from '../BottomNavBar';
import { HomeDashboard } from '../HomeDashboard';
import { SKUProgressView } from '../SKUProgressView';
import { MentorshipManagementView } from '../MentorshipManagementView';
import { GarudaTrackerView } from '../GarudaTrackerView';
import { GudepMapView } from '../GudepMapView';
import { SakaKridaView } from '../SakaKridaView';
import { PusdiklatcabView } from '../PusdiklatcabView';
import { EventsView } from '../EventsView';
import { VerificationQueue } from '../VerificationQueue';
import { ProfileView } from '../ProfileView';
import { AppSettingsConsole } from '../AppSettingsConsole';
import { PublicDocumentVerifierModal } from '../PublicDocumentVerifierModal';
import { ContextualHelpModal } from '../ContextualHelpModal';
import { RfidNfcCardModule } from '../RfidNfcCardModule';
import { VerifyMemberIdModal } from '../auth/VerifyMemberIdModal';

export interface PortalRouterProps {
  activeModal: string | null;
  activeTab: TabId;
  activeUser: UserProfile;
  eventsList: CabangEvent[];
  binaanStudents: BinaanStudent[];
  assessmentQueue: AssessmentSubmission[];
  skuList: SKUItem[];
  skkBadges: SKKBadge[];
  skkRequirements: SKKRequirement[];
  gudepList: GudepData[];
  garudaApplications: GarudaApplication[];
  verificationQueue: VerificationItem[];
  setActiveModal: (m: string | null) => void;
  setActiveTab: (t: TabId) => void;
  handleReviewSubmission: (id: string, dec: any, fb: string, cert?: string) => void;
  handleSubmitSKUForTesting: (id: string, note: string) => void;
  handleSubmitSKKForApproval: (id: string, note: string) => void;
  handleApproveVerification: (id: string) => void;
  handleRejectVerification: (id: string, note: string) => void;
  onUpdateUser: (u: UserProfile) => void;
  setShowAffiliationModal: (v: boolean) => void;
  setShowParentWardModal: (v: boolean) => void;
  setShowAuthModal: (v: boolean) => void;
  navigateTo: (r: string, s?: string) => void;
  handleActiveContextChange: (c: string) => void;
  setSkuList: React.Dispatch<React.SetStateAction<SKUItem[]>>;
}

const renderPortalModal = (p: PortalRouterProps): React.ReactNode => {
  const { activeModal, activeUser, setActiveModal, setActiveTab } = p;
  if (!activeModal) return null;
  if (activeModal === 'settings') return <AppSettingsConsole />;
  if (activeModal === 'rfid') return <RfidNfcCardModule currentUser={activeUser} events={p.eventsList} onClose={() => setActiveModal(null)} />;
  if (activeModal === 'pembinaan') {
    return <MentorshipManagementView user={activeUser} students={p.binaanStudents} submissions={p.assessmentQueue} onReviewSubmission={p.handleReviewSubmission} onClose={() => setActiveModal(null)} />;
  }
  if (activeModal === 'sku') {
    return (
      <SKUProgressView
        user={activeUser} skuList={p.skuList} skkBadges={p.skkBadges} skkCatalog={p.skkRequirements}
        onClose={() => setActiveModal(null)}
        onUpdateSKU={(id, isPassed, testedBy, notes) => p.setSkuList(prev => prev.map(s => s.id === id ? { ...s, isPassed, testedBy, catatan: notes, testedDate: 'Hari ini' } : s))}
        onSubmitSKUForTesting={p.handleSubmitSKUForTesting}
        onSubmitSKKForApproval={p.handleSubmitSKKForApproval}
      />
    );
  }
  if (activeModal === 'garuda') return <GarudaTrackerView user={activeUser} applications={p.garudaApplications} onClose={() => setActiveModal(null)} />;
  if (activeModal === 'peta') return <GudepMapView gudepList={p.gudepList} onClose={() => setActiveModal(null)} />;
  if (activeModal === 'saka') return <SakaKridaView user={activeUser} onClose={() => setActiveModal(null)} />;
  if (activeModal === 'pusdiklat') return <PusdiklatcabView user={activeUser} onClose={() => setActiveModal(null)} />;
  if (activeModal === 'kegiatan') return <EventsView user={activeUser} events={p.eventsList} onClose={() => setActiveModal(null)} />;
  if (activeModal === 'verifikasi') {
    return <VerificationQueue user={activeUser} queue={p.verificationQueue} onApprove={p.handleApproveVerification} onRevise={p.handleRejectVerification} onClose={() => setActiveModal(null)} />;
  }
  if (activeModal === 'verify_doc') return <PublicDocumentVerifierModal isOpen={true} onClose={() => setActiveModal(null)} currentUser={activeUser} />;
  if (activeModal === 'help') return <ContextualHelpModal isOpen={true} onClose={() => setActiveModal(null)} currentUser={activeUser} />;
  if (activeModal === 'verify_id') {
    return (
      <VerifyMemberIdModal
        isOpen={true}
        onClose={() => setActiveModal(null)}
        currentUser={activeUser}
        onLinkedSuccess={(updated) => {
          p.onUpdateUser(updated);
          setActiveModal(null);
          setActiveTab('profil');
        }}
      />
    );
  }
  return null;
};

const renderPortalTab = (p: PortalRouterProps): React.ReactNode => {
  const { activeTab, activeUser, setActiveModal, setActiveTab } = p;
  if (activeTab === 'beranda') {
    return (
      <HomeDashboard
        user={activeUser} skuList={p.skuList} skkBadges={p.skkBadges} skkRequirements={p.skkRequirements}
        assessmentQueue={p.assessmentQueue} binaanStudents={p.binaanStudents} events={p.eventsList}
        verificationQueue={p.verificationQueue} gudepList={p.gudepList} onUpdateUser={p.onUpdateUser}
        onNavigateTab={(tab) => { setActiveModal(null); setActiveTab(tab as TabId); }}
        onOpenSKUModal={() => setActiveModal('sku')} onOpenGarudaModal={() => setActiveModal('garuda')}
        onOpenGudepMapModal={() => setActiveModal('peta')} onOpenSakaModal={() => setActiveModal('saka')}
        onOpenPusdiklatModal={() => setActiveModal('pusdiklat')} onOpenEventsModal={() => setActiveModal('kegiatan')}
        onOpenVerificationModal={() => setActiveModal('verifikasi')} onOpenPembinaanModal={() => setActiveModal('pembinaan')}
        onOpenSettingsModal={() => setActiveModal('settings')} onOpenAffiliationModal={() => p.setShowAffiliationModal(true)}
        onOpenParentWardModal={() => p.setShowParentWardModal(true)} onOpenAuth={() => p.setShowAuthModal(true)}
        onOpenPublicVerifyModal={() => setActiveModal('verify_doc')} onOpenRfidModal={() => setActiveModal('rfid')}
        onOpenPublicWebsite={() => p.navigateTo('public')} onChangeActiveContext={p.handleActiveContextChange}
        onOpenVerifyIdModal={() => setActiveModal('verify_id')}
      />
    );
  }
  if (activeTab === 'peta') return <GudepMapView gudepList={p.gudepList} />;
  if (activeTab === 'garuda') return <GarudaTrackerView user={activeUser} applications={p.garudaApplications} />;
  if (activeTab === 'kegiatan') return <EventsView user={activeUser} events={p.eventsList} />;
  if (activeTab === 'profil') {
    return (
      <ProfileView
        user={activeUser} skuList={p.skuList} skkBadges={p.skkBadges} onUpdateUser={p.onUpdateUser}
        onOpenSKUModal={() => setActiveModal('sku')} onOpenGarudaModal={() => setActiveModal('garuda')}
        onOpenSakaModal={() => setActiveModal('saka')} onOpenAffiliationModal={() => p.setShowAffiliationModal(true)}
        onOpenAuth={() => p.setShowAuthModal(true)} onOpenPembinaanModal={() => setActiveModal('pembinaan')}
        onOpenVerifyId={() => setActiveModal('verify_id')}
      />
    );
  }
  return null;
};

export const AppPortalRouter: React.FC<PortalRouterProps> = (props) => {
  if (props.activeModal) {
    return <>{renderPortalModal(props)}</>;
  }
  return <>{renderPortalTab(props)}</>;
};

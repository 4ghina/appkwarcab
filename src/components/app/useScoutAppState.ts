import { useState } from 'react';
import { ScoutRole, UserProfile } from '../../types/scout';
import { PROFILES_BY_ROLE, INITIAL_SKU_ITEMS_BY_GOLONGAN } from '../../data/mockData';
import { TabId } from '../BottomNavBar';
import { useScoutDomainData } from './useScoutDomainData';

export function useScoutAppState() {
  const [accountsDb, setAccountsDb] = useState<Record<string, UserProfile>>({ ...PROFILES_BY_ROLE });
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(PROFILES_BY_ROLE.penegak);
  const [currentRole, setCurrentRole] = useState<ScoutRole>('penegak');
  const [activeTab, setActiveTab] = useState<TabId>('beranda');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAffiliationModal, setShowAffiliationModal] = useState(false);
  const [showParentWardModal, setShowParentWardModal] = useState(false);
  const domain = useScoutDomainData();

  const handleRegisterAccount = (newUser: UserProfile) => {
    setAccountsDb(prev => {
      const existingKey = Object.keys(prev).find(k => prev[k].email.toLowerCase() === newUser.email.toLowerCase());
      return existingKey ? { ...prev, [existingKey]: newUser } : { ...prev, [newUser.id]: newUser };
    });
  };

  const handleRoleChange = (newRole: ScoutRole) => {
    setCurrentRole(newRole);
    const targetUser = accountsDb[newRole] || PROFILES_BY_ROLE[newRole] || PROFILES_BY_ROLE.penegak;
    setCurrentUser(targetUser);
    setActiveModal(null);
    if (targetUser.memberCategory === 'peserta_didik') {
      const g = targetUser.youthGolongan || 'Penegak';
      domain.setSkuList(INITIAL_SKU_ITEMS_BY_GOLONGAN[g] || INITIAL_SKU_ITEMS_BY_GOLONGAN.Penegak);
    }
  };

  const handleActiveContextChange = (contextId: string) => {
    if (!currentUser) return;
    const updated = { ...currentUser, activeContextId: contextId };
    setCurrentUser(updated);
    handleRegisterAccount(updated);
  };

  return {
    accountsDb, setAccountsDb, currentUser, setCurrentUser, currentRole, setCurrentRole,
    activeTab, setActiveTab, activeModal, setActiveModal, showAuthModal, setShowAuthModal,
    showAffiliationModal, setShowAffiliationModal, showParentWardModal, setShowParentWardModal,
    ...domain,
    handleRegisterAccount, handleRoleChange, handleActiveContextChange
  };
}

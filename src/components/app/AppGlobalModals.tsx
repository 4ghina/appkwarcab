import React from 'react';
import { UserProfile } from '../../types/scout';
import { AuthView } from '../AuthView';
import { GudepAffiliationModal } from '../GudepAffiliationModal';
import { ParentWardManager } from '../ParentWardManager';

interface AppGlobalModalsProps {
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
  showAffiliationModal: boolean;
  setShowAffiliationModal: (v: boolean) => void;
  showParentWardModal: boolean;
  setShowParentWardModal: (v: boolean) => void;
  currentUser: UserProfile;
  accountsDb: Record<string, UserProfile>;
  onLoginSuccess: (u: UserProfile) => void;
  onRegisterAccount: (u: UserProfile) => void;
  onSubmitAffiliation: (data: any) => void;
  onUpdateCurrentUser: (u: UserProfile) => void;
}

const GlobalAuthModal: React.FC<{
  show: boolean;
  onClose: () => void;
  accounts: Record<string, UserProfile>;
  onLogin: (u: UserProfile) => void;
  onRegister: (u: UserProfile) => void;
}> = ({ show, onClose, accounts, onLogin, onRegister }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-3 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center text-stone-700"
        >
          ✕
        </button>
        <AuthView accounts={accounts} onLoginSuccess={onLogin} onRegisterSuccess={onRegister} onCancel={onClose} />
      </div>
    </div>
  );
};

const GlobalParentWardModal: React.FC<{
  show: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdate: (u: UserProfile) => void;
}> = ({ show, onClose, user, onUpdate }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-4 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <ParentWardManager user={user} onUpdateUser={onUpdate} onClose={onClose} />
      </div>
    </div>
  );
};

export const AppGlobalModals: React.FC<AppGlobalModalsProps> = (p) => {
  return (
    <>
      <GlobalAuthModal
        show={p.showAuthModal}
        onClose={() => p.setShowAuthModal(false)}
        accounts={p.accountsDb}
        onLogin={p.onLoginSuccess}
        onRegister={p.onRegisterAccount}
      />
      {p.showAffiliationModal && (
        <GudepAffiliationModal
          user={p.currentUser}
          onClose={() => p.setShowAffiliationModal(false)}
          onSubmitApplication={p.onSubmitAffiliation}
        />
      )}
      <GlobalParentWardModal
        show={p.showParentWardModal}
        onClose={() => p.setShowParentWardModal(false)}
        user={p.currentUser}
        onUpdate={p.onUpdateCurrentUser}
      />
    </>
  );
};

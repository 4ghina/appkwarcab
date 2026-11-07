import React from 'react';
import { UserProfile, CabangEvent, GudepData } from '../../types/scout';
import { PublicWebsiteView } from '../PublicWebsiteView';
import { KwarranPublicView } from '../KwarranPublicView';
import { GudepPublicView } from '../GudepPublicView';
import { PublicDocumentVerifierModal } from '../PublicDocumentVerifierModal';
import { AppSettingsConsole } from '../AppSettingsConsole';
import { AuthView } from '../AuthView';
import { ArrowLeft } from 'lucide-react';

export const PublicVerifierRouteView: React.FC<{
  currentUser: UserProfile | null;
  onBack: () => void;
}> = ({ currentUser, onBack }) => (
  <div className="min-h-screen bg-[#FAF8F5] p-4 flex flex-col items-center justify-center">
    <div className="w-full max-w-md">
      <div className="mb-3">
        <button onClick={onBack} className="text-xs font-bold text-[#5D4037] flex items-center gap-1.5 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website Publik</span>
        </button>
      </div>
      <PublicDocumentVerifierModal isOpen={true} onClose={onBack} currentUser={currentUser} />
    </div>
  </div>
);

export const PublicMasukRouteView: React.FC<{
  accounts: Record<string, UserProfile>;
  onLoginSuccess: (u: UserProfile) => void;
  onRegisterSuccess: (u: UserProfile) => void;
  onBack: () => void;
}> = ({ accounts, onLoginSuccess, onRegisterSuccess, onBack }) => (
  <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md">
      <div className="mb-3">
        <button onClick={onBack} className="text-xs font-bold text-[#5D4037] flex items-center gap-1.5 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website Publik</span>
        </button>
      </div>
      <div className="bg-white rounded-3xl p-4 shadow-xl border border-stone-200">
        <AuthView accounts={accounts} onLoginSuccess={onLoginSuccess} onRegisterSuccess={onRegisterSuccess} onCancel={onBack} />
      </div>
    </div>
  </div>
);

export const AdminRouteView: React.FC<{ onBackToPortal: () => void; onBackToPublic: () => void }> = ({
  onBackToPortal,
  onBackToPublic
}) => (
  <div className="min-h-screen bg-[#FAF8F5] p-4 sm:p-6">
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBackToPortal} className="text-xs font-bold text-[#5D4037] flex items-center gap-1.5 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portal Anggota</span>
        </button>
        <button onClick={onBackToPublic} className="text-xs font-bold text-stone-600 hover:text-stone-900">
          Lihat Website Publik
        </button>
      </div>
      <AppSettingsConsole />
    </div>
  </div>
);

export const PortalUnauthPrompt: React.FC<{
  accounts: Record<string, UserProfile>;
  onLoginSuccess: (u: UserProfile) => void;
  onRegisterSuccess: (u: UserProfile) => void;
  onBackToPublic: () => void;
}> = ({ accounts, onLoginSuccess, onRegisterSuccess, onBackToPublic }) => (
  <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-xl border border-stone-200 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <h2 className="text-sm font-black text-stone-900">Masuk ke Portal Anggota</h2>
        <button onClick={onBackToPublic} className="text-xs font-bold text-[#5D4037] hover:underline">
          Website Publik
        </button>
      </div>
      <AuthView accounts={accounts} onLoginSuccess={onLoginSuccess} onRegisterSuccess={onRegisterSuccess} onCancel={onBackToPublic} />
    </div>
  </div>
);

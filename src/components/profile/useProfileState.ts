import { useState } from 'react';
import { UserProfile } from '../../types/scout';

export function useProfileState(onUpdateUser?: (updatedUser: UserProfile) => void) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleDownloadPdf = () => {
    setToastMessage('Biodata Anggota Pramuka (PDF) berhasil disiapkan.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveUser = (updatedUser: UserProfile) => {
    onUpdateUser?.(updatedUser);
    setToastMessage('Profil berhasil diperbarui dan disimpan!');
    setShowEditModal(false);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return {
    toastMessage, showEditModal, setShowEditModal, showHelpModal, setShowHelpModal,
    handleDownloadPdf, handleSaveUser
  };
}

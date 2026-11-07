import React, { useState } from 'react';
import { UserProfile } from '../types/scout';
import { getKtaTheme } from './kta/ktaTheme';
import { DigitalKtaFront } from './kta/DigitalKtaFront';
import { DigitalKtaModal } from './kta/DigitalKtaModal';

interface DigitalEKTAProps {
  user: UserProfile;
  isOpen?: boolean;
  onClose?: () => void;
  showModalTrigger?: boolean;
}

/**
 * Tanggung Jawab: Kartu Tanda Anggota Elektronik (E-KTA) interaktif dengan modal preview dan validasi QR.
 */
export const DigitalEKTA: React.FC<DigitalEKTAProps> = ({
  user,
  isOpen = false,
  onClose,
  showModalTrigger = true,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const isVerified = user.membershipStatus === 'verified' && Boolean(user.nta);
  const theme = getKtaTheme(user);

  const handleCardClick = () => {
    if (showModalTrigger) {
      setShowModal(true);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleCardClick}
        className={showModalTrigger ? 'cursor-pointer transition-transform hover:scale-[1.01]' : ''}
      >
        <DigitalKtaFront
          user={user}
          theme={theme}
          isVerified={isVerified}
          onOpenZoomQR={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <DigitalKtaModal
          user={user}
          theme={theme}
          isVerified={isVerified}
          onClose={() => {
            setShowModal(false);
            onClose?.();
          }}
        />
      )}
    </div>
  );
};

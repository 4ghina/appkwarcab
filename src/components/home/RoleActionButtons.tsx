import React from 'react';
import { UserProfile } from '../../types/scout';
import { YouthActionButtons } from './YouthActionButtons';
import { AdultActionButtons } from './AdultActionButtons';

interface RoleActionButtonsProps {
  user: UserProfile;
  onOpenSKU(): void;
  onOpenGaruda(): void;
  onOpenPembinaan(): void;
  onOpenPusdiklat(): void;
  onOpenVerification(): void;
  onOpenParentWard(): void;
}

export const RoleActionButtons: React.FC<RoleActionButtonsProps> = ({
  user,
  onOpenSKU,
  onOpenGaruda,
  onOpenPembinaan,
  onOpenPusdiklat,
  onOpenVerification,
  onOpenParentWard,
}) => {
  if (user.memberCategory === 'peserta_didik') {
    return <YouthActionButtons onOpenSKU={onOpenSKU} onOpenGaruda={onOpenGaruda} />;
  }

  return (
    <AdultActionButtons
      user={user}
      onOpenPembinaan={onOpenPembinaan}
      onOpenPusdiklat={onOpenPusdiklat}
      onOpenVerification={onOpenVerification}
      onOpenParentWard={onOpenParentWard}
    />
  );
};

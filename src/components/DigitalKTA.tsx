import React from 'react';
import { UserProfile } from '../types/scout';
import { DigitalEKTA } from './DigitalEKTA';

interface DigitalKTAProps {
  user: UserProfile;
}

/**
 * Tanggung Jawab: Kompatibilitas alias antarmuka DigitalKTA yang mendelegasikan ke DigitalEKTA.
 */
export const DigitalKTA: React.FC<DigitalKTAProps> = ({ user }) => {
  return <DigitalEKTA user={user} />;
};

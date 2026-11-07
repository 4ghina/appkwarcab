import React from 'react';
import { GudepData } from '../types/scout';
import { RealtimeDemographicsMap } from './map/RealtimeDemographicsMap';

export interface GudepMapViewProps {
  gudepList?: GudepData[];
  onClose?: () => void;
}

export const GudepMapView: React.FC<GudepMapViewProps> = ({ onClose }) => {
  return (
    <div className="w-full pb-20 animate-in fade-in duration-150">
      <RealtimeDemographicsMap onClose={onClose} />
    </div>
  );
};

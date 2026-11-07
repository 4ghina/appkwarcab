import React from 'react';
import { DemographicsMapDataset, MapGudepEntity, MapCoordinates } from './mapTypes';
import { EditKwarcabModal } from './EditKwarcabModal';
import { EditKwarranModal } from './EditKwarranModal';
import { EditGudepModal } from './EditGudepModal';

interface MapModalsContainerProps {
  dataset: DemographicsMapDataset;
  showEditKwarcab: boolean;
  showEditKwarran: boolean;
  gudepToEdit: MapGudepEntity | null | 'new';
  selectedKwarranId?: string;
  onCloseKwarcab: () => void;
  onCloseKwarran: () => void;
  onCloseGudep: () => void;
  onUpdateKwarcab: (data: any) => void;
  onUpdateKwarran: (id: string, data: any) => void;
  onSaveGudep: (data: any) => void;
  onRequestPick: (initial: MapCoordinates, cb: (c: MapCoordinates) => void) => void;
}

export const MapModalsContainer: React.FC<MapModalsContainerProps> = (p) => {
  return (
    <>
      {p.showEditKwarcab && (
        <EditKwarcabModal
          kwarcab={p.dataset.kwarcab}
          onSave={p.onUpdateKwarcab}
          onClose={p.onCloseKwarcab}
          onRequestPickCoordinate={p.onRequestPick}
        />
      )}

      {p.showEditKwarran && (
        <EditKwarranModal
          kwarrans={p.dataset.kwarrans}
          initialKwarranId={p.selectedKwarranId}
          onSave={p.onUpdateKwarran}
          onClose={p.onCloseKwarran}
          onRequestPickCoordinate={p.onRequestPick}
        />
      )}

      {p.gudepToEdit && (
        <EditGudepModal
          gudep={p.gudepToEdit === 'new' ? null : p.gudepToEdit}
          kwarrans={p.dataset.kwarrans}
          onSave={p.onSaveGudep}
          onClose={p.onCloseGudep}
          onRequestPickCoordinate={p.onRequestPick}
        />
      )}
    </>
  );
};

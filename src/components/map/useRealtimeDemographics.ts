import { useState, useEffect } from 'react';
import { DemographicsMapDataset, MapFilterState, MapRoleMode, MapGudepEntity, MapKwarranEntity, MapCoordinates } from './mapTypes';
import { INITIAL_MAP_DATASET } from './defaultMapData';
import { useMapCrudActions } from './useMapCrudActions';

export function useRealtimeDemographics() {
  const [dataset, setDataset] = useState<DemographicsMapDataset>(INITIAL_MAP_DATASET);
  const [activeRole, setActiveRole] = useState<MapRoleMode>('superadmin');
  const [filter, setFilter] = useState<MapFilterState>({
    kwarranId: 'all', jenjang: 'all', searchQuery: '',
    showBoundaries: true, showPins: true, showHeatmap: false, mapType: 'roadmap',
  });
  const [selectedGudep, setSelectedGudep] = useState<MapGudepEntity | null>(null);
  const [selectedKwarran, setSelectedKwarran] = useState<MapKwarranEntity | null>(null);
  const [showEditKwarcab, setShowEditKwarcab] = useState(false);
  const [showEditKwarran, setShowEditKwarran] = useState(false);
  const [gudepToEdit, setGudepToEdit] = useState<MapGudepEntity | null | 'new'>(null);
  const [pickingCallback, setPickingCallback] = useState<((coords: MapCoordinates) => void) | null>(null);
  const [pickedCoordinate, setPickedCoordinate] = useState<MapCoordinates | null>(null);

  useEffect(() => {
    fetch('/api/map/demographics').then((r) => (r.ok ? r.json() : null)).then((d) => {
      if (d?.success && d?.data) setDataset(d.data);
    }).catch(() => {});
  }, []);

  const crud = useMapCrudActions(dataset, setDataset, setSelectedGudep, setPickedCoordinate, setPickingCallback);

  return {
    dataset, activeRole, setActiveRole, filter, setFilter,
    selectedGudep, setSelectedGudep, selectedKwarran, setSelectedKwarran,
    showEditKwarcab, setShowEditKwarcab, showEditKwarran, setShowEditKwarran,
    gudepToEdit, setGudepToEdit, pickingCallback, pickedCoordinate,
    ...crud
  };
}

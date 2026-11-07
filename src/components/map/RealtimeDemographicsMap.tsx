import React from 'react';
import { useRealtimeDemographics } from './useRealtimeDemographics';
import { DemographicsSummaryBar } from './DemographicsSummaryBar';
import { MapHeaderBanner } from './MapHeaderBanner';
import { MapToolbar } from './MapToolbar';
import { GoogleMapCanvas } from './GoogleMapCanvas';
import { GudepDetailDrawer } from './GudepDetailDrawer';
import { MapModalsContainer } from './MapModalsContainer';

function filterGudepsList(gudeps: any[], filter: any) {
  const q = filter.searchQuery.toLowerCase();
  return gudeps.filter((g) => {
    const matchKw = filter.kwarranId === 'all' || g.kwarranId === filter.kwarranId;
    const matchJg = filter.jenjang === 'all' || g.jenjang === filter.jenjang;
    const matchQ = !q || g.pangkalan.toLowerCase().includes(q) || g.nomorPa.includes(q) || g.nomorPi.includes(q);
    return matchKw && matchJg && matchQ;
  });
}

export const RealtimeDemographicsMap: React.FC<{ onClose?: () => void; className?: string }> = ({ onClose, className = '' }) => {
  const m = useRealtimeDemographics();
  const filteredGudeps = filterGudepsList(m.dataset.gudeps, m.filter);

  return (
    <div className={`space-y-4 ${className}`}>
      <MapHeaderBanner kwarcabName={m.dataset.kwarcab.name} onClose={onClose} />
      <DemographicsSummaryBar gudeps={filteredGudeps} kwarcabName={m.dataset.kwarcab.name} />
      <MapToolbar filter={m.filter} onFilterChange={(n) => m.setFilter((p) => ({ ...p, ...n }))} kwarrans={m.dataset.kwarrans} activeRole={m.activeRole} onRoleChange={m.setActiveRole} onOpenEditKwarcab={() => m.setShowEditKwarcab(true)} onOpenEditKwarran={() => m.setShowEditKwarran(true)} onOpenAddGudep={() => m.setGudepToEdit('new')} onResetData={m.handleResetData} />
      <GoogleMapCanvas kwarcab={m.dataset.kwarcab} kwarrans={m.dataset.kwarrans} gudeps={filteredGudeps} selectedGudepId={m.selectedGudep?.id} selectedKwarranId={m.selectedKwarran?.id} mapType={m.filter.mapType} showBoundaries={m.filter.showBoundaries} showPins={m.filter.showPins} showHeatmap={m.filter.showHeatmap} isPickingCoordinate={Boolean(m.pickingCallback)} pickedCoordinate={m.pickedCoordinate} onSelectGudep={m.setSelectedGudep} onSelectKwarran={m.setSelectedKwarran} onCoordinatePicked={(c) => { if (m.pickingCallback) m.pickingCallback(c); }} />
      {m.selectedGudep && <GudepDetailDrawer gudep={m.selectedGudep} canEdit={true} onEdit={() => m.setGudepToEdit(m.selectedGudep)} onDelete={() => m.handleDeleteGudep(m.selectedGudep!.id)} onClose={() => m.setSelectedGudep(null)} />}
      <MapModalsContainer dataset={m.dataset} showEditKwarcab={m.showEditKwarcab} showEditKwarran={m.showEditKwarran} gudepToEdit={m.gudepToEdit} selectedKwarranId={m.selectedKwarran?.id} onCloseKwarcab={() => m.setShowEditKwarcab(false)} onCloseKwarran={() => m.setShowEditKwarran(false)} onCloseGudep={() => m.setGudepToEdit(null)} onUpdateKwarcab={m.handleUpdateKwarcab} onUpdateKwarran={m.handleUpdateKwarran} onSaveGudep={m.handleSaveGudep} onRequestPick={m.handleRequestPick} />
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { MapKwarcabEntity, MapKwarranEntity, MapGudepEntity, MapCoordinates } from './mapTypes';
import { syncMapCircles, syncMapMarkers, syncPickerMarker } from './canvas/mapCanvasHelpers';
import { useGoogleMapInit } from './canvas/useGoogleMapInit';
import { MapPin, Compass, AlertCircle } from 'lucide-react';

interface GoogleMapCanvasProps {
  kwarcab: MapKwarcabEntity;
  kwarrans: MapKwarranEntity[];
  gudeps: MapGudepEntity[];
  selectedGudepId?: string | null;
  selectedKwarranId?: string | null;
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  showBoundaries: boolean;
  showPins: boolean;
  showHeatmap: boolean;
  isPickingCoordinate: boolean;
  pickedCoordinate?: MapCoordinates | null;
  onSelectGudep: (gudep: MapGudepEntity) => void;
  onSelectKwarran: (kwarran: MapKwarranEntity) => void;
  onCoordinatePicked?: (coords: MapCoordinates) => void;
}

export const GoogleMapCanvas: React.FC<GoogleMapCanvasProps> = (p) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const circlesRef = useRef<any[]>([]);
  const pickerRef = useRef<any>(null);
  const { mapInstanceRef, loadError } = useGoogleMapInit(containerRef, p.kwarcab, p.mapType, p.onCoordinatePicked);

  useEffect(() => {
    const win = (window as any).google;
    if (mapInstanceRef.current && win?.maps) mapInstanceRef.current.setMapTypeId(p.mapType);
  }, [p.mapType, mapInstanceRef]);

  useEffect(() => {
    const win = (window as any).google;
    if (!mapInstanceRef.current || !win?.maps) return;
    const g = win.maps;
    circlesRef.current.forEach((c) => c.setMap(null));
    circlesRef.current = syncMapCircles(mapInstanceRef.current, g, p.kwarcab, p.kwarrans, p.selectedKwarranId, p.showBoundaries, p.onSelectKwarran);
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = syncMapMarkers(mapInstanceRef.current, g, p.gudeps, p.selectedGudepId, p.showPins, p.onSelectGudep);
    pickerRef.current = syncPickerMarker(mapInstanceRef.current, g, p.isPickingCoordinate, p.pickedCoordinate, pickerRef.current);
  }, [p.kwarcab, p.kwarrans, p.gudeps, p.selectedGudepId, p.selectedKwarranId, p.showBoundaries, p.showPins, p.isPickingCoordinate, p.pickedCoordinate, mapInstanceRef]);

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] rounded-3xl overflow-hidden border border-stone-200/90 shadow-md bg-stone-100">
      <div ref={containerRef} className="w-full h-full" />
      {loadError && (
        <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white z-20">
          <AlertCircle className="w-10 h-10 text-amber-400 mb-2" /><h4 className="text-sm font-bold">Peta Google Maps Menggunakan Fallback</h4><p className="text-xs text-stone-300 max-w-md mt-1 mb-4">{loadError}</p>
        </div>
      )}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <button onClick={() => { if (mapInstanceRef.current) { mapInstanceRef.current.panTo(p.kwarcab.center); mapInstanceRef.current.setZoom(p.kwarcab.defaultZoom || 12); } }} title="Fokus ke Pusat Kwarcab" className="p-2.5 bg-white/95 hover:bg-white text-stone-800 rounded-2xl shadow-md border border-stone-200/80 transition-all hover:scale-105">
          <Compass className="w-4 h-4 text-emerald-700" />
        </button>
      </div>
      {p.isPickingCoordinate && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-amber-500 text-stone-950 font-black text-xs rounded-full shadow-lg border border-amber-300 flex items-center gap-2 animate-bounce z-10">
          <MapPin className="w-4 h-4 text-stone-950" /><span>Mode Pilih Titik Aktif: Klik pada peta untuk menentukan koordinat lokasi!</span>
        </div>
      )}
    </div>
  );
};

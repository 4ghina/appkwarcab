import { MapKwarcabEntity, MapKwarranEntity, MapGudepEntity, MapCoordinates } from '../mapTypes';

export function syncMapCircles(
  map: any,
  gmaps: any,
  kwarcab: MapKwarcabEntity,
  kwarrans: MapKwarranEntity[],
  selectedKwarranId?: string | null,
  showBoundaries = true,
  onSelectKwarran?: (k: MapKwarranEntity) => void
): any[] {
  if (!showBoundaries) return [];
  const circles: any[] = [];

  const kwarcabCircle = new gmaps.Circle({
    strokeColor: '#5D4037',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#5D4037',
    fillOpacity: 0.04,
    map,
    center: kwarcab.center,
    radius: (kwarcab.radiusKm || 15) * 1000,
  });
  circles.push(kwarcabCircle);

  kwarrans.forEach((k) => {
    const isSelected = selectedKwarranId === k.id;
    const kwCircle = new gmaps.Circle({
      strokeColor: k.warnaTema || '#2E7D32',
      strokeOpacity: isSelected ? 0.95 : 0.6,
      strokeWeight: isSelected ? 3 : 1.5,
      fillColor: k.warnaTema || '#2E7D32',
      fillOpacity: isSelected ? 0.15 : 0.06,
      map,
      center: k.center,
      radius: 3500,
    });
    if (onSelectKwarran) {
      kwCircle.addListener('click', () => onSelectKwarran(k));
    }
    circles.push(kwCircle);
  });

  return circles;
}

export function syncMapMarkers(
  map: any,
  gmaps: any,
  gudeps: MapGudepEntity[],
  selectedGudepId?: string | null,
  showPins = true,
  onSelectGudep?: (g: MapGudepEntity) => void
): any[] {
  if (!showPins) return [];
  const markers: any[] = [];

  gudeps.forEach((g) => {
    const isSelected = selectedGudepId === g.id;
    const pinColor = g.jenjang.includes('SD')
      ? '#16A34A'
      : g.jenjang.includes('SMP')
      ? '#DC2626'
      : g.jenjang.includes('SMA')
      ? '#D97706'
      : '#7C3AED';

    const marker = new gmaps.Marker({
      position: g.koordinat,
      map,
      title: `${g.pangkalan} (${g.nomorPa}/${g.nomorPi})`,
      animation: isSelected ? gmaps.Animation.BOUNCE : undefined,
      icon: {
        path: gmaps.SymbolPath.CIRCLE,
        fillColor: pinColor,
        fillOpacity: 1,
        strokeWeight: isSelected ? 3 : 1.5,
        strokeColor: '#FFFFFF',
        scale: isSelected ? 10 : 7,
      },
    });

    if (onSelectGudep) {
      marker.addListener('click', () => onSelectGudep(g));
    }
    markers.push(marker);
  });

  return markers;
}

export function syncPickerMarker(
  map: any,
  gmaps: any,
  isPicking: boolean,
  pickedCoord?: MapCoordinates | null,
  currentMarker?: any
): any {
  if (currentMarker) currentMarker.setMap(null);
  if (!isPicking || !pickedCoord) return null;

  return new gmaps.Marker({
    position: pickedCoord,
    map,
    title: 'Titik Terpilih',
    icon: {
      path: gmaps.SymbolPath.BACKWARD_CLOSED_ARROW,
      fillColor: '#F59E0B',
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#18181B',
      scale: 6,
    },
  });
}

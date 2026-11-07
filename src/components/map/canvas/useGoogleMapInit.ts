import { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { MapKwarcabEntity, MapCoordinates } from '../mapTypes';

export function useGoogleMapInit(
  containerRef: React.RefObject<HTMLDivElement | null>,
  kwarcab: MapKwarcabEntity,
  mapType: string,
  onCoordinatePicked?: (c: MapCoordinates) => void
) {
  const mapInstanceRef = useRef<any>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    if (!containerRef.current || !apiKey) {
      if (!apiKey) setLoadError('Kunci API Google Maps tidak terpasang.');
      return;
    }
    let isMounted = true;
    setOptions({ key: apiKey, v: 'weekly' });
    importLibrary('maps')
      .then(({ Map }) => {
        if (!isMounted || !containerRef.current) return;
        const map = new Map(containerRef.current, {
          center: kwarcab.center,
          zoom: kwarcab.defaultZoom || 12,
          mapTypeId: mapType,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });
        map.addListener('click', (e: any) => {
          if (e.latLng && onCoordinatePicked) onCoordinatePicked({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        });
        mapInstanceRef.current = map;
      })
      .catch((err: any) => {
        if (isMounted) setLoadError(err?.message || 'Gagal memuat pustaka Google Maps');
      });
    return () => { isMounted = false; };
  }, [apiKey]);

  return { mapInstanceRef, loadError };
}

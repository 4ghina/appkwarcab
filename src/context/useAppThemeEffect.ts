import { useEffect } from 'react';
import { AppIdentityConfig } from '../types/config';

export function useAppThemeEffect(config: AppIdentityConfig) {
  useEffect(() => {
    if (!config) return;
    const root = document.documentElement;
    root.style.setProperty('--color-scout-primary', config.colors?.primary || '#5D4037');
    root.style.setProperty('--color-scout-primary-hover', config.colors?.primaryHover || '#4E342E');
    root.style.setProperty('--color-scout-secondary', config.colors?.secondary || '#2E7D32');
    root.style.setProperty('--color-scout-accent', config.colors?.accent || '#F59E0B');
    root.style.setProperty('--color-scout-bg', config.colors?.background || '#FAF8F5');
    root.style.setProperty('--color-scout-surface', config.colors?.surface || '#FFFFFF');

    if (config.appName && config.kwarcabName) {
      document.title = `${config.appName} - ${config.kwarcabName}`;
    }

    if (config.logos?.favicon) {
      const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'shortcut icon';
      link.href = config.logos.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, [config]);
}

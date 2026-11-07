import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { AppIdentityConfig, MediaAssetRecord, OperationalEvent, ConfigVersionHistory } from '../types/config';
import { INITIAL_CONFIG_FALLBACK } from './initialConfigData';
import { ViewportMode, AppContextType } from './appContextTypes';
import { useAppThemeEffect } from './useAppThemeEffect';
import { createConfigOperations } from './useAppConfigOperations';
import { createCatalogOperations } from './useAppCatalogOperations';

export * from './initialConfigData';
export * from './appContextTypes';

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppIdentityConfig>(INITIAL_CONFIG_FALLBACK);
  const [textCatalog, setTextCatalog] = useState<Record<string, string>>({});
  const [mediaAssets, setMediaAssets] = useState<MediaAssetRecord[]>([]);
  const [events, setEvents] = useState<OperationalEvent[]>([]);
  const [versionHistory, setVersionHistory] = useState<ConfigVersionHistory[]>([]);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useAppThemeEffect(config);

  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [cRes, tRes, mRes, eRes, hRes] = await Promise.allSettled([
        fetch('/api/config/all').then(r => r.ok ? r.json() : null),
        fetch('/api/text-catalog').then(r => r.ok ? r.json() : null),
        fetch('/api/media').then(r => r.ok ? r.json() : null),
        fetch('/api/operational/events').then(r => r.ok ? r.json() : null),
        fetch('/api/config/history').then(r => r.ok ? r.json() : null),
      ]);
      if (cRes.status === 'fulfilled' && cRes.value) setConfig(cRes.value);
      if (tRes.status === 'fulfilled' && tRes.value) setTextCatalog(tRes.value);
      if (mRes.status === 'fulfilled' && Array.isArray(mRes.value)) setMediaAssets(mRes.value);
      if (eRes.status === 'fulfilled' && Array.isArray(eRes.value)) setEvents(eRes.value);
      if (hRes.status === 'fulfilled' && Array.isArray(hRes.value)) setVersionHistory(hRes.value);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { refreshData(); }, [refreshData]);

  const t = useCallback((key: string, fb?: string) => textCatalog?.[key] || fb || key, [textCatalog]);
  const configOps = useMemo(() => createConfigOperations(setConfig, setVersionHistory, setIsSaving, refreshData), [refreshData]);
  const catalogOps = useMemo(() => createCatalogOperations(setTextCatalog, setMediaAssets, setEvents, setIsSaving), []);

  const value = useMemo(() => ({
    config, textCatalog, t, mediaAssets, events, versionHistory, viewportMode, setViewportMode,
    isLoading, isSaving, refreshData, ...configOps, ...catalogOps
  }), [config, textCatalog, t, mediaAssets, events, versionHistory, viewportMode, isLoading, isSaving, refreshData, configOps, catalogOps]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

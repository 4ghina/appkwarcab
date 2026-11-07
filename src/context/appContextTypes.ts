import { AppIdentityConfig, MediaAssetRecord, OperationalEvent, ConfigVersionHistory } from '../types/config';

export type ViewportMode = 'desktop' | 'mobile-framed' | 'mobile-clean';

export interface AppContextType {
  config: AppIdentityConfig;
  textCatalog: Record<string, string>;
  t: (key: string, fallback?: string) => string;
  mediaAssets: MediaAssetRecord[];
  events: OperationalEvent[];
  versionHistory: ConfigVersionHistory[];
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  isLoading: boolean;
  isSaving: boolean;
  refreshData: () => Promise<void>;
  updateConfig: (newConfig: AppIdentityConfig, summary?: string) => Promise<boolean>;
  updateTextCatalog: (catalog: Record<string, string>) => Promise<boolean>;
  resetTextCatalog: () => Promise<boolean>;
  uploadMedia: (file: File, category?: string, label?: string) => Promise<MediaAssetRecord | null>;
  deleteMedia: (id: string) => Promise<boolean>;
  updateEvent: (id: string, updates: Partial<OperationalEvent>) => Promise<boolean>;
  createEvent: (event: Partial<OperationalEvent>) => Promise<boolean>;
  restoreVersion: (versionId: string) => Promise<boolean>;
  toggleDemoMode: (enabled: boolean) => Promise<boolean>;
  resetDemoData: () => Promise<{ success: boolean; message: string }>;
}

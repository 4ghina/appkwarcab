import {
  AppIdentityConfig,
  ConfigVersionHistory,
  MediaAssetRecord,
  OperationalEvent
} from './db/types';
import {
  DEFAULT_IDENTITY_CONFIG,
  DEFAULT_TEXT_CATALOG,
  DEFAULT_MEDIA_ASSETS,
  DEFAULT_OPERATIONAL_EVENTS,
  DEFAULT_SUBMISSIONS,
  DEFAULT_MENTORED_STUDENTS
} from './db/defaults';
import { readJsonFile, writeJsonFile, getFilePath, DATA_DIR, UPLOADS_DIR } from './db/fileStorage';

export * from './db/types';
export * from './db/defaults';
export { getFilePath, readJsonFile, writeJsonFile, DATA_DIR, UPLOADS_DIR };

export const db = {
  // Identity and general configuration
  getConfig: (): AppIdentityConfig => {
    return readJsonFile<AppIdentityConfig>('app-config.json', DEFAULT_IDENTITY_CONFIG);
  },
  saveConfig: (config: AppIdentityConfig, author = 'Super Admin Kwarcab', summary = 'Pembaruan Konfigurasi'): AppIdentityConfig => {
    writeJsonFile('app-config.json', config);
    const history = db.getConfigHistory();
    history.unshift({
      id: `ver-${Date.now()}`,
      version: history.length + 1,
      timestamp: new Date().toISOString(),
      author,
      summary,
      configSnapshot: config,
    });
    if (history.length > 20) history.splice(20);
    writeJsonFile('config-history.json', history);
    return config;
  },

  // Version History
  getConfigHistory: (): ConfigVersionHistory[] => {
    return readJsonFile<ConfigVersionHistory[]>('config-history.json', [
      {
        id: 'ver-initial',
        version: 1,
        timestamp: '2026-01-01T08:00:00Z',
        author: 'Sistem SIM-KWARCAB',
        summary: 'Konfigurasi Default Awal SIM-KWARCAB Kota Depok Kwartir Daerah Jawa Barat',
        configSnapshot: DEFAULT_IDENTITY_CONFIG,
      }
    ]);
  },
  restoreConfigVersion: (versionId: string): AppIdentityConfig | null => {
    const history = db.getConfigHistory();
    const target = history.find(h => h.id === versionId);
    if (!target) return null;
    return db.saveConfig(target.configSnapshot, 'Super Admin Kwarcab', `Pemulihan versi (${target.id}) dari ${new Date(target.timestamp).toLocaleDateString('id-ID')}`);
  },

  // UI Text Catalog
  getTextCatalog: (): Record<string, string> => {
    return readJsonFile<Record<string, string>>('text-catalog.json', DEFAULT_TEXT_CATALOG);
  },
  saveTextCatalog: (catalog: Record<string, string>): Record<string, string> => {
    writeJsonFile('text-catalog.json', catalog);
    return catalog;
  },
  resetTextCatalog: (): Record<string, string> => {
    writeJsonFile('text-catalog.json', DEFAULT_TEXT_CATALOG);
    return DEFAULT_TEXT_CATALOG;
  },

  // Media Assets Registry
  getMediaAssets: (): MediaAssetRecord[] => {
    return readJsonFile<MediaAssetRecord[]>('media-registry.json', DEFAULT_MEDIA_ASSETS);
  },
  addMediaAsset: (asset: MediaAssetRecord): MediaAssetRecord[] => {
    const list = db.getMediaAssets();
    list.unshift(asset);
    writeJsonFile('media-registry.json', list);
    return list;
  },
  deleteMediaAsset: (id: string): MediaAssetRecord[] => {
    const list = db.getMediaAssets().filter(a => a.id !== id);
    writeJsonFile('media-registry.json', list);
    return list;
  },

  // Operational Events & Quotas
  getOperationalEvents: (): OperationalEvent[] => {
    return readJsonFile<OperationalEvent[]>('operational-events.json', DEFAULT_OPERATIONAL_EVENTS);
  },
  saveOperationalEvents: (events: OperationalEvent[]): OperationalEvent[] => {
    writeJsonFile('operational-events.json', events);
    return events;
  },
  updateOperationalEvent: (id: string, updates: Partial<OperationalEvent>): OperationalEvent | null => {
    const events = db.getOperationalEvents();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return null;
    events[index] = { ...events[index], ...updates };
    db.saveOperationalEvents(events);
    return events[index];
  },

  // Demo Data Reset
  resetDemoData: (): { success: boolean; message: string } => {
    writeJsonFile('app-config.json', { ...DEFAULT_IDENTITY_CONFIG, isDemoMode: false });
    writeJsonFile('operational-events.json', DEFAULT_OPERATIONAL_EVENTS);
    return { success: true, message: 'Data demo simulasi dibersihkan. Beralih ke Mode Produksi.' };
  },
  toggleDemoMode: (enabled: boolean): boolean => {
    const config = db.getConfig();
    config.isDemoMode = enabled;
    db.saveConfig(config, 'Super Admin Kwarcab', `Mengubah mode demo: ${enabled ? 'Aktif' : 'Non-aktif'}`);
    return enabled;
  },

  // Proficiency Assessment Submissions
  getSubmissions: (): any[] => {
    return readJsonFile<any[]>('proficiency-submissions.json', DEFAULT_SUBMISSIONS);
  },
  saveSubmissions: (submissions: any[]): any[] => {
    writeJsonFile('proficiency-submissions.json', submissions);
    return submissions;
  },
  addSubmission: (submission: any): any => {
    const list = db.getSubmissions();
    list.unshift(submission);
    db.saveSubmissions(list);
    return submission;
  },
  updateSubmission: (id: string, updates: any): any | null => {
    const list = db.getSubmissions();
    const index = list.findIndex(s => s.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    db.saveSubmissions(list);
    return list[index];
  },

  // Mentored Students
  getMentoredStudents: (_gudepId = 'gudep-01'): any[] => {
    return readJsonFile<any[]>('mentored-students.json', DEFAULT_MENTORED_STUDENTS);
  },
  saveMentoredStudents: (students: any[]): void => {
    writeJsonFile('mentored-students.json', students);
  },
  getMentoredStudentById: (studentId: string): any | undefined => {
    return db.getMentoredStudents().find(s => s.id === studentId || s.userId === studentId);
  },
  updateMentoredStudent: (studentId: string, updates: any): any | undefined => {
    const list = db.getMentoredStudents();
    const idx = list.findIndex(s => s.id === studentId || s.userId === studentId);
    if (idx === -1) return undefined;
    list[idx] = { ...list[idx], ...updates };
    db.saveMentoredStudents(list);
    return list[idx];
  },

  // Idempotency cache
  checkAndSetIdempotency: (key: string, meta: any): { isDuplicate: boolean; record?: any } => {
    const store = readJsonFile<Record<string, { createdAt: string; meta: any }>>('idempotency-keys.json', {});
    if (store[key]) {
      return { isDuplicate: true, record: store[key] };
    }
    store[key] = { createdAt: new Date().toISOString(), meta };
    const keys = Object.keys(store);
    if (keys.length > 500) delete store[keys[0]];
    writeJsonFile('idempotency-keys.json', store);
    return { isDuplicate: false };
  },

  // NTA Claim Registry
  getNtaClaimsRegistry: (): Record<string, { userId: string; userName: string; claimedAt: string; status: 'pending' | 'verified' | 'conflict' }> => {
    return readJsonFile('nta-claims-registry.json', {
      '11.23.01.00421': { userId: 'user-penegak-1', userName: 'Dimas Arya Pratama', claimedAt: '2025-01-12T10:00:00Z', status: 'verified' },
      '11.23.00.00012': { userId: 'user-pembina-1', userName: 'Kak Suryono, S.Pd., M.Pd.', claimedAt: '2021-02-15T09:00:00Z', status: 'verified' }
    });
  },
  claimNta: (nta: string, userId: string, userName: string): { success: boolean; conflict?: boolean; message: string } => {
    const registry = db.getNtaClaimsRegistry();
    const cleanNta = nta.trim();
    if (registry[cleanNta] && registry[cleanNta].userId !== userId) {
      return {
        success: false,
        conflict: true,
        message: `Konflik Klaim NTA: NTA "${cleanNta}" telah diklaim oleh anggota lain (${registry[cleanNta].userName}).`
      };
    }
    registry[cleanNta] = { userId, userName, claimedAt: new Date().toISOString(), status: 'pending' };
    writeJsonFile('nta-claims-registry.json', registry);
    return { success: true, message: `Klaim NTA "${cleanNta}" berhasil dicatat.` };
  },

  // SKU Progress Store
  getSkuUserProgress: (userId: string): Record<string, { isPassed: boolean; passedAt?: string; testedBy?: string; notes?: string }> => {
    const all = readJsonFile<Record<string, Record<string, any>>>('sku-user-progress.json', {});
    return all[userId] || {};
  },
  saveSkuUserProgress: (userId: string, progress: Record<string, any>): void => {
    const all = readJsonFile<Record<string, Record<string, any>>>('sku-user-progress.json', {});
    all[userId] = progress;
    writeJsonFile('sku-user-progress.json', all);
  }
};

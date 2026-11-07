import { readJsonFile, writeJsonFile } from './fileStorage';

export interface AyoPramukaMemberRecord {
  id: string;
  ayoPramukaNta: string; // String to preserve leading zeros
  name: string;
  email?: string;
  gender: 'L' | 'P';
  birthDate: string;
  memberCategory: 'peserta_didik' | 'pembina';
  golongan: 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega' | 'Pembina';
  tingkatan: string;
  gudepId: string;
  gudepName: string;
  gudepNomor: string;
  pangkalan: string;
  kwarran: string;
  kwarcab: string;
  isGaruda: boolean;
  garudaYear?: number;
  linkedUserId?: string;
  linkedAt?: string;
  officialDocUrl?: string;
  qrToken: string;
  status: 'available' | 'claimed_pending' | 'linked';
}

export interface CardTemplateConfig {
  id: string;
  title: string;
  version: number;
  status: 'draft' | 'published';
  updatedAt: string;
  themePreset: 'pradana_brown' | 'wosm_purple' | 'penegak_gold' | 'forest_green' | 'navy_blue';
  gradientStart: string;
  gradientEnd: string;
  textColor: string;
  accentColor: string;
  fontFamily: 'Plus Jakarta Sans' | 'JetBrains Mono' | 'Manrope';
  photoPosition: 'left' | 'center' | 'right';
  fieldLayout: 'standard' | 'compact_two_col' | 'minimal';
  showQrFront: boolean;
  showQrBack: boolean;
  showWatermark: boolean;
  logoType: 'pramuka' | 'wosm' | 'both';
}

export interface SessionAttendanceRecord {
  id: string;
  sessionId: string;
  sessionTitle: string;
  memberNta: string;
  memberName: string;
  gudepName: string;
  cardUid?: string;
  qrToken?: string;
  timestamp: string;
  recordedAt: number;
  officerName: string;
}

import { DEFAULT_MEMBERS, DEFAULT_CARD_TEMPLATE } from './memberRegistrySeed';
export { DEFAULT_CARD_TEMPLATE };

export const memberRegistryDb = {
  getMembers: (): AyoPramukaMemberRecord[] => {
    return readJsonFile<AyoPramukaMemberRecord[]>('ayo-pramuka-registry.json', DEFAULT_MEMBERS);
  },

  saveMembers: (members: AyoPramukaMemberRecord[]): void => {
    writeJsonFile('ayo-pramuka-registry.json', members);
  },

  findMemberByNta: (nta: string): AyoPramukaMemberRecord | undefined => {
    const cleanNta = String(nta).trim().toLowerCase();
    const cleanRaw = cleanNta.replace(/[^a-z0-9]/g, '');
    return memberRegistryDb.getMembers().find(m => {
      const mNta = String(m.ayoPramukaNta).trim().toLowerCase();
      const mRaw = mNta.replace(/[^a-z0-9]/g, '');
      return mNta === cleanNta || mRaw === cleanRaw;
    });
  },

  findMemberByQrToken: (token: string): AyoPramukaMemberRecord | undefined => {
    const cleanToken = String(token).trim();
    return memberRegistryDb.getMembers().find(m => m.qrToken === cleanToken || m.ayoPramukaNta === cleanToken);
  },

  addMember: (record: Partial<AyoPramukaMemberRecord>): { success: boolean; record?: AyoPramukaMemberRecord; error?: string } => {
    if (!record.ayoPramukaNta || !record.name) {
      return { success: false, error: 'Nomor KTA dan nama anggota wajib diisi.' };
    }
    const cleanNta = String(record.ayoPramukaNta).trim();
    const existing = memberRegistryDb.findMemberByNta(cleanNta);
    if (existing) {
      return { success: false, error: `Konflik: Nomor KTA "${cleanNta}" sudah terdaftar atas nama ${existing.name}.` };
    }
    const newMember: AyoPramukaMemberRecord = {
      id: record.id || `AYO-${Date.now()}`,
      ayoPramukaNta: cleanNta, // Text format preserving leading zeros
      name: record.name.trim(),
      email: record.email?.trim().toLowerCase(),
      gender: record.gender || 'L',
      birthDate: record.birthDate || '01 Januari 2008',
      memberCategory: record.memberCategory || 'peserta_didik',
      golongan: record.golongan || 'Penegak',
      tingkatan: record.tingkatan || 'Penegak Bantara',
      gudepId: record.gudepId || 'gudep-01',
      gudepName: record.gudepName || 'SMA Negeri 1 Depok',
      gudepNomor: record.gudepNomor || '01.001 - 01.002',
      pangkalan: record.pangkalan || 'SMA Negeri 1 Depok',
      kwarran: record.kwarran || 'Pancoran Mas',
      kwarcab: 'Kwartir Cabang Kota Depok',
      isGaruda: Boolean(record.isGaruda),
      garudaYear: record.garudaYear,
      qrToken: `TOK-AYO-${Date.now()}-${cleanNta.replace(/\D/g, '')}`,
      officialDocUrl: record.officialDocUrl || '/assets/kta-resmi-sample.pdf',
      status: 'available'
    };
    const members = memberRegistryDb.getMembers();
    members.unshift(newMember);
    memberRegistryDb.saveMembers(members);
    return { success: true, record: newMember };
  },

  updateMember: (id: string, updates: Partial<AyoPramukaMemberRecord>): AyoPramukaMemberRecord | undefined => {
    const members = memberRegistryDb.getMembers();
    const idx = members.findIndex(m => m.id === id || m.ayoPramukaNta === id);
    if (idx === -1) return undefined;
    members[idx] = { ...members[idx], ...updates };
    memberRegistryDb.saveMembers(members);
    return members[idx];
  },

  getCardTemplateStore: (): { draft: CardTemplateConfig; published: CardTemplateConfig } => {
    return readJsonFile('card-template.json', {
      draft: DEFAULT_CARD_TEMPLATE,
      published: DEFAULT_CARD_TEMPLATE
    });
  },

  saveDraftCardTemplate: (updates: Partial<CardTemplateConfig>): CardTemplateConfig => {
    const store = memberRegistryDb.getCardTemplateStore();
    store.draft = {
      ...store.draft,
      ...updates,
      status: 'draft',
      updatedAt: new Date().toISOString()
    };
    writeJsonFile('card-template.json', store);
    return store.draft;
  },

  publishCardTemplate: (): CardTemplateConfig => {
    const store = memberRegistryDb.getCardTemplateStore();
    store.published = {
      ...store.draft,
      version: store.published.version + 1,
      status: 'published',
      updatedAt: new Date().toISOString()
    };
    writeJsonFile('card-template.json', store);
    return store.published;
  },

  recordSessionAttendance: (params: {
    sessionId: string;
    sessionTitle: string;
    memberNta: string;
    memberName: string;
    gudepName: string;
    cardUid?: string;
    qrToken?: string;
    officerName: string;
  }): { success: boolean; duplicate?: boolean; record?: SessionAttendanceRecord; message: string } => {
    const logs = readJsonFile<SessionAttendanceRecord[]>('session-attendance.json', []);
    const cleanNta = String(params.memberNta).trim();
    // Check duplicate in same session
    const isDuplicate = logs.some(l => l.sessionId === params.sessionId && l.memberNta === cleanNta);
    if (isDuplicate) {
      return {
        success: false,
        duplicate: true,
        message: `Pencatatan ganda ditolak: Anggota ${params.memberName} (${cleanNta}) sudah tercatat hadir pada sesi "${params.sessionTitle}".`
      };
    }
    const newRecord: SessionAttendanceRecord = {
      id: `att-ses-${Date.now()}`,
      sessionId: params.sessionId,
      sessionTitle: params.sessionTitle,
      memberNta: cleanNta,
      memberName: params.memberName,
      gudepName: params.gudepName,
      cardUid: params.cardUid,
      qrToken: params.qrToken,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      recordedAt: Date.now(),
      officerName: params.officerName
    };
    logs.unshift(newRecord);
    if (logs.length > 500) logs.pop();
    writeJsonFile('session-attendance.json', logs);
    return {
      success: true,
      record: newRecord,
      message: `Presensi berhasil dicatat untuk ${params.memberName} pada sesi "${params.sessionTitle}".`
    };
  },

  getSessionAttendance: (sessionId: string): SessionAttendanceRecord[] => {
    const logs = readJsonFile<SessionAttendanceRecord[]>('session-attendance.json', []);
    return logs.filter(l => l.sessionId === sessionId);
  }
};

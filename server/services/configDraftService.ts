import fs from 'fs';
import { db, AppIdentityConfig, getFilePath, readJsonFile, writeJsonFile } from '../db';

const CONFIG_DRAFT_FILE = 'app-config-draft.json';
const TEXT_DRAFT_FILE = 'text-catalog-draft.json';

export const configDraftService = {
  getConfigDraft(): { hasDraft: boolean; draft: AppIdentityConfig | null } {
    const draftPath = getFilePath(CONFIG_DRAFT_FILE);
    if (!fs.existsSync(draftPath)) {
      return { hasDraft: false, draft: null };
    }
    const draft = readJsonFile<AppIdentityConfig>(CONFIG_DRAFT_FILE, db.getConfig());
    return { hasDraft: true, draft };
  },

  saveConfigDraft(updates: Partial<AppIdentityConfig>): AppIdentityConfig {
    const current = this.getConfigDraft().draft || db.getConfig();
    const merged = { ...current, ...updates };
    writeJsonFile(CONFIG_DRAFT_FILE, merged);
    return merged;
  },

  publishConfigDraft(author = 'Super Admin Kwarcab', summary = 'Publikasi draf konfigurasi'): AppIdentityConfig {
    const draftInfo = this.getConfigDraft();
    const targetConfig = draftInfo.draft || db.getConfig();
    const saved = db.saveConfig(targetConfig, author, summary);
    this.discardConfigDraft();
    return saved;
  },

  discardConfigDraft(): void {
    const draftPath = getFilePath(CONFIG_DRAFT_FILE);
    if (fs.existsSync(draftPath)) {
      fs.unlinkSync(draftPath);
    }
  },

  getTextCatalogDraft(): { hasDraft: boolean; draft: Record<string, string> | null } {
    const draftPath = getFilePath(TEXT_DRAFT_FILE);
    if (!fs.existsSync(draftPath)) {
      return { hasDraft: false, draft: null };
    }
    const draft = readJsonFile<Record<string, string>>(TEXT_DRAFT_FILE, db.getTextCatalog());
    return { hasDraft: true, draft };
  },

  saveTextCatalogDraft(entries: Record<string, string>): Record<string, string> {
    writeJsonFile(TEXT_DRAFT_FILE, entries);
    return entries;
  },

  publishTextCatalogDraft(): Record<string, string> {
    const draftInfo = this.getTextCatalogDraft();
    const target = draftInfo.draft || db.getTextCatalog();
    const saved = db.saveTextCatalog(target);
    this.discardTextCatalogDraft();
    return saved;
  },

  discardTextCatalogDraft(): void {
    const draftPath = getFilePath(TEXT_DRAFT_FILE);
    if (fs.existsSync(draftPath)) {
      fs.unlinkSync(draftPath);
    }
  }
};

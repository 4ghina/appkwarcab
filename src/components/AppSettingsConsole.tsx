import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppIdentityConfig } from '../types/config';
import { IdentityTab } from './settings/IdentityTab';
import { CardDesignTab } from './settings/CardDesignTab';
import { MediaTab } from './settings/MediaTab';
import { TextCatalogTab } from './settings/TextCatalogTab';
import { OperationalRulesTab } from './settings/OperationalRulesTab';
import { ThemeTab } from './settings/ThemeTab';
import { VersionHistoryTab } from './settings/VersionHistoryTab';
import { DemoDataTab } from './settings/DemoDataTab';
import { SettingsTabsNav, TabType } from './settings/SettingsTabsNav';

interface TabContentProps {
  activeTab: TabType;
  app: any;
  draftConfig: AppIdentityConfig;
  setDraftConfig: React.Dispatch<React.SetStateAction<AppIdentityConfig>>;
  handleSaveConfig(): void;
  draftTexts: Record<string, string>;
  setDraftTexts: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSaveTexts(): void;
  handlePublishTexts(): void;
  textSearch: string;
  setTextSearch(s: string): void;
  notify(msg: string): void;
}

const SettingsTabContent: React.FC<TabContentProps> = (p) => {
  if (p.activeTab === 'identitas') {
    return <IdentityTab draftConfig={p.draftConfig} setDraftConfig={p.setDraftConfig} onSave={p.handleSaveConfig} isSaving={p.app.isSaving} />;
  }
  if (p.activeTab === 'desain-kartu') return <CardDesignTab />;
  if (p.activeTab === 'media') {
    return (
      <MediaTab
        mediaAssets={p.app.mediaAssets} uploadCategory="logo" setUploadCategory={() => {}} uploadLabel="" setUploadLabel={() => {}} isUploading={false}
        onFileUpload={async (e) => { const f = e.target.files?.[0]; if (f && await p.app.uploadMedia(f, 'logo', f.name)) p.notify('Berkas diunggah'); }}
        onDeleteMedia={p.app.deleteMedia}
      />
    );
  }
  if (p.activeTab === 'teks') {
    return (
      <TextCatalogTab
        textSearch={p.textSearch} setTextSearch={p.setTextSearch} draftTexts={p.draftTexts} setDraftTexts={p.setDraftTexts}
        onSave={p.handleSaveTexts} onPublish={p.handlePublishTexts} onReset={async () => { if (await p.app.resetTextCatalog()) p.notify('Teks direset'); }} isSaving={p.app.isSaving}
      />
    );
  }
  if (p.activeTab === 'aturan') return <OperationalRulesTab events={p.app.events} onUpdateEvent={p.app.updateEvent} onOpenNewEventModal={() => {}} />;
  if (p.activeTab === 'tema') return <ThemeTab draftConfig={p.draftConfig} setDraftConfig={p.setDraftConfig} onSave={p.handleSaveConfig} isSaving={p.app.isSaving} />;
  if (p.activeTab === 'riwayat') return <VersionHistoryTab versionHistory={p.app.versionHistory} onRestoreVersion={async (id) => { if (await p.app.restoreVersion(id)) p.notify('Versi dipulihkan'); }} />;
  return <DemoDataTab isDemoMode={p.app.config.isDemoMode ?? true} onToggleDemoMode={p.app.toggleDemoMode} onResetDemoData={p.app.resetDemoData} />;
};

export const AppSettingsConsole: React.FC = () => {
  const app = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('identitas');
  const [draftConfig, setDraftConfig] = useState<AppIdentityConfig>({ ...app.config });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [textSearch, setTextSearch] = useState('');
  const [draftTexts, setDraftTexts] = useState<Record<string, string>>({ ...app.textCatalog });

  const notify = (msg: string) => { setSaveSuccessMsg(msg); setTimeout(() => setSaveSuccessMsg(null), 3500); };
  const handleSaveConfig = async () => { if (await app.updateConfig(draftConfig)) notify('Konfigurasi disimpan & dipublikasikan!'); };
  const handleSaveTexts = async () => { if (await app.updateTextCatalog(draftTexts)) notify('Katalog teks disimpan sebagai draf!'); };
  const handlePublishTexts = async () => {
    try {
      const res = await fetch('/api/text-catalog/publish', { method: 'POST' });
      if ((await res.json()).success) notify('Katalog teks dipublikasikan ke seluruh perangkat!');
    } catch { notify('Gagal mempublikasikan'); }
  };

  return (
    <div className="w-full space-y-4 pb-20 animate-in fade-in duration-150">
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#5D4037] to-[#8D6E63] text-white shadow-md">
        <h2 className="text-base font-extrabold text-white">Konsol Pengaturan Sistem & Kwartir Cabang</h2>
        <p className="text-xs text-stone-200">Pengelolaan identitas cabang, katalog bahasa CMS, aturan kegiatan, data contoh, dan aset.</p>
      </div>
      {saveSuccessMsg && (
        <div className="p-3 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" /><span>{saveSuccessMsg}</span>
        </div>
      )}
      <SettingsTabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <SettingsTabContent
        activeTab={activeTab} app={app} draftConfig={draftConfig} setDraftConfig={setDraftConfig} handleSaveConfig={handleSaveConfig}
        draftTexts={draftTexts} setDraftTexts={setDraftTexts} handleSaveTexts={handleSaveTexts} handlePublishTexts={handlePublishTexts}
        textSearch={textSearch} setTextSearch={setTextSearch} notify={notify}
      />
    </div>
  );
};

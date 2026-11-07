import React, { useState, useEffect } from 'react';
import { CardTemplateConfig } from '../../types/config';
import { Palette, CheckCircle2, Save, Send, Eye, ShieldCheck, QrCode } from 'lucide-react';

const PRESETS: Record<string, { label: string; start: string; end: string; accent: string }> = {
  pradana_brown: { label: 'Pradana Brown (Khas Kwarcab)', start: '#5D4037', end: '#2D1B15', accent: '#F59E0B' },
  wosm_purple: { label: 'WOSM Imperial Purple', start: '#4A154B', end: '#240726', accent: '#E9D5FF' },
  penegak_gold: { label: 'Emas Penegak & Pandega', start: '#78350F', end: '#451A03', accent: '#FDE047' },
  forest_green: { label: 'Bhayangkara & Saka Forest', start: '#14532D', end: '#052E16', accent: '#86EFAC' },
  navy_blue: { label: 'Bahari & Dirgantara Navy', start: '#1E3A8A', end: '#0F172A', accent: '#93C5FD' },
};

function CardDesignFormControls({ template, setTemplate, onPresetChange }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
      <div className="sm:col-span-2">
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Judul Resmi Kartu</label>
        <input type="text" value={template.title} onChange={e => setTemplate({ ...template, title: e.target.value })} className="w-full px-3 py-2 border rounded-xl font-bold text-xs" />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Preset Tema Warna</label>
        <select value={template.themePreset} onChange={e => onPresetChange(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs font-medium">
          {Object.entries(PRESETS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Tipografi</label>
        <select value={template.fontFamily} onChange={e => setTemplate({ ...template, fontFamily: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-xs">
          <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern)</option>
          <option value="JetBrains Mono">JetBrains Mono (Tekno-Scout)</option>
          <option value="Manrope">Manrope (Clean Geometric)</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Posisi Foto Anggota</label>
        <select value={template.photoPosition} onChange={e => setTemplate({ ...template, photoPosition: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-xs">
          <option value="left">Kiri (Standar KTA)</option>
          <option value="center">Tengah (Vertikal)</option>
          <option value="right">Kanan</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Posisi Kolom & Layout</label>
        <select value={template.fieldLayout} onChange={e => setTemplate({ ...template, fieldLayout: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-xs">
          <option value="standard">Standar 1 Kolom</option>
          <option value="compact_two_col">Kompak 2 Kolom Grid</option>
        </select>
      </div>
    </div>
  );
}

function CardDesignActionButtons({ isSaving, onSaveDraft, onPublish }: any) {
  return (
    <div className="flex items-center gap-2 pt-3 border-t">
      <button onClick={onSaveDraft} disabled={isSaving} className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5">
        <Save className="w-3.5 h-3.5" /><span>Simpan Draf</span>
      </button>
      <button onClick={onPublish} disabled={isSaving} className="flex-1 py-2 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md">
        <Send className="w-3.5 h-3.5" /><span>Terbitkan Template</span>
      </button>
    </div>
  );
}

function CardDesignInteractivePreview({ template, previewRole, setPreviewRole }: any) {
  const isYouth = previewRole === 'peserta_didik';
  return (
    <div className="lg:col-span-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-700 flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-amber-700" />Pratinjau Langsung Kartu</span>
        <div className="flex gap-1 p-0.5 bg-stone-200 rounded-lg text-[10px]">
          <button onClick={() => setPreviewRole('peserta_didik')} className={`px-2 py-0.5 rounded-md font-bold ${isYouth ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'}`}>Peserta Didik</button>
          <button onClick={() => setPreviewRole('pembina')} className={`px-2 py-0.5 rounded-md font-bold ${!isYouth ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'}`}>Pembina</button>
        </div>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${template.gradientStart}, ${template.gradientEnd})`, fontFamily: template.fontFamily }} className="w-full aspect-[85.6/53.98] rounded-3xl p-4 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-white/20">
        <div className="flex items-center justify-between border-b border-white/15 pb-1">
          <div>
            <span className="text-[7px] font-black uppercase tracking-wider block" style={{ color: template.accentColor }}>{template.title}</span>
            <span className="text-[10px] font-black">KWARCAB KOTA DEPOK (09.22)</span>
          </div>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold bg-white/20">{isYouth ? 'Penegak Bantara' : 'Pembina Mahir (KML)'}</span>
        </div>
        <div className={`flex items-center gap-2.5 my-1 ${template.photoPosition === 'center' ? 'flex-col text-center' : ''}`}>
          <div className="w-14 h-18 rounded-xl bg-stone-800 border-2 border-white/40 shrink-0 overflow-hidden flex items-center justify-center"><span className="text-[9px] text-white/50 font-bold">FOTO</span></div>
          <div className="min-w-0 flex-1 space-y-0.5 text-left">
            <span className="text-[8px] font-mono font-bold block" style={{ color: template.accentColor }}>KTA Ayo Pramuka: {isYouth ? '09.22.01.00421' : '09.22.01.00015'}</span>
            <h4 className="text-xs font-black truncate">{isYouth ? 'Dimas Arya Pratama' : 'Kak Suryono, S.Pd., M.Pd.'}</h4>
            <p className="text-[9px] text-white/80">ID SIM-KWARCAB: {isYouth ? 'SK-USR-7701' : 'SK-PEM-0012'}</p>
            <p className="text-[8px] text-white/70">Pangkalan: SMA Negeri 1 Depok • Gudep 01.001</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/15 pt-1 text-[8px] text-white/70">
          <span>Masa Berlaku: 31 Des 2028</span>
          <div className="flex items-center gap-1"><QrCode className="w-3.5 h-3.5 text-white" /><span className="font-mono">VALID</span></div>
        </div>
      </div>
    </div>
  );
}

function useCardDesignState() {
  const [template, setTemplate] = useState<CardTemplateConfig>({
    id: 'template-default', title: 'Kartu Anggota Digital SIM-KWARCAB', version: 1, status: 'published',
    updatedAt: new Date().toISOString(), themePreset: 'pradana_brown', gradientStart: '#5D4037', gradientEnd: '#2D1B15',
    textColor: '#FFFFFF', accentColor: '#F59E0B', fontFamily: 'Plus Jakarta Sans', photoPosition: 'left',
    fieldLayout: 'standard', showQrFront: true, showQrBack: true, showWatermark: true, logoType: 'both'
  });
  const [previewRole, setPreviewRole] = useState<'peserta_didik' | 'pembina'>('peserta_didik');
  const [toast, setToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/membership/card-template').then(r => r.json()).then(d => { if (d.draft) setTemplate(d.draft); }).catch(() => {});
  }, []);

  const handlePresetChange = (presetKey: string) => {
    const p = PRESETS[presetKey];
    if (p) setTemplate(prev => ({ ...prev, themePreset: presetKey as any, gradientStart: p.start, gradientEnd: p.end, accentColor: p.accent }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/membership/card-template/draft', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(template) });
      const data = await res.json();
      setToast(data.message || 'Draf desain kartu disimpan.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/membership/card-template/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await res.json();
      setToast(data.message || 'Desain kartu digital resmi diterbitkan!');
      if (data.published) setTemplate(data.published);
    } finally {
      setIsSaving(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

  return { template, setTemplate, previewRole, setPreviewRole, toast, isSaving, handlePresetChange, handleSaveDraft, handlePublish };
}

export const CardDesignTab: React.FC = () => {
  const s = useCardDesignState();

  return (
    <div className="space-y-4">
      {s.toast && (
        <div className="p-3 bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" /><span>{s.toast}</span>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">Editor Desain Kartu Digital</h3>
              <p className="text-[10px] text-stone-500">Konfigurasi template terpusat (diterbitkan tanpa build ulang)</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${s.template.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
              Versi {s.template.version} ({s.template.status === 'published' ? 'Aktif Terbit' : 'Draf'})
            </span>
          </div>
          <CardDesignFormControls template={s.template} setTemplate={s.setTemplate} onPresetChange={s.handlePresetChange} />
          <CardDesignActionButtons isSaving={s.isSaving} onSaveDraft={s.handleSaveDraft} onPublish={s.handlePublish} />
        </div>
        <CardDesignInteractivePreview template={s.template} previewRole={s.previewRole} setPreviewRole={s.setPreviewRole} />
      </div>
    </div>
  );
};

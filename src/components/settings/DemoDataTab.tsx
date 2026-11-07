import React from 'react';
import { RefreshCw, Eye, EyeOff, Trash2, CheckCircle2, AlertTriangle, ShieldCheck, Database } from 'lucide-react';
import { useSampleDataManager, SampleStatus } from './useSampleDataManager';
import { SamplePurgeModal } from './SamplePurgeModal';

interface DemoDataTabProps {
  isDemoMode: boolean;
  onToggleDemoMode(enabled: boolean): void;
  onResetDemoData(): void;
}

const SampleStatusCards: React.FC<{ status: SampleStatus | null }> = ({ status }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
      <span className="text-[11px] text-stone-500 font-medium">Status Muatan</span>
      <div className="text-lg font-bold text-stone-900 mt-1">
        {status?.isLoaded ? 'Dimuat (Aktif)' : 'Bersih (Tanpa Contoh)'}
      </div>
      <span className="text-[10px] text-stone-400">Total {status?.totalSampleCount ?? 0} entri contoh</span>
    </div>
    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
      <span className="text-[11px] text-stone-500 font-medium">Visibilitas Publik</span>
      <div className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-1.5">
        {status?.isHidden ? (
          <span className="text-indigo-700 flex items-center gap-1"><EyeOff className="w-4 h-4" /> Disembunyikan</span>
        ) : (
          <span className="text-emerald-700 flex items-center gap-1"><Eye className="w-4 h-4" /> Ditampilkan</span>
        )}
      </div>
      <span className="text-[10px] text-stone-400">
        {status?.isHidden ? 'Dikecualikan dari statistik & ekspor' : 'Terlihat pada pengujian'}
      </span>
    </div>
    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
      <span className="text-[11px] text-stone-500 font-medium">Perlindungan Sistem</span>
      <div className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-1 text-emerald-700">
        <ShieldCheck className="w-4 h-4" /> Terlindungi
      </div>
      <span className="text-[10px] text-stone-400">Akun admin & Kwarcab aman</span>
    </div>
  </div>
);

export const DemoDataTab: React.FC<DemoDataTabProps> = () => {
  const m = useSampleDataManager();

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-700" /> Pengelolaan Data Contoh Instalasi
        </h3>
        <p className="text-xs text-stone-500">Kelola data simulasi untuk pengujian tanpa mencemari data riil Kwarcab atau akun admin.</p>
      </div>

      {m.message && (
        <div className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
          m.message.type === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
          m.message.type === 'danger' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-blue-100 text-blue-800 border border-blue-300'
        }`}>
          {m.message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
          <span>{m.message.text}</span>
        </div>
      )}

      <SampleStatusCards status={m.status} />

      <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
        <h4 className="text-xs font-bold text-stone-900">Aksi Pengelolaan</h4>
        <div className="flex flex-wrap gap-2">
          <button onClick={m.handleLoadSample} disabled={m.loading} className="flex items-center gap-1.5 px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition disabled:opacity-50">
            <RefreshCw className="w-3.5 h-3.5" /> Muat / Muat Ulang Data Contoh
          </button>
          <button onClick={m.handleToggleVisibility} disabled={m.loading} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition disabled:opacity-50 text-white ${m.status?.isHidden ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-stone-700 hover:bg-stone-800'}`}>
            {m.status?.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {m.status?.isHidden ? 'Tampilkan ke Publik & Statistik' : 'Sembunyikan dari Publik & Statistik'}
          </button>
          <button onClick={m.handlePreparePurge} disabled={m.loading || !m.status?.isLoaded} className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50">
            <Trash2 className="w-3.5 h-3.5" /> Hapus Massal Data Contoh
          </button>
        </div>
      </div>

      {m.showPurgeModal && (
        <SamplePurgeModal
          impactData={m.impactData} loading={m.loading} onClose={() => m.setShowPurgeModal(false)} onConfirm={m.handleConfirmPurge}
        />
      )}
    </div>
  );
};

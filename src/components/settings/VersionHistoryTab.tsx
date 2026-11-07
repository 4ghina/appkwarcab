import React from 'react';
import { History, RefreshCw } from 'lucide-react';
import { ConfigVersionSnapshot } from '../../types/config';

interface VersionHistoryTabProps {
  versionHistory: ConfigVersionSnapshot[];
  onRestoreVersion: (id: string) => void;
}

export const VersionHistoryTab: React.FC<VersionHistoryTabProps> = ({
  versionHistory,
  onRestoreVersion
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-stone-900">Riwayat Versi Konfigurasi & Audit Trail</h3>
        <p className="text-xs text-stone-500">Daftar riwayat perubahan pengaturan sistem dan audit perubahan.</p>
      </div>

      <div className="space-y-3">
        {versionHistory.map((item) => (
          <div key={item.id || item.versionId} className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-stone-500" /> Versi {item.version || item.versionId || item.id}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">{item.timestamp}</span>
            </div>
            <p className="text-xs text-stone-600">{item.changeSummary || item.summary || 'Pembaruan konfigurasi'}</p>
            <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[10px]">
              <span className="text-stone-500">Oleh: {item.author}</span>
              <button
                onClick={() => onRestoreVersion(item.id || item.versionId || '')}
                className="text-[#5D4037] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Pulihkan Versi Ini
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

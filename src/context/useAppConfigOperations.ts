import { AppIdentityConfig, ConfigVersionHistory } from '../types/config';

export function createConfigOperations(
  setConfig: React.Dispatch<React.SetStateAction<AppIdentityConfig>>,
  setVersionHistory: React.Dispatch<React.SetStateAction<ConfigVersionHistory[]>>,
  setIsSaving: (s: boolean) => void,
  refreshData: () => Promise<void>
) {
  const updateConfig = async (newConfig: AppIdentityConfig, summary = 'Pembaruan identitas dan tampilan sistem'): Promise<boolean> => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: newConfig, author: 'Super Admin Kwarcab', summary }),
      });
      if (!res.ok) throw new Error('Gagal menyimpan ke server');
      const data = await res.json();
      setConfig(data.config);
      const histRes = await fetch('/api/config/history');
      if (histRes.ok) setVersionHistory(await histRes.json());
      return true;
    } catch (err) {
      setConfig(newConfig);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const restoreVersion = async (versionId: string): Promise<boolean> => {
    try {
      setIsSaving(true);
      const res = await fetch(`/api/config/restore/${versionId}`, { method: 'POST' });
      if (!res.ok) throw new Error('Gagal memulihkan versi');
      const data = await res.json();
      setConfig(data.config);
      await refreshData();
      return true;
    } catch (err) {
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleDemoMode = async (enabled: boolean): Promise<boolean> => {
    try {
      const res = await fetch('/api/system/toggle-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });
      if (!res.ok) throw new Error('Gagal mengubah mode demo');
      setConfig(prev => ({ ...prev, isDemoMode: enabled }));
      return true;
    } catch (err) {
      setConfig(prev => ({ ...prev, isDemoMode: enabled }));
      return false;
    }
  };

  const resetDemoData = async (): Promise<{ success: boolean; message: string }> => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/system/reset-demo', { method: 'POST' });
      if (!res.ok) throw new Error('Gagal membersihkan data demo');
      const data = await res.json();
      await refreshData();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal membersihkan data demo' };
    } finally {
      setIsSaving(false);
    }
  };

  return { updateConfig, restoreVersion, toggleDemoMode, resetDemoData };
}

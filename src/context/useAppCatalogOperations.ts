import { MediaAssetRecord, OperationalEvent } from '../types/config';

export function createCatalogOperations(
  setTextCatalog: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setMediaAssets: React.Dispatch<React.SetStateAction<MediaAssetRecord[]>>,
  setEvents: React.Dispatch<React.SetStateAction<OperationalEvent[]>>,
  setIsSaving: (s: boolean) => void
) {
  const updateTextCatalog = async (newCatalog: Record<string, string>): Promise<boolean> => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/text-catalog', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ entries: newCatalog }) });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTextCatalog(data.entries);
      return true;
    } catch { setTextCatalog(newCatalog); return false; } finally { setIsSaving(false); }
  };

  const resetTextCatalog = async (): Promise<boolean> => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/text-catalog/reset', { method: 'POST' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTextCatalog(data.entries);
      return true;
    } catch { return false; } finally { setIsSaving(false); }
  };

  const uploadMedia = async (file: File, category = 'logo', label?: string): Promise<MediaAssetRecord | null> => {
    try {
      setIsSaving(true);
      const fd = new FormData();
      fd.append('file', file); fd.append('category', category);
      if (label) fd.append('altText', label);
      const res = await fetch('/api/media/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const assetsRes = await fetch('/api/media');
      if (assetsRes.ok) setMediaAssets(await assetsRes.json());
      return data.media;
    } catch { return null; } finally { setIsSaving(false); }
  };

  const deleteMedia = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setMediaAssets(prev => prev.filter(a => a.id !== id));
      return true;
    } catch { return false; }
  };

  const updateEvent = async (id: string, updates: Partial<OperationalEvent>): Promise<boolean> => {
    try {
      setIsSaving(true);
      const res = await fetch(`/api/operational/events/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEvents(prev => prev.map(e => e.id === id ? data.event : e));
      return true;
    } catch { setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e)); return false; } finally { setIsSaving(false); }
  };

  const createEvent = async (newEvent: Partial<OperationalEvent>): Promise<boolean> => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/operational/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEvent) });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEvents(prev => [data.event, ...prev]);
      return true;
    } catch { return false; } finally { setIsSaving(false); }
  };

  return { updateTextCatalog, resetTextCatalog, uploadMedia, deleteMedia, updateEvent, createEvent };
}

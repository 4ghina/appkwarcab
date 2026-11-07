import { useState, useEffect } from 'react';

export interface SampleStatus {
  isLoaded: boolean;
  isHidden: boolean;
  sampleEventsCount: number;
  sampleStudentsCount: number;
  sampleSubmissionsCount: number;
  totalSampleCount: number;
}

export async function apiToggleVisibility(hidden: boolean) {
  const res = await fetch('/api/admin/sample-data/toggle-visibility', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hidden })
  });
  return res.json();
}

export async function apiLoadSample() {
  const res = await fetch('/api/admin/sample-data/load', { method: 'POST' });
  return res.json();
}

export async function apiPurge() {
  const res = await fetch('/api/admin/sample-data/purge', { method: 'POST' });
  return res.json();
}

function usePurgeAction(
  setLoading: (b: boolean) => void,
  refresh: () => Promise<void>,
  setMessage: (m: any) => void
) {
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [impactData, setImpactData] = useState<any>(null);

  const handlePreparePurge = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/sample-data/impact');
      const data = await res.json();
      if (data.success) { setImpactData(data.impact); setShowPurgeModal(true); }
    } finally { setLoading(false); }
  };

  const handleConfirmPurge = async () => {
    setLoading(true);
    try {
      const data = await apiPurge();
      setShowPurgeModal(false);
      setMessage({
        text: data.message + (data.conflicts ? ` (${data.conflicts.join('; ')})` : ''),
        type: data.success ? 'success' : 'danger'
      });
      await refresh();
    } finally { setLoading(false); }
  };

  return { showPurgeModal, setShowPurgeModal, impactData, handlePreparePurge, handleConfirmPurge };
}

export function useSampleDataManager() {
  const [status, setStatus] = useState<SampleStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'danger' | 'info' } | null>(null);

  const refresh = async () => {
    try {
      const res = await fetch('/api/admin/sample-data/status');
      const data = await res.json();
      if (data.success) setStatus(data);
    } catch {}
  };

  useEffect(() => { refresh(); }, []);

  const purge = usePurgeAction(setLoading, refresh, setMessage);

  const handleToggleVisibility = async () => {
    if (!status) return;
    setLoading(true);
    try {
      const data = await apiToggleVisibility(!status.isHidden);
      if (data.success) {
        setMessage({ text: data.isHidden ? 'Data contoh disembunyikan.' : 'Data contoh ditampilkan.', type: 'info' });
        await refresh();
      }
    } finally { setLoading(false); }
  };

  const handleLoadSample = async () => {
    setLoading(true);
    try {
      const data = await apiLoadSample();
      if (data.success) { setMessage({ text: 'Data contoh berhasil dimuat.', type: 'success' }); await refresh(); }
    } finally { setLoading(false); }
  };

  return {
    status, loading, message, ...purge, handleToggleVisibility, handleLoadSample
  };
}

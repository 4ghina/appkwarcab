import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ThematicCategory,
  ThematicViewMode,
  ThematicMapDataset,
  ThematicGudepSummary,
} from './thematicMapTypes';

export function useThematicDataFetch() {
  const [dataset, setDataset] = useState<ThematicMapDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/map/thematic');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && json.data) {
        setDataset(json.data);
      } else {
        throw new Error(json.message || 'Format data tidak sesuai');
      }
    } catch (err: any) {
      setError(err?.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { dataset, loading, error, refetch: fetchData };
}

export function useThematicMapState() {
  const { dataset, loading, error, refetch } = useThematicDataFetch();
  const [activeCategory, setActiveCategory] = useState<ThematicCategory>('peserta_didik');
  const [activeMetricId, setActiveMetricId] = useState<string>('total_peserta');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [selectedGudep, setSelectedGudep] = useState<ThematicGudepSummary | null>(null);
  const [viewMode, setViewMode] = useState<ThematicViewMode>('thematic');

  const categoryMetrics = useMemo(() => {
    if (!dataset?.metricsCatalog) return [];
    return dataset.metricsCatalog.filter((m) => m.category === activeCategory);
  }, [dataset, activeCategory]);

  const activeMetric = useMemo(() => {
    if (!dataset?.metricsCatalog) return null;
    return dataset.metricsCatalog.find((m) => m.id === activeMetricId) || dataset.metricsCatalog[0];
  }, [dataset, activeMetricId]);

  const handleCategoryChange = (cat: ThematicCategory) => {
    setActiveCategory(cat);
    const first = dataset?.metricsCatalog.find((m) => m.category === cat);
    if (first) setActiveMetricId(first.id);
  };

  const maxMetricValue = useMemo(() => {
    if (!dataset?.districts || !activeMetricId) return 1;
    return Math.max(1, ...dataset.districts.map((d) => d.metrics[activeMetricId]?.value || 0));
  }, [dataset, activeMetricId]);

  const selectedDistrict = useMemo(() => {
    return dataset?.districts?.find((d) => d.id === selectedDistrictId) || null;
  }, [dataset, selectedDistrictId]);

  const selectDistrict = (id: string | null) => {
    setSelectedDistrictId((prev) => (prev === id ? null : id));
    setSelectedGudep(null);
  };

  return {
    dataset, loading, error, refetch,
    activeCategory, handleCategoryChange,
    activeMetricId, setActiveMetricId, activeMetric, categoryMetrics, maxMetricValue,
    selectedDistrictId, selectedDistrict, selectDistrict,
    hoveredDistrictId, setHoveredDistrictId,
    selectedGudep, setSelectedGudep,
    viewMode, setViewMode,
  };
}

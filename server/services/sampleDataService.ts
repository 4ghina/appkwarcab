import { db } from '../db';
import { readJsonFile, writeJsonFile } from '../db/fileStorage';

export interface SampleDataImpact {
  sampleUnitsCount: number;
  sampleMembersCount: number;
  sampleEventsCount: number;
  sampleSubmissionsCount: number;
  hasRealConflicts: boolean;
  conflicts: string[];
}

export const sampleDataService = {
  getStatus() {
    const config = db.getConfig();
    const events = db.getOperationalEvents();
    const students = db.getMentoredStudents();
    const submissions = db.getSubmissions();

    const sampleEvents = events.filter(e => (e as any).isSample);
    const sampleStudents = students.filter(s => (s as any).isSample);
    const sampleSubmissions = submissions.filter(s => (s as any).isSample);

    return {
      isLoaded: (config as any).sampleDataLoaded ?? true,
      isHidden: (config as any).sampleDataHidden ?? false,
      sampleEventsCount: sampleEvents.length,
      sampleStudentsCount: sampleStudents.length,
      sampleSubmissionsCount: sampleSubmissions.length,
      totalSampleCount: sampleEvents.length + sampleStudents.length + sampleSubmissions.length
    };
  },

  toggleVisibility(hidden: boolean) {
    const config = db.getConfig();
    (config as any).sampleDataHidden = hidden;
    db.saveConfig(
      config,
      'Super Admin Kwarcab',
      hidden ? 'Menyembunyikan data contoh dari publik & statistik' : 'Menampilkan data contoh'
    );
    return { success: true, isHidden: hidden };
  },

  loadSampleData() {
    const config = db.getConfig();
    (config as any).sampleDataLoaded = true;
    (config as any).sampleDataHidden = false;
    db.saveConfig(config, 'Super Admin Kwarcab', 'Memuat paket data contoh instalasi awal');

    // Ensure sample flags are on seeded records
    const events = db.getOperationalEvents().map(e => ({ ...e, isSample: true }));
    db.saveOperationalEvents(events);

    const students = db.getMentoredStudents().map(s => ({ ...s, isSample: true }));
    db.saveMentoredStudents(students);

    const submissions = db.getSubmissions().map(s => ({ ...s, isSample: true }));
    db.saveSubmissions(submissions);

    return { success: true, message: 'Data contoh berhasil dimuat dengan flag isSample aktif.' };
  },

  getImpactAnalysis(): SampleDataImpact {
    const events = db.getOperationalEvents();
    const students = db.getMentoredStudents();
    const submissions = db.getSubmissions();

    const sampleEvents = events.filter(e => (e as any).isSample);
    const sampleStudents = students.filter(s => (s as any).isSample);
    const sampleSubmissions = submissions.filter(s => (s as any).isSample);

    const conflicts: string[] = [];
    const realStudents = students.filter(s => !(s as any).isSample);
    if (realStudents.length > 0) {
      // Check if real student registered to sample event
      const sampleEventIds = new Set(sampleEvents.map(e => e.id));
      realStudents.forEach(st => {
        if (st.registeredEventId && sampleEventIds.has(st.registeredEventId)) {
          conflicts.push(`Anggota riil ${st.name} terdaftar pada Kegiatan Contoh (${st.registeredEventId})`);
        }
      });
    }

    return {
      sampleUnitsCount: 2, // Demo Kwarran & Gudep
      sampleMembersCount: sampleStudents.length,
      sampleEventsCount: sampleEvents.length,
      sampleSubmissionsCount: sampleSubmissions.length,
      hasRealConflicts: conflicts.length > 0,
      conflicts
    };
  },

  purgeSampleData(): { success: boolean; message: string; conflicts?: string[] } {
    const impact = this.getImpactAnalysis();
    if (impact.hasRealConflicts) {
      return {
        success: false,
        message: 'Penghapusan dibatalkan: Terdapat relasi antara data contoh dan data riil pengguna.',
        conflicts: impact.conflicts
      };
    }

    // Safely remove sample data only
    const events = db.getOperationalEvents().filter(e => !(e as any).isSample);
    db.saveOperationalEvents(events);

    const students = db.getMentoredStudents().filter(s => !(s as any).isSample);
    db.saveMentoredStudents(students);

    const submissions = db.getSubmissions().filter(s => !(s as any).isSample);
    db.saveSubmissions(submissions);

    // Retain core system configs, update status
    const config = db.getConfig();
    (config as any).sampleDataLoaded = false;
    db.saveConfig(config, 'Super Admin Kwarcab', 'Pembersihan aman seluruh data contoh (Purge Sample Data)');

    return {
      success: true,
      message: 'Seluruh data contoh berhasil dihapus. Data dasar sistem, admin, dan identitas Kwarcab tetap aman.'
    };
  }
};

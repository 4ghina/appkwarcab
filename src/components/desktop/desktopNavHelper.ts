import {
  Compass, MapPin, Award, Calendar, User, Settings, BookOpen, CheckCircle2,
  Users, Shield, HelpCircle, Wifi
} from 'lucide-react';
import { UserProfile } from '../../types/scout';

export function buildPrimaryNav(t: (k: string, fb?: string) => string) {
  return [
    { id: 'beranda', label: t('nav.home', 'Beranda'), icon: Compass },
    { id: 'peta', label: t('nav.map', 'Peta Gudep'), icon: MapPin },
    { id: 'garuda', label: t('nav.garuda', 'E-Garuda'), icon: Award },
    { id: 'kegiatan', label: t('nav.events', 'Kegiatan & Kuota'), icon: Calendar },
    { id: 'profil', label: t('nav.profile', 'Profil & KTA'), icon: User },
  ];
}

export function buildSecondaryNav(
  t: (k: string, fb?: string) => string,
  currentUser: UserProfile | null,
  pendingCount: number
) {
  const isPembina = Boolean(currentUser?.assignments.some(a => a.canExamineSKU) || currentUser?.role === 'pembina');
  return [
    ...(isPembina ? [{ id: 'pembinaan', label: 'Pembinaan Peserta Didik', icon: Users, modal: 'pembinaan' }] : []),
    ...(currentUser?.memberCategory === 'peserta_didik' ? [{ id: 'sku', label: t('nav.sku', 'E-SKU & SKK'), icon: BookOpen, modal: 'sku' }] : []),
    { id: 'rfid', label: 'Terminal KTA RFID/NFC', icon: Wifi, modal: 'rfid' },
    { id: 'pusdiklat', label: t('nav.pusdiklat', 'Pusdiklatcab'), icon: Shield, modal: 'pusdiklat' },
    { id: 'saka', label: t('nav.saka', 'Saka & Krida'), icon: Compass, modal: 'saka' },
    { id: 'verifikasi', label: t('nav.verification', 'Verifikasi Dokumen'), icon: CheckCircle2, modal: 'verifikasi', badge: pendingCount },
    { id: 'help', label: 'Panduan & Bantuan', icon: HelpCircle, modal: 'help' },
    { id: 'settings', label: t('nav.settings', 'Pengaturan CMS Terpusat'), icon: Settings, modal: 'settings' },
  ];
}

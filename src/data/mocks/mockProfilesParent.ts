import type { UserProfile } from '../../types/scout';

export const MOCK_PROFILES_PARENT: Record<string, UserProfile> = {
  // 10. Orang Tua / Wali
  orang_tua: {
    id: 'user-parent-1',
    email: 'bunda.ratna@gmail.com',
    name: 'Bunda Ratna Wulandari',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    birthDate: '15 September 1984',
    calculatedAge: 41,
    phone: '081299112233',
    gender: 'P',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'orang_tua',
    assignments: [
      {
        id: 'asg-parent-1',
        roleType: 'Orang Tua / Wali',
        title: 'Wali Pendamping Pramuka Siaga',
        organizationUnit: 'Gudep 01.011 SDN Anyelir 1 Depok',
        level: 'Gudep',
        approvedBy: 'Yanda Joko Susilo (Pembina Gudep)',
        approvedDate: '10 Jan 2025',
        isPrimary: true,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: false
      }
    ],
    activeContextId: 'ctx-parent',
    availableContexts: [
      {
        id: 'ctx-parent',
        contextType: 'orang_tua',
        label: 'Orang Tua / Wali Murid',
        subLabel: 'Pendamping Rizky Al-Fatih',
        unitName: 'Gudep 01.011 SDN Anyelir 1 Depok',
        canExamine: false,
        canManageVerification: false
      }
    ],
    nta: null,
    provisionalNta: 'WALI-2026-0041',
    golongan: 'Umum',
    tingkatan: 'Orang Tua / Wali Anggota',
    gudepName: 'Pangkalan SDN Anyelir 1 Depok (Mitra Wali)',
    gudepNomor: '01.011 - 01.012',
    pangkalan: 'SD Negeri Anyelir 1 Depok',
    kwarran: 'Pancoran Mas',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: false,
    bloodType: 'B+',
    masaBerlaku: 'Pendamping Aktif',
    role: 'orang_tua',
    roleLabel: 'Orang Tua / Wali Murid',
    isParentAccount: true,
    managedWards: [
      {
        id: 'ward-1',
        name: 'Rizky Al-Fatih',
        birthDate: '05 Mei 2016',
        gender: 'L',
        golongan: 'Siaga',
        gudepName: 'Pangkalan SDN Anyelir 1 Depok',
        gudepNomor: '01.011',
        kwarran: 'Pancoran Mas',
        nta: '09.22.01.09012',
        membershipStatus: 'verified',
        avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80',
        relation: 'Anak Kandung',
        skuProgress: { passed: 4, total: 6 }
      }
    ]
  }
};

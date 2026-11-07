import type { UserProfile } from '../../types/scout';

export const MOCK_PROFILES_ADMINS: Record<string, UserProfile> = {
  // 7. Administrator Kwarran (Kecamatan)
  admin_kwarran: {
    id: 'user-kwarran-1',
    email: 'fauzi@pramuka.id',
    name: 'Kak Ahmad Fauzi, S.Sos.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    birthDate: '19 November 1985',
    calculatedAge: 40,
    phone: '081398765432',
    gender: 'L',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'anggota_dewasa',
    assignments: [
      {
        id: 'asg-kwarran-1',
        roleType: 'Administrator Kwartir',
        title: 'Sekretaris & Admin SIM-KWARCAB Kwarran',
        organizationUnit: 'Kwartir Ranting Pancoran Mas',
        level: 'Kwarran',
        approvedBy: 'Ketua Kwarcab Kota Depok',
        approvedDate: '10 Feb 2023',
        isPrimary: true,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: true
      }
    ],
    activeContextId: 'ctx-admin-kwarran',
    availableContexts: [
      {
        id: 'ctx-admin-kwarran',
        contextType: 'admin_kwarran',
        label: 'Admin Kwartir Ranting',
        subLabel: 'Kecamatan Pancoran Mas',
        unitName: 'Kwartir Ranting Pancoran Mas',
        canExamine: false,
        canManageVerification: true
      }
    ],
    adultCredentials: {
      courses: {
        kmd: {
          code: 'KMD',
          name: 'Kursus Mahir Dasar',
          level: 'Mahir Dasar',
          status: 'selesai',
          year: 2020,
          certNumber: 'KMD/088/KWARCAB-DPK/2020',
          organizer: 'Pusdiklatcab Wijayakusuma Kota Depok'
        },
        kml: { code: 'KML', name: 'Kursus Mahir Lanjutan', level: 'Mahir Lanjutan', status: 'belum_tercatat' },
        kpd: { code: 'KPD', name: 'Kursus Pelatih Dasar', level: 'Pelatih Dasar', status: 'belum_tercatat' },
        kpl: { code: 'KPL', name: 'Kursus Pelatih Lanjutan', level: 'Pelatih Lanjutan', status: 'belum_tercatat' }
      },
      documents: {
        shb: {
          code: 'SHB',
          name: 'Surat Hak Bina',
          status: 'aktif',
          docNumber: 'SHB/090/KMD/KWARCAB-DPK/2023',
          issuedDate: '10 Februari 2023',
          expiryDate: '09 Februari 2026',
          issuedBy: 'Kwartir Cabang Kota Depok'
        },
        shl: { code: 'SHL', name: 'Surat Hak Latih', status: 'belum_memiliki' }
      }
    },
    nta: '09.22.01.00003',
    golongan: 'Pembina',
    tingkatan: 'Andalan Kwarran Bidang Binamuda',
    gudepName: 'Kwartir Ranting Pancoran Mas',
    gudepNomor: 'Sekretariat Kwarran',
    pangkalan: 'Kantor Kecamatan Pancoran Mas',
    kwarran: 'Kwarran Pancoran Mas',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: false,
    bloodType: 'B+',
    masaBerlaku: 'Seumur Hidup',
    role: 'admin_kwarran',
    roleLabel: 'Admin Kwarran Pancoran Mas',
  },

  // 8. Super Administrator Kwarcab (Kak Bambang)
  superadmin_kwarcab: {
    id: 'user-kwarcab-1',
    email: 'bambang@pramuka.id',
    name: 'Kak Drs. Bambang Hermawan, M.Si.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    birthDate: '01 Juli 1972',
    calculatedAge: 54,
    phone: '081122334455',
    gender: 'L',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'anggota_dewasa',
    assignments: [
      {
        id: 'asg-kwarcab-1',
        roleType: 'Super Administrator',
        title: 'Andalan Cabang Urusan Sistem Informasi (Pusinfo)',
        organizationUnit: 'Kwartir Cabang Kota Depok',
        level: 'Kwarcab',
        approvedBy: 'Ketua Kwartir Cabang',
        approvedDate: '01 Jan 2021',
        isPrimary: true,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: true
      },
      {
        id: 'asg-kwarcab-2',
        roleType: 'Pelatih Pembina',
        title: 'Pelatih Tingkat Lanjutan (KPL)',
        organizationUnit: 'Pusdiklatcab Wijayakusuma Kota Depok',
        level: 'Kwarcab',
        approvedBy: 'Pusdiklatda Kwarda Jabar',
        approvedDate: '15 Agu 2021',
        isPrimary: false,
        canExamineSKU: true,
        canAwardTKK: true,
        canManageMembers: true
      }
    ],
    activeContextId: 'ctx-superadmin',
    availableContexts: [
      {
        id: 'ctx-superadmin',
        contextType: 'superadmin_kwarcab',
        label: 'Super Admin Kwarcab (Pusinfo)',
        subLabel: 'Kwartir Cabang Kota Depok',
        unitName: 'Kwarcab Kota Depok',
        canExamine: false,
        canManageVerification: true
      },
      {
        id: 'ctx-pelatih-bambang',
        contextType: 'pelatih',
        label: 'Pelatih Pembina (KPL)',
        subLabel: 'Pusdiklatcab Wijayakusuma',
        unitName: 'Pusdiklatcab Wijayakusuma Kota Depok',
        canExamine: true,
        canManageVerification: true
      }
    ],
    adultCredentials: {
      courses: {
        kmd: { code: 'KMD', name: 'Kursus Mahir Dasar', level: 'Mahir Dasar', status: 'selesai', year: 2004, certNumber: 'KMD/002/KWARCAB-DPK/2004' },
        kml: { code: 'KML', name: 'Kursus Mahir Lanjutan', level: 'Mahir Lanjutan', status: 'selesai', year: 2008, certNumber: 'KML/014/KWARDA/2008' },
        kpd: { code: 'KPD', name: 'Kursus Pelatih Dasar', level: 'Pelatih Dasar', status: 'selesai', year: 2014, certNumber: 'KPD/008/KWARDA/2014' },
        kpl: { code: 'KPL', name: 'Kursus Pelatih Lanjutan', level: 'Pelatih Lanjutan', status: 'selesai', year: 2021, certNumber: 'KPL/003/KWARNAS/2021' }
      },
      documents: {
        shb: { code: 'SHB', name: 'Surat Hak Bina', status: 'aktif', docNumber: 'SHB/001/KML/KWARCAB-DPK/2021', issuedDate: '10 Januari 2021', expiryDate: 'Permanen' },
        shl: { code: 'SHL', name: 'Surat Hak Latih', status: 'aktif', docNumber: 'SHL/001/KPL/KWARDA/2021', issuedDate: '15 Agustus 2021', expiryDate: 'Permanen' }
      }
    },
    youthArchive: {
      hasYouthRecord: true,
      highestGolongan: 'Penegak',
      highestTingkat: 'Penegak Laksana',
      garudaYear: 1989,
      tkkBadgesCount: 18,
      historicalGudep: 'SMAN 1 Depok',
      historicalKwarran: 'Pancoran Mas'
    },
    nta: '09.22.00.00001',
    golongan: 'Pelatih',
    tingkatan: 'Pelatih Pembina Pramuka (KPL) / Ancab Pusinfo',
    gudepName: 'Kwartir Cabang Kota Depok',
    gudepNomor: 'Pusinfo Kwarcab',
    pangkalan: 'Gedung Pramuka Kwarcab Kota Depok',
    kwarran: 'Kwarcab Pusat',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: true,
    garudaYear: 2018,
    bloodType: 'O+',
    masaBerlaku: 'Seumur Hidup',
    role: 'superadmin_kwarcab',
    roleLabel: 'Super Admin Kwarcab / Pusinfo',
  },

  // 9. Admin Pusdiklatcab & Saka
  admin_pusdiklatcab_saka: {
    id: 'user-pusdiklatcab-1',
    email: 'endang@pramuka.id',
    name: 'Kak Endang Lestari, S.Pd., M.Si.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    birthDate: '23 Mei 1978',
    calculatedAge: 48,
    phone: '081299887766',
    gender: 'P',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'anggota_dewasa',
    assignments: [
      {
        id: 'asg-pusdiklat-1',
        roleType: 'Pimpinan Pusdiklatcab',
        title: 'Kepala Pusdiklatcab Wijayakusuma',
        organizationUnit: 'Pusdiklatcab Wijayakusuma Kota Depok',
        level: 'Kwarcab',
        approvedBy: 'Ketua Kwarcab',
        approvedDate: '10 Feb 2022',
        isPrimary: true,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: true
      }
    ],
    activeContextId: 'ctx-pusdiklat',
    availableContexts: [
      {
        id: 'ctx-pusdiklat',
        contextType: 'admin_pusdiklat',
        label: 'Kepala Pusdiklatcab',
        subLabel: 'Pusdiklatcab Wijayakusuma',
        unitName: 'Pusdiklatcab Kota Depok',
        canExamine: false,
        canManageVerification: true
      }
    ],
    adultCredentials: {
      courses: {
        kmd: { code: 'KMD', name: 'Kursus Mahir Dasar', level: 'Dasar', status: 'selesai', year: 2006, certNumber: 'KMD/011/2006' },
        kml: { code: 'KML', name: 'Kursus Mahir Lanjutan', level: 'Lanjutan', status: 'selesai', year: 2010, certNumber: 'KML/045/2010' },
        kpd: { code: 'KPD', name: 'Kursus Pelatih Dasar', level: 'Pelatih Dasar', status: 'selesai', year: 2016, certNumber: 'KPD/021/2016' },
        kpl: { code: 'KPL', name: 'Kursus Pelatih Lanjutan', level: 'Pelatih Lanjutan', status: 'selesai', year: 2022, certNumber: 'KPL/004/2022' }
      },
      documents: {
        shb: { code: 'SHB', name: 'Surat Hak Bina', status: 'aktif', docNumber: 'SHB/012/KML/2022' },
        shl: { code: 'SHL', name: 'Surat Hak Latih', status: 'aktif', docNumber: 'SHL/004/KPL/KWARDA/2022', expiryDate: 'Permanen' }
      }
    },
    nta: '09.22.00.00007',
    golongan: 'Pelatih',
    tingkatan: 'Kepala Pusdiklatcab / Pinsaka Bakti Husada',
    gudepName: 'Pusdiklatcab Wijayakusuma',
    gudepNomor: 'Pusdiklatcab 00.01',
    pangkalan: 'Pusdiklatcab Kota Depok',
    kwarran: 'Kwarcab Pusat',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: true,
    garudaYear: 2019,
    bloodType: 'A+',
    masaBerlaku: 'Seumur Hidup',
    role: 'admin_pusdiklatcab_saka',
    roleLabel: 'Admin Pusdiklatcab & Saka',
  }
};


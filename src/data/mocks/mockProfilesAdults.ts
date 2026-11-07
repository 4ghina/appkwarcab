import type { UserProfile } from '../../types/scout';

export const MOCK_PROFILES_ADULTS: Record<string, UserProfile> = {
  // 6. Pembina Gudep Berwenang (Kak Suryono)
  pembina: {
    id: 'user-pembina-1',
    email: 'suryono@pramuka.id',
    name: 'Kak Suryono, S.Pd., M.Pd.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    birthDate: '08 Maret 1980',
    calculatedAge: 46,
    phone: '081234567890',
    gender: 'L',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'anggota_dewasa',
    assignments: [
      {
        id: 'asg-pembina-1',
        roleType: 'Pembina Satuan',
        title: 'Ketua Gugus Depan (Ka Gudep) & Pembina Penegak',
        organizationUnit: 'Gudep 01.001 - 01.002 SMAN 1 Depok',
        organizationUnitId: 'gudep-01',
        level: 'Gudep',
        approvedBy: 'Mabigus SMAN 1 Depok',
        approvedDate: '05 Jan 2022',
        isPrimary: true,
        canExamineSKU: true,
        canAwardTKK: true,
        canManageMembers: true,
        scopeGudepId: 'gudep-01',
        assignedGolongan: ['Penegak']
      }
    ],
    activeContextId: 'ctx-pembina-gudep',
    availableContexts: [
      {
        id: 'ctx-pembina-gudep',
        contextType: 'pembina_satuan',
        label: 'Pembina Gudep & Satuan Penegak',
        subLabel: 'Ambalan Trisula - Trisakti',
        unitName: 'Gudep 01.001 SMAN 1 Depok',
        scopeGudepId: 'gudep-01',
        canExamine: true,
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
          year: 2010,
          certNumber: 'KMD/042/KWARCAB-DPK/2010',
          organizer: 'Pusdiklatcab Wijayakusuma Kota Depok'
        },
        kml: {
          code: 'KML',
          name: 'Kursus Mahir Lanjutan',
          level: 'Mahir Lanjutan',
          status: 'selesai',
          year: 2015,
          certNumber: 'KML/019/KWARDA-JBR/2015',
          organizer: 'Kwarda Jawa Barat'
        },
        kpd: {
          code: 'KPD',
          name: 'Kursus Pelatih Dasar',
          level: 'Pelatih Dasar',
          status: 'belum_tercatat'
        },
        kpl: {
          code: 'KPL',
          name: 'Kursus Pelatih Lanjutan',
          level: 'Pelatih Lanjutan',
          status: 'belum_tercatat'
        }
      },
      documents: {
        shb: {
          code: 'SHB',
          name: 'Surat Hak Bina',
          status: 'aktif',
          docNumber: 'SHB/022/KML-EG/KWARCAB-DPK/2023',
          issuedDate: '15 Maret 2023',
          expiryDate: '15 Maret 2028',
          issuingAuthority: 'Ketua Kwarcab Kota Depok'
        },
        shl: {
          code: 'SHL',
          name: 'Surat Hak Latih',
          status: 'tidak_ada'
        }
      }
    },
    youthArchive: {
      hasYouthRecord: true,
      highestGolongan: 'Penegak',
      highestTingkat: 'Penegak Garuda',
      garudaYear: 1997,
      tkkBadgesCount: 14,
      historicalGudep: 'SMAN 1 Depok (01.001)',
      historicalKwarran: 'Pancoran Mas'
    },
    nta: '09.22.01.00015',
    golongan: 'Pembina',
    tingkatan: 'Pembina Mahir Lanjutan (KML Penegak)',
    gudepName: 'SMAN 1 Depok',
    gudepNomor: '01.001 - 01.002',
    pangkalan: 'SMA Negeri 1 Depok',
    kwarran: 'Kwarran Pancoran Mas',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: true,
    garudaYear: 1997,
    saka: {
      nama: 'Saka Bhayangkara',
      krida: 'Krida Tibmas',
      pangkalanSaka: 'Polres Metro Depok'
    },
    bloodType: 'A+',
    masaBerlaku: '15 Mar 2028',
    role: 'pembina',
    roleLabel: 'Pembina Mahir (KML)',
  }
};

import type { UserProfile } from '../../types/scout';

export const MOCK_PROFILES_YOUTH_MEMBERS: Record<string, UserProfile> = {
  // 4. Peserta Didik: Siaga (SD)
  siaga: {
    id: 'user-siaga-1',
    email: 'orangtua.rizky@gmail.com',
    name: 'Rizky Al-Fatih',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80',
    birthDate: '05 Mei 2016',
    calculatedAge: 10,
    phone: '081255566677',
    gender: 'L',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'peserta_didik',
    youthGolongan: 'Siaga',
    youthTingkat: 'Siaga Tata',
    currentTingkat: 'Tata',
    achievedTingkats: ['Mula', 'Bantu'],
    advancementStatus: 'sedang_menempuh',
    achievementHistory: [
      {
        id: 'ach-rizky-mula',
        golongan: 'Siaga',
        tingkat: 'Mula',
        passedDate: '10 Agustus 2023',
        inauguratedDate: '14 Agustus 2023',
        decreeNumber: 'SK/011/GUDP-SD/2023',
        examinerName: 'Yanda Joko Susilo',
        gudepName: 'SDN Anyelir 1 Depok',
        notes: 'Lulus SKU Siaga Mula'
      },
      {
        id: 'ach-rizky-bantu',
        golongan: 'Siaga',
        tingkat: 'Bantu',
        passedDate: '15 Februari 2024',
        inauguratedDate: '18 Februari 2024',
        decreeNumber: 'SK/004/GUDP-SD/2024',
        examinerName: 'Yanda Joko Susilo',
        gudepName: 'SDN Anyelir 1 Depok',
        notes: 'Lulus SKU Siaga Bantu'
      }
    ],
    assignments: [
      {
        id: 'asg-siaga-1',
        roleType: 'Anggota Muda (Didampingi)',
        title: 'Pemimpin Barung Hijau',
        organizationUnit: 'Gudep 01.011 SDN Anyelir 1 Depok',
        organizationUnitId: 'gudep-03',
        level: 'Gudep',
        approvedBy: 'Yanda Joko Susilo (Pembina Siaga)',
        approvedDate: '01 Feb 2025',
        isPrimary: true,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: false,
        scopeGudepId: 'gudep-03'
      }
    ],
    activeContextId: 'ctx-rizky-student',
    availableContexts: [
      {
        id: 'ctx-rizky-student',
        contextType: 'peserta_didik',
        label: 'Peserta Didik (Siaga)',
        subLabel: 'Perindukan Siaga Barung Hijau',
        unitName: 'Gudep 01.011 SDN Anyelir 1 Depok',
        scopeGudepId: 'gudep-03',
        canExamine: false,
        canManageVerification: false
      }
    ],
    nta: '09.22.01.09012',
    golongan: 'Siaga',
    tingkatan: 'Siaga Tata (Barung Hijau)',
    gudepName: 'Pangkalan SDN Anyelir 1 Depok',
    gudepNomor: '01.011 - 01.012',
    pangkalan: 'SD Negeri Anyelir 1 Depok',
    kwarran: 'Kwarran Pancoran Mas',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: false,
    bloodType: 'B+',
    masaBerlaku: '20 Mei 2027',
    role: 'siaga',
    roleLabel: 'Siaga Tata',
  },

  // 5. Peserta Didik: Pandega (Perguruan Tinggi)
  pandega: {
    id: 'user-pandega-1',
    email: 'wahyu@pramuka.id',
    name: 'Kak Wahyu Trianto, S.Kom',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    birthDate: '12 Januari 2002',
    calculatedAge: 24,
    phone: '081577889900',
    gender: 'L',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'peserta_didik',
    youthGolongan: 'Pandega',
    youthTingkat: 'Pandega Garuda',
    currentTingkat: 'Pandega',
    achievedTingkats: ['Bantara', 'Laksana'],
    advancementStatus: 'sedang_menempuh',
    achievementHistory: [
      {
        id: 'ach-wahyu-bantara',
        golongan: 'Penegak',
        tingkat: 'Bantara',
        passedDate: '10 November 2018',
        inauguratedDate: '12 November 2018',
        decreeNumber: 'SK/041/GUDP-SMA/2018',
        examinerName: 'Kak Suryono, S.Pd.',
        gudepName: 'SMAN 1 Depok',
        notes: 'Lulus SKU Penegak Bantara'
      },
      {
        id: 'ach-wahyu-laksana',
        golongan: 'Penegak',
        tingkat: 'Laksana',
        passedDate: '14 Agustus 2020',
        inauguratedDate: '14 Agustus 2020',
        decreeNumber: 'SK/022/GUDP-SMA/2020',
        examinerName: 'Kak Suryono, S.Pd.',
        gudepName: 'SMAN 1 Depok',
        notes: 'Lulus SKU Penegak Laksana'
      }
    ],
    assignments: [
      {
        id: 'asg-pandega-1',
        roleType: 'Anggota Dewasa Muda',
        title: 'Ketua Dewan Racana Makara UI',
        organizationUnit: 'Gudep 03.001 Universitas Indonesia',
        organizationUnitId: 'gudep-06',
        level: 'Gudep',
        approvedBy: 'Kak Dr. H. Mulyadi',
        approvedDate: '14 Jan 2024',
        isPrimary: true,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: false,
        scopeGudepId: 'gudep-06'
      }
    ],
    activeContextId: 'ctx-wahyu-student',
    availableContexts: [
      {
        id: 'ctx-wahyu-student',
        contextType: 'peserta_didik',
        label: 'Peserta Didik (Pandega)',
        subLabel: 'Dewan Racana Makara UI',
        unitName: 'Gudep 03.001 Universitas Indonesia',
        scopeGudepId: 'gudep-06',
        canExamine: false,
        canManageVerification: false
      }
    ],
    nta: '09.22.03.00084',
    golongan: 'Pandega',
    tingkatan: 'Pandega Garuda',
    gudepName: 'Racana Makara UI',
    gudepNomor: '03.001 - 03.002',
    pangkalan: 'Universitas Indonesia',
    kwarran: 'Kwarran Beji',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: true,
    garudaYear: 2025,
    saka: {
      nama: 'Saka Wanabakti',
      krida: 'Krida Bina Wana',
      pangkalanSaka: 'Dinas Lingkungan Hidup Kota Depok'
    },
    bloodType: 'AB+',
    masaBerlaku: '17 Agu 2029',
    role: 'pandega',
    roleLabel: 'Pandega Garuda',
  }
};

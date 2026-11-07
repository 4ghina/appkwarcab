import type { UserProfile } from '../../types/scout';

export const MOCK_PROFILES_YOUTH: Record<string, UserProfile> = {
  // 1. Pengguna Baru / Belum Terverifikasi
  guest_unverified: {
    id: 'user-new-registrant',
    email: 'ananda.pratama@gmail.com',
    name: 'Ananda Bagas Pratama',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    birthDate: '14 Mei 2009',
    calculatedAge: 17,
    phone: '081298765432',
    gender: 'L',
    emailVerified: true,
    membershipStatus: 'unregistered',
    memberCategory: 'peserta_didik',
    youthGolongan: 'Penegak',
    youthTingkat: 'Calon Penegak',
    assignments: [],
    activeContextId: 'ctx-guest-reg',
    availableContexts: [
      {
        id: 'ctx-guest-reg',
        contextType: 'peserta_didik',
        label: 'Calon Anggota Muda',
        subLabel: 'Menunggu Pengaitan Gudep',
        unitName: 'Belum Terdaftar',
        canExamine: false,
        canManageVerification: false
      }
    ],
    nta: null,
    provisionalNta: 'PRA-2026-04182',
    golongan: 'Penegak',
    tingkatan: 'Calon Anggota (Pra-Registrasi)',
    gudepName: 'Belum Terdaftar di Gugus Depan',
    gudepNomor: 'Belum Ada',
    pangkalan: 'Belum Bergabung dengan Gudep',
    kwarran: 'Pancoran Mas',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: false,
    bloodType: 'O+',
    masaBerlaku: 'Menunggu Verifikasi',
    role: 'guest_unverified',
    roleLabel: 'Pengguna Baru (Belum Terverifikasi)',
  },

  // 2. Peserta Didik: Penegak (SMA)
  penegak: {
    id: 'user-penegak-1',
    email: 'dimas@pramuka.id',
    name: 'Dimas Arya Pratama',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    birthDate: '20 April 2008',
    calculatedAge: 18,
    phone: '081234567891',
    gender: 'L',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'peserta_didik',
    youthGolongan: 'Penegak',
    youthTingkat: 'Penegak Bantara',
    currentTingkat: 'Bantara',
    achievedTingkats: [],
    advancementStatus: 'sedang_menempuh',
    achievementHistory: [
      {
        id: 'ach-pgl-ramu',
        golongan: 'Penggalang',
        tingkat: 'Ramu',
        passedDate: '15 Agustus 2022',
        inauguratedDate: '17 Agustus 2022',
        decreeNumber: 'SK/014/GUDP-SMP/2022',
        examinerName: 'Kak Siti Nurhaliza',
        gudepName: 'SMPN 2 Depok',
        notes: 'Lulus seluruh syarat SKU Penggalang Ramu'
      },
      {
        id: 'ach-pgl-rakit',
        golongan: 'Penggalang',
        tingkat: 'Rakit',
        passedDate: '20 Mei 2023',
        inauguratedDate: '20 Mei 2023',
        decreeNumber: 'SK/028/GUDP-SMP/2023',
        examinerName: 'Kak Siti Nurhaliza',
        gudepName: 'SMPN 2 Depok',
        notes: 'Lulus seluruh syarat SKU Penggalang Rakit'
      },
      {
        id: 'ach-pgl-terap',
        golongan: 'Penggalang',
        tingkat: 'Terap',
        passedDate: '14 Januari 2024',
        inauguratedDate: '15 Januari 2024',
        decreeNumber: 'SK/005/GUDP-SMP/2024',
        examinerName: 'Kak Siti Nurhaliza',
        gudepName: 'SMPN 2 Depok',
        notes: 'Telah dilantik Penggalang Terap sebelum pindah golongan ke Penegak'
      }
    ],
    assignments: [
      {
        id: 'asg-penegak-1',
        roleType: 'Anggota Muda',
        title: 'Pradana Putra Sangga Perintis',
        organizationUnit: 'Gudep 01.001 SMAN 1 Depok',
        organizationUnitId: 'gudep-01',
        level: 'Gudep',
        approvedBy: 'Kak Suryono, S.Pd. (Ka Gudep)',
        approvedDate: '12 Jan 2025',
        isPrimary: true,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: false,
        scopeGudepId: 'gudep-01'
      },
      {
        id: 'asg-penegak-2',
        roleType: 'Anggota Saka',
        title: 'Anggota Krida Lalu Lintas (Lantas)',
        organizationUnit: 'Saka Bhayangkara Polres Metro Depok',
        level: 'Kwarcab',
        approvedBy: 'Kak Ipda Rahmat (Pinsaka)',
        approvedDate: '10 Mei 2025',
        isPrimary: false,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: false
      }
    ],
    activeContextId: 'ctx-dimas-student',
    availableContexts: [
      {
        id: 'ctx-dimas-student',
        contextType: 'peserta_didik',
        label: 'Peserta Didik (Penegak)',
        subLabel: 'Ambalan Ki Hadjar Dewantara SMAN 1 Depok',
        unitName: 'Gudep 01.001 SMAN 1 Depok',
        scopeGudepId: 'gudep-01',
        canExamine: false,
        canManageVerification: false
      }
    ],
    nta: '09.22.01.00421',
    golongan: 'Penegak',
    tingkatan: 'Penegak Bantara',
    gudepName: 'Pangkalan SMA Negeri 1 Depok',
    gudepNomor: '01.001 - 01.002',
    pangkalan: 'SMA Negeri 1 Depok',
    kwarran: 'Kwarran Pancoran Mas',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: false,
    saka: {
      nama: 'Saka Bhayangkara',
      krida: 'Krida Lalu Lintas (Lantas)',
      pangkalanSaka: 'Polres Metro Depok'
    },
    bloodType: 'O+',
    masaBerlaku: '31 Des 2027',
    role: 'penegak',
    roleLabel: 'Penegak Bantara',
  },

  // 3. Peserta Didik: Penggalang (SMP)
  penggalang: {
    id: 'user-penggalang-1',
    email: 'nabila@pramuka.id',
    name: 'Nabila Putri Azzahra',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    birthDate: '11 Agustus 2011',
    calculatedAge: 15,
    phone: '081387654321',
    gender: 'P',
    emailVerified: true,
    membershipStatus: 'verified',
    memberCategory: 'peserta_didik',
    youthGolongan: 'Penggalang',
    youthTingkat: 'Penggalang Terap',
    currentTingkat: 'Terap',
    achievedTingkats: ['Ramu', 'Rakit'],
    advancementStatus: 'siap_diverifikasi',
    achievementHistory: [
      {
        id: 'ach-nabila-ramu',
        golongan: 'Penggalang',
        tingkat: 'Ramu',
        passedDate: '10 Januari 2024',
        inauguratedDate: '12 Januari 2024',
        decreeNumber: 'SK/002/PGL/2024',
        examinerName: 'Kak Siti Nurhaliza',
        gudepName: 'SMPN 2 Depok',
        notes: 'Lulus SKU Penggalang Ramu'
      },
      {
        id: 'ach-nabila-rakit',
        golongan: 'Penggalang',
        tingkat: 'Rakit',
        passedDate: '18 Agustus 2024',
        inauguratedDate: '20 Agustus 2024',
        decreeNumber: 'SK/019/PGL/2024',
        examinerName: 'Kak Siti Nurhaliza',
        gudepName: 'SMPN 2 Depok',
        notes: 'Lulus SKU Penggalang Rakit'
      }
    ],
    assignments: [
      {
        id: 'asg-penggalang-1',
        roleType: 'Anggota Muda',
        title: 'Pemimpin Regu (Pinru) Regu Melati',
        organizationUnit: 'Gudep 02.016 SMPN 2 Depok',
        organizationUnitId: 'gudep-02',
        level: 'Gudep',
        approvedBy: 'Kak Siti Nurhaliza (Pembina Gudep)',
        approvedDate: '18 Agu 2024',
        isPrimary: true,
        canExamineSKU: false,
        canAwardTKK: false,
        canManageMembers: false,
        scopeGudepId: 'gudep-02'
      }
    ],
    activeContextId: 'ctx-nabila-student',
    availableContexts: [
      {
        id: 'ctx-nabila-student',
        contextType: 'peserta_didik',
        label: 'Peserta Didik (Penggalang)',
        subLabel: 'Pasukan Dewi Sartika SMPN 2 Depok',
        unitName: 'Gudep 02.016 SMPN 2 Depok',
        scopeGudepId: 'gudep-02',
        canExamine: false,
        canManageVerification: false
      }
    ],
    nta: '09.22.02.01289',
    golongan: 'Penggalang',
    tingkatan: 'Penggalang Terap (Garuda)',
    gudepName: 'Pangkalan SMP Negeri 2 Depok',
    gudepNomor: '02.015 - 02.016',
    pangkalan: 'SMP Negeri 2 Depok',
    kwarran: 'Kwarran Sukmajaya',
    kwarcab: 'Kwartir Cabang Kota Depok',
    kwarda: 'Kwarda Jawa Barat',
    isGaruda: true,
    garudaYear: 2026,
    bloodType: 'A+',
    masaBerlaku: '15 Ags 2028',
    role: 'penggalang',
    roleLabel: 'Penggalang Terap (Garuda)',
  }
};

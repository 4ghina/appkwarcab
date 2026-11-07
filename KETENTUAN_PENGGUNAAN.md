# Ketentuan Penggunaan SIM-KWARCAB
**Sistem Informasi Manajemen Kwartir Cabang Gerakan Pramuka**
*Dokumen Lisensi Penggunaan Mandiri & Batasan Hak Distribusi*

---

## 1. Hak Penggunaan Mandiri (Self-Hosted License)

1. **Pemberian Izin Penggunaan**: Kwartir Cabang (Kwarcab) Gerakan Pramuka di seluruh wilayah Republik Indonesia diberikan hak untuk memasang, mengoperasikan, dan menggunakan aplikasi **SIM-KWARCAB** secara mandiri pada infrastruktur server atau layanan web hosting milik Kwartir Cabang yang bersangkutan.
2. **Lingkup Wilayah & Satu Instalasi**: Setiap satu instalasi sistem SIM-KWARCAB diperuntukkan untuk mengelola satu wilayah Kwartir Cabang secara terpadu, termasuk seluruh Kwartir Ranting (Kwarran), Satuan Karya (Saka), Satuan Komunitas (Sako), Gugus Depan (Gudep), dan Pangkalan sekolah/perguruan tinggi di bawah yurisdiksi Kwarcab tersebut.
3. **Kedaulatan & Kepemilikan Data**: Seluruh data anggota, riwayat pencapaian SKU/SKK, data Pramuka Garuda, arsip kegiatan, dan basis data organisasi adalah hak milik penuh Kwartir Cabang pengelola. SIM-KWARCAB dirancang tanpa ketergantungan server sentral pihak ketiga (*zero vendor lock-in*).

---

## 2. Pemisahan Hak Distribusi & Hak Cipta Kode Sumber

1. **Pemisahan Izin**: Izin pemasangan mandiri pada infrastruktur lokal Kwartir Cabang **berbeda dan terpisah** dari hak redistribusi kode sumber.
2. **Larangan Redistribusi Komersial**: Pihak mana pun dilarang keras menjual kembali, menyewakan sebagai SaaS berbayar tanpa izin, mendistribusikan ulang kode sumber dalam paket komersial, atau mengklaim kepemilikan hak cipta arsitektur dasar SIM-KWARCAB.
3. **Pemberian Kode**: Distribusi kode sumber resmi hanya dilakukan melalui repositori resmi atau rilis yang ditunjuk oleh pengembang dan pengelola SIM-KWARCAB Gerakan Pramuka.
4. **Modifikasi Internal**: Kwartir Cabang diperkenankan melakukan penyesuaian teknis (*customization*) pada tingkat konfigurasi tema, aset logo, format nomor KTA lokal, dan modul integrasi internal sepanjang tidak melanggar ketentuan perlindungan data pribadi dan standar kepramukaan nasional.

---

## 3. Kepatuhan Perlindungan Data Pribadi (UU No. 27 Tahun 2022)

1. **Perlindungan Data Anak & Peserta Didik**: Pengelola Kwarcab wajib menjaga kerahasiaan Nomor Induk Kependudukan (NIK), alamat domisili lengkap, nomor kontak pribadi anak, dan biodata keluarga. Modul verifikasi publik hanya boleh menampilkan informasi status keanggotaan aktif tanpa mengekspos data pribadi sensitif.
2. **Pengamanan Akses & Kredensial**: Administrator wajib mengamankan konfigurasi `.env`, kunci enkripsi aplikasi (`APP_KEY`), akun database, serta kredensial pengiriman email OTP dari kebocoran ke pihak ketiga.
3. **Pencadangan Data**: Pengelola Kwarcab bertanggung jawab penuh untuk melakukan pencadangan (*backup*) database dan penyimpanan berkas media secara berkala guna mencegah kehilangan data operasional kepramukaan.

---

*Ditetapkan untuk mendukung percepatan digitalisasi Kwartir Cabang Gerakan Pramuka di seluruh Indonesia.*

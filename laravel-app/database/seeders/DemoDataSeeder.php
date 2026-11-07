<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OrganizationUnit;
use App\Models\User;
use App\Models\MemberProfile;
use App\Models\UserAssignment;
use App\Models\Event;
use App\Models\AppSetting;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $units = $this->seedDemoOrganizationUnits();
        $this->seedDemoAdmin($units['kwarcab']);
        $this->seedDemoEvent($units['kwarcab']);
        $this->markSampleDataLoaded();
    }

    private function seedDemoOrganizationUnits(): array
    {
        $kwarcab = OrganizationUnit::firstOrCreate(
            ['code' => '09.22'],
            [
                'type' => 'kwarcab',
                'name' => 'Kwartir Cabang Gerakan Pramuka Kota Depok',
                'slug' => 'kwarcab-kota-depok',
                'pangkalan' => 'Gedung Pramuka Kwarcab Kota Depok',
                'alamat' => 'Kompleks Balai Kota Depok, Jl. Margonda Raya No. 54',
                'kontak_wa' => '0812-1922-0922',
                'status' => 'Aktif',
                'akreditasi' => 'A',
                'is_sample' => false,
            ]
        );

        $kwarran = OrganizationUnit::firstOrCreate(
            ['code' => '09.22.01'],
            [
                'parent_id' => $kwarcab->id,
                'type' => 'kwarran',
                'name' => 'Kwartir Ranting Pancoran Mas (Contoh)',
                'slug' => 'kwarran-pancoran-mas',
                'pembina_nama' => 'Kak Ahmad Fauzi, S.Sos',
                'status' => 'Aktif',
                'akreditasi' => 'A',
                'is_sample' => true,
            ]
        );

        $gudep = OrganizationUnit::firstOrCreate(
            ['code' => '01.001-01.002'],
            [
                'parent_id' => $kwarran->id,
                'type' => 'gudep',
                'name' => 'Gugus Depan 01.001 - 01.002 SMAN 1 Depok (Contoh)',
                'slug' => 'gudep-sman-1-depok',
                'nomor_gudep_pa' => '01.001',
                'nomor_gudep_pi' => '01.002',
                'pangkalan' => 'SMAN 1 Depok',
                'status' => 'Aktif',
                'is_sample' => true,
            ]
        );

        return ['kwarcab' => $kwarcab, 'kwarran' => $kwarran, 'gudep' => $gudep];
    }

    private function seedDemoAdmin(OrganizationUnit $kwarcab): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'demo-admin@kwarcab.pramuka.or.id'],
            [
                'name' => 'Kak Demo Super Admin',
                'email_verified_at' => now(),
                'password' => Hash::make('DemoKwarcab2026!'),
                'is_sample' => true,
            ]
        );

        MemberProfile::firstOrCreate(
            ['user_id' => $admin->id],
            [
                'organization_unit_id' => $kwarcab->id,
                'nta' => '09.22.00.99999',
                'golongan' => 'Pembina',
                'tingkatan' => 'Pelatih Pembina Pramuka',
                'membership_status' => 'verified',
                'is_sample' => true,
            ]
        );

        UserAssignment::firstOrCreate(
            ['user_id' => $admin->id, 'role_type' => 'Super Admin Kwarcab'],
            [
                'organization_unit_id' => $kwarcab->id,
                'title' => 'Admin Pengelola Demo',
                'level' => 'Kwarcab',
                'is_primary' => true,
                'status' => 'active',
                'approved_at' => now(),
                'is_sample' => true,
            ]
        );
    }

    private function seedDemoEvent(OrganizationUnit $kwarcab): void
    {
        Event::firstOrCreate(
            ['slug' => 'demo-raimuna-cabang-2026'],
            [
                'organization_unit_id' => $kwarcab->id,
                'nama' => 'Raimuna Cabang Demo 2026 (Contoh)',
                'tema' => 'Pramuka Muda Bersinergi Menuju Indonesia Emas',
                'tingkat' => 'Cabang',
                'tanggal_mulai' => now()->addDays(30)->toDateString(),
                'tanggal_selesai' => now()->addDays(34)->toDateString(),
                'lokasi' => 'Bumi Perkemahan Kwarcab',
                'total_kuota' => 500,
                'sisa_kuota' => 450,
                'status' => 'Pendaftaran Dibuka',
                'is_sample' => true,
            ]
        );
    }

    private function markSampleDataLoaded(): void
    {
        AppSetting::updateOrCreate(
            ['key' => 'sample_data_loaded'],
            ['value' => '1', 'group' => 'sample_data', 'type' => 'boolean', 'description' => 'Status data contoh dimuat']
        );
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Data dasar wajib aplikasi (idempoten & aman dijalankan ulang)
        $this->call(CoreDataSeeder::class);

        // 2. Data demo hanya dijalankan jika diinginkan secara eksplisit
        if (env('SEED_DEMO_DATA', false)) {
            $this->call(DemoDataSeeder::class);
        }
    }
}

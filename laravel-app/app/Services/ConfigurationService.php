<?php

namespace App\Services;

use App\Models\AppSetting;
use App\Models\TextCatalog;
use App\Models\MediaAsset;
use Illuminate\Support\Facades\Cache;

class ConfigurationService
{
    public function getPublicIdentity(): array
    {
        return Cache::remember('public_identity_config', 3600, function () {
            return [
                'appName' => AppSetting::get('appName', 'SIM-KWARCAB'),
                'appShortName' => AppSetting::get('appShortName', 'SIMKWARCAB'),
                'description' => AppSetting::get('description', 'Sistem Informasi Manajemen Kwartir Cabang Gerakan Pramuka Terpadu'),
                'kwarcabName' => AppSetting::get('kwarcabName', 'Kwartir Cabang Kota Depok'),
                'kwarcabNomor' => AppSetting::get('kwarcabNomor', '09.22'),
                'kwardaName' => AppSetting::get('kwardaName', 'Kwartir Daerah Jawa Barat'),
                'motto' => AppSetting::get('motto', 'Satyaku Kudarmakan, Darmaku Kubaktikan'),
                'address' => AppSetting::get('address', 'Gedung Pramuka Kwarcab Kota Depok, Balai Kota Depok, Jl. Margonda Raya No. 54, Pancoran Mas, Kota Depok 16431'),
                'email' => AppSetting::get('email', 'pusinfo@pramukakotadepok.or.id'),
                'phone' => AppSetting::get('phone', '021-7756123'),
                'whatsapp' => AppSetting::get('whatsapp', '0812-1922-0922'),
                'website' => AppSetting::get('website', 'https://pramukakotadepok.or.id'),
                'colors' => AppSetting::get('colors', [
                    'primary' => '#5D4037',
                    'primaryHover' => '#4E342E',
                    'secondary' => '#2E7D32',
                    'accent' => '#F59E0B',
                    'background' => '#FAF8F5',
                    'surface' => '#FFFFFF',
                ]),
                'logos' => AppSetting::get('logos', [
                    'primary' => '/assets/logo-pramuka.svg',
                    'secondary' => '/assets/logo-wosm.svg',
                    'favicon' => '/assets/favicon-pramuka.svg',
                ]),
                'footerText' => AppSetting::get('footerText', '© 2026 Kwartir Cabang Gerakan Pramuka. Seluruh Hak Cipta Dilindungi.'),
            ];
        });
    }

    public function t(string $key, ?string $default = null): string
    {
        return TextCatalog::get($key, $default);
    }
}

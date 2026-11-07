<?php

namespace App\Filament\Resources;

use App\Models\PotensiMapSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PotensiMapSettingResource extends Resource
{
    protected static ?string $model = PotensiMapSetting::class;
    protected static ?string $navigationIcon = 'heroicon-o-map-pin';
    protected static ?string $navigationLabel = 'Pengaturan Peta Potensi';
    protected static ?string $navigationGroup = 'Sistem & CMS';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')
                ->label('Judul Modul Peta')
                ->required()
                ->default('Peta Potensi Pramuka Kwartir Cabang'),
            Forms\Components\Textarea::make('description')
                ->label('Deskripsi Subjudul')
                ->rows(2)
                ->default('Visualisasi sebaran peserta didik, jenjang kecakapan, pembina mahir, dan pangkalan sekolah'),
            Forms\Components\TextInput::make('data_source')
                ->label('Atribusi Sumber Data')
                ->default('Pelaporan Terverifikasi Kwartir Cabang Kota Depok'),
            Forms\Components\TextInput::make('boundary_source')
                ->label('Atribusi Batas Wilayah (GeoJSON)')
                ->default('Badan Informasi Geospasial (BIG) & BPS Kota Depok'),
            Forms\Components\Select::make('color_scheme')
                ->label('Skema Warna Tematik')
                ->options([
                    'amber' => 'Coklat Tua & Kuning Kunyit Emas (Khas Pramuka)',
                    'emerald' => 'Hijau Hutan & Zamrud (Siaga & Alam)',
                    'rose' => 'Merah Penggalang & Patriotisme',
                    'blue' => 'Biru Bahari & Ketertiban',
                ])
                ->default('amber')
                ->required(),
            Forms\Components\Toggle::make('is_published')
                ->label('Publikasikan Peta ke Publik')
                ->default(true),
            Forms\Components\Textarea::make('geojson_data')
                ->label('Data Batas Poligon GeoJSON (Kecamatan)')
                ->rows(6)
                ->helperText('Tempelkan GeoJSON resmi dari BIG atau pemetaan wilayah lokal'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->label('Judul Modul')->weight('bold'),
                Tables\Columns\TextColumn::make('color_scheme')->label('Skema Warna')->badge(),
                Tables\Columns\IconColumn::make('is_published')->label('Dipublikasi')->boolean(),
                Tables\Columns\TextColumn::make('updated_at')->label('Pembaruan Terakhir')->dateTime('d M Y H:i'),
            ]);
    }
}

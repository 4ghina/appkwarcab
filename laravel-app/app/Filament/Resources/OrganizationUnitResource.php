<?php

namespace App\Filament\Resources;

use App\Models\OrganizationUnit;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class OrganizationUnitResource extends Resource
{
    protected static ?string $model = OrganizationUnit::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationLabel = 'Kwarran & Gudep';
    protected static ?string $navigationGroup = 'Organisasi';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('type')
                ->label('Tingkat / Jenis')
                ->options([
                    'kwarcab' => 'Kwartir Cabang',
                    'kwarran' => 'Kwartir Ranting',
                    'gudep' => 'Gugus Depan',
                    'saka' => 'Satuan Karya (Saka)',
                    'pusdiklatcab' => 'Pusdiklatcab',
                ])
                ->required(),
            Forms\Components\Select::make('parent_id')
                ->label('Induk Organisasi')
                ->relationship('parent', 'name'),
            Forms\Components\TextInput::make('name')->required(),
            Forms\Components\TextInput::make('code')->label('Nomor Kode / Gudep'),
            Forms\Components\TextInput::make('pangkalan')->label('Pangkalan Sekolah/Madrasah'),
            Forms\Components\TextInput::make('pembina_nama')->label('Pembina / Pimpinan'),
            Forms\Components\TextInput::make('kontak_wa')->label('Nomor WhatsApp'),
            Forms\Components\Select::make('akreditasi')->options(['A' => 'A', 'B' => 'B', 'C' => 'C', 'Belum' => 'Belum']),
            Forms\Components\Select::make('status')->options([
                'Aktif' => 'Aktif',
                'Kurang Aktif' => 'Kurang Aktif',
                'Belum Her-Registrasi' => 'Belum Her-Registrasi',
            ]),
            Forms\Components\Toggle::make('is_sample')
                ->label('Tandai sebagai Data Contoh')
                ->default(false),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nama Unit')->searchable(),
                Tables\Columns\BadgeColumn::make('type')->label('Jenis')->colors([
                    'primary' => 'kwarcab',
                    'success' => 'kwarran',
                    'warning' => 'gudep',
                    'danger' => 'saka',
                ]),
                Tables\Columns\TextColumn::make('pangkalan')->label('Pangkalan')->limit(20),
                Tables\Columns\TextColumn::make('parent.name')->label('Induk (Kwarran)'),
                Tables\Columns\BadgeColumn::make('status'),
                Tables\Columns\BadgeColumn::make('is_sample')
                    ->label('Sumber')
                    ->formatStateUsing(fn ($state) => $state ? 'Data Contoh' : 'Data Riil')
                    ->colors([
                        'warning' => fn ($state) => (bool)$state,
                        'success' => fn ($state) => !(bool)$state,
                    ]),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type'),
                Tables\Filters\SelectFilter::make('status'),
                Tables\Filters\SelectFilter::make('is_sample')
                    ->label('Sumber Data')
                    ->options([
                        '0' => 'Data Riil',
                        '1' => 'Data Contoh',
                    ]),
            ]);
    }
}

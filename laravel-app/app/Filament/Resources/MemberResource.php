<?php

namespace App\Filament\Resources;

use App\Models\MemberProfile;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;

class MemberResource extends Resource
{
    protected static ?string $model = MemberProfile::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Data Anggota';
    protected static ?string $navigationGroup = 'Keanggotaan';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')
                ->relationship('user', 'name')
                ->required()
                ->searchable(),
            Forms\Components\TextInput::make('nta')
                ->label('NTA Resmi')
                ->disabled(),
            Forms\Components\Select::make('golongan')
                ->options([
                    'Siaga' => 'Siaga',
                    'Penggalang' => 'Penggalang',
                    'Penegak' => 'Penegak',
                    'Pandega' => 'Pandega',
                    'Pembina' => 'Pembina',
                    'Pelatih' => 'Pelatih',
                    'Umum' => 'Umum',
                ])
                ->required(),
            Forms\Components\TextInput::make('tingkatan')
                ->required(),
            Forms\Components\Select::make('organization_unit_id')
                ->label('Gugus Depan / Pangkalan')
                ->relationship('organizationUnit', 'name')
                ->searchable(),
            Forms\Components\Select::make('membership_status')
                ->label('Status Keanggotaan')
                ->options([
                    'unregistered' => 'Belum Bergabung',
                    'pending_verification' => 'Menunggu Verifikasi',
                    'verified' => 'Terverifikasi Resmi',
                    'revision_needed' => 'Perlu Revisi',
                ])
                ->required(),
            Forms\Components\Toggle::make('is_garuda')
                ->label('Pramuka Garuda'),
            Forms\Components\Toggle::make('is_sample')
                ->label('Data Contoh Simulasi'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->label('Nama Anggota')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('nta')->label('NTA')->searchable()->default('Belum Terbit'),
                Tables\Columns\BadgeColumn::make('golongan')
                    ->colors([
                        'success' => 'Siaga',
                        'danger' => 'Penggalang',
                        'warning' => 'Penegak',
                        'primary' => 'Pandega',
                    ]),
                Tables\Columns\TextColumn::make('organizationUnit.name')->label('Gudep / Pangkalan')->limit(25),
                Tables\Columns\BadgeColumn::make('membership_status')
                    ->label('Status')
                    ->colors([
                        'success' => 'verified',
                        'warning' => 'pending_verification',
                        'danger' => 'revision_needed',
                        'secondary' => 'unregistered',
                    ]),
                Tables\Columns\IconColumn::make('is_garuda')->boolean()->label('Garuda'),
                Tables\Columns\BadgeColumn::make('is_sample')
                    ->label('Sumber')
                    ->formatStateUsing(fn ($state) => $state ? 'Data Contoh' : 'Data Riil')
                    ->colors([
                        'warning' => fn ($state) => (bool)$state,
                        'success' => fn ($state) => !(bool)$state,
                    ]),
            ])
            ->filters([
                SelectFilter::make('golongan'),
                SelectFilter::make('membership_status'),
                SelectFilter::make('is_sample')
                    ->label('Sumber Data')
                    ->options([
                        '0' => 'Data Riil',
                        '1' => 'Data Contoh',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }
}

<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;

class SKUBankResource extends Resource
{
    protected static ?string $model = 'App\Models\SKUMasterRequirement';

    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationGroup = 'Bank Kecakapan (SK 198/2011)';
    protected static ?string $navigationLabel = 'Master Bank SKU (259 Butir)';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Persyaratan SKU')
                    ->schema([
                        Forms\Components\Select::make('golongan')
                            ->options([
                                'Siaga' => 'Siaga (100 Butir)',
                                'Penggalang' => 'Penggalang (90 Butir)',
                                'Penegak' => 'Penegak (45 Butir)',
                                'Pandega' => 'Pandega (24 Butir)',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('tingkat')
                            ->required(),
                        Forms\Components\TextInput::make('nomor')
                            ->numeric()
                            ->required(),
                        Forms\Components\Select::make('kategori')
                            ->options([
                                'Spiritual & Agama' => 'Spiritual & Agama',
                                'Patriotisme & Wawasan' => 'Patriotisme & Wawasan',
                                'Keterampilan & Sandi' => 'Keterampilan & Sandi',
                                'Fisik & Kesehatan' => 'Fisik & Kesehatan',
                                'Sosial & Alam' => 'Sosial & Alam',
                            ])
                            ->required(),
                        Forms\Components\Textarea::make('deskripsi')
                            ->rows(4)
                            ->required(),
                        Forms\Components\Select::make('verification_method')
                            ->options([
                                'praktek' => 'Ujian Praktik Langsung',
                                'wawancara' => 'Tanya Jawab / Wawancara',
                                'pengamatan' => 'Pengamatan Sikap & Kebiasaan',
                                'tertulis' => 'Ujian Tertulis / Makalah',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('pdf_source_file')
                            ->label('Nama Berkas PDF Sumber')
                            ->readOnly(),
                        Forms\Components\TextInput::make('pdf_page')
                            ->label('Nomor Halaman di PDF')
                            ->numeric()
                            ->readOnly(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nomor')
                    ->label('#')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('golongan')
                    ->colors([
                        'success' => 'Siaga',
                        'danger' => 'Penggalang',
                        'warning' => 'Penegak',
                        'info' => 'Pandega',
                    ]),
                Tables\Columns\TextColumn::make('tingkat'),
                Tables\Columns\TextColumn::make('deskripsi')
                    ->limit(60)
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('verification_method')
                    ->label('Metode Uji'),
                Tables\Columns\TextColumn::make('pdf_source_file')
                    ->label('Sumber PDF')
                    ->suffix(fn ($record) => ' (hlm. ' . $record->pdf_page . ')'),
            ])
            ->filters([
                SelectFilter::make('golongan')
                    ->options([
                        'Siaga' => 'Siaga',
                        'Penggalang' => 'Penggalang',
                        'Penegak' => 'Penegak',
                        'Pandega' => 'Pandega',
                    ]),
                SelectFilter::make('kategori')
                    ->options([
                        'Spiritual & Agama' => 'Spiritual & Agama',
                        'Patriotisme & Wawasan' => 'Patriotisme & Wawasan',
                        'Keterampilan & Sandi' => 'Keterampilan & Sandi',
                        'Fisik & Kesehatan' => 'Fisik & Kesehatan',
                        'Sosial & Alam' => 'Sosial & Alam',
                    ]),
            ]);
    }
}

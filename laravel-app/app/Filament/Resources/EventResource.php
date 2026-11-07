<?php

namespace App\Filament\Resources;

use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';
    protected static ?string $navigationLabel = 'Kegiatan Cabang';
    protected static ?string $navigationGroup = 'Kegiatan';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('nama')->required(),
            Forms\Components\TextInput::make('tema'),
            Forms\Components\Select::make('tingkat')->options([
                'Cabang' => 'Cabang',
                'Daerah' => 'Daerah',
                'Nasional' => 'Nasional',
            ])->required(),
            Forms\Components\DatePicker::make('tanggal_mulai')->required(),
            Forms\Components\DatePicker::make('tanggal_selesai'),
            Forms\Components\TextInput::make('lokasi')->required(),
            Forms\Components\TextInput::make('total_kuota')->numeric()->required(),
            Forms\Components\TextInput::make('sisa_kuota')->numeric()->required(),
            Forms\Components\TextInput::make('kuota_per_gudep')->numeric()->default(16)->required(),
            Forms\Components\DateTimePicker::make('deadline_pendaftaran')->required(),
            Forms\Components\Select::make('status')->options([
                'Segera Hadir' => 'Segera Hadir',
                'Pendaftaran Dibuka' => 'Pendaftaran Dibuka',
                'Ditutup' => 'Ditutup',
                'Selesai' => 'Selesai',
            ])->required(),
            Forms\Components\CheckboxList::make('golongan_peserta')->options([
                'Siaga' => 'Siaga',
                'Penggalang' => 'Penggalang',
                'Penegak' => 'Penegak',
                'Pandega' => 'Pandega',
            ])->required(),
            Forms\Components\Textarea::make('deskripsi')->columnSpanFull(),
            Forms\Components\Toggle::make('is_sample')->label('Data Contoh Simulasi'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama')->label('Kegiatan')->searchable(),
                Tables\Columns\BadgeColumn::make('tingkat'),
                Tables\Columns\TextColumn::make('tanggal_mulai')->date('d M Y'),
                Tables\Columns\TextColumn::make('sisa_kuota')->label('Sisa Kuota')->sortable(),
                Tables\Columns\BadgeColumn::make('status')->colors([
                    'success' => 'Pendaftaran Dibuka',
                    'warning' => 'Segera Hadir',
                    'danger' => 'Ditutup',
                ]),
                Tables\Columns\BadgeColumn::make('is_sample')
                    ->label('Sumber')
                    ->formatStateUsing(fn ($state) => $state ? 'Data Contoh' : 'Data Riil')
                    ->colors([
                        'warning' => fn ($state) => (bool)$state,
                        'success' => fn ($state) => !(bool)$state,
                    ]),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('is_sample')
                    ->label('Sumber Data')
                    ->options([
                        '0' => 'Data Riil',
                        '1' => 'Data Contoh',
                    ]),
            ]);
    }
}

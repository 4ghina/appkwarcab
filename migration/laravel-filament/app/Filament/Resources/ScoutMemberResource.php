<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;

class ScoutMemberResource extends Resource
{
    protected static ?string $model = 'App\Models\ScoutMember';

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Data Keanggotaan';
    protected static ?string $navigationLabel = 'Anggota Pramuka';

    public static function form(Form $form): Form
    {
        return $form->schema(self::getFormSchema());
    }

    private static function getFormSchema(): array
    {
        return [
            Forms\Components\Section::make('Identitas Personal & Status')
                ->description('Pemisahan usia, kategori, dan status keanggotaan (Aturan 1 & 4)')
                ->schema([
                    Forms\Components\TextInput::make('name')->label('Nama Lengkap')->required(),
                    Forms\Components\TextInput::make('email')->email()->required(),
                    Forms\Components\DatePicker::make('birth_date')
                        ->label('Tanggal Lahir')
                        ->required()
                        ->reactive()
                        ->afterStateUpdated(function ($state, callable $set) {
                            if ($state) {
                                $birth = new \DateTime($state);
                                $now = new \DateTime();
                                $set('calculated_age', $now->diff($birth)->y);
                            }
                        }),
                    Forms\Components\TextInput::make('calculated_age')->label('Usia Dihitung Otomatis (Tahun)')->numeric()->readOnly(),
                    Forms\Components\Select::make('member_category')
                        ->label('Kategori Keanggotaan')
                        ->options(['peserta_didik' => 'Peserta Didik (7-25 Tahun)', 'anggota_dewasa' => 'Anggota Dewasa / Pembina', 'orang_tua' => 'Orang Tua / Wali'])
                        ->required()->reactive(),
                    Forms\Components\Select::make('youth_golongan')
                        ->label('Golongan Peserta Didik')
                        ->options(['Siaga' => 'Siaga (7-10 Thn)', 'Penggalang' => 'Penggalang (11-15 Thn)', 'Penegak' => 'Penegak (16-20 Thn)', 'Pandega' => 'Pandega (21-25 Thn)'])
                        ->visible(fn (callable $get) => $get('member_category') === 'peserta_didik'),
                    Forms\Components\Select::make('membership_status')
                        ->label('Status Keanggotaan')
                        ->options(['unregistered' => 'Belum Terdaftar di Gudep', 'pending_verification' => 'Menunggu Verifikasi Gudep', 'verified' => 'Terverifikasi Resmi', 'revision_needed' => 'Perlu Perbaikan Berkas'])
                        ->required(),
                    Forms\Components\TextInput::make('nta')->label('Nomor Tanda Anggota (NTA Resmi)')->placeholder('11.23.xx.xxxxx')->unique(ignoreRecord: true),
                ])->columns(2),
        ];
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns(self::getTableColumns())
            ->filters(self::getTableFilters());
    }

    private static function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('name')->label('Nama')->searchable()->sortable(),
            Tables\Columns\BadgeColumn::make('member_category')->label('Kategori')->colors([
                'primary' => 'peserta_didik', 'warning' => 'anggota_dewasa', 'success' => 'orang_tua',
            ]),
            Tables\Columns\TextColumn::make('calculated_age')->label('Usia')->suffix(' Thn')->sortable(),
            Tables\Columns\BadgeColumn::make('youth_golongan')->label('Golongan')->colors([
                'success' => 'Siaga', 'danger' => 'Penggalang', 'warning' => 'Penegak', 'info' => 'Pandega',
            ]),
            Tables\Columns\BadgeColumn::make('membership_status')->label('Status')->colors([
                'success' => 'verified', 'warning' => 'pending_verification', 'danger' => 'unregistered',
            ]),
            Tables\Columns\TextColumn::make('gudep_name')->label('Pangkalan / Gudep')->limit(25),
        ];
    }

    private static function getTableFilters(): array
    {
        return [
            SelectFilter::make('member_category')->options(['peserta_didik' => 'Peserta Didik', 'anggota_dewasa' => 'Anggota Dewasa']),
            SelectFilter::make('youth_golongan')->options(['Siaga' => 'Siaga', 'Penggalang' => 'Penggalang', 'Penegak' => 'Penegak', 'Pandega' => 'Pandega']),
        ];
    }
}

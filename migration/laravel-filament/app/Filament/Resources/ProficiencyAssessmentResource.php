<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions\Action;
use Filament\Notifications\Notification;

class ProficiencyAssessmentResource extends Resource
{
    protected static ?string $model = 'App\Models\ProficiencyAssessment';

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';
    protected static ?string $navigationGroup = 'Pembinaan & Pengujian';
    protected static ?string $navigationLabel = 'Antrean Pengujian Peserta Didik';

    public static function table(Table $table): Table
    {
        return $table
            ->columns(self::getTableColumns())
            ->actions(self::getTableActions());
    }

    private static function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('student_name')->label('Peserta Didik')->searchable(),
            Tables\Columns\BadgeColumn::make('student_golongan')->label('Golongan'),
            Tables\Columns\TextColumn::make('item_title')->label('Butir Kecakapan')->limit(40),
            Tables\Columns\BadgeColumn::make('item_type')->label('Jenis'),
            Tables\Columns\BadgeColumn::make('status')->colors([
                'warning' => 'diajukan', 'danger' => 'perlu_revisi', 'success' => 'disahkan',
            ]),
            Tables\Columns\TextColumn::make('created_at')->label('Diajukan')->since(),
        ];
    }

    private static function getTableActions(): array
    {
        return [
            Action::make('sahkan_butir')
                ->label('Sahkan Butir')
                ->icon('heroicon-o-check-circle')
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('Pengesahan Butir Uji Kecakapan')
                ->modalDescription('Tindakan ini mengesahkan pemenuhan butir uji dalam buku saku digital peserta didik. Penerbitan tanda kecakapan dan sertifikat ditangguhkan sampai penetapan seluruh tingkatan selesai.')
                ->action(function ($record) {
                    $record->update([
                        'status' => 'disahkan', 'item_passed' => true, 'completion_phase' => 'butir_terpenuhi',
                        'certificate_status' => 'konfigurasi_belum_ditetapkan',
                        'certificate_notice' => 'Pengesahan butir berhasil dicatat. Konfigurasi penomoran sertifikat belum ditetapkan oleh Kwartir Cabang.',
                        'reviewed_at' => now(),
                    ]);
                    Notification::make()->title('Butir Berhasil Disahkan')->success()->send();
                }),

            Action::make('kirim_catatan_perbaikan')
                ->label('Kirim Catatan Perbaikan')
                ->icon('heroicon-o-arrow-uturn-left')
                ->color('danger')
                ->form([
                    Forms\Components\Textarea::make('reviewer_feedback')->label('Catatan Perbaikan / Arahan Pembina')->required(),
                ])
                ->action(function ($record, array $data) {
                    $record->update(['status' => 'perlu_revisi', 'reviewer_feedback' => $data['reviewer_feedback'], 'reviewed_at' => now()]);
                    Notification::make()->title('Catatan Perbaikan Dikirim')->warning()->send();
                }),
        ];
    }
}

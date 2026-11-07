<?php

namespace App\Filament\Resources;

use App\Models\MembershipApplication;
use App\Services\VerificationWorkflowService;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions\Action;
use Filament\Notifications\Notification;

class VerificationQueueResource extends Resource
{
    protected static ?string $model = MembershipApplication::class;
    protected static ?string $navigationIcon = 'heroicon-o-check-badge';
    protected static ?string $navigationLabel = 'Antrean Verifikasi';
    protected static ?string $navigationGroup = 'Layanan & Administrasi';

    public static function table(Table $table): Table
    {
        return $table
            ->columns(self::getTableColumns())
            ->actions(self::getTableActions());
    }

    private static function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('user.name')->label('Pemohon')->searchable(),
            Tables\Columns\TextColumn::make('targetOrganization.name')->label('Target Gudep / Pangkalan')->searchable(),
            Tables\Columns\TextColumn::make('applied_role')->label('Peran yang Diajukan'),
            Tables\Columns\TextColumn::make('target_golongan')->label('Golongan'),
            Tables\Columns\TextColumn::make('claim_existing_nta')->label('Klaim NTA Lama')->default('-'),
            Tables\Columns\BadgeColumn::make('status')->colors([
                'warning' => 'pending', 'success' => 'approved', 'danger' => 'rejected', 'secondary' => 'revision',
            ]),
            Tables\Columns\TextColumn::make('created_at')->label('Tanggal Diajukan')->dateTime('d M Y H:i'),
        ];
    }

    private static function getTableActions(): array
    {
        return [
            Action::make('approve')
                ->label('Setujui & Terbitkan NTA')
                ->icon('heroicon-o-check')
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('Persetujuan Keanggotaan & KTA')
                ->modalDescription('Apakah Anda yakin menyetujui permohonan ini? Nomor Tanda Anggota (NTA) resmi akan otomatis diterbitkan.')
                ->action(function (MembershipApplication $record, VerificationWorkflowService $workflowService) {
                    $workflowService->approveApplication($record->id, auth()->user());
                    Notification::make()->title('Permohonan berhasil disetujui')->success()->send();
                })
                ->visible(fn (MembershipApplication $record) => $record->status === 'pending'),

            Action::make('revision')
                ->label('Minta Revisi')
                ->icon('heroicon-o-pencil-square')
                ->color('warning')
                ->form([
                    Forms\Components\Textarea::make('notes')->label('Catatan Perbaikan untuk Pemohon')->required(),
                ])
                ->action(function (MembershipApplication $record, array $data, VerificationWorkflowService $workflowService) {
                    $workflowService->requestRevision($record->id, auth()->user(), $data['notes']);
                    Notification::make()->title('Permohonan dikembalikan untuk revisi')->warning()->send();
                })
                ->visible(fn (MembershipApplication $record) => $record->status === 'pending'),
        ];
    }
}

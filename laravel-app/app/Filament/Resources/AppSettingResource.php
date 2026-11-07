<?php

namespace App\Filament\Resources;

use App\Models\AppSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AppSettingResource extends Resource
{
    protected static ?string $model = AppSetting::class;
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Pengaturan Terpusat (CMS)';
    protected static ?string $navigationGroup = 'Sistem & CMS';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('key')->disabled(),
            Forms\Components\TextInput::make('group')->disabled(),
            Forms\Components\Textarea::make('value')->required()->rows(4),
            Forms\Components\TextInput::make('type')->disabled(),
            Forms\Components\TextInput::make('description'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('group')->badge(),
                Tables\Columns\TextColumn::make('key')->searchable()->weight('bold'),
                Tables\Columns\TextColumn::make('value')->limit(50),
                Tables\Columns\TextColumn::make('description')->limit(30),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('group'),
            ]);
    }
}

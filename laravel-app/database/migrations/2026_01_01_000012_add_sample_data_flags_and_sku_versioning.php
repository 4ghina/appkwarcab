<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->addSampleFlags();
        $this->addSkuVersioning();
        $this->addCmsPublishingFields();
    }

    private function addSampleFlags(): void
    {
        $tables = [
            'organization_units',
            'users',
            'member_profiles',
            'user_assignments',
            'events',
            'event_registrations',
            'garuda_applications',
            'rfid_cards'
        ];

        foreach ($tables as $tableName) {
            if (Schema::hasTable($tableName) && !Schema::hasColumn($tableName, 'is_sample')) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->boolean('is_sample')->default(false)->index();
                });
            }
        }
    }

    private function addSkuVersioning(): void
    {
        if (Schema::hasTable('sku_items') && !Schema::hasColumn('sku_items', 'version')) {
            Schema::table('sku_items', function (Blueprint $table) {
                $table->string('version', 30)->default('2026')->index();
                $table->boolean('is_sample')->default(false)->index();
            });
        }

        if (Schema::hasTable('member_sku_progress') && !Schema::hasColumn('member_sku_progress', 'sku_version')) {
            Schema::table('member_sku_progress', function (Blueprint $table) {
                $table->string('sku_version', 30)->default('2026')->index();
                $table->boolean('is_sample')->default(false)->index();
            });
        }
    }

    private function addCmsPublishingFields(): void
    {
        if (Schema::hasTable('app_settings') && !Schema::hasColumn('app_settings', 'is_draft')) {
            Schema::table('app_settings', function (Blueprint $table) {
                $table->boolean('is_draft')->default(false)->index();
                $table->timestamp('published_at')->nullable();
            });
        }

        if (Schema::hasTable('text_catalogs') && !Schema::hasColumn('text_catalogs', 'is_draft')) {
            Schema::table('text_catalogs', function (Blueprint $table) {
                $table->boolean('is_draft')->default(false)->index();
                $table->timestamp('published_at')->nullable();
            });
        }
    }

    public function down(): void
    {
        $tables = [
            'organization_units',
            'users',
            'member_profiles',
            'user_assignments',
            'events',
            'event_registrations',
            'garuda_applications',
            'rfid_cards'
        ];

        foreach ($tables as $tableName) {
            if (Schema::hasTable($tableName) && Schema::hasColumn($tableName, 'is_sample')) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->dropColumn('is_sample');
                });
            }
        }

        if (Schema::hasTable('sku_items') && Schema::hasColumn('sku_items', 'version')) {
            Schema::table('sku_items', function (Blueprint $table) {
                $table->dropColumn(['version', 'is_sample']);
            });
        }

        if (Schema::hasTable('member_sku_progress') && Schema::hasColumn('member_sku_progress', 'sku_version')) {
            Schema::table('member_sku_progress', function (Blueprint $table) {
                $table->dropColumn(['sku_version', 'is_sample']);
            });
        }

        if (Schema::hasTable('app_settings') && Schema::hasColumn('app_settings', 'is_draft')) {
            Schema::table('app_settings', function (Blueprint $table) {
                $table->dropColumn(['is_draft', 'published_at']);
            });
        }

        if (Schema::hasTable('text_catalogs') && Schema::hasColumn('text_catalogs', 'is_draft')) {
            Schema::table('text_catalogs', function (Blueprint $table) {
                $table->dropColumn(['is_draft', 'published_at']);
            });
        }
    }
};

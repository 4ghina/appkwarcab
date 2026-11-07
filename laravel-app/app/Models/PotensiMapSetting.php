<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PotensiMapSetting extends Model
{
    protected $table = 'potensi_map_settings';

    protected $fillable = [
        'title',
        'description',
        'boundary_source',
        'data_source',
        'color_scheme',
        'is_published',
        'default_category',
        'default_metric',
        'geojson_data',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'geojson_data' => 'array',
    ];
}

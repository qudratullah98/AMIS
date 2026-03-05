<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstructionProperty extends Model
{
    protected $fillable = [
        'construction_id',
        'property_name',
        'property_value',
        'unit_id',
    ];

    // Relation to Construction
    public function construction()
    {
        return $this->belongsTo(Construction::class);
    }

    // Relation to MeasurementUnit
    public function unit()
    {
        return $this->belongsTo(MeasurementUnit::class);
    }
}

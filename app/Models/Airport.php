<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    // Relationship to Province
    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    // Relationship to District
    public function district()
    {
        return $this->belongsTo(District::class);
    }

    // Relationship to approval_status
    public function status()
    {
        return $this->belongsTo(ApprovelStatus::class);
    }

    public function amslUnit()
    {
        return $this->belongsTo(MeasurementUnit::class, 'amsl_unit_id');
    }

    public function areaUnit()
    {
        return $this->belongsTo(MeasurementUnit::class, 'area_unit_id');
    }

    public function airportConstructions()
    {
        return $this->hasMany(AirportConstruction::class);
    }

    public function flytes()
    {
        return $this->hasMany(Flyte::class);
    }

    public function equipment()
    {
        return $this->hasMany(Equipment::class);
    }

    public function user()
    {
        return $this->hasMany(User::class);
    }
}

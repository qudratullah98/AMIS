<?php

namespace App\Models;

use App\Models\Scopes\AirportScope;
use App\Traits\BelongsToAirport;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{ 
    protected $fillable = [
        'name_ps',
        'name_dr',
        'name_en',
        'IATA_code',
        'ICAO_code',
        'type',
        'status_id',
        'province_id',
        'district_id',
        'latitude',
        'longitude',
        'amsl',
        'amsl_unit_id',
        'area',
        'area_unit_id',
        'description',
    ];
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


    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->when($search, function ($query, $search) {
            $query->where('name_ps', 'LIKE', '%' . $search . '%');
        });
    }
 
}

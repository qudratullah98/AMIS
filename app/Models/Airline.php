<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Airline extends Model
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
    public function sghaServices()
    {
        return $this->hasMany(SGHA_Service::class);
    }

    public function flytes()
    {
        return $this->hasMany(Flyte::class);
    }
     public function scopeWhereUserAirport($query)
    {
        return $query->where('id', auth()->user()->airport_id);
    }
}

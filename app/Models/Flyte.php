<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flyte extends Model
{
    public function airport()
    {
        return $this->belongsTo(Airport::class);
    }

    public function airline()
    {
        return $this->belongsTo(Airline::class);
    }

    public function aircraftType()
    {
        return $this->belongsTo(AircraftType::class);
    }

    public function flyteServices()
    {
        return $this->hasMany(FlyteService::class);
    }
}

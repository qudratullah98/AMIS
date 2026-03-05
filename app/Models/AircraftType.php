<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AircraftType extends Model
{
    public function flytes()
    {
        return $this->hasMany(Flyte::class);
    }
}

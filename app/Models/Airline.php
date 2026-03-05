<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Airline extends Model
{
    public function sghaServices()
    {
        return $this->hasMany(SGHA_Service::class);
    }

    public function flytes()
    {
        return $this->hasMany(Flyte::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SGHA_Service extends Model
{
    public function sghaServiceUnit()
    {
        return $this->belongsTo(SGHAServiceUnit::class);
    }

    public function airline()
    {
        return $this->belongsTo(Airline::class);
    }

    public function flyteServices()
    {
        return $this->hasMany(FlyteService::class);
    }

    public function approvalStatus()
    {
        return $this->belongsTo(ApprovelStatus::class);
    }

}

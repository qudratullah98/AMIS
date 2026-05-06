<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlyteService extends Model
{
    public function flyte()
    {
        return $this->belongsTo(Flyte::class);
    }

    public function sghaServicesRate()
    {
        return $this->belongsTo(SGHAServiceRate::class);
    }
}

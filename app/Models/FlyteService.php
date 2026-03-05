<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlyteService extends Model
{
    public function flyte()
    {
        return $this->belongsTo(Flyte::class);
    }

    public function sghaService()
    {
        return $this->belongsTo(SGHA_Service::class);
    }
}

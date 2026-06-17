<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightService extends Model
{
    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }

    public function sghaServicesRate()
    {
        return $this->belongsTo(SGHAServiceRate::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightService extends Model
{
    protected $fillable = [
        'flight_id',
        'sgha_service_id',
        'count',
    ];


    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }


    public function sghaService()
    {
        return $this->belongsTo(SGHA_Service::class);
    }
}
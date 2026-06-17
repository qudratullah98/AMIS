<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    protected $fillable = [
        'airport_id',
        'flight_number',
        'pmt_methode',
        'flt',
        'work_order',
        'charge_note',
        'airline_id',
        'aircraft_type_id',
        'aircraft_registration',
        'arrival_date',
        'approximate_time_arrival',
        'departure_date',
        'approximate_time_departure',
    ];
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

    public function flightServices()
    {
        return $this->hasMany(FlightService::class);
    }
}

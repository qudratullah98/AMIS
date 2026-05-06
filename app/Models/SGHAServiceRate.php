<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SGHAServiceRate extends Model
{

protected $table = 'sgha_service_rate';
     protected $fillable = [
        'sgha_service_id',
        'sgha_service_unit_id',
        'airline_id',
        'complation_rate',
        'approval_status_id',
    ];

    public function sghaService()
    {
        return $this->belongsTo(SGHA_Service::class);
    }
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

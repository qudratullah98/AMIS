<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SGHA_Service extends Model
{
    protected $table = 'sgha_services';
     protected $fillable = [
        'name_en',
        'name_ps',
        'name_dr',
        'sgha_service_unit_id',
        'airline_id',
        'complation_rate',
        'approval_status_id',
    ];
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

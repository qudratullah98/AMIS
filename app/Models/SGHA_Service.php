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
    ];

    // ---------------- SERVICE UNIT ----------------
    public function serviceUnit()
    {
        return $this->belongsTo(SGHAServiceUnit::class, 'sgha_service_unit_id');
    }

    // ---------------- AIRLINE RATES ----------------
    public function sghaServicesRate()
    {
        return $this->hasMany(SGHAServiceRate::class, 'sgha_service_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class District extends Model
{

    protected $fillable = [
        "province_id",
        "district_dr",
        "district_ps",
        "district_en",
    ];

    // Get all airports in this district
    public function airports()
    {
        return $this->hasMany(Airport::class);
    }

}

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
    public function verify()
    {
        $this->is_approved = true;
        $this->save();
    }

}

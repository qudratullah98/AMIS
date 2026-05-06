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
    ];

    public function sghaServicesRate()
    {
        return $this->hasMany(SGHAServiceRate::class);
    }

}

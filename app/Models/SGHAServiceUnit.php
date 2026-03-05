<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SGHAServiceUnit extends Model
{
    protected $table ='sgha_service_units';
    public function sghaServices()
    {
        return $this->hasMany(SGHA_Service::class);
    }
}

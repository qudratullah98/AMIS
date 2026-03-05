<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SGHAServiceUnit extends Model
{
    public function sghaServices()
    {
        return $this->hasMany(SGHA_Service::class);
    }

    
}

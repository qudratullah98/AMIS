<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SGHAServiceUnit extends Model
{
    protected $table ='sgha_service_units';
    protected $fillable = [
        'service_name',
    ];
    public function sghaServicesRate()
    {
        return $this->hasMany(SGHAServiceRate::class);
    }
}

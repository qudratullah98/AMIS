<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{

    protected $fillable = [

        'name',
        'type',
        'phone',
        'email',
        'license_number',
        'organization',
        'address',
        'description'

    ];


    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }


}
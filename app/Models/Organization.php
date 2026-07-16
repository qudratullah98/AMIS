<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
     protected $fillable = [
        'name',
        'code',
        'email',
        'phone',
        'website',
        'address',
        'approval_status_id',
    ];
}

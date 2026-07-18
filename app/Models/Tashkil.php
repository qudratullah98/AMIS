<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tashkil extends Model
{
    protected $fillable = [
        'organization_id',
        'year',
        'approvel_status_id',
        'reference_number',
        'description',
    ];



    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}

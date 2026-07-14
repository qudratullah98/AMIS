<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tashkil extends Model
{
     protected $fillable = [
        'name',
        'year',
        'status',
        'description',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function departments()
    {
        return $this->hasMany(Department::class);
    }
}

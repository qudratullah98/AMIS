<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PositionType extends Model
{
     protected $fillable = [
        'name',
        'grade',
        'description',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function departmentPositions()
    {
        return $this->hasMany(DepartmentPosition::class);
    }
}

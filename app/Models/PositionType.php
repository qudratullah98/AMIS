<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PositionType extends Model
{
     protected $fillable = [
        'title',
        'grade',
        'code',
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

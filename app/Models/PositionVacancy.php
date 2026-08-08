<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PositionVacancy extends Model
{
   protected $fillable = [
        'department_position_id',
        'vacancy_no',
        'status',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function departmentPosition()
    {
        return $this->belongsTo(DepartmentPosition::class);
    }
    
}

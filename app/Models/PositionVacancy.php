<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PositionVacancy extends Model
{
    protected $fillable = [
        'department_position_id',
        'total_positions',
        'filled_positions',
        'vacant_positions',
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

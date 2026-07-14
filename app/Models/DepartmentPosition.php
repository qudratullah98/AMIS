<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentPosition extends Model
{
    protected $fillable = [
        'department_id',
        'position_type_id',
        'title',
        'grade',
        'quantity',
        'salary',
        'description',
    ];


    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */


    public function department()
    {
        return $this->belongsTo(Department::class);
    }


    public function positionType()
    {
        return $this->belongsTo(PositionType::class);
    }


    public function assignments()
    {
        return $this->hasMany(EmployeeAssignment::class);
    }


    public function vacancy()
    {
        return $this->hasOne(PositionVacancy::class);
    }


    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */


    public function getFilledPositionsAttribute()
    {
        return $this->assignments()
            ->where('status', 'active')
            ->count();
    }


    public function getAvailablePositionsAttribute()
    {
        return $this->quantity - $this->filled_positions;
    }
}

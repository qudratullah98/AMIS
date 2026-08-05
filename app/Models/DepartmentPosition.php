<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DepartmentPosition extends Model
{
    protected $fillable = [
        'department_id',
        'position_type_id',
        'title',
        'grade',
        'total_positions',
        'salary',
        'description',
    ];


    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function requiredCertificates(): HasMany
    {
        return $this->hasMany(PositionRequiredCertificate::class,);
    }

    public function requiredCourses(): HasMany
    {
        return $this->hasMany(PositionRequiredCourse::class);
    }

    public function requiredEducations(): HasMany
    {
        return $this->hasMany(PositionRequiredEducation::class);
    }

    public function vacancy()
    {
        return $this->hasOne(PositionVacancy::class);
    }
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

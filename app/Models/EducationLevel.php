<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EducationLevel extends Model
{
     protected $fillable = [
        'name',
        'description'
    ];


    public function employeeEducations()
    {
        return $this->hasMany(EmployeeEducation::class);
    }


    public function positionRequiredEducations()
    {
        return $this->hasMany(PositionRequiredEducation::class);
    }
}

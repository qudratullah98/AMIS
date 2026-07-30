<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeEducation extends Model
{

    protected $fillable = [

        'employee_id',
        'education_level_id',
        'field_of_study',
        'institution_name',
        'graduation_year',
        'gpa'

    ];



    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }



    public function educationLevel()
    {
        return $this->belongsTo(EducationLevel::class);
    }

}
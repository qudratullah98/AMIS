<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PositionRequiredCourse extends Model
{

    protected $fillable = [

        'position_id',
        'course_id',
        'requirement_type',
        'validity_months',
        'description'

    ];


    public function position()
    {
        return $this->belongsTo(DepartmentPosition::class);
    }


    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{

    protected $fillable = [

        'course_type_id',
        'name',
        'code',
        'duration_hours',
        'description',
        'validity_months'

    ];


    public function courseType()
    {
        return $this->belongsTo(CourseType::class);
    }


    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }


    public function trainers()
    {
        return $this->belongsToMany(
            Trainer::class,
            'course_trainers'
        );
    }


    public function trainingPlans()
    {
        return $this->hasMany(TrainingPlan::class);
    }


    public function positionRequiredCourses()
    {
        return $this->hasMany(PositionRequiredCourse::class);
    }

}
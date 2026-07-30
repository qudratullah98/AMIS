<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingPlan extends Model
{

    protected $fillable = [

        'name',
        'course_id',
        'trainer_id',
        'position_id',
        'start_date',
        'end_date',
        'location',
        'status',
        'description'

    ];


    public function course()
    {
        return $this->belongsTo(Course::class);
    }


    public function trainer()
    {
        return $this->belongsTo(Trainer::class);
    }


    public function position()
    {
        return $this->belongsTo(departmentPosition::class);
    }


}
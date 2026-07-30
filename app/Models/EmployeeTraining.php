<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeTraining extends Model
{

    protected $fillable = [

        'employee_id',
        'training_id',
        'obtained_date',
        'document_file',
        'approvel_status_id'

    ];


    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }


    public function training()
    {
        return $this->belongsTo(Training::class);
    }


    public function approvelStatus()
    {
        return $this->belongsTo(ApprovelStatus::class);
    }

}
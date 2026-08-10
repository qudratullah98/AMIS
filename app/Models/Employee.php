<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;


class Employee extends Model
{


protected $fillable = [


    'first_name',
    'last_name',
    'father_name',

    'gender',
    'birth_date',

    'phone',
    'email',

    'national_id',
    'passport_no',

    'marital_status',

    'blood_group_id',

    'province',
    'district',
    'address',

    'photo',

    'approval_status_id',

    'status',

    'created_by',
    'updated_by',

];



    protected $casts = [

        'dob'=>'date',
        'status'=>'boolean',

    ];



    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */


    public function assignments()
    {
        return $this->hasOne(
            EmployeeAssignment::class
        );
    }
    public function educations()
    {
        return $this->hasMany(
            EmployeeEducation::class
        );
    }
    public function certificates()
    {
        return $this->hasMany(
            EmployeeCertificate::class, 
        );
    }
    public function trainings()
    {
        return $this->hasMany(
            EmployeeTraining::class
        );
    }
   



    public function activeAssignment()
    {
        return $this->hasOne(
            EmployeeAssignment::class
        )
        ->where(
            'status',
            'active'
        );
    }
     public function user()
    {
        return $this->hasOne(User::class);
    }


}
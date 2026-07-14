<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;


class Employee extends Model
{



    protected $fillable = [

        'employee_no',
        'first_name',
        'last_name',
        'father_name',
        'gender',
        'dob',
        'phone',
        'email',
        'national_id',
        'address',
        'photo',
        'status',

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
        return $this->hasMany(
            EmployeeAssignment::class
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
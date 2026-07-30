<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
 

   protected $fillable = [
        'name',
        'level'
    ];

 


public function employees()
{
    return $this->hasMany(EmployeeCertificate::class);
}



public function positions()
{
    return $this->hasMany(PositionRequiredCertificate::class);
}



public function trainer()
{
    return $this->belongsTo(Trainer::class);
}



public function course()
{
    return $this->belongsTo(Course::class);
}


}
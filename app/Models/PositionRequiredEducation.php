<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class PositionRequiredEducation extends Model
{


protected $fillable=[

'position_id',
'education_level_id',
'is_required'

];



public function position()
{
    return $this->belongsTo(DepartmentPosition::class);
}



public function educationLevel()
{
    return $this->belongsTo(EducationLevel::class);
}



}
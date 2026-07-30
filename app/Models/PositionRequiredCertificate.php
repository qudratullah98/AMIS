<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class PositionRequiredCertificate extends Model
{


protected $fillable=[

'position_id',
'certificate_id',
'is_required'

];



public function position()
{
    return $this->belongsTo(DepartmentPosition::class);
}



public function certificate()
{
    return $this->belongsTo(Certificate::class);
}


}
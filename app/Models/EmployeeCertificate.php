<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class EmployeeCertificate extends Model
{


protected $fillable=[

'employee_id',
'certificate_id',
'obtained_date', 
'expiry_date',
'document_file', 

];



public function employee()
{
    return $this->belongsTo(Employee::class);
}



public function certificate()
{
    return $this->belongsTo(Certificate::class);
}



}
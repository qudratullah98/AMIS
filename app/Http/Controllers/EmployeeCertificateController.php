<?php

namespace App\Http\Controllers;

use App\Models\EmployeeCertificate;
use Illuminate\Http\Request;


class EmployeeCertificateController extends Controller
{


public function index()
{
return EmployeeCertificate::with(
'employee',
'certificate'
)->get();
}



public function store(Request $request)
{

$data=$request->validate([

'employee_id'=>'required',
'certificate_id'=>'required',
'obtained_date'=>'nullable',
'certificate_number'=>'nullable'

]);


return EmployeeCertificate::create($data);

}


public function show(EmployeeCertificate $employeeCertificate)
{
return $employeeCertificate;
}



public function update(Request $request,EmployeeCertificate $employeeCertificate)
{

$employeeCertificate->update($request->all());

return $employeeCertificate;

}



public function destroy(EmployeeCertificate $employeeCertificate)
{

$employeeCertificate->delete();

return response()->json([
'message'=>'Deleted'
]);

}


}
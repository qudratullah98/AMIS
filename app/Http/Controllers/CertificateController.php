<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;


class CertificateController extends Controller
{


public function index()
{
return Certificate::with(
'course',
'trainer'
)->get();
}



public function store(Request $request)
{

$data=$request->validate([

'name'=>'required',
'issuer'=>'nullable',
'issue_date'=>'nullable|date',
'expiry_date'=>'nullable|date',
'trainer_id'=>'nullable',
'course_id'=>'nullable'

]);


return Certificate::create($data);

}



public function show(Certificate $certificate)
{
return $certificate;
}



public function update(Request $request, Certificate $certificate)
{

$certificate->update($request->all());

return $certificate;

}



public function destroy(Certificate $certificate)
{

$certificate->delete();

return response()->json([
'message'=>'Deleted'
]);

}


}
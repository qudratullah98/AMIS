<?php

namespace App\Http\Controllers;

use App\Models\EmployeeEducation;
use Illuminate\Http\Request;


class EmployeeEducationController extends Controller
{


public function index()
{
    return EmployeeEducation::with(
        'employee',
        'educationLevel'
    )->get();
}



public function store(Request $request)
{

$data=$request->validate([

'employee_id'=>'required',
'education_level_id'=>'required',
'field_of_study'=>'required',
'institution_name'=>'required',
'graduation_year'=>'nullable',
'gpa'=>'nullable'

]);


return EmployeeEducation::create($data);

}



public function show(EmployeeEducation $employeeEducation)
{
    return $employeeEducation;
}



public function update(Request $request, EmployeeEducation $employeeEducation)
{

$employeeEducation->update($request->all());

return $employeeEducation;

}



public function destroy(EmployeeEducation $employeeEducation)
{

$employeeEducation->delete();

return response()->json([
'message'=>'Deleted'
]);

}


}
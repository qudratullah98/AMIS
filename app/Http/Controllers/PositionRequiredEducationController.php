<?php

namespace App\Http\Controllers;


use App\Models\PositionRequiredEducation;
use Illuminate\Http\Request;


class PositionRequiredEducationController extends Controller
{


public function index()
{

return PositionRequiredEducation::with(
'position',
'educationLevel'
)->get();

}



public function store(Request $request)
{

$data=$request->validate([

'position_id'=>'required',
'education_level_id'=>'required',
'is_required'=>'boolean'

]);


return PositionRequiredEducation::create($data);


}



public function show(PositionRequiredEducation $positionRequiredEducation)
{
return $positionRequiredEducation;
}




public function update(Request $request, PositionRequiredEducation $positionRequiredEducation)
{

$positionRequiredEducation->update($request->all());

return $positionRequiredEducation;

}




public function destroy(PositionRequiredEducation $positionRequiredEducation)
{

$positionRequiredEducation->delete();

return response()->json([
'message'=>'Deleted'
]);

}



}
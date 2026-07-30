<?php

namespace App\Http\Controllers;


use App\Models\PositionRequiredCertificate;
use Illuminate\Http\Request;


class PositionRequiredCertificateController extends Controller
{


public function index()
{

return PositionRequiredCertificate::with(
'position',
'certificate'
)->get();

}



public function store(Request $request)
{

$data=$request->validate([

'position_id'=>'required',
'certificate_id'=>'required',
'is_required'=>'boolean'

]);


return PositionRequiredCertificate::create($data);

}



public function show(PositionRequiredCertificate $positionRequiredCertificate)
{
return $positionRequiredCertificate;
}



public function update(Request $request,PositionRequiredCertificate $positionRequiredCertificate)
{

$positionRequiredCertificate->update($request->all());

return $positionRequiredCertificate;

}



public function destroy(PositionRequiredCertificate $positionRequiredCertificate)
{

$positionRequiredCertificate->delete();

return response()->json([
'message'=>'Deleted'
]);

}


}
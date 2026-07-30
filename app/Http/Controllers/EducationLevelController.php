<?php

namespace App\Http\Controllers;

use App\Models\EducationLevel;
use Illuminate\Http\Request;

class EducationLevelController extends Controller
{

    public function index()
    {
        return EducationLevel::all();
    }


    public function store(Request $request)
    {

        $data = $request->validate([
            'name'=>'required|string',
            'description'=>'nullable|string'
        ]);


        return EducationLevel::create($data);

    }


    public function show(EducationLevel $educationLevel)
    {
        return $educationLevel;
    }


    public function update(Request $request, EducationLevel $educationLevel)
    {

        $educationLevel->update($request->all());

        return $educationLevel;

    }


    public function destroy(EducationLevel $educationLevel)
    {
        $educationLevel->delete();

        return response()->json([
            'message'=>'Deleted successfully'
        ]);
    }
}
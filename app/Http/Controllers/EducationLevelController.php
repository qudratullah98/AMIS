<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEducationLevelRequest;
use App\Models\EducationLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationLevelController extends Controller
{

    public function index()
    {
        $educationLevels = EducationLevel::all();
        return Inertia::render('Educations/EducationLevel/Index', [
            'educationLevels' => $educationLevels
        ]);
    }

 

public function store(StoreEducationLevelRequest $request)
{

    $educationLevel = EducationLevel::create(
        $request->validated()
    );


    return response()->json([

        'success'=>true,

        'message'=>'education.education_level_created',

        'data'=>$educationLevel

    ]);

}


    
    public function json()
    {
        $educationLevels = EducationLevel::all();
        return response()->json($educationLevels);
    }
}

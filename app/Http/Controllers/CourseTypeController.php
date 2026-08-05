<?php

namespace App\Http\Controllers;

use App\Models\CourseType;
use Illuminate\Http\Request;

class CourseTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function jsonList()
    {
        $courseTypes = CourseType::all();
        return response()->json($courseTypes);
    }
}

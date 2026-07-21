<?php

namespace App\Http\Controllers;

use App\Models\PositionVacancy;
use Illuminate\Http\Request;

class PositionVacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function vacancy()
    {
        $pv=PositionVacancy::with('departmentPosition')->get();
        return response()->json($pv);
    }
   
}

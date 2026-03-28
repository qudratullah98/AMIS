<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MeasurementUnit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    
    public function getUnits()
    {
        $units = MeasurementUnit::get(['id', 'unit_ps']);
        return response()->json($units);
    }
}

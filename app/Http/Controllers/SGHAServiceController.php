<?php

namespace App\Http\Controllers;

use App\Models\SGHA_Service;
use App\Models\SGHAServiceUnit;
use Illuminate\Http\Request;

class SGHAServiceController extends Controller
{
    public function index()
    { 
        $perPage = request()->input('perPage', 10);
        $sgha_services = SGHA_Service::latest()->paginate($perPage);
        return inertia('SGHA/Index', compact('sgha_services'));
    }
    public function SGHAServiceUnit()
    { 
        // if axios request 
        if (request()->wantsJson()) {
            $perPage = request()->input('perPage', 10);
            $sghaServiceUnit = SGHAServiceUnit::get();
            return response()->json($sghaServiceUnit);
        }
        // normal request
        $perPage = request()->input('perPage', 10);
        $sghaServiceUnit = SGHAServiceUnit::latest()->paginate($perPage);
        return inertia('SGHA/SGHAServiceUnit/Index', compact('sghaServiceUnit'));
}}

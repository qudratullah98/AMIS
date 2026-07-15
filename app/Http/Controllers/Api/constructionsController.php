<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Construction;
use Illuminate\Http\Request;

class constructionsController extends Controller
{
     public function constructions()
    {
        $constructions = Construction::where('approval_status_id','1')->get(['id', 'name_ps', 'name_en']);
        return response()->json($constructions);
    }
}

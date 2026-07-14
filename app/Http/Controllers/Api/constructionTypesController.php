<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ConstructionType;
use Illuminate\Http\Request;

class constructionTypesController extends Controller
{
    public function constructionTypes()
    {
        $constructionTypes = ConstructionType::where('status_id','1')->get(['id', 'type_ps', 'type_dr']);
        return response()->json($constructionTypes);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Trainer;
use Illuminate\Http\Request;

class TrainerController extends Controller
{
    public function jsonList()
    {
        $trainers = Trainer::select('id', 'name')->get();
        return response()->json($trainers);
    }
}

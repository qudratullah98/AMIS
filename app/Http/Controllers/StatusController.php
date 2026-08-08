<?php

namespace App\Http\Controllers;
 
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function change(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'integer'],
            'model' => ['required', 'string'],
        ]);

      

    
        $model = $validated['model'];
        $model = "App\\Models\\" . $model;

        $record = $model::findOrFail($validated['id']);

        $record->approval_status_id = 1;

        $record->save();

        return response()->json([
            'success' => true,
            'data' => $record
        ]);
    }
}
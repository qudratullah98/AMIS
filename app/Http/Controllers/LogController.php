<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $query = Activity::query()->with('causer');
        $perPage = request()->input('perPage', 10);
        if ($request->filled('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }
    
        if ($request->filled('causer')) {
            $query->whereHas('causer', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->causer . '%');
            });
        }
    
           $logs = $query->latest()->paginate($perPage);
        
        return Inertia::render('Log/Index', [
            'logs' => $logs,
            'filters' => $request->only(['description', 'causer']),
        ]);
    }
    
}

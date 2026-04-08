<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use Inertia\Inertia;

class AirlineController extends Controller
{

    //Airlines part
    public function index()
    {
        $search   = request()->input('query');
        $perPage  = request()->input('perPage', 10);


        $airLines = Airline::with(['flytes', 'sghaServices'])->whereUserAirport()->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);
        return Inertia::render('Airlines/Index', [
            'airLines' => $airLines,
        ]);
    }
}

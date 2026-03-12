<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirportsController extends Controller
{
    public function index()
    {
        $search = request()->input('query');
        $perPage = request()->input('perPage', 10);
        $airports = Airport::with(['province:id,province', 'district:id,district_dr'])->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);
        return Inertia::render('Airports/Index', ['airports' => $airports]);
    }
}

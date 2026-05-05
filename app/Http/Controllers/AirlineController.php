<?php
namespace App\Http\Controllers;

use App\Models\AircraftType;
use App\Models\Airline;
use Inertia\Inertia;


class AirlineController extends Controller
{

    //Airlines part
    public function index()
    {
        $search   = request()->input('query');
        $perPage  = request()->input('perPage', 13);

        $airlines  = Airline::when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Airports/Airlines/Index',['airlines'=>$airlines]);
    }

    // AirCraft Types part
    public function airCraftTypeindex()
    {
        $search   = request()->input('query');
        $perPage  = request()->input('perPage', 13);

        $aircraftTypes  = AircraftType::when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);


        return Inertia::render('Airports/AircraftTypes/Index',['aircraftTypes'=>$aircraftTypes]);

    }

}

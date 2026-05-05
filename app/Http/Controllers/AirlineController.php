<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
use App\Models\AircraftType;
=======
>>>>>>> ecfe4ff1eb063c8d12fc42777753752492068f28
use App\Models\Airline;
use Inertia\Inertia;


class AirlineController extends Controller
{

    //Airlines part
    public function index()
    {
        $search   = request()->input('query');
<<<<<<< HEAD
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

=======
        $perPage  = request()->input('perPage', 10);


        $airLines = Airline::with(['flytes', 'sghaServices'])->whereUserAirport()->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);
        return Inertia::render('Airlines/Index', [
            'airLines' => $airLines,
        ]);
    }
>>>>>>> ecfe4ff1eb063c8d12fc42777753752492068f28
}

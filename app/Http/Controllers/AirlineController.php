<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class AirlineController extends Controller
{

    //Airlines part
    public function index()
    {
        return Inertia::render('Airports/Airlines/Index');
    }

    // AirCraft Types part
    public function airCraftTypeindex()
    {
        return Inertia::render('Airports/AircraftTypes/Index');

    }

}

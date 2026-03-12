<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirportsController extends Controller
{
    public function index(){
        $airports = Airport::get(); 
         return Inertia::render('Airports/Index', ['airports' => $airports]);
    }
}

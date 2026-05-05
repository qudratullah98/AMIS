<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SGHAServiceController extends Controller
{
    public function index()
    {
        return inertia('SGHA/Index');
    }
}

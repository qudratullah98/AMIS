<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;


class CertificateController extends Controller
{


    public function index()
    {
        $certificates = Certificate::all();
        return inertia('Educations/Certificates/Index', [
            'certificates' => $certificates,
        ]);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|string',
        ]);

        $certificate = Certificate::create($validatedData);

        return response()->json([
            'success' => true,
            'certificate' => $certificate
        ]);
    }
}

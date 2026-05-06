<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSghaServiceRequest;
use App\Http\Requests\UpdateSghaServiceRequest;
use App\Models\SGHA_Service;
use App\Models\SGHAServiceUnit;
use Illuminate\Http\Request;

class SGHAServiceController extends Controller
{
    public function index()
    {
        $perPage = request()->input('perPage', 10);
        $sgha_services = SGHA_Service::with(['sghaServiceUnit:id,service_name', 'airline:id,name_en'])->latest()->paginate($perPage);
        return inertia('SGHA/Index', compact('sgha_services'));
    }
    public function SGHAServiceUnit()
    {
        // if axios request 
        if (request()->wantsJson()) {
            $perPage = request()->input('perPage', 10);
            $sghaServiceUnit = SGHAServiceUnit::get();
            return response()->json($sghaServiceUnit);
        }
        // normal request
        $perPage = request()->input('perPage', 10);
        $sghaServiceUnit = SGHAServiceUnit::latest()->paginate($perPage);
        return inertia('SGHA/SGHAServiceUnit/Index', compact('sghaServiceUnit'));
    }
    public function store(StoreSghaServiceRequest $request)
    {
        $data = $request->validated();

        $service = SGHA_Service::create($data);
        $service->load(['sghaServiceUnit:id,service_name', 'airline:id,name_en']);

        return response()->json([
            'message' => 'Created successfully',
            'sgha_service' => $service
        ]);
    }

    public function update(UpdateSghaServiceRequest $request, $id)
    {
        $service = SGHA_Service::findOrFail($id);

        $service->update($request->validated());
        $service->load(['sghaServiceUnit:id,service_name', 'airline:id,name_en']);
        return response()->json([
            'message' => 'Updated successfully',
            'sgha_service' => $service
        ]);
    }

    // Json Data 
    public function getSGHAServiceUnit()
    {
        $sghaServiceUnit = SGHAServiceUnit::select('id', 'service_name')->get();
        return response()->json($sghaServiceUnit);
    }
}

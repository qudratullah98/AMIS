<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSghaServiceRequest;
use App\Http\Requests\UpdateSghaServiceRequest;
use App\Models\SGHA_Service;
use App\Models\SGHAServiceUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SGHAServiceController extends Controller
{
    public function index()
    {
        $perPage = request()->input('perPage', 10);
        $sgha_services = SGHA_Service::with('serviceUnit', 'sghaServicesRate.airline')->latest()->paginate($perPage);
        return inertia('SGHA/SGHAService/Index', compact('sgha_services'));
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
        try {

            $service = DB::transaction(function () use ($request) {

                $data = $request->validated();

                $service = SGHA_Service::create([
                    'name_en' => $data['name_en'],
                    'name_ps' => $data['name_ps'] ?? null,
                    'name_dr' => $data['name_dr'] ?? null,
                    'sgha_service_unit_id' => $data['sgha_service_unit_id'],
                ]);

                $rates = collect($data['airline_rates'])->map(function ($item) use ($data) {
                    return [
                        'airline_id' => $item['airline_id'],
                        'complation_rate' => $item['complation_rate'],
                        'approval_status_id' => $data['approval_status_id'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                });

                $service->sghaServicesRate()->createMany($rates->toArray());

                return $service;
            });

            return response()->json([
                'message' => 'Created successfully.',
                'sgha_service' => $service->load([
                    'serviceUnit',
                    'sghaServicesRate.airline',
                ]),
            ], 201);
        } catch (\Throwable $e) {

            report($e);

            return response()->json([
                'message' => 'Failed to create service.',
            ], 500);
        }
    }

    public function update(UpdateSghaServiceRequest $request, $id)
    {
        $service = SGHA_Service::findOrFail($id);

        $service->update($request->validated());
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
    public function getSGHAServices()
    {
        $sghaServices = SGHA_Service::all();

        return response()->json($sghaServices);
    }
}

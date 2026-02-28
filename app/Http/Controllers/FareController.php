<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreFareRequest;
use App\Http\Resources\FareResource;
use App\Models\Fare;
use App\Models\route;
use App\Models\VehicleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FareController extends Controller
{

    public function index(Request $request)
    {
        $search  = $request->input('query');
        $perPage = $request->input('perPage', 10);

        $fares = Fare::with(['vehicleType', 'route', 'route.startPoint', 'route.endPoint'])
            ->when($search, function ($q) use ($search) {
                // Split the input on "/" and trim spaces
                $parts = array_map('trim', explode('/', $search));

                // If user typed something like "Kabul/Kandahar"
                if (count($parts) === 2) {
                    [$start, $end] = $parts;

                    $q->whereHas('route.startPoint', function ($query) use ($start) {
                        $query->where('province', 'like', "%{$start}%");
                    })
                        ->whereHas('route.endPoint', function ($query) use ($end) {
                            $query->where('province', 'like', "%{$end}%");
                        });
                }
                // If user typed only one part (e.g., "Kabul")
                else {
                    $q->whereHas('route.startPoint', function ($query) use ($search) {
                        $query->where('province', 'like', "%{$search}%");
                    })
                        ->orWhereHas('route.endPoint', function ($query) use ($search) {
                            $query->where('province', 'like', "%{$search}%");
                        });
                }
            })
            ->latest()
            ->paginate($perPage);

        return Inertia::render('Setting/Fare/Index', [
            'fares' => FareResource::collection($fares),
        ]);
    }

    public function create()
    {
        $routes        = route::with(['startDistrict:id,district_dr', 'endDistrict:id,district_dr', 'startPoint:id,province', 'endPoint:id,province'])->where('is_approved', true)->get();
        $vehicle_types = VehicleType::approved()->select('id', 'name')->get();

        return Inertia::render('Setting/Fare/Create', [
            'vehicle_types' => $vehicle_types,
            'routes'        => $routes,
        ]);
    }
    public function store(StoreFareRequest $request)
    {
        Fare::create([ ...$request->validated(), "user_id" => Auth::user()->id]);
        return redirect()->route('setting.fares')->with('success', 'Fare created successfully.'); // Optional flash message
    }
    public function renewFare(StoreFareRequest $request)
    {
        Fare::create([ ...$request->validated(), "user_id" => Auth::user()->id]);
        return redirect()->route('setting.fares')->with('success', 'Fare created successfully.'); // Optional flash message
    }
    public function updateFare(StoreFareRequest $request)
    {
        $fare = Fare::find($request->id);
        if ($request->status == "approved") {
            $fare->update(["bel_end_date" => $request->bel_end_date, "bel_start_date" => $request->bel_start_date, "user_id" => Auth::user()->id]);
        } else {
            $fare->update([ ...$request->validated(), "user_id" => Auth::user()->id]);
        }
        // return $fare->load(['vehicleType','route'])->first();
        // return redirect()->route('setting.fares')->with('success', 'کرایه با موفقیت به‌روزرسانی شد.');
    }

    public function getAllCompny()
    {
        return Fare::select('id', 'company_name')->get();
    }
}

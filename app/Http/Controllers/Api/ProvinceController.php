<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    public function getProvinces()
    {
        $provinces = province::get(['id', 'province']);
        return response()->json($provinces);
    }

    public function getProvinceDistricts($province_id)
    {
        $districts = District::where('province_id', $province_id)->get(['id', 'district_dr']);
        return response()->json($districts);
    }
}

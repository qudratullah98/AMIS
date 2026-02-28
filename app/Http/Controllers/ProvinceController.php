<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\District;
use App\Models\province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    public function getAllProvince(){
        return province::select('id','province')->get();
    }
    public function getProvinceDistrict($province_id){
        return District::where('province_id',$province_id)->select('id','district_dr')->get();
    }
    public function getCompanyProvince($company)
    {
        return Branch::whereHas('company', function($query) use ($company) {
            $query->where('companies.id', $company); 
        })->with('location')->select('id','location')->get();
      
    }
}

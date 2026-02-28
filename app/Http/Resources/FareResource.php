<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FareResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "route_id" => $this->route_id,
            "vehicle_type_id" => $this->vehicle_type_id,
            "max_fare" => $this->max_fare,
            "min_fare" => $this->min_fare,
            "bel_start_date" => $this->bel_start_date,
            "bel_end_date" => $this->bel_end_date,
            "status" => $this->status,
            "user_id" => $this->user_id,
            "is_approved" => $this->status,
            "vehicle_type" =>$this->vehicleType ? $this->vehicleType->vehicle_name : null,
            "route" => $this->route ? [
                "id" => $this->route->id,
                "start_point" => [
                    "province" => $this->route->startPoint->province ?? null,
                    "district" => $this->route->startDistrict->district_dr ?? null,
                ],
                "end_point" => [
                    "province" => $this->route->endPoint->province ?? null,
                    "district" => $this->route->endDistrict->district_dr ?? null,
                ],
            ] : null, 
        ];
    }
}

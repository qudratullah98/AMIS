<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "start_point"=>$this->start_point,
            "end_point"=>$this->end_point,
            "start_district"=>$this->start_district,
            "end_district"=>$this->end_district,
            "start_point"=>$this->start_point, 
        ]
        ;
    }
}

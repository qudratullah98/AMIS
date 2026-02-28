<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SmallVehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
               return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'plate_no' => $this->plate_no,
            'plate_grade_id' => $this->plate_grade_id,
            'plate_province_id' => $this->plate_province_id,
            'engine_no' => $this->engine_no,
            'shaci_no' => $this->shaci_no,
            'vehicle_type_id' => $this->vehicle_type_id,
            'modal' => $this->modal,
            'vehicle_color' => $this->vehicle_color,
            'owner_id' => $this->owner_id,
            'driver_id' => $this->driver_id,
            'is_approved' => $this->is_approved,
            'image' => $this->image,
            'file' => $this->file,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

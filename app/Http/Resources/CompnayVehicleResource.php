<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompnayVehicleResource extends JsonResource
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
            'company_name' => $this->company_name,   // Corrected to use 'company_name'
            'vehicle_type' => $this->vehicle_type,    // Updated to match validation rules
            'plate_no' => $this->plate_no,            // Updated to match validation rules
            'plate_grade_id' => $this->plate_grade_id, // Added plate_grade_id
            'plate_province_id' => $this->plate_province_id, // Added plate_province_id
            'engine_no' => $this->engine_no,          // Updated to match validation rules
            'shaci_no' => $this->shaci_no,            // Updated to match validation rules
            'modal' => $this->modal,                    // Added modal
            'vehicle_color' => $this->vehicle_color,   // Added vehicle_color
            'is_approved' => $this->is_approved,       // Added is_approved
            'image' => $this->image,                    // Added image
            'file' => $this->file,                      // Added file
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

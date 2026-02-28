<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'company_type_id' => $this->company_type_id,
            'license_number' => $this->license_number,
            'license_start_date' => $this->license_start_date,
            'license_end_date' => $this->license_end_date,
            'tin' => $this->tin,
            'descriptions' => $this->descriptions,
            'is_approved' => $this->is_approved,
            'file' => $this->file,

        ];
    }
}

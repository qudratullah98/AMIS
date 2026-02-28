<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TerminalResouce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id, 
            'terminal_name'=>$this->terminal_name, 
            'location' => $this->location,
            'descriptions' => $this->descriptions,
            'is_approved' => $this->is_approved,
          'routes' => $this->routes->map(function($route) {
                return [
                    'id' => $route->id,
                    'start_point' => $route->start_point->province, // Accessing nested relationship
                    'start_district' => $route->start_district->districts_dr, // Accessing nested relationship
                    'end_point' => $route->end_point->province, // Accessing nested relationship
                    'end_district' => $route->end_district->districts_dr, // Accessing nested relationship
                    'is_approved' => $route->is_approved,
                    'created_at' => $route->created_at,
                    'updated_at' => $route->updated_at,
                    'pivot' => [
                        'terminal_id' => $route->pivot->terminal_id,
                        'route_id' => $route->pivot->route_id,
                    ],
                ];
            }),
            'companies' => $this->companies->map(function($company) {
                return [
                    'id' => $company->id,
                    'name' => $company->company_name,
                ];
            }),
        ];
    }
}

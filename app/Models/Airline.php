<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Airline extends Model
{

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        $search = trim($search ?? '');

        return $query->when($search !== '', function ($query) use ($search) {
            return $query->where(function ($q) use ($search) {
                $q->where('name_ps', 'LIKE', "%{$search}%")
                    ->orWhere('name_dr', 'LIKE', "%{$search}%")
                    ->orWhere('name_en', 'LIKE', "%{$search}%");
            });
        });
    }

    public function sghaServices()
    {
        return $this->hasMany(SGHA_Service::class);
    }

    public function flytes()
    {
        return $this->hasMany(Flyte::class);
    }
     public function scopeWhereUserAirport($query)
    {
        return $query->where('id', auth()->user()->airport_id);
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ConstructionType extends Model
{

protected $fillable = [
        'type_ps',
        'type_dr',
        'type_en',
        'status_id',

    ];

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        $search = trim($search ?? '');

        return $query->when($search !== '', function ($query) use ($search) {
            return $query->where(function ($q) use ($search) {
                $q->where('type_dr', 'LIKE', "%{$search}%")
                    ->orWhere('type_en', 'LIKE', "%{$search}%")
                    ->orWhere('type_ps', 'LIKE', "%{$search}%");
            });
        });
    }

    public function airportConstructionType()
    {
        return $this->hasMany(AirportConstruction::class);
    }

    public function status()
    {
        return $this->belongsTo(ApprovelStatus::class);
    }

    public function activate()
    {
        $this->status_id = 1;
        $this->save();
        return $this;
    }
}

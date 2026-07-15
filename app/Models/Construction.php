<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Construction extends Model
{
    protected $fillable = [
        'name_ps',
        'name_dr',
        'name_en',
        'code',
        'status_id',
    ];

    protected $table= 'constructions';


    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        $search = trim($search ?? '');

        return $query->when($search !== '', function ($query) use ($search) {
            return $query->where(function ($q) use ($search) {
                $q->where('name_dr', 'LIKE', "%{$search}%")
                ->orWhere('name_en', 'LIKE', "%{$search}%")
                ->orWhere('name_ps', 'LIKE', "%{$search}%")

                    ->orWhere('code', 'LIKE', "%{$search}%");
            });
        });
    }




    public function airportConstructions()
    {
        return $this->hasMany(AirportConstruction::class);
    }

    public function properties()
    {
        return $this->hasMany(ConstructionProperty::class);
    }

    public function approvalStatus()
    {
        return $this->belongsTo(ApprovelStatus::class);
    }

    public function activate()
    {
        $this->approval_status_id = 1;
        $this->save();
        return $this;
    }
}

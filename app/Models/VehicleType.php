<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class VehicleType extends Model
{

    use LogsActivity;
    protected $fillable=[
        "name",
        "vehicle_tonnage_id",
        "is_approved"
    ];
    public function scopeApproved($query)
    {
        return $query->where("is_approved", true);
    }
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->when($search, function ($query, $search) {
            $query->where('name', 'LIKE', '%' . $search . '%');
        });
    }
    public function verify()
    {
        $this->is_approved = true;
        $this->save();
    }
    public function vehicleTonnage()
    {
        return $this->belongsTo(VehicleTonnage::class, 'vehicle_tonnage_id');
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly(['name', 'vehicle_tonnage_id','is_approved'])
        ->setDescriptionForEvent(fn(string $eventName) => "VehicleType has been {$eventName}")
        ->useLogName('VehicleType')
        ->logOnlyDirty()
        ->dontSubmitEmptyLogs();
    }

    
}

<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Fare extends Model
{
    use LogsActivity;
    use LogsActivity;
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly(['route_id', 'vehicle_type_id','max_fare','min_fare','bel_start_date','bel_end_date','status'])
        ->setDescriptionForEvent(fn(string $eventName) => "Fare has been {$eventName}")
        ->useLogName('Fare')
        ->logOnlyDirty()
        ->dontSubmitEmptyLogs();
    }
    protected $fillable = [

        "route_id",
        "vehicle_type_id",
        "max_fare",
        "min_fare",
        "bel_start_date",
        "bel_end_date",
        "status",
        "user_id",
    ];
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->when($search, function ($query, $search) {
            // $query->where('name', 'LIKE', '%' . $search . '%');
        });
    }
    public function vehicleType(){
        return $this->belongsTo(VehicleType::class,"vehicle_type_id");
    }
    public function route(){
        return $this->belongsTo(route::class,"route_id");
    }
    public function verify()
    {
        $this->status = 'approved';
        $this->save();
    }
     public function unverify()
    {
        $this->status = 'disabled';
        $this->bel_end_date = now();
        $this->save();
    }
}

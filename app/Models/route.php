<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class route extends Model
{
    use \Spatie\Activitylog\Traits\LogsActivity;
    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        return \Spatie\Activitylog\LogOptions::defaults()
        ->logOnly(['start_point', 'end_point','start_district','end_district'])
        ->setDescriptionForEvent(fn(string $eventName) => "Route has been {$eventName}")
        ->useLogName('Route')
        ->logOnlyDirty()
        ->dontSubmitEmptyLogs();
    }
    protected $fillable = [
        "start_point" ,
        "end_point"  ,
        "start_district" ,
        "end_district"  , 
        'is_approved',
    ];
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->when($search, function ($query, $search) {
            $query->where('name', 'LIKE', '%' . $search . '%');
        });
    }
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('is_approved', true);
    }
    public function startDistrict(){
        return $this->belongsTo(district::class,'start_district');
    }
    public function endDistrict(){
        return $this->belongsTo(district::class,'end_district');
    }
    public function startPoint(){
        return $this->belongsTo(province::class,'start_point');
    }
    public function endPoint(){
        return $this->belongsTo(province::class,'end_point');
    }
    public function bandars()
    {
        return $this->belongsToMany(Bander::class);
    }
    
    public function fare()
    {
        return $this->hasOne(Fare::class, 'route_id');
    }
    public function verify()
    {
        $this->is_approved = true;  
        $this->save();
    }
    public function terminals() {
        return $this->belongsToMany(terminal::class, 'terminal_routes', 'route_id', 'terminal_id')
            ->withPivot('id')
            ->withTimestamps();
    }
    public function smallVehicles()
    {
        return $this->belongsToMany(smallVehicles::class, 'route_small_vehicles'); // or the correct pivot table
    }
}

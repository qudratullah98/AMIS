<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class province extends Model
{
    public $timestamps = false;

    public function branches()
    {
        return $this->hasMany(Branch::class, 'location');
    }
    public function terminals()
    {
        return $this->hasMany(terminal::class, 'location');
    }

    public function violation()
    {
        return $this->hasMany(Violation::class, 'province_id');
    }

    public function plateViolations()
    {
        return $this->hasMany(ViolationVehicle::class, 'plate_province_id');
    }

    public function ownerViolations()
    {
        return $this->hasMany(ViolationVehicle::class, 'owner_province_id');
    }

}

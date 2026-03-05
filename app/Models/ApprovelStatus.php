<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApprovelStatus extends Model
{
    protected $table ='approval_statuses';
    // Get all airports in this approval_status
    public function airports()
    {
        return $this->hasMany(Airport::class);
    }

    public function airportConstructions()
    {
        return $this->hasMany(AirportConstruction::class);
    }

    public function sghaServices()
    {
        return $this->hasMany(SGHA_Service::class);
    }

    public function equipment()
    {
        return $this->hasMany(Equipment::class);
    }
}

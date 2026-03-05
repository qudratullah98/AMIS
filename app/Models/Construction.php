<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Construction extends Model
{
    public function airportConstructions()
    {
        return $this->hasMany(AirportConstruction::class);
    }

    public function properties()
{
    return $this->hasMany(ConstructionProperty::class);
}
}

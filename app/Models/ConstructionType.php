<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstructionType extends Model
{
    public function airportConstructionType()
    {
        return $this->hasMany(AirportConstruction::class);
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MeasurementUnit extends Model
{
    protected $fillable = [
        'unit_ps',
        'unit_en',
        'unit_dr',
    ];

    protected $table = 'measurement_units';

    // Airports where this unit is used for AMSL
    public function airportsAsAMSL()
    {
        return $this->hasMany(Airport::class, 'amsl_unit_id');
    }

    // Airports where this unit is used for Area
    public function airportsAsArea()
    {
        return $this->hasMany(Airport::class, 'area_unit_id');
    }

    // For width unit
    public function widthConstructions()
    {
        return $this->hasMany(AirportConstruction::class, 'width_unit_id');
    }

// For length unit
    public function lengthConstructions()
    {
        return $this->hasMany(AirportConstruction::class, 'length_unit_id');
    }

    public function constructionProperties()
    {
        return $this->hasMany(ConstructionProperty::class);
    }
}

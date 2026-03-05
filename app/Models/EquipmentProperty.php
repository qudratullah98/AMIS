<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentProperty extends Model
{
     public function equipments()
    {
        return $this->belongsTo(Equipment::class);
    }

    public function unit()
    {
        return $this->belongsTo(MeasurementUnit::class);
    }
}

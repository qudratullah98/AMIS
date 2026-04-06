<?php

namespace App\Traits;

trait BelongsToAirport
{
    protected static function bootBelongsToAirport()
    {
        static::creating(function ($model) {
            if (auth()->check()) {
                $model->airport_id = auth()->user()->airport_id;
            }
        });
    }
}
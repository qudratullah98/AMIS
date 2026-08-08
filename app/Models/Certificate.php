<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Certificate extends Model
{


   protected $fillable = [
        'name',
        'level'
    ];

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        $search = trim($search ?? '');

        return $query->when($search !== '', function ($query) use ($search) {
            return $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");

            });
        });
    }




public function employees()
{
    return $this->hasMany(EmployeeCertificate::class);
}



public function positions()
{
    return $this->hasMany(PositionRequiredCertificate::class);
}



public function trainer()
{
    return $this->belongsTo(Trainer::class);
}



public function course()
{
    return $this->belongsTo(Course::class);
}


}

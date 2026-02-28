<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class userType extends Model
{
    protected $fillable = [
        'user_id',
        'user_type',
        'terminal_id',
        'company_id',
        'province_id',
        'bander_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function terminal()
    {
        return $this->belongsTo(Terminal::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function bander()
    {
        return $this->belongsTo(Bander::class);
    }
}

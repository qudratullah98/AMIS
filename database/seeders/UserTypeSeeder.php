<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\userType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user= User::create([
            "name" => "Qudratullah",
            "email" => "admin@gmail.com", // Fixed the email domain
            "password" => Hash::make('password'), // Use Hash::make to hash the password
        ]);
        userType::create([
            'user_id'=>$user->id,
            'user_type'=>'admin',
            'province_id'=>'1',
        ]);
    }
}

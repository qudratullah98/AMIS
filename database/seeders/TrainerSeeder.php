<?php

namespace Database\Seeders;

use App\Models\Trainer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrainerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Trainer::insert([

            [
                'name' => 'Civil Aviation Authority Training Center',
                'phone' => '0700000001',
                'email' => 'training@caa.gov',
                'address' => 'Kabul, Afghanistan',
                'description' => 'Approved aviation training organization'
            ],

            [
                'name' => 'Afghan Aviation Training Institute',
                'phone' => '0700000002',
                'email' => 'info@aati.com',
                'address' => 'Kabul, Afghanistan',
                'description' => 'Professional aviation training provider'
            ],

            [
                'name' => 'Airport Security Training Department',
                'phone' => '0700000003',
                'email' => 'security.training@airport.com',
                'address' => 'Kabul International Airport',
                'description' => 'Provides AVSEC and security related training'
            ],

            [
                'name' => 'Safety Management Training Center',
                'phone' => '0700000004',
                'email' => 'sms.training@aviation.com',
                'address' => 'Kabul, Afghanistan',
                'description' => 'Specialized SMS and safety courses provider'
            ],

            [
                'name' => 'Dangerous Goods Training Center',
                'phone' => '0700000005',
                'email' => 'dg.training@aviation.com',
                'address' => 'Kabul, Afghanistan',
                'description' => 'Provides Dangerous Items qualification training'
            ]

        ]);
    }
}

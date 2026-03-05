<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SGHAServiceUnit;

class SGHAServiceUnitSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            // ===== Flight Based =====
            ['service_name' => 'Per Flight'],
            ['service_name' => 'Per Turnaround'],
            ['service_name' => 'Per Landing'],
            ['service_name' => 'Per Departure'],
            ['service_name' => 'Per Arrival'],

            // ===== Time Based =====
            ['service_name' => 'Per Hour'],
            ['service_name' => 'Per 30 Minutes'],
            ['service_name' => 'Per 15 Minutes'],
            ['service_name' => 'Per Day'],
            ['service_name' => 'Per Month'],

            // ===== Passenger Based =====
            ['service_name' => 'Per Passenger'],
            ['service_name' => 'Per Transit Passenger'],
            ['service_name' => 'Per VIP Passenger'],

            // ===== Weight / Cargo Based =====
            ['service_name' => 'Per Ton'],
            ['service_name' => 'Per Metric Ton'],
            ['service_name' => 'Per Kilogram'],
            ['service_name' => 'Per Pound'],
            ['service_name' => 'Per ULD'],
            ['service_name' => 'Per Pallet'],

            // ===== Aircraft Related =====
            ['service_name' => 'Per Aircraft'],
            ['service_name' => 'Per Aircraft Type'],
            ['service_name' => 'Per MTOW'],
            ['service_name' => 'Per Parking Hour'],
            ['service_name' => 'Per Parking Day'],

            // ===== Equipment / Vehicle =====
            ['service_name' => 'Per Equipment'],
            ['service_name' => 'Per Equipment Hour'],
            ['service_name' => 'Per GPU Hour'],
            ['service_name' => 'Per Pushback'],
            ['service_name' => 'Per Tow'],

            // ===== Special Services =====
            ['service_name' => 'Per Crew'],
            ['service_name' => 'Per Crew Member'],
            ['service_name' => 'Per Security Check'],
            ['service_name' => 'Per Cleaning'],
            ['service_name' => 'Per Catering Service'],
            ['service_name' => 'Per Water Service'],
            ['service_name' => 'Per Lavatory Service'],
            ['service_name' => 'Per De-icing'],
            ['service_name' => 'Per Fuel Coordination'],

        ];

        foreach ($data as $row) {
            SGHAServiceUnit::create($row);
        }
    }
}

<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(MeasurementUnitSeeder::class);
        $this->call(ApprovalStatusSeeder::class);
        $this->call(DistrictSeeder::class);
        $this->call(ProvincesSeeder::class);

        $this->call(SGHAServiceUnitSeeder::class);

        $this->call(ActivityStatusSeeder::class);
        $this->call(AircraftTypeSeeder::class);
        $this->call(AirlineSeeder::class);
        $this->call(AirportsSeeder::class);

        $this->call(ConstructionSeeder::class);
        $this->call(ConstructionTypeSeeder::class);

        $this->call(GeneralDepartmentSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(RolePermissionSeeder::class);
    }
}

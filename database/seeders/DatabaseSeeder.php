<?php
namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        $this->call(ProvincesSeeder::class);
        $this->call(DistrictSeeder::class);
        $this->call(RolePermissionSeeder::class);

        $this->call(ActivityStatusSeeder::class);
        $this->call(ApprovalStatusSeeder::class);
        $this->call(UserTypeSeeder::class);


    }
}

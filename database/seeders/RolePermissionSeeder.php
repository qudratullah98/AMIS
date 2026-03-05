<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            ['name' => 'viewDashboardMenu', 'guard_name' => 'sanctum'],

            ['name' => 'viewUserMenu', 'guard_name' => 'sanctum'],
            ['name' => 'viewLogMenu', 'guard_name' => 'sanctum'],

            ['name' => 'manageActivityLog', 'guard_name' => 'sanctum'],

            // ROLES PERMISSIONS
            ['name' => 'manageUsers', 'guard_name' => 'sanctum'],
            ['name' => 'viewUsers', 'guard_name' => 'sanctum'],

        ];

        // Create permissions in the database
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission['name'], 'guard_name' => 'web']);

        }

        $adminRole = Role::create(['name' => 'Super Admin']);

        $adminRole->givePermissionTo(Permission::all());

        $user = User::where('email', 'admin@gmail.com')->first();
        if ($user) {
            $user->assignRole($adminRole);
        }

    }
}

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

            // AIRPORTS PERMISSIONS
            ['name' => 'viewAirportMenu', 'guard_name' => 'sanctum'],
            ['name' => 'manageAirports', 'guard_name' => 'sanctum'],
            ['name' => 'viewAirports', 'guard_name' => 'sanctum'],


            // AIRLINE PERMISSIONS
            ['name' => 'viewAirlineMenu', 'guard_name' => 'sanctum'],
            ['name' => 'manageAirLine', 'guard_name' => 'sanctum'],
            ['name' => 'viewairLine', 'guard_name' => 'sanctum'],

        ];

        // Create permissions in the database
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission['name'], 'guard_name' => 'web']);

        }

        $adminRole = Role::create(['name' => 'Super Admin']);
        $managerRole = Role::create(['name' => 'Manager']); 
        $viewerRole = Role::create(['name' => 'Viewer']);

        $adminRole->givePermissionTo(Permission::all());
        $managerRole->givePermissionTo([
            'viewDashboardMenu',
            'viewUserMenu',
            'viewLogMenu',
            'viewUsers',
        ]);
        $viewerRole->givePermissionTo([
            'viewDashboardMenu',
            'viewLogMenu',
        ]);

        $user = User::where('email', 'admin@gmail.com')->first();
        if ($user) {
            $user->assignRole($adminRole);
        }

    }
}

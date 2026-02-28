<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
            ['name' => 'viewSettingMenu', 'guard_name' => 'sanctum'],
            ['name' => 'OutgoingVehicleMenu', 'guard_name' => 'sanctum'],
            ['name' => 'viewRaporMenu', 'guard_name' => 'sanctum'],
            ['name' => 'viewUserMenu', 'guard_name' => 'sanctum'],
            ['name' => 'viewLogMenu', 'guard_name' => 'sanctum'],
            ['name' => 'viewQueueMenu', 'guard_name' => 'sanctum'],
                ['name' => 'viewLoadesMenu', 'guard_name' => 'sanctum'],




            // ROLES PERMISSIONS
            ['name' => 'manageUsers', 'guard_name' => 'sanctum'],
            ['name' => 'viewUsers', 'guard_name' => 'sanctum'],

            // VEHICLES PERMISSIONS
            ['name' => 'manageVehiclesType', 'guard_name' => 'sanctum'],
            ['name' => 'viewVehiclesType', 'guard_name' => 'sanctum'],

            // VEHICLE OWNER PERMISSIONS
            ['name' => 'viewVehicleOwners', 'guard_name' => 'sanctum'],
            ['name' => 'manageVehicleOwners', 'guard_name' => 'sanctum'],

            // VEHICLE DRIVERS PERMISSIONS
            ['name' => 'viewVehicleDrivers', 'guard_name' => 'sanctum'],
            ['name' => 'manageVehicleDrivers', 'guard_name' => 'sanctum'],

            // COMPANY PERMISSIONS
            ['name' => 'viewCompany', 'guard_name' => 'sanctum'],
            ['name' => 'manageCompany', 'guard_name' => 'sanctum'],

            // COMPANY BRANCHES
            ['name' => 'viewCompanyBranches', 'guard_name' => 'sanctum'],
            ['name' => 'manageCompanyBranches', 'guard_name' => 'sanctum'],

            // COMPANY VEHICLES
            ['name' => 'viewCompanyVehicles', 'guard_name' => 'sanctum'],
            ['name' => 'manageCompanyVehicles', 'guard_name' => 'sanctum'],

            // TERMINAL PERMISSIONS
            ['name' => 'viewTerminals', 'guard_name' => 'sanctum'],
            ['name' => 'manageTerminals', 'guard_name' => 'sanctum'],

            // SMALL CARS
            ['name' => 'viewSmallCars', 'guard_name' => 'sanctum'],
            ['name' => 'manageSmallCars', 'guard_name' => 'sanctum'],

            // FARE PERMISSIONS
            ['name' => 'viewFare', 'guard_name' => 'sanctum'],
            ['name' => 'manageFare', 'guard_name' => 'sanctum'],

            // ROUTES PERMISSIONS
            ['name' => 'viewRoutes', 'guard_name' => 'sanctum'],
            ['name' => 'manageRoutes', 'guard_name' => 'sanctum'],

            // BANDAR PERMISSIONS
            ['name' => 'viewBandars', 'guard_name' => 'sanctum'],
            ['name' => 'manageBandars', 'guard_name' => 'sanctum'],

            // OUTGOING VEHICLES Bus PERMISSIONS
            ['name' => 'viewOutgoingVehiclesBus', 'guard_name' => 'sanctum'],
            ['name' => 'manageOutgoingVehiclesBus', 'guard_name' => 'sanctum'],


             // OUTGOING VEHICLES Bus PERMISSIONS
             ['name' => 'viewOutgoingVehiclesCar', 'guard_name' => 'sanctum'],
             ['name' => 'manageOutgoingVehiclesCar', 'guard_name' => 'sanctum'],


            // OUTED GOUING VEHICLES PERMISSIONS

            // REPORTS PERMISSIONS For Bus
            ['name' => 'generateReportBus', 'guard_name' => 'sanctum'],

            // REPORTS PERMISSIONS For Car
            ['name' => 'generateReportCar', 'guard_name' => 'sanctum'],


            // REPORTS PERMISSIONS For Car
            ['name' => 'generateReportOutedGoingVehicle', 'guard_name' => 'sanctum'],


            // END SMALL VEHICLES
            ['name' => 'manageActivityLog', 'guard_name' => 'sanctum'],



            // for payment
            ['name' => 'canPayment', 'guard_name' => 'sanctum'],

            // VIOLATIONS PERMISSIONS
            ['name' => 'viewViolations', 'guard_name' => 'sanctum'],
            ['name' => 'manageViolations', 'guard_name' => 'sanctum'],


              // TARRIF PERMISSIONS
            ['name' => 'viewTarrifs', 'guard_name' => 'sanctum'],
            ['name' => 'manageTarrifs', 'guard_name' => 'sanctum'],

              // TARRIF PERMISSIONS
            ['name' => 'viewTransportationFee', 'guard_name' => 'sanctum'],
            ['name' => 'ManageTransportationFee', 'guard_name' => 'sanctum'],


            // QUEUE PERMISSIONS
            ['name' => 'viewQueues', 'guard_name' => 'sanctum'],
            ['name' => 'manageQueues', 'guard_name' => 'sanctum'],

             // QUEUEDash PERMISSIONS
            ['name' => 'viewQueueDashboard', 'guard_name' => 'sanctum'],
            ['name' => 'manageQueueDashboard', 'guard_name' => 'sanctum'],

             // LOAD PERMISSIONS
             ['name' => 'viewLoads', 'guard_name' => 'sanctum'],
             ['name' => 'manageLoads', 'guard_name' => 'sanctum'],

        ];

        // Create permissions in the database
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission['name'], 'guard_name' => 'web']);

        }

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());
        $user = User::where('email', 'admin@gmail.com')->first();
        if ($user) {
            $user->assignRole( $adminRole);
        }



    }
}

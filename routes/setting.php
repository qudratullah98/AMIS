<?php

use App\Http\Controllers\BanderController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyVehicleController;
use App\Http\Controllers\FareController;
use App\Http\Controllers\OwnerController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TerminalController;
use App\Http\Controllers\VehicleTypeController;


use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('setting')->group(function () {

    Route::get('/', [SettingController::class, 'index'])
        ->name('setting')
        ->middleware('can:viewSettingMenu');

    // Vehicle Types
    Route::get('/vehicle_type', [VehicleTypeController::class, 'Index'])
        ->name('setting.vehicle_type.index')
        ->middleware('can:viewVehiclesType');

    Route::get('/all_vehile_types', [VehicleTypeController::class, 'allTypes'])
        ->name('setting.vehicle_type.allTypes')
        ->middleware('can:viewVehiclesType');

    Route::get('/DataForCreatecreate', [VehicleTypeController::class, 'DataForCreatecreate'])
        ->name('setting.vehicle_type.DataForCreatecreate')
        ->middleware('can:manageVehiclesType');

    Route::post('/vehicle_type/store', [VehicleTypeController::class, 'store'])
        ->name('setting.vehicle_type.store')
        ->middleware('can:manageVehiclesType');

    Route::post('/vehicle_type/update', [VehicleTypeController::class, 'update'])
        ->name('setting.vehicle_type.update')
        ->middleware('can:manageVehiclesType');

    // Owners
    Route::get('/owner', [OwnerController::class, 'Index'])
        ->name('setting.owner.index')
        ->middleware('can:viewVehicleOwners');

    Route::get('/allOwners', [OwnerController::class, 'allOwners'])
        ->name('setting.owner.allOwners')
        ->middleware('can:viewVehicleOwners');

    Route::get('/owner/create', [OwnerController::class, 'create'])
        ->name('setting.owner.create')
        ->middleware('can:manageVehicleOwners');

    Route::post('/owner/store', [OwnerController::class, 'store'])
        ->name('setting.owner.store')
        ->middleware('can:manageVehicleOwners');

    Route::post('/owner/update', [OwnerController::class, 'update'])
        ->name('setting.owner.update')
        ->middleware('can:manageVehicleOwners');


    // Companies
    Route::get('/company', [CompanyController::class, 'Index'])
        ->name('setting.company.index')
        ->middleware('can:viewCompany');
    Route::get('/company/create', [CompanyController::class, 'create'])
        ->name('setting.company.create')
        ->middleware('can:manageCompany');

    Route::get('/getAllTransportCompanies', [CompanyController::class, 'getAllTransportCompanies'])
        ->name('setting.getAllTransportCompanies')
        ->middleware('can:manageCompany');

    Route::post('/company/store', [CompanyController::class, 'store'])
        ->name('setting.company.store')
        ->middleware('can:manageCompany');

    Route::post('/company/update', [CompanyController::class, 'update'])
        ->name('setting.company.update')
        ->middleware('can:manageCompany');

    // Branches
    Route::get('/company/{company_id}/branches', [BranchController::class, 'Index'])
        ->name('setting.company.branch.index')
        ->middleware('can:viewCompanyBranches');

    Route::get('/company/{company_id}/branch/create', [BranchController::class, 'create'])
        ->name('setting.company.branch.create')
        ->middleware('can:manageCompanyBranches');



    Route::post('/company/{company_id}/branch/store', [BranchController::class, 'store'])
        ->name('setting.company.branch.store')
        ->middleware('can:manageCompanyBranches');

    // Vehicles
    Route::get('/company/{company_id}/vehicles', [CompanyVehicleController::class, 'Index'])
        ->name('setting.company.vehicle.index')
        ->middleware('can:viewCompanyVehicles');

    Route::get('/viewAllCompanyVehicles', [CompanyVehicleController::class, 'viewAllCompanyVehicles'])
        ->name('setting.company.allvehicle.index')
        ->middleware('can:viewCompanyVehicles');


    Route::get('/vehicles/{vehicle}/history', [CompanyVehicleController::class, 'history'])
        ->name('vehicles.history')
        ->middleware('can:viewCompanyVehicles');


    Route::get('/company/{company_id}/vehicle/create', [CompanyVehicleController::class, 'create'])
        ->name('setting.company.vehicle.create')
        ->middleware('can:manageCompanyVehicles');

    Route::get('/company/createVehicle', [CompanyVehicleController::class, 'createVehicle'])
        ->name('setting.company.vehicle.createVehicle')
        ->middleware('can:manageCompanyVehicles');

    // without company
    Route::post('/company/vehicle/store', [CompanyVehicleController::class, 'store'])
        ->name('setting.company.vehicle.store')
        ->middleware('can:manageCompanyVehicles');

    // with company
    Route::post('/company/{company_id?}/vehicle/store', [CompanyVehicleController::class, 'store'])
        ->name('setting.company.vehicle.store.withCompany')
        ->middleware('can:manageCompanyVehicles');
 


        
    Route::get('/company/{company_id}/vehicle/{vehicle_id}', [CompanyVehicleController::class, 'edit'])
        ->name('setting.company.vehicle.edit')
        ->middleware('can:manageCompanyVehicles');

    Route::post('/company/vehicle/update', [CompanyVehicleController::class, 'update'])
        ->name('setting.company.vehicle.update')
        ->middleware('can:manageCompanyVehicles');

    Route::post('/company/vehicle/updateCompany', [CompanyVehicleController::class, 'updateCompany'])
        ->name('setting.company.vehicle.updateCompany')
        ->middleware('can:manageCompanyVehicles');


    Route::get('/company/vehicle/{vehicle_id}/owners', [CompanyVehicleController::class, 'getVehicleOwners'])
        ->name('setting.company.vehicle.getVehicleOwners')
        ->middleware('can:viewCompanyVehicles');

    Route::post('/company/vehicle/owner', [CompanyVehicleController::class, 'storeVehicleOwners'])
        ->name('setting.company.vehicle.storeVehileOwner')
        ->middleware('can:manageCompanyVehicles');

    // Terminals
    Route::get('terminal', [TerminalController::class, 'index'])
        ->name('setting.terminals')
        ->middleware('can:viewTerminals');

    Route::get('/terminal/create', [TerminalController::class, 'create'])
        ->name('setting.terminal.create')
        ->middleware('can:manageTerminals');

    Route::post('/terminal/store', [TerminalController::class, 'store'])
        ->name('setting.terminal.store')
        ->middleware('can:manageTerminals');

    Route::get('/terminal/{id}', [TerminalController::class, 'edit'])
        ->name('setting.terminal.edit')
        ->middleware('can:manageTerminals');

    Route::post('/terminal/update', [TerminalController::class, 'update'])
        ->name('setting.terminal.update')
        ->middleware('can:manageTerminals');

    Route::get('/all_terminals', [TerminalController::class, 'all_terminals'])
        ->name('setting.all_terminals')
        ->middleware('can:viewTerminals');

    // Routes
    Route::get('route', [RouteController::class, 'index'])
        ->name('setting.routes')
        ->middleware('can:viewRoutes');

    Route::get('/route/create', [RouteController::class, 'create'])
        ->name('setting.route.create')
        ->middleware('can:manageRoutes');

    Route::post('/route/store', [RouteController::class, 'store'])
        ->name('setting.route.store')
        ->middleware('can:manageRoutes');

    Route::get('/route/{id}', [RouteController::class, 'edit'])
        ->name('setting.route.edit')
        ->middleware('can:manageRoutes');

    Route::get('/getroute/{terminalId}', [RouteController::class, 'getRoute'])
        ->name('setting.route.get')
        ->middleware('can:viewRoutes');

    Route::post('/route/update', [RouteController::class, 'update'])
        ->name('setting.route.update')
        ->middleware('can:manageRoutes');

    Route::get('/all_routes', [RouteController::class, 'all_routes'])
        ->name('setting.all_routes')
        ->middleware('can:viewRoutes');

    Route::get('/get_company_routes/{company}', function ($company) {
        // Check if user has at least one of the required permissions (OR condition)
        if (auth()->user()->can('manageOutgoingVehiclesBus') || auth()->user()->can('viewRoutes')) {
            return app(RouteController::class)->getCompanyRoutes($company);
        }
        abort(403, 'Unauthorized - You need either viewRoutes or manageOutgoingVehiclesBus permission.');
    })->name('getCompanyRoutes');






    // Fare
    Route::get('fare', [FareController::class, 'index'])
        ->name('setting.fares')
        ->middleware('can:viewFare');

    Route::get('/fare/create', [FareController::class, 'create'])
        ->name('setting.fare.create')
        ->middleware('can:manageFare');

    Route::post('/fare/store', [FareController::class, 'store'])
        ->name('setting.fare.store')
        ->middleware('can:manageFare');

    Route::get('/fare/{id}', [FareController::class, 'editFare'])
        ->name('setting.fare.edit')
        ->middleware('can:manageFare');

    Route::post('/fare/update', [FareController::class, 'updateFare'])
        ->name('setting.fare.update')
        ->middleware('can:manageFare');
    Route::post('/fare/renew', [FareController::class, 'renewFare'])
        ->name('setting.fare.renew')
        ->middleware('can:manageFare');

    // Bandars
    Route::get('bander', [BanderController::class, 'index'])
        ->name('setting.banders')
        ->middleware('can:viewBandars');

    Route::get('/bander/create', [BanderController::class, 'create'])
        ->name('setting.bander.create')
        ->middleware('can:manageBandars');

    Route::post('/bander/store', [BanderController::class, 'store'])
        ->name('setting.bander.store')
        ->middleware('can:manageBandars');

    Route::get('/bander/{id}', [BanderController::class, 'editbander'])
        ->name('setting.bander.edit')
        ->middleware('can:manageBandars');

    Route::post('/bander/update', [BanderController::class, 'update'])
        ->name('setting.bander.update')
        ->middleware('can:manageBandars');

    Route::get('/all_banders', [BanderController::class, 'allBanders'])
        ->name('setting.allbanders')
        ->middleware('can:viewBandars');




    Route::get('/dashboard-cards', [SettingController::class, 'getCardStats'])->name('getCardStats');
});

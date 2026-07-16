<?php

use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\TashkilController;
use App\Http\Controllers\PositionTypeController;
use App\Http\Controllers\DepartmentPositionController;
use App\Http\Controllers\EmployeeAssignmentController;
use App\Http\Controllers\TashkilatDashboardController;
use App\Http\Controllers\EmployeeController;

Route::prefix('organizations')
    ->name('organizations.')
    ->group(function () {
        Route::get('/', [OrganizationController::class, 'index'])->name('index');
        Route::post('/store', [OrganizationController::class, 'store'])->name('store');
    });


Route::prefix('tashkilat')
    ->name('tashkilat.')
    ->group(function () {
        Route::get('/', [TashkilController::class, 'index'])->name('index');
        Route::post('/store', [TashkilController::class, 'store'])->name('store');
 
    });


Route::prefix('departments')
    ->name('departments.')
    ->group(function () {
        Route::get('/', [DepartmentController::class, 'index'])->name('index');

        Route::post('/store', [DepartmentController::class, 'store'])->name('store');

        Route::put('/update/{department}', [DepartmentController::class, 'update'])->name('update');

        Route::delete('/delete/{department}', [DepartmentController::class, 'destroy'])->name('destroy');
    });




Route::prefix('position-types')
    ->name('position-types.')
    ->group(function () {

        Route::get('/', [PositionTypeController::class, 'index'])
            ->name('index');

        Route::post('/store', [PositionTypeController::class, 'store'])
            ->name('store');

        Route::put('/update/{positionType}', [PositionTypeController::class, 'update'])
            ->name('update');

        Route::delete('/delete/{positionType}', [PositionTypeController::class, 'destroy'])
            ->name('destroy');
    });





Route::prefix('department-positions')
    ->name('department-positions.')
    ->group(function () {

        Route::get('/', [
            DepartmentPositionController::class,
            'index'
        ])->name('index');

        Route::post('/store', [
            DepartmentPositionController::class,
            'store'
        ])->name('store');

        Route::put('/update/{departmentPosition}', [
            DepartmentPositionController::class,
            'update'
        ])->name('update');

        Route::delete('/delete/{departmentPosition}', [
            DepartmentPositionController::class,
            'destroy'
        ])->name('destroy');
    });




Route::prefix('employees')
    ->name('employees.')
    ->group(function () {


        Route::get('/',  [EmployeeController::class,    'index'])->name('index');


        Route::post('/store', [EmployeeController::class,    'store'])->name('store');


        Route::post('/update/{employee}', [EmployeeController::class,    'update'])->name('update');


        Route::delete('/delete/{employee}', [EmployeeController::class,    'destroy'])->name('destroy');
    });




Route::prefix('employee-assignments')
    ->name('employee-assignments.')
    ->group(function () {


        Route::get('/', [EmployeeAssignmentController::class,    'index'])->name('index');


        Route::post('/store', [EmployeeAssignmentController::class,    'store'])->name('store');


        Route::put('/update/{employeeAssignment}', [EmployeeAssignmentController::class,    'update'])->name('update');


        Route::delete('/delete/{employeeAssignment}', [EmployeeAssignmentController::class,    'destroy'])->name('destroy');
    });

Route::prefix('organizations')
    ->name('organizations.')
    ->group(function () {
        Route::get('/', [OrganizationController::class, 'index'])->name('index');
    });




Route::get( '/dashboard-tashkilat',[TashkilatDashboardController::class,'index']) ->name('Tashkilat.dashboard');


// json data  for useeffect
Route::get('/tashkils/json', [TashkilController::class, 'tashkils'])->name('tashkils.json');
Route::get('/departments/json', [DepartmentController::class, 'departments'])->name('departments.json');
Route::get('/organizations/json', [OrganizationController::class, 'organizations'])->name('organizations.json');
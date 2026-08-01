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
use App\Http\Controllers\PositionVacancyController;

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

        Route::post('/store', [DepartmentController::class, 'store'])->name('store');});

   







Route::prefix('position-types')
    ->name('position-types.')
    ->group(function () {

        Route::get('/', [PositionTypeController::class, 'index'])
            ->name('index');

        Route::post('/store', [PositionTypeController::class, 'store'])
            ->name('store');


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
        Route::get('/{employee}/educations', [EmployeeController::class, 'educations'])->name('educations');
        Route::get('/{employee}/employee-certificates/json',[EmployeeController::class,'certificatesJson'])->name('certificates.json');
        Route::get('/{employee}/employee-trainings/json',[EmployeeController::class,'trainingsJson'])->name('trainings.json');
        Route::get('/{employee}/employee-educations/json',[EmployeeController::class,'educationsJson'])->name('educations.json');
        Route::post('/{employee}/employee-educations/store',[EmployeeController::class,'storeEducation'])->name('educations.store');
        Route::get('/{employee}/employee-certificates/json',[EmployeeController::class,'certificatesJson'])->name('certificates.json');
        Route::post('/employees/{employee}/certificates', [EmployeeController::class, 'storeCertificate'])->name('certificates.store');
 
    });




Route::prefix('employee-assignments')
    ->name('employee-assignments.')
    ->group(function () {


        Route::get('/', [EmployeeAssignmentController::class,    'index'])->name('index');


        Route::post('/store', [EmployeeAssignmentController::class,    'store'])->name('store');
 
    });

Route::prefix('organizations')
    ->name('organizations.')
    ->group(function () {
        Route::get('/', [OrganizationController::class, 'index'])->name('index');
    });




Route::get( '/dashboard-tashkilat',[TashkilatDashboardController::class,'index']) ->name('Tashkilat.dashboard');


// json data  for useeffect
Route::get('/employee/json', [EmployeeController::class, 'employees'])->name('employee.json');
Route::get('/position-vacancies/json', [PositionVacancyController::class, 'vacancy'])->name('position-vacancies.json');
Route::get('/tashkils/json', [TashkilController::class, 'tashkils'])->name('tashkils.json');
Route::get('/departments/json', [DepartmentController::class, 'departments'])->name('departments.json');
Route::get('/organizations/json', [OrganizationController::class, 'organizations'])->name('organizations.json');
Route::get('/position-types/json',[PositionTypeController::class,'positionTypes'])->name('position-types.json');

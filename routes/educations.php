<?php

use App\Http\Controllers\EducationLevelController;
use App\Http\Controllers\EmployeeEducationController;
use App\Http\Controllers\PositionRequiredEducationController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CourseTypeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EducationDashboardController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\TrainingPlanController;
use App\Http\Controllers\TrainingController;
use Illuminate\Support\Facades\Route;

Route::prefix('education')->name('education.')->group(function () {


    Route::get('/', [EducationDashboardController::class, 'index'])
        ->name('dashboard');

    // Education Levels
    Route::resource('levels', EducationLevelController::class)
        ->names([
            'index' => 'levels.index',
            'create' => 'levels.create',
            'store' => 'levels.store',
            'show' => 'levels.show',
            'edit' => 'levels.edit',
            'update' => 'levels.update',
            'destroy' => 'levels.destroy',
        ]);


    // Employee Education
    Route::resource('employee', EmployeeEducationController::class)
        ->names([
            'index' => 'employee.index',
            'create' => 'employee.create',
            'store' => 'employee.store',
            'show' => 'employee.show',
            'edit' => 'employee.edit',
            'update' => 'employee.update',
            'destroy' => 'employee.destroy',
        ]);


    // Position Required Education
    Route::resource('position-required', PositionRequiredEducationController::class)
        ->names([
            'index' => 'position.required.index',
            'create' => 'position.required.create',
            'store' => 'position.required.store',
            'show' => 'position.required.show',
            'edit' => 'position.required.edit',
            'update' => 'position.required.update',
            'destroy' => 'position.required.destroy',
        ]);



    Route::get('/education-levels/json', [EducationLevelController::class, 'json'])
        ->name('education.levels.json');
    Route::get('/education-levels/json', [EducationLevelController::class, 'json'])
        ->name('levels.json');
    Route::get('/certificates/json', [CertificateController::class, 'json'])
        ->name('certificates.json');
    Route::get('/certificates/json', [CertificateController::class, 'json'])
        ->name('certificates.json');


    // Certificates
    Route::get('/certificates', [CertificateController::class, 'index'])
        ->name('certificates.index');
    Route::post('/certificates', [CertificateController::class, 'store'])->name('certificates.store');



    Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');


    Route::get('/trainers', [TrainerController::class, 'index'])->name('trainers.index');
    Route::post('/trainers', [TrainerController::class, 'store'])->name('trainers.store');


    // json
    Route::get('course-types/list', [CourseTypeController::class, 'jsonList'])->name('course-types.list');
    Route::get('training-plans.courses', [CourseController::class, 'jsonList'])->name('training-plans.courses');
    Route::get('training-plans.trainers', [TrainerController::class, 'jsonList'])->name('training-plans.trainers');
});



// Course Types






// Trainers
Route::resource('trainers', TrainerController::class);


// Training Plans
Route::resource('training-plans', TrainingPlanController::class);


// Trainings
Route::resource('trainings', TrainingController::class);

<?php
use App\Http\Controllers\EducationLevelController;
use App\Http\Controllers\EmployeeEducationController;
use App\Http\Controllers\PositionRequiredEducationController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CourseTypeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\TrainingPlanController;
use App\Http\Controllers\TrainingController;
use Illuminate\Support\Facades\Route;

Route::prefix('education')->name('education.')->group(function () {

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

});


// Certificates
Route::resource('certificates', CertificateController::class);


// Course Types
Route::resource('course-types', CourseTypeController::class);


// Courses
Route::resource('courses', CourseController::class);


// Trainers
Route::resource('trainers', TrainerController::class);


// Training Plans
Route::resource('training-plans', TrainingPlanController::class);


// Trainings
Route::resource('trainings', TrainingController::class);
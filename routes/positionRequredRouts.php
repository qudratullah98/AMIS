<?php

use App\Http\Controllers\PositionRequirementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    // Position Requirements Management
    Route::get('positions/{position}/requirements', [PositionRequirementController::class, 'index'])
        ->name('positions.requirements.index');
    
    // Add requirements
    Route::post('positions/{position}/requirements/certificate', [PositionRequirementController::class, 'addCertificate'])
        ->name('positions.requirements.add-certificate');
    
    Route::post('positions/{position}/requirements/course', [PositionRequirementController::class, 'addCourse'])
        ->name('positions.requirements.add-course');
    
    Route::post('positions/{position}/requirements/education', [PositionRequirementController::class, 'addEducation'])
        ->name('positions.requirements.add-education');
    
    Route::post('positions/{position}/requirements/bulk', [PositionRequirementController::class, 'bulkAdd'])
        ->name('positions.requirements.bulk-add');
    
    // Remove requirements
    Route::delete('requirements/certificates/{requirement}', [PositionRequirementController::class, 'removeCertificate'])
        ->name('positions.requirements.remove-certificate');
    
    Route::delete('requirements/courses/{requirement}', [PositionRequirementController::class, 'removeCourse'])
        ->name('positions.requirements.remove-course');
    
    Route::delete('requirements/educations/{requirement}', [PositionRequirementController::class, 'removeEducation'])
        ->name('positions.requirements.remove-education');
    
    // Update course requirement
    Route::put('requirements/courses/{requirement}', [PositionRequirementController::class, 'updateCourse'])
        ->name('positions.requirements.update-course');
});
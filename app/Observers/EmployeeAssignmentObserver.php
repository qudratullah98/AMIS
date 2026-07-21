<?php

namespace App\Observers;

use App\Models\EmployeeAssignment;
use App\Services\VacancyService;

class EmployeeAssignmentObserver
{
    /**
     * Handle the EmployeeAssignment "created" event.
     */
    public function created(EmployeeAssignment $assignment): void
    {
        // app(VacancyService::class)
        //     ->update($assignment->departmentPosition);
    }

    /**
     * Handle the EmployeeAssignment "updated" event.
     */
    public function updated(EmployeeAssignment $assignment): void
    {
        app(VacancyService::class)
            ->update(
                $assignment->departmentPosition
            );
    }

    /**
     * Handle the EmployeeAssignment "deleted" event.
     */
    public function deleted(EmployeeAssignment $assignment): void
    {
        app(VacancyService::class)
            ->update(
                $assignment->departmentPosition
            );
    }

    /**
     * Handle the EmployeeAssignment "restored" event.
     */
    public function restored(EmployeeAssignment $assignment): void
    {
        //
    }

    /**
     * Handle the EmployeeAssignment "force deleted" event.
     */
    public function forceDeleted(EmployeeAssignment $assignment): void
    {
        //
    }
}

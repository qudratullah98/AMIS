<?php

namespace App\Services;


use App\Models\DepartmentPosition;


class VacancyService
{


    public function update(
        DepartmentPosition $position
    )
    {


        $filled = $position
            ->assignments()
            ->where(
                'approval_status_id',
                '1'
            )
            ->count();

    }



}
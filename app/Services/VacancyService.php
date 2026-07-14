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
                'status',
                'active'
            )
            ->count();



        $position->vacancy()
            ->updateOrCreate(

            [

                'department_position_id'
                =>
                $position->id

            ],


            [

                'total_positions'
                =>
                $position->quantity,


                'filled_positions'
                =>
                $filled,


                'vacant_positions'
                =>
                $position->quantity-$filled

            ]);


    }



}
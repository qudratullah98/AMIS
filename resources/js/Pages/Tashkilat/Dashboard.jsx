import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EChart from "@/Components/EChart";

import {
    Building2,
    Briefcase,
    Users,
    UserCheck,
} from "lucide-react";


export default function Dashboard({
    stats,
    employeesByDepartment,
    recentEmployees
}) {


    const cards = [
        {
            title: "Departments",
            value: stats.departments,
            icon: Building2,
        },
        {
            title: "Positions",
            value: stats.positions,
            icon: Briefcase,
        },
        {
            title: "Filled Positions",
            value: stats.filled,
            icon: UserCheck,
        },
        {
            title: "Vacancies",
            value: stats.vacancies,
            icon: Users,
        },
    ];


    const departmentChart = {

        tooltip: {
            trigger: "axis"
        },

        xAxis: {
            type: "category",
            data: employeesByDepartment.map(
                item => item.name
            )
        },

        yAxis: {
            type: "value"
        },


        series: [
            {
                name: "Positions",
                type: "bar",

                data:
                    employeesByDepartment.map(
                        item =>
                            item.department_positions_count
                    ),

                barWidth: "40%"
            }
        ]
    };



    const positionStatusChart = {

        tooltip:{
            trigger:"item"
        },


        series:[
            {
                type:"pie",
                radius:"60%",

                data:[
                    {
                        value:stats.filled,
                        name:"Filled"
                    },

                    {
                        value:stats.vacancies,
                        name:"Vacant"
                    }
                ]
            }
        ]
    };



    return (

        <AuthenticatedLayout>

            <div className="p-6 space-y-6">


                {/* Cards */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                    {
                        cards.map((card,index)=>{

                            const Icon = card.icon;

                            return (

                                <div
                                    key={index}
                                    className="
                                    bg-white
                                    rounded-xl
                                    shadow
                                    p-5
                                    flex
                                    items-center
                                    gap-4
                                    "
                                >

                                    <div className="
                                        p-3
                                        bg-blue-100
                                        rounded-full
                                    ">
                                        <Icon
                                            className="text-blue-600"
                                            size={28}
                                        />
                                    </div>


                                    <div>

                                        <p className="text-gray-500">
                                            {card.title}
                                        </p>

                                        <h2 className="
                                            text-3xl
                                            font-bold
                                        ">
                                            {card.value}
                                        </h2>

                                    </div>


                                </div>

                            )

                        })
                    }


                </div>



                {/* Charts */}

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-6
                ">


                    <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-5
                    ">

                        <h3 className="
                            font-semibold
                            mb-4
                        ">
                            Positions By Department
                        </h3>


                        <EChart
                            option={departmentChart}
                        />

                    </div>



                    <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-5
                    ">


                        <h3 className="
                            font-semibold
                            mb-4
                        ">
                            Employee Distribution
                        </h3>


                        <EChart
                            option={positionStatusChart}
                        />

                    </div>


                </div>



                {/* Recent Employees */}

                <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-5
                ">


                    <h3 className="
                        font-semibold
                        mb-4
                    ">
                        Recent Employees
                    </h3>



                    <div className="overflow-x-auto">

                        <table className="
                            w-full
                            text-sm
                        ">

                            <thead>

                                <tr className="
                                    border-b
                                    text-left
                                ">

                                    <th className="p-3">
                                        Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Created
                                    </th>

                                </tr>

                            </thead>


                            <tbody>


                            {
                                recentEmployees.map(employee=>(

                                    <tr
                                        key={employee.id}
                                        className="
                                        border-b
                                        "
                                    >

                                        <td className="p-3">
                                            {employee.name}
                                        </td>


                                        <td>
                                            {employee.email}
                                        </td>


                                        <td>
                                            {
                                                new Date(
                                                    employee.created_at
                                                )
                                                .toLocaleDateString()
                                            }
                                        </td>


                                    </tr>

                                ))
                            }


                            </tbody>


                        </table>


                    </div>


                </div>



            </div>


        </AuthenticatedLayout>

    );
}
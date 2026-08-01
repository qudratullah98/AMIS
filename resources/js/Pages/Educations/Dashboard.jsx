import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    GraduationCap,
    Award,
    BookOpen,
    Users,
    ClipboardList,
    UserCheck,
} from "lucide-react";


export default function Dashboard({
    stats,
    employeesByEducation, 
    recentEmployees
}) {


    const cards = [

        {
            title: "Education Levels",
            value: stats.educationLevels,
            icon: GraduationCap,
        },

        {
            title: "Certificates",
            value: stats.certificates,
            icon: Award,
        },

        {
            title: "Courses",
            value: stats.courses,
            icon: BookOpen,
        },

        {
            title: "Trainers",
            value: stats.trainers,
            icon: Users,
        },

       

        {
            title: "Employee Educations",
            value: stats.employeeEducations,
            icon: UserCheck,
        },

    ];



    return (

        <AuthenticatedLayout>

            <Head title="Education Dashboard" />


            <div className="p-6 space-y-6">


                {/* Statistics Cards */}

                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5">


                    {
                        cards.map((card, index) => {

                            const Icon = card.icon;

                            return (

                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow p-5"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm text-gray-500">
                                                {card.title}
                                            </p>

                                            <h2 className="text-2xl font-bold mt-2">
                                                {card.value}
                                            </h2>

                                        </div>


                                        <Icon className="w-8 h-8 text-gray-600" />

                                    </div>

                                </div>

                            );

                        })
                    }


                </div>





                {/* Employees By Education */}

                <div className="bg-white rounded-lg shadow p-5">


                    <h2 className="text-lg font-semibold mb-4">
                        Employees By Education Level
                    </h2>


                    <div className="space-y-3">

                        {
                            employeesByEducation.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex justify-between border-b pb-2"
                                >

                                    <span>
                                        {item.name}
                                    </span>


                                    <span className="font-semibold">
                                        {item.employee_educations_count}
                                    </span>

                                </div>

                            ))
                        }

                    </div>


                </div>




 




                {/* Recent Employees */}

                <div className="bg-white rounded-lg shadow p-5">


                    <h2 className="text-lg font-semibold mb-4">
                        Recent Employees
                    </h2>


                    <div className="space-y-3">


                        {
                            recentEmployees.map((employee) => (

                                <div
                                    key={employee.id}
                                    className="flex justify-between border-b pb-2"
                                >

                                    <span>
                                        {employee.name}
                                    </span>


                                    <span>
                                        {employee.email}
                                    </span>

                                </div>

                            ))
                        }


                    </div>


                </div>



            </div>


        </AuthenticatedLayout>

    );

}
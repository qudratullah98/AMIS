import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";



export default function EducationTab({ employee, onOpenEducationModel }) {


    const [educations, setEducations] = useState([]);




    useEffect(() => {

        axios
            .get(route("employees.educations.json", { employee: employee.id }))
            .then(res => {

                setEducations(res.data);

            });


    }, []);




    return (

        <div className="bg-white rounded-xl shadow border">


            <div className="flex justify-between items-center p-5 border-b">





                <PrimaryButton onClick={onOpenEducationModel}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                </PrimaryButton>
                <h2 className="font-semibold text-lg">
                    Employee Education
                </h2>


            </div>




            <div className="p-5">


                <table className="w-full">


                    <thead>

                        <tr className="border-b text-left">

                            <th className="p-3">
                                Level
                            </th>


                            <th className="p-3">
                                Institution
                            </th>


                            <th className="p-3">
                                Year
                            </th>

                        </tr>

                    </thead>



                    <tbody>


                        {
                            educations.map(item => (

                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {item.level?.name}
                                    </td>


                                    <td className="p-3">
                                        {item.institution}
                                    </td>


                                    <td className="p-3">
                                        {item.graduation_year}
                                    </td>


                                </tr>

                            ))
                        }


                    </tbody>



                </table>


            </div>



        </div>

    )

}
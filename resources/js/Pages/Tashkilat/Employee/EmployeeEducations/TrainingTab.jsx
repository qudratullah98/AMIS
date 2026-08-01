import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

import PrimaryButton from "@/Components/PrimaryButton";


export default function TrainingTab({ employee }) {


    const [trainings, setTrainings] = useState([]);




    useEffect(() => {


        axios
            .get(route("employees.trainings.json", { employee: employee.id }))
            .then((res) => {

                setTrainings(res.data);

            })
            .catch(console.error);



    }, []);





    return (


        <div className="bg-white rounded-xl shadow border">


            {/* Header */}

            <div className="flex justify-between items-center p-5 border-b">






                <PrimaryButton>

                    <Plus className="w-4 h-4 mr-2" />

                    Create

                </PrimaryButton>
                <h2 className="text-lg font-semibold">

                    Employee Trainings

                </h2>

            </div>





            {/* Table */}

            <div className="p-5 overflow-x-auto">


                <table className="w-full">


                    <thead>


                        <tr className="border-b text-left">


                            <th className="p-3">
                                Training
                            </th>


                            <th className="p-3">
                                Trainer
                            </th>


                            <th className="p-3">
                                Start Date
                            </th>


                            <th className="p-3">
                                End Date
                            </th>


                            <th className="p-3">
                                Status
                            </th>


                            <th className="p-3">
                                Actions
                            </th>


                        </tr>


                    </thead>



                    <tbody>


                        {
                            trainings.length > 0 ?

                                trainings.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50"
                                    >


                                        <td className="p-3">
                                            {item.training?.name}
                                        </td>


                                        <td className="p-3">
                                            {item.trainer?.name ?? "-"}
                                        </td>


                                        <td className="p-3">
                                            {item.start_date}
                                        </td>


                                        <td className="p-3">
                                            {item.end_date}
                                        </td>


                                        <td className="p-3">
                                            {item.status}
                                        </td>


                                        <td className="p-3">
                                            -
                                        </td>


                                    </tr>


                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="p-5 text-center text-gray-500"
                                    >

                                        No trainings found

                                    </td>

                                </tr>

                        }


                    </tbody>


                </table>


            </div>


        </div>


    );


}
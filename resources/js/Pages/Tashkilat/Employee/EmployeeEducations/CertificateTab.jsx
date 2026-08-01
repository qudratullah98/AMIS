import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

import PrimaryButton from "@/Components/PrimaryButton";


export default function CertificateTab({ employee, onOpenCertificateModel }) {


    const [certificates, setCertificates] = useState([]);



    useEffect(() => {

        axios
            .get(route("employees.certificates.json", { employee: employee.id }))
            .then((res) => {

                setCertificates(res.data);

            })
            .catch(console.error);


    }, []);




    return (

        <div className="bg-white rounded-xl shadow border">


            {/* Header */}

            <div className="flex justify-between items-center p-5 border-b">

                <PrimaryButton onClick={() => { onOpenCertificateModel();}}>

                    <Plus className="w-4 h-4 mr-2" />

                    Create Certificate

                </PrimaryButton>
                <h2 className="text-lg font-semibold">

                    Employee Certificates

                </h2>

            </div>




            {/* Table */}

            <div className="p-5 overflow-x-auto">


                <table className="w-full">


                    <thead>

                        <tr className="border-b text-left">


                            <th className="p-3">
                                Certificate
                            </th>


                            <th className="p-3">
                                Level
                            </th>


                            <th className="p-3">
                                Issue Date
                            </th>


                            <th className="p-3">
                                Expiry Date
                            </th>


                            <th className="p-3">
                                Actions
                            </th>


                        </tr>


                    </thead>



                    <tbody>


                        {
                            certificates.length > 0 ?

                                certificates.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50"
                                    >


                                        <td className="p-3">
                                            {item.certificate?.name}
                                        </td>


                                        <td className="p-3">
                                            {item.certificate?.level}
                                        </td>


                                        <td className="p-3">
                                            {item.obtained_date}
                                        </td>


                                        <td className="p-3">
                                            {item.expiry_date ?? "-"}
                                        </td>


                                        <td className="p-3">
                                            -
                                        </td>


                                    </tr>


                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="p-5 text-center text-gray-500"
                                    >

                                        No certificates found

                                    </td>

                                </tr>

                        }


                    </tbody>



                </table>


            </div>



        </div>

    );


}
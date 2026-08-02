import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2 } from "lucide-react";

import PrimaryButton from "@/Components/PrimaryButton";
import DataTable from "@/Components/Datatable";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import DocumentPreviewCard from "@/Components/DocumentPreviewCard";

export default function EducationTab({ employee, onOpenEducationModel }) {

    const [educations, setEducations] = useState([]);
    const [paginationLinks, setPaginationLinks] = useState([]);


    useEffect(() => {

        axios
            .get(route("employees.educations.json", { employee: employee.id }))
            .then(res => {

                setEducations(res.data.data ?? res.data);
                setPaginationLinks(res.data.links ?? []);
                conole.log("Employee Educations:", res.data);

            });

    }, []);



    const columns = [
        { label: "No" },
        { label: "Level" },
        { label: "Field Of Study" },
        { label: "Institution" },
        { label: "Year" },
        { label: "GPA" },
        { label: "Document" },
        { label: "Actions" },
    ];



    return (

        <div className="px-4 py-2">

            <DataTable

                columns={columns}

                links={paginationLinks}

                header="Employee Education"

                enableButton={true}

                buttonLabel="Create"

                onButtonClick={onOpenEducationModel}

            >


                {educations.map((education,index)=>(


                    <tr
                        key={education.id}
                        className="hover:bg-slate-100"
                    >


                        {/* No */}
                        <td className="p-2 text-center">
                            {index + 1}
                        </td>


                        {/* Level */}
                        <td className="p-2 text-center">
                            {education.level?.name}
                        </td>



                        {/* Field */}
                        <td className="p-2 text-center">
                            {education.field_of_study}
                        </td>



                        {/* Institution */}
                        <td className="p-2 text-center">
                            {education.institution_name}
                        </td>



                        {/* Year */}
                        <td className="p-2 text-center">
                            {education.graduation_year}
                        </td>



                        {/* GPA */}
                        <td className="p-2 text-center">
                            {education.gpa}
                        </td>



                        {/* Document */}
                        <td className="
                            p-2
                            text-center
                            w-40
                            max-w-40
                            overflow-hidden
                        ">

                            <div className="
                                flex
                                justify-center
                                max-w-40
                                overflow-hidden
                            ">

                                <DocumentPreviewCard
                                    fileUrl={education.document_file}
                                />

                            </div>

                        </td>



                        {/* Actions */}
                        <td className="text-center">


                            <ThreeDotMenu>

                                <div className="py-0">


                                    <button
                                        className="
                                        flex
                                        items-center
                                        w-full
                                        text-left
                                        px-4
                                        py-2
                                        text-sm
                                        text-gray-700
                                        hover:bg-gray-100
                                        "
                                    >

                                        <Edit2 className="ml-2 text-xl"/>

                                        Edit

                                    </button>



                                    <button
                                        className="
                                        flex
                                        items-center
                                        w-full
                                        text-left
                                        px-4
                                        py-2
                                        text-sm
                                        text-red-600
                                        hover:bg-gray-100
                                        "
                                    >

                                        <Trash2 className="ml-2 text-xl"/>

                                        Delete

                                    </button>


                                </div>


                            </ThreeDotMenu>


                        </td>


                    </tr>


                ))}


            </DataTable>


        </div>

    );
}
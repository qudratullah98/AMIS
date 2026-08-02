import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit2, Plus } from "lucide-react";

import PrimaryButton from "@/Components/PrimaryButton";
import { useTranslation } from "react-i18next";
import DataTable from "@/Components/DataTable";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import DocumentPreviewCard from "@/Components/DocumentPreviewCard";

export default function CertificateTab({ employee, onOpenCertificateModel }) {


    const [employeeCertificates, setEmployeeCertificates] = useState([]);

    const { t } = useTranslation();


    useEffect(() => {

        axios
            .get(route("employees.certificates.json", { employee: employee.id }))
            .then((res) => {


                setEmployeeCertificates(res.data);
                console.log("Employee Certificates:", res.data);

            })
            .catch(console.error);


    }, []);
    const columns = [
        { label: t("common.no") },
        { label: t("education.certificate") },
        { label: t("education.obtainedDate") },
        { label: t("education.expiryDate") },
        { label: t("common.documents") },
        { label: t("common.actions") },
    ];




    return (

        <div className="bg-white rounded-xl shadow border">







            {/* Table */}

            <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                <DataTable
                    columns={columns}
                    header={t("education.certificates")}
                    buttonLabel={t("education.addCertificate")}
                    onButtonClick={onOpenCertificateModel}
                    enableSearch={false}
                    PerPage={false}
                    addButton={true}

  
 

                enableButton={true}
 
 

                >
                    {employeeCertificates?.map((certificate, index) => (
                        <tr
                            key={certificate.id}
                            className="hover:bg-slate-100"
                        >
                            {/* No */}
                            <td className="p-2 text-center">
                                {index + 1}
                            </td>

                            {/* Certificate */}
                            <td className="p-2 text-center">
                                {certificate.certificate?.name}
                            </td>

                            {/* Obtained Date */}
                            <td className="p-2 text-center">
                                {certificate.obtained_date}
                            </td>
                             {/* Obtained Date */}
                            <td className="p-2 text-center">
                                {certificate.expiry_date}
                            </td>

                            {/* Document */}
                            <td className="p-2 text-center w-40 max-w-40 overflow-hidden">
                                <div className="flex justify-center max-w-40 overflow-hidden">
                                    <DocumentPreviewCard fileUrl={certificate.document_file} title={certificate.document_file} />
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
                                            onClick={() => handleEdit(certificate)}
                                        >
                                            <Edit2 className="ml-2 text-xl" />
                                            {t("common.editInfo")}
                                        </button>


                                    </div>
                                </ThreeDotMenu>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>



        </div>

    );


}
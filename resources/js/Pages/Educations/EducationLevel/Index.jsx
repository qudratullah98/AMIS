import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Edit2, Eye } from "lucide-react";
import CreateEducationLevel from "./Create"; 

function Index({ educationLevels }) {
    const { t } = useTranslation();

    const [educationLevelsData, setEducationLevelsData] = useState(
        educationLevels || []
    );

    const [createModal, setCreateModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);

    const columns = [
        { label: t("common.NO") },
        { label: t("education.educationLevels") },
        { label: t("common.description") },
        { label: t("common.action") },
    ];


    return (
        <AuthenticatedLayout
            header={
                <SubHeader title={t("education.educationLevels")} />
            }
        >

            <SubHeader
                links={[
                    {
                        name: t("education.educationLevels"),
                    },
                ]}
            />


            {/* Create Modal */}
            {createModal && (
                <CustomModal
                    show={createModal}
                    handleClose={() => setCreateModal(false)}
                    title={t("education.educationLevels")}
                    size="large"
                    footer={false}
                >
                    <CreateEducationLevel
                        onSubmitSuccess={(educationLevel) => {
                            setEducationLevelsData((prev) => [
                                educationLevel,
                                ...prev,
                            ]);

                            setCreateModal(false);
                        }}
                    />
                </CustomModal>
            )}



            {/* View Modal */}
            {viewModal && (
                <CustomModal
                    show={viewModal}
                    handleClose={() => {
                        setViewModal(false);
                        setSelectedEducationLevel(null);
                    }}
                    title={t("common.details")}
                    size="large"
                    footer={false}
                >
                    
                </CustomModal>
            )}



            <div className="mx-auto">

                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">

                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">

                        <DataTable
                            columns={columns}
                            header={t("education.educationLevels")}
                            enableButton={true}
                            buttonLabel={t("education.addNewEducationLevel")}
                            onButtonClick={() => setCreateModal(true)}
                        >


                            {educationLevelsData.map((educationLevel, index) => (

                                <tr
                                    key={educationLevel.id}
                                    className="hover:bg-slate-100"
                                >

                                    <td className="p-2 text-center">
                                        {index + 1}
                                    </td>


                                    <td className="p-2 text-center">
                                        {educationLevel?.name ?? "-"}
                                    </td>


                                    <td className="p-2 text-center">
                                        {educationLevel?.description ?? "-"}
                                    </td>



                                    <td className="text-center">

                                        <ThreeDotMenu>

                                            <button
                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => {
                                                    // edit logic here
                                                }}
                                            >
                                                <Edit2 className="ml-2 text-xl" />

                                                {t("common.editInfo")}
                                            </button>



                                            <button
                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => {
                                                    setSelectedEducationLevel(
                                                        educationLevel
                                                    );

                                                    setViewModal(true);
                                                }}
                                            >

                                                <Eye className="ml-2 text-xl" />

                                                {t("common.viewInfo")}

                                            </button>


                                        </ThreeDotMenu>

                                    </td>


                                </tr>

                            ))}


                        </DataTable>


                    </div>

                </div>

            </div>


        </AuthenticatedLayout>
    );
}


export default Index;
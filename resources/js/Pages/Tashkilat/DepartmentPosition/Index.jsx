import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Edit2, Trash2 } from "lucide-react";
import CreateDepartmentPosition from "./Create";

function Index({ positions }) {
    const { t } = useTranslation();

    const [positionsData, setPositionsData] = useState(
        positions?.data || []
    );

    const [createModal, setCreateModal] = useState(false);

    const paginationLinks = positions?.links || [];


    const columns = [
        { label: t("common.NO") },
        { label: t("tashkilat.positionTitle") },
        { label: t("tashkilat.department") },
        { label: t("tashkilat.positionType") },
        { label: t("common.action") },
    ];


    return (
        <AuthenticatedLayout
            header={
                <SubHeader
                    title={t("tashkilat.departmentPositions")}
                />
            }
        >

            <SubHeader
                links={[
                    {
                        name:t("tashkilat.departmentPositions")
                    }
                ]}
            />


            {
                createModal && (

                    <CustomModal
                        show={createModal}
                        handleClose={() =>
                            setCreateModal(false)
                        }
                        title={
                            t("tashkilat.createDepartmentPosition")
                        }
                        size="large"
                        footer={false}
                        stopPropagation={false}
                    >

                        <CreateDepartmentPosition

                            onSubmitSuccess={(newPosition)=>{

                                setCreateModal(false);

                                setPositionsData((prev)=>[
                                    newPosition,
                                    ...prev
                                ]);

                            }}

                        />

                    </CustomModal>

                )
            }



            <div className="mx-auto">

                <div
                    className="
                    overflow-hidden
                    bg-white
                    border
                    border-gray-100
                    dark:bg-gray-800
                    "
                >

                    <div className="px-4 py-2">


                        <DataTable

                            columns={columns}

                            links={paginationLinks}

                            header={
                                t("tashkilat.departmentPositions")
                            }

                            enableButton={true}

                            buttonLabel={
                                t("tashkilat.createDepartmentPosition")
                            }

                            onButtonClick={()=>
                                setCreateModal(true)
                            }

                        >


                        {
                            positionsData.map(
                                (position,index)=>(

                                <tr
                                    key={position.id}
                                    className="hover:bg-slate-100"
                                >

                                    <td className="p-2 text-center">
                                        {index+1}
                                    </td>


                                    <td className="p-2 text-center">
                                        {position.title}
                                    </td>


                                    <td className="p-2 text-center">
                                        {
                                            position.department?.name
                                        }
                                    </td>


                                    <td className="p-2 text-center">
                                        {
                                            position.position_type?.title
                                        }
                                    </td>


                                    <td className="text-center">

                                        <ThreeDotMenu>

                                            <button
                                                className="
                                                flex
                                                w-full
                                                px-4
                                                py-2
                                                text-sm
                                                hover:bg-gray-100
                                                "
                                            >
                                                <Edit2 className="mr-2"/>
                                                {t("common.editInfo")}
                                            </button>


                                            <button
                                                className="
                                                flex
                                                w-full
                                                px-4
                                                py-2
                                                text-sm
                                                text-red-600
                                                hover:bg-gray-100
                                                "
                                            >
                                                <Trash2 className="mr-2"/>
                                                {t("common.delete")}
                                            </button>


                                        </ThreeDotMenu>

                                    </td>


                                </tr>

                            ))
                        }


                        </DataTable>


                    </div>

                </div>

            </div>


        </AuthenticatedLayout>
    );
}


export default Index;
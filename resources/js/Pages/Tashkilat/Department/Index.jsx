import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Edit2, Trash2 } from "lucide-react";
import CreateDepartment from "./Create";
// import EditDepartment from "./Edit";

function Index({ departments, tashkils, parentDepartments }) {
    const { t } = useTranslation();

    const [departmentsData, setDepartmentsData] = useState(
        departments?.data || [],
    );

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editableData, setEditableData] = useState(null);

    const paginationLinks = departments?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("tashkilat.departmentName") },
        { label: t("tashkilat.tashkil") },
        { label: t("tashkilat.parentDepartment") },
        { label: t("common.createdAt") },
        { label: t("common.actions") },
    ];


    const handleEdit = (department) => {
        setEditableData(department);
        setEditModal(true);
    };


    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("tashkilat.departmentsList")} />}
        >

            <SubHeader
                links={[
                    {
                        name: t("tashkilat.departmentsList"),
                    },
                ]}
            />


            {/* Create Modal */}
            {createModal && (
                <CustomModal
                    show={createModal}
                    handleClose={() => setCreateModal(false)}
                    title={t("tashkilat.addDepartment")}
                    size="large"
                    footer={false}
                >
                    <CreateDepartment
                        tashkils={tashkils}
                        parentDepartments={parentDepartments}
                        onSubmitSuccess={(newDepartment) => {
                            setDepartmentsData((prev) => [
                                newDepartment,
                                ...prev,
                            ]);

                            setCreateModal(false);
                        }}
                    />
                </CustomModal>
            )}



            {/* Edit Modal */}
            {editModal && (
                <CustomModal
                    show={editModal}
                    handleClose={() => setEditModal(false)}
                    title={t("tashkilat.editDepartment")}
                    size="large"
                    footer={false}
                >
                    {/* 
                    <EditDepartment
                        department={editableData}
                        tashkils={tashkils}
                        parentDepartments={parentDepartments}
                        onEditSuccess={(updatedDepartment)=>{

                            setDepartmentsData((prev)=>
                                prev.map((item)=>
                                    item.id === updatedDepartment.id
                                    ? updatedDepartment
                                    : item
                                )
                            );

                            setEditModal(false);
                        }}
                    />
                    */}
                </CustomModal>
            )}



            <div className="mx-auto">

                <div className="
                    overflow-hidden 
                    bg-white 
                    shadow-none 
                    sm:rounded-lg 
                    border 
                    border-gray-100 
                    dark:bg-gray-800
                ">

                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">


                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("tashkilat.departmentsList")}
                            enableButton={true}
                            buttonLabel={t("tashkilat.createDepartment")}
                            onButtonClick={() =>
                                setCreateModal(true)
                            }
                        >


                            {departmentsData.map((department,index)=>(

                                <tr
                                    key={department.id}
                                    className="hover:bg-slate-100"
                                >


                                    {/* No */}
                                    <td className="p-2 text-center">
                                        {index + 1}
                                    </td>



                                    {/* Department Name */}
                                    <td className="p-2 text-center">
                                        {department.name}
                                    </td>



                                    {/* Tashkil */}
                                    <td className="p-2 text-center">
                                        {department.tashkil?.name}
                                    </td>



                                    {/* Parent */}
                                    <td className="p-2 text-center">
                                        {
                                            department.parent?.name 
                                            ??
                                            "-"
                                        }
                                    </td>



                                    {/* Created */}
                                    <td className="p-2 text-center">
                                        {
                                            new Date(
                                                department.created_at
                                            )
                                            .toLocaleDateString()
                                        }
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
                                                    onClick={()=>
                                                        handleEdit(
                                                            department
                                                        )
                                                    }
                                                >

                                                    <Edit2 
                                                        className="ml-2 text-xl"
                                                    />

                                                    {t(
                                                        "common.editInfo"
                                                    )}

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

                                                    <Trash2
                                                        className="ml-2 text-xl"
                                                    />

                                                    {t(
                                                        "common.delete"
                                                    )}

                                                </button>


                                            </div>

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
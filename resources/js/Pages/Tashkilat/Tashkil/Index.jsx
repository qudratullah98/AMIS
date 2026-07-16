import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Edit2, Trash2 } from "lucide-react";
import Create from "./Create";
// import EditDepartment from "./Edit";

function Index({ tashkils }) {
    const { t } = useTranslation();

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [tashkilsData, setTashkilData] = useState(tashkils.data);
    const paginationLinks = tashkils?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("tashkilat.year") },
        { label: t("tashkilat.organizations") },
        { label: t("tashkilat.reference_number") },
        { label: t("common.action") },
    ];

    const handleEdit = (department) => {
        setEditableData(department);
        setEditModal(true);
    };

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("tashkilat.tashkilList")} />}
        >
            <SubHeader
                links={[
                    {
                        name: t("tashkilat.tashkilList"),
                    },
                ]}
            />

            {/* Create Modal */}
            {createModal && (
                <CustomModal
                    show={createModal}
                    handleClose={() => setCreateModal(false)}
                    title={t("tashkilat.CreateNewTashkil")}
                    size="large"
                    footer={false}
                    stopPropagation={false}
                >
                    <Create
                        tashkils={tashkils}
                        onSubmitSuccess={(newDepartment) => {
                            console.log(newDepartment)
                            setCreateModal(false);
                            setTashkilData((prev) => [newDepartment, ...prev]);
                        }}
                    />
                </CustomModal>
            )}

            <div className="mx-auto">
                <div
                    className="
                    overflow-hidden 
                    bg-white 
                    shadow-none 
                    sm:rounded-lg 
                    border 
                    border-gray-100 
                    dark:bg-gray-800
                "
                >
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("tashkilat.tashkilList")}
                            enableButton={true}
                            buttonLabel={t("tashkilat.CreateNewTashkil")}
                            onButtonClick={() => setCreateModal(true)}
                        >
                            {tashkilsData.map((tashkil, index) => (
                                <tr
                                    key={tashkil.id}
                                    className="hover:bg-slate-100"
                                >
                                    {/* No */}
                                    <td className="p-2 text-center">
                                        {index + 1}
                                    </td>

                                    {/* Department Name */}
                                    <td className="p-2 text-center">
                                        {tashkil.year}
                                    </td>

                                    {/* Organization */}
                                    <td className="p-2 text-center">
                                        {tashkil.organization.name}
                                    </td>

                                     {/* reference */}
                                    <td className="p-2 text-center">
                                        {tashkil.reference_number}
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
                                                    onClick={() =>
                                                        handleEdit(department)
                                                    }
                                                >
                                                    <Edit2 className="ml-2 text-xl" />

                                                    {t("common.editInfo")}
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
                                                    <Trash2 className="ml-2 text-xl" />

                                                    {t("common.delete")}
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

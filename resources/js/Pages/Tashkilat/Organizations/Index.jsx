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

function Index({ organizations }) {
    const { t } = useTranslation();

    const [organizationsData, setOrganizationsData] = useState(
        organizations?.data || [],
    );

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editableData, setEditableData] = useState(null);

    const paginationLinks = organizations?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("tashkilat.organization.name") },
        { label: t("tashkilat.organization.email") },
        { label: t("tashkilat.organization.phone") },
        { label: t("tashkilat.organization.website") },
        { label: t("tashkilat.organization.address") },
        { label: t("common.action") },
    ];

    const handleEdit = (organization) => {
        setEditableData(organization);
        setEditModal(true);
    };

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("tashkilat.organizationsList")} />}
        >
            <SubHeader
                links={[
                    {
                        name: t("tashkilat.organizations"),
                    },
                ]}
            />

            {/* Create Modal */}
            {createModal && (
                <CustomModal
                    show={createModal}
                    handleClose={() => setCreateModal(false)}
                    title={t("tashkilat.createOrganization")}
                    size="large"
                    footer={false}
                    stopPropagation={false}
                >
                    <Create
                        onSubmitSuccess={(newOrganization) => {
                            console.log(newOrganization);
                            setOrganizationsData((prev) => [
                                newOrganization.organization,
                                ...prev,
                            ]);

                            setCreateModal(false);
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
                            header={t("tashkilat.organizationsList")}
                            enableButton={true}
                            buttonLabel={t("tashkilat.createOrganization")}
                            onButtonClick={() => setCreateModal(true)}
                        >
                            {organizationsData.map((organization, index) => (
                                <tr
                                    key={organization.id}
                                    className="hover:bg-slate-100"
                                >
                                    {/* No */}
                                    <td className="p-2 text-center">
                                        {index + 1}
                                    </td>

                                    {/* Organization Name */}
                                    <td className="p-2 text-center">
                                        {organization.name}
                                    </td>

                                    {/* Tashkil */}
                                    <td className="p-2 text-center">
                                        {organization.email}
                                    </td>

                                    {/* Parent */}
                                    <td className="p-2 text-center">
                                        {organization.phone ?? "-"}
                                    </td>

                                    {/* Website */}
                                    <td className="p-2 text-center">
                                        {organization.website ?? "-"}
                                    </td>

                                    {/* Address */}
                                    <td className="p-2 text-center">
                                        {organization.address ?? "-"}
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
                                                        handleEdit(organization)
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

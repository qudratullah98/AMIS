import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Edit2, Trash2 } from "lucide-react";
import CreatePositionType from "./Create";
// import EditPositionType from "./Edit";

function Index({ positionTypes, filters }) {
    const { t } = useTranslation();

    const [positionTypesData, setPositionTypesData] = useState(
        positionTypes?.data || []
    );

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editableData, setEditableData] = useState(null);

    const paginationLinks = positionTypes?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("tashkilat.positionTypes") },
        { label: t("tashkilat.grade") },
        { label: t("tashkilat.code") },
        { label: t("common.action") },
    ];

    const handleEdit = (positionType) => {
        setEditableData(positionType);
        setEditModal(true);
    };

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("tashkilat.positionTypes")} />}
        >
            <SubHeader
                links={[
                    {
                        name: t("tashkilat.positionTypes"),
                    },
                ]}
            />

            {/* Create Modal */}
            {createModal && (
                <CustomModal
                    show={createModal}
                    handleClose={() => setCreateModal(false)}
                    title={t("tashkilat.createNewPositionType")}
                    size="large"
                    footer={false}
                    stopPropagation={false}
                >
                    <CreatePositionType
                        onSubmitSuccess={(newPositionType) => {
                            setCreateModal(false);
                            setPositionTypesData((prev) => [
                                newPositionType,
                                ...prev,
                            ]);
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
                            header={t("tashkilat.positionTypes")}
                            enableButton={true}
                            buttonLabel={t("tashkilat.createNewPositionType")}
                            onButtonClick={() => setCreateModal(true)}
                            search={filters?.search}
                        >
                            {positionTypesData.map((positionType, index) => (
                                <tr
                                    key={positionType.id}
                                    className="hover:bg-slate-100"
                                >
                                    {/* No */}
                                    <td className="p-2 text-center">
                                        {index + 1}
                                    </td>

                                    {/* Name */}
                                    <td className="p-2 text-center">
                                        {positionType.title}
                                    </td>

                                    {/* Grade */}
                                    <td className="p-2 text-center">
                                        {positionType.grade}
                                    </td>

                                    {/* Description */}
                                    <td className="p-2 text-center">
                                        {positionType.code ?? "-"}
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
                                                        handleEdit(positionType)
                                                    }
                                                >
                                                    <Edit2 className="ml-2 h-4 w-4" />
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
                                                    <Trash2 className="ml-2 h-4 w-4" />
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
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next"; 
import CreateSghaService from "./Create";
import CustomModal from "@/Components/CustomModal";
// import EditSghaService from "./EditSghaService";

function Index({ sgha_services }) {
    const { t } = useTranslation();
    const [sghaServicesData, setSghaServicesData] = useState(
        sgha_services?.data || [],
    );
    const [createModel, setCreateModel] = useState(false);
    const [editModel, setEditModel] = useState(false);
    const [editableData, setEditableData] = useState(null);
    const paginationLinks = sgha_services?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("common.nameEnglish") },
        { label: t("common.namePashto") },
        { label: t("common.nameDari") },
        { label: t("sgha.serviceUnit") },
        { label: t("sgha.airline") },
        { label: t("sgha.completionRate") },
        { label: t("common.actions") },
    ];

    const handleEdit = (sghaService) => {
        setEditableData(sghaService);
        setEditModel(true);
    };

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("sgha.sghaServicesList")} />}
        >
            <SubHeader links={[{ name: t("sgha.sghaServicesList") }]} />
            {/* Create Modal */}
            {createModel && (
                <CustomModal
                    show={createModel}
                    handleClose={() => setCreateModel(false)}
                    title={t("sgha.addingNewSghaService")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <CreateSghaService
                        onSubmitSuccess={(newService) => {
                            setSghaServicesData((prev) => [
                                newService,
                                ...prev,
                            ]);
                            setCreateModel(false);
                        }}
                    />
                </CustomModal>
            )}

            {/* Edit Modal */}
            {editModel && (
                <CustomModal
                    show={editModel}
                    handleClose={() => setEditModel(false)}
                    title={t("sgha.editingSghaService")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <EditSghaService
                        sghaService={editableData}
                        onEditSuccess={(updatedService) => {
                            setSghaServicesData((prev) =>
                                prev.map((s) =>
                                    s.id === updatedService.id
                                        ? updatedService
                                        : s,
                                ),
                            );
                            setEditModel(false);
                        }}
                    />
                </CustomModal>
            )}
            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("sgha.sghaServicesList")}
                            enableButton={true}
                            buttonLabel={t("CreateNewSgha")} 
                            onButtonClick={() => setCreateModel(true)}
                        >
                            {sghaServicesData.map((service, index) => (
                                <tr
                                    key={service.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="p-2 text-center">
                                        {service.name_en}
                                    </td>
                                    <td className="p-2 text-center">
                                        {service.name_ps}
                                    </td>
                                    <td className="p-2 text-center">
                                        {service.name_dr}
                                    </td>
                                    <td className="p-2 text-center">
                                        {service.sgha_service_unit?.name_en ||
                                            "-"}
                                    </td>
                                    <td className="p-2 text-center">
                                        {service.airline?.name_en || "-"}
                                    </td>
                                    <td className="p-2 text-center">
                                        {service.complation_rate}%
                                    </td>
                                    <td className="p-2 text-center">
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className="text-blue-600 hover:text-blue-800 mr-2"
                                        >
                                            {t("common.edit")}
                                        </button>
                                        <button
                                            onClick={() => {
                                                // Add delete functionality
                                                if (
                                                    confirm(
                                                        t(
                                                            "common.confirmDelete",
                                                        ),
                                                    )
                                                ) {
                                                    // Handle delete
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            {t("common.delete")}
                                        </button>
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

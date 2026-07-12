import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next"; 
import CreateSghaService from "./Create";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SmallLoader from "@/Components/SmallLoader";
import { Edit2, Verified } from "lucide-react";
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
                                        {service.service_unit?.service_name  }
                                        </td>
                               <td className="p-4">
<td className="p-2 min-w-[260px]">
    <div className="flex flex-col gap-2">
        {service.sgha_services_rate?.map((rate) => (
            <div
                key={rate.id}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-sm"
            >
                {/* Airline Name */}
                <div className="w-24 truncate text-xs font-medium text-gray-700">
                    ✈️ {rate.airline?.name_en}
                </div>

                {/* Progress Bar */}
                <div className="flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300"
                            style={{
                                width: `${rate.complation_rate}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Percentage */}
                <div className="w-10 text-right text-xs font-bold text-blue-700">
                    {rate.complation_rate}%
                </div>
            </div>
        ))}
    </div>
</td>
</td>
                                  <td className=" text-center">
                                        <ThreeDotMenu>
                                            <div className="py-0">
                                               
                                                    <button
                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() =>
                                                            activation(
                                                                service.id,
                                                            )
                                                        }
                                                    >
                                                       
                                                      
                                                                <Verified className="ml-2 text-xl" />
                                                                {t(
                                                                    "state.approve",
                                                                )}
                                                             
                                                         
                                                    </button>
                                                
                                                <button
                                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => {
                                                        setEditModel(true);
                                                        setEditableData(
                                                            service,
                                                        );
                                                    }}
                                                >
                                                    {" "}
                                                    <Edit2 className="ml-2 text-xl" />{" "}
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
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;

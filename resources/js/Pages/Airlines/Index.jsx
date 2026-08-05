import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import Create from "./Create";

function AirlinesIndex({ airlines }) {
    const { t } = useTranslation();
    const [airlineData, setAirlinesData] = useState(airlines?.data || []);
    const paginationLinks = airlines?.links || [];
    const [createModal, setCreateModal] = useState(false);

    const columns = [
        { label: t("common.NO") },
        { label: t("common.namePashto") },
        { label: t("common.nameDari") },
        { label: t("common.nameEnglish") },
    ];

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("airline.airlines")} />}
        >
            <SubHeader links={[{ name: t("airline.airlines") }]} />
            <CustomModal
                show={createModal}
                handleClose={() => setCreateModal(false)}
                title={t("airline.addingNewAirline")}
                size="xlarge"
                stopPropagation={false}
                footer={false}
            >
               <Create onSubmitSuccess={(airline) => {
                    setAirlinesData((prev) => [...prev, airline]);
                    setCreateModal(false);
                }}></Create>
            </CustomModal>

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("airline.airlinesList")}
                            buttonLabel={t("airline.addNewAirline")}
                            enableButton={true}
                            onButtonClick={() => setCreateModal(true)}
                        >
                            {airlineData.map((airline, a) => (
                                <tr
                                    key={airline.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">{a + 1}</td>
                                    <td className="p-2 text-center">
                                        {airline.name_ps}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airline.name_dr}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airline.name_en}
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

export default AirlinesIndex;

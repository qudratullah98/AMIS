import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import Create from "./Create";

function Index({ flights }) {
    const { t } = useTranslation();
    const [flightData, setflightData] = useState(flights?.data || []);
    const paginationLinks = flights?.links || [];
    const [isCreateModalOpen, setCreateModal] = useState(false);

    const columns = [
        { label: t("common.NO") }, 
        { label: t("flight.name") },
        { label: t("flight.description") },
        { label: t("flight.type") },
        { label: t("flight.status") },
        { label: t("common.actions") },
    ];

    return (
        <AuthenticatedLayout header={<SubHeader title={t("flight.flights")} />}>
          <CustomModal
                    show={isCreateModalOpen}
                    handleClose={() => setCreateModal(false)}
                    title={t("flight.createFlight")}
                    size="xxlarge"
                    stopPropagation={false}
                    footer={false}
                >
            <Create></Create>
        </CustomModal>


            <SubHeader links={[{ name: t("flight.flights") }]} />

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("flight.flights")}
                            enableButton={true}
                            buttonLabel={t("flight.createFlight")} 
                            onButtonClick={() => setCreateModal(true)}
                        >
                            {flightData.map((flight, a) => (
                                <tr
                                    key={flight.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">{a + 1}</td> 
                                    <td className="p-2">{flight.name}</td>
                                    <td className="p-2">{flight.description}</td>
                                    <td className="p-2">{flight.type}</td>
                                    <td className="p-2">{flight.status}</td>
                                    <td className="p-2">
                                        {/* Actions like Edit/Delete can be added here */}
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

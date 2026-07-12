import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";
import { useTranslation } from "react-i18next";
import Create from "./Create";

function FlightServices({ flightServices }) {
    const { t } = useTranslation();
    const [services] = useState(flightServices?.data || []);
    const [isCreateModalOpen, setCreateModal] = useState(false);

    const columns = [
        { label: "NO" },
        { label: "Flight" },
        { label: "SGHA Service" },
        { label: "Count" },
        { label: "Approval Status" },
    ];

    return (
        <AuthenticatedLayout header={<SubHeader title="Flight Services" />}>
            <SubHeader
                links={[
                    {
                        name: "Flight Services",
                    },
                ]}
            />
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

            <div className="mx-auto">
                <div
                    className="
                    bg-white 
                    border 
                    border-gray-100
                    rounded-xl
                    shadow-sm
                    overflow-hidden
                "
                >
                    <div className="p-4">
                        <DataTable
                            columns={columns}
                            links={flightServices.links}
                            header="Flight Services"
                            enableButton={true}
                            onButtonClick={() => setCreateModal(true)}
                        >
                            {services.map((service, index) => (
                                <tr
                                    key={service.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="p-3 text-center">
                                        {index + 1}
                                    </td>

                                    <td className="p-3 text-center font-semibold">
                                        {service.flight?.flight_number}
                                    </td>

                                    <td className="p-3 text-center">
                                        {service.sgha_service?.name}
                                    </td>

                                    <td className="p-3 text-center">
                                        <span
                                            className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-blue-100
                                                text-blue-700
                                                text-sm
                                            "
                                        >
                                            {service.count}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <span
                                            className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-green-100
                                                text-green-700
                                                text-sm
                                            "
                                        >
                                            {service.approval_status?.name ??
                                                "Pending"}
                                        </span>
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

export default FlightServices;

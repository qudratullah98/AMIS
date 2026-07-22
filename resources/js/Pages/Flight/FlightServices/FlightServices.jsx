import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";
import { useTranslation } from "react-i18next";
import Create from "./Create";

function FlightServices({ flightServices }) {
    const { t } = useTranslation();
    const [services, setServices] = useState(flightServices?.data || []);
    const [isCreateModalOpen, setCreateModal] = useState(false);

    const columns = [
        { label: t("common.NO") },
        { label: t("flight.flight_number") },
        { label: t("flight.flightServices") },
        { label: t("flight.airport") },
        { label: t("flight.airline") },
        { label: t("airport.aircraftTypes") },
        { label: t("sgha.countOfService") },
        { label: t("state.approvalStatus") },
    ];

    console.log(services);
    return (
        <AuthenticatedLayout header={<SubHeader title={t("flight.flightServices")} />}>
            <SubHeader
                links={[
                    {
                        name: t("flight.flightServices"),
                    },
                ]}
            />
            <CustomModal
                show={isCreateModalOpen}
                handleClose={() => setCreateModal(false)}
                title={t("flight.newFlightServices")}
                size="xxlarge"
                stopPropagation={false}
                footer={false}
            >
                <Create onSubmitSuccess={(data) => {
                    setCreateModal(false);
                    setServices((prev) => [data, ...prev]);
                }}></Create>
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
                            header={t("flight.flightServices")}
                            enableButton={true}
                            onButtonClick={() => setCreateModal(true)}
                            buttonLabel={t("flight.newFlightServices")}
                        >
                            {services.map((service, index) => (
                                <tr
                                    key={service.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="p-3 text-center">
                                        {index + 1}dd
                                    </td>

                                    <td className="p-3 text-center font-semibold">
                                        {service.flight?.flight_number}
                                    </td>

                                    <td className="p-3 text-center">
                                        {service.sgha_service?.name_ps}
                                    </td> 
                                    <td className="p-3 text-center">
                                        {service.flight.airport?.name_ps}
                                        {console.log(service.airport)}
                                    </td> 
                                    <td className="p-3 text-center">
                                        {service.flight.airline?.name_ps}
                                    </td>
                                     <td className="p-3 text-center">
                                        {service.flight.aircraft_type?.name}
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

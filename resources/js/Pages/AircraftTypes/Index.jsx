import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import Create from "./Create";

function AirportsIndex({ aircraftTypes }) {
    const { t } = useTranslation();
    const [aircraftTypesData, setAircraftTypesData] = useState(aircraftTypes?.data || []);
    const paginationLinks = aircraftTypes?.links || [];
    const [createModel, setCreateModel] = useState(false);


    const columns = [
        { label: t("common.NO") },
        { label: t("airport.aircraftType") },
        { label: t("airport.aircraftCode") },
    ];


    return (
        <AuthenticatedLayout header={<SubHeader title={t("airline.Airlines")} />}>


            <SubHeader links={[{ name: t("airport.aircraftTypes") }]} />
                 <CustomModal
                    show={createModel}
                    handleClose={() => setCreateModel(false)}
                    title={t("airport.addingNewAircraftType")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <Create onSubmitSuccess={(newAircraftType) => {
                        setAircraftTypesData((prevData) => [newAircraftType, ...prevData]);
                        setCreateModel(false);
                    }} />
                </CustomModal>

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("airport.aircraftTypes")}
                             enableButton={true}
                            buttonLabel={t("airport.addNewAircraftType")}
                            onButtonClick={() => setCreateModel(true)}

                        >
                            {aircraftTypesData.map((aircraftType, a) => (
                                <tr
                                    key={aircraftType.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">{a + 1}</td>
                                    <td className="p-2 text-center">
                                        {aircraftType.name}
                                    </td>
                                    <td className="p-2 text-center">
                                        {aircraftType.code}
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

export default AirportsIndex;

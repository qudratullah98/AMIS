import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Edit2, Verified } from "lucide-react";
import StatusBadge from "@/Components/StatusBadge";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import CreateAndEdit from "./CreateAndEdit";

function AirportsIndex({ airports }) {
    const { t } = useTranslation();
    const [airportData, setAirportsData] = useState(airports?.data || []);
    const paginationLinks = airports?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("common.namePashto") },
        { label: t("common.nameDari") },
        { label: t("common.nameEnglish") },
        { label: t("IATA Code") },
        { label: t("ICAO Code") },
        { label: t("airport.airportType") },
        { label: t("common.province") },
        { label: t("common.district") },
        { label: t("state.approvalStatus") },
        { label: t("common.action") },
    ];

    const verification = (type, id) => {
        console.log(`Verify ${type} with id ${id}`);
    };

    const [CreateModel, setCreateModel] = useState(false);

    return (
        <AuthenticatedLayout header={<SubHeader title={t("Airports List")} />}>
            {CreateModel && (
                <CustomModal
                    show={CreateModel}
                    handleClose={() => setCreateModel(false)}
                    title={t("airport.addingNewAirport")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <CreateAndEdit
                        onSubmitSuccess={(airport) => {
                            // Example: add new airport to list
                            setAirportsData((prev) => [airport, ...prev]);
                            setCreateModel(false);
                        }}
                    />
                </CustomModal>
            )}

            <SubHeader links={[{ name: t("airport.airports") }]} />

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("airport.airportList")}
                            buttonLabel={t("airport.addNewAirport")}
                            enableButton={true}
                            onButtonClick={() => {
                                setCreateModel(true);
                            }}
                        >
                            {airportData.map((airport, a) => (
                                <tr
                                    key={airport.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">{a + 1}</td>
                                    <td className="p-2 text-center">
                                        {airport.name_ps}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airport.name_dr}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airport.name_en}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airport.IATA_code}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airport.ICAO_code}
                                    </td>
                                    <td className="p-2 text-center">
                                        {t(`airport.type.${airport.type}`)}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airport?.province?.province}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airport?.district?.district_dr}
                                    </td>
                                    <td className="p-2 text-center">
                                        <StatusBadge
                                            status={
                                                airport?.status?.code
                                            }

                                        />
                                    </td>

                                    <td className=" text-center">
                                        <ThreeDotMenu>
                                            <div className="py-0">
                                                <button
                                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        verification(
                                                            "airport",
                                                            airport.id,
                                                        )
                                                    }
                                                >
                                                    <Verified className="ml-2 text-xl" />
                                                    {t("state.approve")}
                                                </button>

                                                <Link className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <Edit2 className="ml-2 text-xl" />
                                                    {t("common.editInfo")}
                                                </Link>
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

export default AirportsIndex;

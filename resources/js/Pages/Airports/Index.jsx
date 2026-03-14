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
    const [airportData,setAirportsData] = useState(airports?.data || []);
    const paginationLinks = airports?.links || [];

    const columns = [
        { label: t("ID") },
        { label: t("Name (PS)") },
        { label: t("Name (DR)") },
        { label: t("Name (EN)") },
        { label: t("IATA") },
        { label: t("ICAO") },
        { label: t("Type") },
        { label: t("Province") },
        { label: t("District") },
        { label: t("AMSL") },
        { label: t("Area") },
        { label: t("Status") },
        { label: t("Actions") },
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
                    title="My Modal"
                    size="large"
                    stopPropagation={false}
                    footer={false}
                ><CreateAndEdit
    onSubmitSuccess={(airport) => {
        // Example: add new airport to list
        setAirportsData((prev) => [airport, ...prev]);
        setCreateModel(false);
    }}
/>
                </CustomModal>
            )}
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={paginationLinks}
                                header={t("Airports List")}
                                buttonLabel={t("Add New Airport")}
                                enableButton={true}
                                onButtonClick={() => {
                                    setCreateModel(true);
                                }}
                            >
                                {airportData.map((airport) => (
                                    <tr
                                        key={airport.id}
                                        className="hover:bg-slate-100"
                                    >
                                        <td className="p-2 text-center">
                                            {airport.id}
                                        </td>
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
                                            {t(airport.type)}
                                        </td>
                                        <td className="p-2 text-center">
                                            {airport?.province?.province}
                                        </td>
                                        <td className="p-2 text-center">
                                            {airport?.district?.district_dr}
                                        </td>
                                        <td className="p-2 text-center">
                                            {airport.amsl}{" "}
                                            {airport.amsl_unit_name}
                                        </td>
                                        <td className="p-2 text-center">
                                            {airport.area}{" "}
                                            {airport.area_unit_name}
                                        </td>
                                        <td className="p-2 text-center">
                                            <StatusBadge
                                                status={
                                                    airport.status_id === 1
                                                        ? "active"
                                                        : "blocked"
                                                }
                                            />
                                        </td>
                                        <td className="p-2 text-center">
                                            <ThreeDotMenu>
                                                <div className="py-1">
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
                                                        {t("approve")}
                                                    </button>

                                                    <Link
                                                        
                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <Edit2 className="ml-2 text-xl" />
                                                        {t("editInfo")}
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
            </div>
        </AuthenticatedLayout>
    );
}

export default AirportsIndex;

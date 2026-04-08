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
import SmallLoader from "@/Components/SmallLoader";

function AirlinesIndex({ airLines }) {
    const { t } = useTranslation();
    const [airlineData, setAirlinesData] = useState(airLines?.data || []);
    const paginationLinks = airLines?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("common.namePashto") },
        { label: t("common.nameDari") },
        { label: t("common.nameEnglish") },
        { label: t("IATA Code") },
        { label: t("ICAO Code") },
        { label: t("airline.airType") },
        { label: t("common.province") },
        { label: t("common.district") },
        { label: t("state.approvalStatus") },
        { label: t("common.action") },
    ];

    const [loading, setLoading] = useState(false);
    const activation = (id) => {
        setLoading(true);
        axios
            .post(route("airline.activate", { air: id }))
            .then((response) => {
                // Update the air status in the local state
                setairsData((prev) =>
                    prev.map((air) =>
                        airline.id === id ? response.data.air : air,
                    ),
                );
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error activating air:", error);
                setLoading(false);
            });
    };

    const [CreateModel, setCreateModel] = useState(false);
    const [EditModel, setEditModel] = useState(false);
    const [editableData, setEditableData] = useState(null);

    return (
        <AuthenticatedLayout header={<SubHeader title={t("airs List")} />}>
            {CreateModel && (
                <CustomModal
                    show={CreateModel}
                    handleClose={() => setCreateModel(false)}
                    title={t("airline.addingNewair")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                  
                </CustomModal>
            )}
            {EditModel && (
                <CustomModal
                    show={EditModel}
                    handleClose={() => setEditModel(false)}
                    title={t("airline.editingair")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    
                </CustomModal>
            )}

            <SubHeader links={[{ name: t("airline.addNewAirline") }]} />

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("airline.airList")}
                            buttonLabel={t("airline.addNewair")}
                            enableButton={true}
                            onButtonClick={() => {
                                setCreateModel(true);
                            }}
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
                                    <td className="p-2 text-center">
                                        {airline.IATA_code}
                                    </td>
                                    <td className="p-2 text-center">
                                        {airline.ICAO_code}
                                    </td>
                                    <td className="p-2 text-center">
                                        {t(`airline.type.${airline.type}`)}
                                    </td>
                                  

                                    <td className=" text-center">
                                        <ThreeDotMenu>
                                            <div className="py-0">
                                                {airline?.status?.code !==
                                                    "active" && (
                                                    <button
                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() =>
                                                            activation(
                                                                airline.id,
                                                            )
                                                        }
                                                    >
                                                        {loading ? (
                                                            <SmallLoader />
                                                        ) : (
                                                            <>
                                                                <Verified className="ml-2 text-xl" />
                                                                {t(
                                                                    "state.approve",
                                                                )}
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                                <button
                                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => {
                                                        setEditModel(true);
                                                        setEditableData(
                                                            airline,
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

export default AirlinesIndex;

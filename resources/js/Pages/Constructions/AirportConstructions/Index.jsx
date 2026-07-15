import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CreateConstruction from "./Create";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import StatusBadge from "@/Components/StatusBadge";
import SmallLoader from "@/Components/SmallLoader";
import { Verified, Edit2, Eye } from "lucide-react";
import { convertToShamsi } from "@/Components/utils/ConvertDate";
import toast from "react-hot-toast";
import ViewConstruction from "./View";

function Index({ airportConstructions }) {
    const { t } = useTranslation();
    const [constructionsData, setConstructionsData] = useState(
        airportConstructions?.data || [],
    );
    const paginationLinks = airportConstructions?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("construction.construction") },
        { label: t("construction.constructionType") },
        { label: t("state.approvalStatus") },
        { label: t("state.activityStatus") },
        { label: t("common.date") },
        { label: t("common.image") },
        { label: t("common.action") },
    ];

    const [CreateModel, setCreateModel] = useState(false);
    const [viewModel, setViewModel] = useState(false);
    const [selectedConstruction, setSelectedConstruction] = useState(null);

    const [loading, setLoading] = useState(false);


    const activation = (id) => {
        setLoading(true);
        axios
            .post(
                route("airportConstruction.activate", {
                    AirportConstruction: id,
                }),
            )
            .then((response) => {
                // Update the airport status in the local state

                setConstructionsData((prev) =>
                    prev.map((airportConstruction) =>
                        airportConstruction.id === id
                            ? response.data.airportConstruction
                            : airportConstruction,
                    ),
                );
                setLoading(false);
                toast.success(t("common.informationtApprovedSuccessfully"));
            })
            .catch((error) => {
                console.error("Error activating construction:", error);
                setLoading(false);
            });
    };

    return (
        <AuthenticatedLayout
            header={
                <SubHeader title={t("construction.airportConstructions")} />
            }
        >
            <SubHeader
                links={[{ name: t("construction.airportConstructions") }]}
            />

            {CreateModel && (
                <CustomModal
                    show={CreateModel}
                    handleClose={() => setCreateModel(false)}
                    title={t("construction.addingNewConstruction")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <CreateConstruction
                        onSubmitSuccess={(construction) => {
                            setConstructionsData((prev) => [
                                construction,
                                ...prev,
                            ]);
                            setCreateModel(false);
                        }}
                    />
                </CustomModal>
            )}

            {viewModel && (
    <CustomModal
        show={viewModel}
        handleClose={() => {
            setViewModel(false);
            setSelectedConstruction(null);
        }}
        title={t("common.details")}
        size="large"
        stopPropagation={false}
        footer={false}
    >
        <ViewConstruction construction={selectedConstruction} />
    </CustomModal>
)}

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("construction.airportConstructionsList")}
                            enableButton={true}
                            buttonLabel={t("construction.addNewConstruction")}
                            onButtonClick={() => setCreateModel(true)}
                        >
                            {constructionsData.map((airportConstruction, a) => (
                                <tr
                                    key={airportConstruction.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">{a + 1}</td>
                                    <td className="p-2 text-center">
                                        {
                                            airportConstruction?.construction
                                                ?.name_ps
                                        }
                                    </td>
                                    <td className="p-2 text-center">
                                        {
                                            airportConstruction
                                                ?.construction_type?.type_ps
                                        }
                                    </td>
                                    <td className="p-2 text-center">
                                        <StatusBadge
                                            status={
                                                airportConstruction
                                                    ?.approval_status?.code
                                            }
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        {
                                            airportConstruction?.activity_status
                                                ?.status_ps
                                        }
                                    </td>

                                    <td className="p-2 text-center">
                                        {convertToShamsi(
                                            airportConstruction.created_at,
                                        ) }
                                    </td>
                                    <td className="p-2 text-center">
                                        {airportConstruction.image ?? " - "}
                                    </td>

                                    <td className=" text-center">
                                        <ThreeDotMenu>
                                            <div className="py-0">
                                                {airportConstruction
                                                    ?.approval_status?.code !==
                                                    "approved" && (
                                                    <button
                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() =>
                                                            activation(
                                                                airportConstruction.id,
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
                                                        // setEditModel(true);
                                                        // setEditableData(
                                                        //     airport,
                                                        // );
                                                    }}
                                                >
                                                    {" "}
                                                    <Edit2 className="ml-2 text-xl" />{" "}
                                                    {t("common.editInfo")}
                                                </button>

                                                <button
    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    onClick={() => {
        setSelectedConstruction(airportConstruction);
        setViewModel(true);
    }}
>
    <Eye className="ml-2 text-xl" />
    {t("common.viewInfo")}
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

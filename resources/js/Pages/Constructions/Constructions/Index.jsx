import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import CreateConstruction from "./Create";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Head, Link, router } from "@inertiajs/react";

import { Edit2, Verified, VerifiedIcon } from "lucide-react";
import StatusBadge from "@/Components/StatusBadge";
import SmallLoader from "@/Components/SmallLoader";
import toast from "react-hot-toast";

function ConstrunctionsIndex({ constructions }) {
    const { t } = useTranslation();
    const [constructionsData, setConstructionsData] = useState(
        constructions?.data || [],
    );
    const paginationLinks = constructions?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("common.namePashto") },
        { label: t("common.nameDari") },
        { label: t("common.nameEnglish") },
        { label: t("construction.constructionCode") },
        { label: t("state.approvalStatus") },

        { label: t("common.action") },
    ];

    const [loading, setLoading] = useState(false);
    const [CreateModel, setCreateModel] = useState(false);

    const activation = (id) => {
        setLoading(true);
        axios
            .post(route("construction.activate", { construction: id }))
            .then((response) => {
                // Update the airport status in the local state

                setConstructionsData((prev) =>
                    prev.map((construction) =>
                        construction.id === id
                            ? response.data.construction
                            : construction,
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
            header={<SubHeader title={t("construction.constructions")} />}
        >
            <SubHeader links={[{ name: t("construction.constructions") }]} />

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

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("construction.constructionsList")}
                            buttonLabel={t("construction.addNewConstruction")}
                            enableButton={true}
                            onButtonClick={() => setCreateModel(true)}
                        >
                            {constructionsData.map((construction, a) => (
                                <tr
                                    key={construction.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">{a + 1}</td>
                                    <td className="p-2 text-center">
                                        {construction.name_ps}
                                    </td>
                                    <td className="p-2 text-center">
                                        {construction.name_dr}
                                    </td>
                                    <td className="p-2 text-center">
                                        {construction.name_en}
                                    </td>
                                    <td className="p-2 text-center">
                                        {construction.code}
                                    </td>
                                    <td className="p-2 text-center">
                                        <StatusBadge
                                            status={construction?.approval_status?.code}
                                        />
                                    </td>

                                    <td className=" text-center">
                                        <ThreeDotMenu>
                                            <div className="py-0">
                                                {construction?.approval_status?.code !==
                                                    "approved" && (
                                                    <button
                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() =>
                                                            activation(
                                                                construction.id,
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

export default ConstrunctionsIndex;

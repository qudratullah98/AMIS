import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CreateConstructionType from "./Create";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Head, Link, router } from "@inertiajs/react";

import { Edit2, Verified, VerifiedIcon } from "lucide-react";
import StatusBadge from "@/Components/StatusBadge";
import SmallLoader from "@/Components/SmallLoader";
import toast from "react-hot-toast";

function constructionsType({ constructionsType }) {
    const { t } = useTranslation();
    const [constructionsTypeData, setConstructionsTypeData] = useState(
        constructionsType?.data || [],
    );
    const paginationLinks = constructionsType?.links || [];

    const [CreateModel, setCreateModel] = useState(false);
    const [loading, setLoading] = useState(false);

    const columns = [
        { label: t("common.NO") },
        { label: t("construction.constructionTypePashto") },
        { label: t("construction.constructionTypeDari") },
        { label: t("construction.constructionTypeEnglish") },
        { label: t("state.approvalStatus") },

        { label: t("common.action") },
    ];

    const activation = (id) => {
        setLoading(true);
        axios
            .post(route("constructionType.activate", { constructionType: id }))
            .then((response) => {
                // Update the airport status in the local state

                setConstructionsTypeData((prev) =>
                    prev.map((constructionType) =>
                        constructionType.id === id
                            ? response.data.constructionType
                            : constructionType,
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
            header={<SubHeader title={t("construction.constructionTypes")} />}
        >
            <SubHeader
                links={[{ name: t("construction.constructionTypes") }]}
            />

            {CreateModel && (
                <CustomModal
                    show={CreateModel}
                    handleClose={() => setCreateModel(false)}
                    title={t("construction.addingNewConstructionType")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <CreateConstructionType
                        onSubmitSuccess={(constructionType) => {
                            setConstructionsTypeData((prev) => [
                                constructionType,
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
                            header={t("construction.constructionTypes")}
                            buttonLabel={t(
                                "construction.addNewConstructionType",
                            )}
                            enableButton={true}
                            onButtonClick={() => setCreateModel(true)}
                        >
                            {constructionsTypeData.map(
                                (constructionType, a) => (
                                    <tr
                                        key={constructionType.id}
                                        className="hover:bg-slate-100"
                                    >
                                        <td className="p-2 text-center">
                                            {a + 1}
                                        </td>
                                        <td className="p-2 text-center">
                                            {constructionType.type_ps}
                                        </td>
                                        <td className="p-2 text-center">
                                            {constructionType.type_dr}
                                        </td>
                                        <td className="p-2 text-center">
                                            {constructionType.type_en}
                                        </td>

                                        <td className="p-2 text-center">
                                            <StatusBadge
                                                status={
                                                    constructionType?.status
                                                        ?.code
                                                }
                                            />
                                        </td>

                                        <td className="p-0 text-center">
                                            <ThreeDotMenu>
                                                <div className="py-0">
                                                    {constructionType?.status
                                                        ?.code !==
                                                        "approved" && (
                                                        <button
                                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() =>
                                                                activation(
                                                                    constructionType.id,
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
                                ),
                            )}
                        </DataTable>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default constructionsType;

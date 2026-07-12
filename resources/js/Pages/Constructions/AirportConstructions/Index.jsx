import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CreateConstruction from "./Create";
import CustomModal from "@/Components/CustomModal";

function Index({ constructions }) {
    const { t } = useTranslation();
    const [constructionsData, setConstructionsData] = useState(
        constructions?.data || [],
    );
    const paginationLinks = constructions?.links || [];

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

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("construction.airportConstructionsList")}
                            enableButton={true}
                            buttonLabel={t("construction.newConstruction")}
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

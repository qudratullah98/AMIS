import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";

function constructionsType({ constructionsType }) {
    const { t } = useTranslation();
    const [constructionsTypeData, setConstructionsTypeData] = useState(
        constructionsType?.data || [],
    );
    const paginationLinks = constructionsType?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("common.namePashto") },
        { label: t("common.nameDari") },
        { label: t("common.nameEnglish") },
    ];

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("construction.constructionTypes")} />}
        >
            <SubHeader links={[{ name: t("construction.constructionTypes") }]} />

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("construction.constructionTypes")}
                            enableButton={false}
                            addButton={false}
                        >
                            {constructionsTypeData.map((constructionType, a) => (
                                <tr
                                    key={constructionType.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">{a + 1}</td>
                                    <td className="p-2 text-center">
                                        {constructionType.type_ps}
                                    </td>
                                    <td className="p-2 text-center">
                                        {constructionType.type_dr}
                                    </td>
                                    <td className="p-2 text-center">
                                        {constructionType.type_en}
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

export default constructionsType;

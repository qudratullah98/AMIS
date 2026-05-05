import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";

function AirlinesIndex({ airlines }) {
    const { t } = useTranslation();
    const [airlineData, setAirlinesData] = useState(airlines?.data || []);
    const paginationLinks = airlines?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("common.namePashto") },
        { label: t("common.nameDari") },
        { label: t("common.nameEnglish") },
    ];

    return (
        <AuthenticatedLayout header={<SubHeader title={t("airline.airlines")} />}>



            <SubHeader links={[{ name: t("airline.airlines") }]} />

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("airline.airlinesList")}
                            addButton={false}
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

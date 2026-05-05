import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";

function Index({ sghaServiceUnit }) {
    const { t } = useTranslation();
    const [airlineData, setAirlinesData] = useState(sghaServiceUnit?.data || []);
    const paginationLinks = sghaServiceUnit?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("common.namePashto") }, 
    ];

    return (
        <AuthenticatedLayout header={<SubHeader title={t("sgha.sghaServicesList")} />}>



            <SubHeader links={[{ name: t("sgha.sghaServicesList") }]} />

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("sgha.sghaServicesList")}
                            addButton={true}
                            buttonLabel={t('CreateNewSgha')}
                        >
                            {airlineData.map((airline, a) => (
                                <tr
                                    key={airline.id}
                                    className="hover:bg-slate-100"
                                >
                                    <td className="p-2 text-center">{a + 1}</td>
                                    <td className="p-2 text-center">
                                        {airline.service_name}
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

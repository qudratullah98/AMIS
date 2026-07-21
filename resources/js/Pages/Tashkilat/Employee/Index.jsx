import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";

import CreateEmployee from "./Create";

function Index({ employees }) {
    const { t } = useTranslation();

    const [data, setData] = useState(employees?.data || []);
    const [createModal, setCreateModal] = useState(false);

    const columns = [
        { label: t("tashkilat.employee.employeeNo") },
        { label: t("tashkilat.employee.firstName") },
        { label: t("tashkilat.employee.fullName") },
        { label: t("tashkilat.employee.phone") },
        { label: t("common.action") },
    ];

    const handleCreateSuccess = (employee) => {
        setCreateModal(false);
        setData((prev) => [employee, ...prev]);
    };

    return (
        <AuthenticatedLayout
            header={
                <SubHeader title={t("tashkilat.employee.employees")} />
            }
        >
            <SubHeader
                links={[
                    {
                        name: t("tashkilat.employee.employees"),
                    },
                ]}
            />

            <CustomModal
                show={createModal}
                handleClose={() => setCreateModal(false)}
                title={t("tashkilat.employee.createEmployee")}
                footer={false}
                size="xlarge"
            >
                <CreateEmployee
                    onSubmitSuccess={handleCreateSuccess}
                />
            </CustomModal>

            <DataTable
                columns={columns}
                links={employees.links}
                header={t("tashkilat.employee.employees")}
                enableButton
                buttonLabel={t("tashkilat.employee.createEmployee")}
                onButtonClick={() => setCreateModal(true)}
            >
                {data.map((employee) => (
                    <tr key={employee.id}>
                      

                        <td className="p-2 text-center">
                            {employee.employee_no}
                        </td>

                        <td className="p-2 text-center">
                            {employee.first_name}{" "}
                            {employee.last_name}
                        </td>

                        <td className="p-2 text-center">
                            {employee.phone ?? "-"}
                        </td>

                        <td className="p-2 text-center">
                            {employee.status}
                        </td>
                    </tr>
                ))}
            </DataTable>
        </AuthenticatedLayout>
    );
}

export default Index;
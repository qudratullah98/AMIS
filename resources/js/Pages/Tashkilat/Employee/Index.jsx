import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";

import CreateEmployee from "./Create";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Book, Edit2, LeafyGreen, Loader, Trash2 } from "lucide-react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { changeStatus } from "@/Utils/changeStatus";
import StatusBadge from "@/Components/StatusBadge";

function Index({ employees }) {
    const { t } = useTranslation();

    const [data, setData] = useState(employees?.data || []);
    const [createModal, setCreateModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const columns = [
        { label: t("tashkilat.employee.employeeNo") },
        { label: t("tashkilat.employee.firstName") },
        { label: t("tashkilat.employee.fullName") },
        { label: t("tashkilat.employee.phone") },
        { label: t("tashkilat.employee.nationalId") },
        { label: t("common.status") },
        { label: t("common.action") },
    ];

    const handleCreateSuccess = (employee) => {
        setCreateModal(false);
        setData((prev) => [employee, ...prev]);
    };

const handleChangeStatus = (employee) => {
    setLoader(true);

    changeStatus(employee.id, "Employee")
        .then((response) => {
            if (response.success) {
                setData((prev) =>
                    prev.map((item) =>
                        item.id === employee.id
                            ? {
                                  ...item,
                                  approval_status_id: 1,
                              }
                            : item
                    )
                );
            }
        })
        .finally(() => {
            setLoader(false);
        });
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
                stopPropagation={false}
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
                            {employee.id}
                        </td>

                        <td className="p-2 text-center">
                            {employee.first_name}{" "}
                        </td>
                        <td className="p-2 text-center">
                            {employee.first_name}{" "}
                            {employee.last_name}
                        </td>

                        <td className="p-2 text-center">
                            {employee.phone ?? "-"}
                        </td>
                          <td className="p-2 text-center">
                            {employee.national_id ?? "-"}
                        </td>
                        <td className="p-2 text-center">
                            <StatusBadge className="ml-2 text-xl" status={employee?.approval_status_id === 1 ? "approved" : "notApproved"} />
                        </td>
                        <td className="text-center">
                            <ThreeDotMenu>
                                <div className="py-0">
                                    <button
                                        className="
                                                    flex 
                                                    items-center 
                                                    w-full 
                                                    text-left 
                                                    px-4 
                                                    py-2 
                                                    text-sm 
                                                    text-gray-700 
                                                    hover:bg-gray-100
                                                    "
                                        onClick={() =>
                                            handleEdit(department)
                                        }
                                    >
                                        <Edit2 className="ml-2 text-xl" />

                                        {t("common.editInfo")}
                                    </button>

                                    <Link href={route('employees.educations', employee.id)} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <Book className="ml-2 text-xl"></Book>
                                        {t("education.educationPart")}

                                    </Link>
                                    {employee.approval_status_id === 2 &&
                                        <button
                                            className="
                                                    flex 
                                                    items-center 
                                                    w-full 
                                                    text-left 
                                                    px-4 
                                                    py-2 
                                                    text-sm 
                                                    text-gray-700 
                                                    hover:bg-gray-100
                                                    "
                                            onClick={() =>
                                                handleChangeStatus(employee)
                                            }
                                        >
                                            {loader ? (
                                                <Loader className="ml-2 text-xl animate-spin" />
                                            ) : (
                                                <StatusBadge className="ml-2 text-xl" status={employee?.approval_status_id === 1 ? "approved" : "notApproved"} />
                                            )}
                                        </button>}
                                </div>
                            </ThreeDotMenu>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </AuthenticatedLayout>
    );
}

export default Index;
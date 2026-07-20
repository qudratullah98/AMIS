import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Edit2, Trash2 } from "lucide-react";
import CreateEmployeeAssignment from "./Create";
// import EditEmployeeAssignment from "./Edit";

function Index({ employeeAssignments }) {
    const { t } = useTranslation();

    const [assignmentsData, setAssignmentsData] = useState(
        employeeAssignments?.data || [],
    );

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editableData, setEditableData] = useState(null);

    const paginationLinks = employeeAssignments?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("employee.employeeName") },
        { label: t("vacancy.position") },
        { label: t("employee.startDate") },
        { label: t("employee.endDate") },
        { label: t("employee.approvalStatus") },
        { label: t("common.action") },
    ];

    const handleEdit = (assignment) => {
        setEditableData(assignment);
        setEditModal(true);
    };

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("employee.employeeAssignmentsList")} />}
        >
            <SubHeader
                links={[
                    {
                        name: t("employee.employeeAssignmentsList"),
                    },
                ]}
            />

            {/* Create Modal */}
            {createModal && (
                <CustomModal
                    show={createModal}
                    handleClose={() => setCreateModal(false)}
                    title={t("employee.createEmployeeAssignment")}
                    size="large"
                    footer={false}
                    stopPropagation={false}
                >
                    <CreateEmployeeAssignment 
                        onSubmitSuccess={(newAssignment) => {
                            setCreateModal(false);
                            setAssignmentsData((prev) => [
                                newAssignment,
                                ...prev,
                            ]);
                        }}
                    />
                </CustomModal>
            )}

            {/* Edit Modal */}
            {editModal && (
                <CustomModal
                    show={editModal}
                    handleClose={() => setEditModal(false)}
                    title={t("employee.editEmployeeAssignment")}
                    size="large"
                    footer={false}
                    stopPropagation={false}
                >
                    {/* <EditEmployeeAssignment 
                        data={editableData}
                        onSubmitSuccess={(updatedAssignment) => {
                            setEditModal(false);
                            setAssignmentsData((prev) =>
                                prev.map((item) =>
                                    item.id === updatedAssignment.id
                                        ? updatedAssignment
                                        : item
                                )
                            );
                        }}
                    /> */}
                </CustomModal>
            )}

            <div className="mx-auto">
                <div
                    className="
                    overflow-hidden 
                    bg-white 
                    shadow-none 
                    sm:rounded-lg 
                    border 
                    border-gray-100 
                    dark:bg-gray-800
                "
                >
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("employee.employeeAssignmentsList")}
                            enableButton={true}
                            buttonLabel={t("employee.createEmployeeAssignment")}
                            onButtonClick={() => setCreateModal(true)}
                        >
                            {assignmentsData.map((assignment, index) => (
                                <tr
                                    key={assignment.id}
                                    className="hover:bg-slate-100"
                                >
                                    {/* No */}
                                    <td className="p-2 text-center">
                                        {index + 1}
                                    </td>

                                    {/* Employee Name */}
                                    <td className="p-2 text-center">
                                        {assignment.employee?.name ?? "-"}
                                    </td>

                                    {/* Vacancy Position */}
                                    <td className="p-2 text-center">
                                        {assignment.vacancy?.position ?? "-"}
                                    </td>

                                    {/* Start Date */}
                                    <td className="p-2 text-center">
                                        {assignment.start_date 
                                            ? new Date(assignment.start_date).toLocaleDateString() 
                                            : "-"}
                                    </td>

                                    {/* End Date */}
                                    <td className="p-2 text-center">
                                        {assignment.end_date 
                                            ? new Date(assignment.end_date).toLocaleDateString() 
                                            : "-"}
                                    </td>

                                    {/* Approval Status */}
                                    <td className="p-2 text-center">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            assignment.approval_status?.name === 'Approved' 
                                                ? 'bg-green-100 text-green-800'
                                                : assignment.approval_status?.name === 'Rejected'
                                                ? 'bg-red-100 text-red-800'
                                                : assignment.approval_status?.name === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {assignment.approval_status?.name ?? "-"}
                                        </span>
                                    </td>

                                    {/* Actions */}
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
                                                        handleEdit(assignment)
                                                    }
                                                >
                                                    <Edit2 className="ml-2 text-xl" />
                                                    {t("common.editInfo")}
                                                </button>

                                                <button
                                                    className="
                                                    flex 
                                                    items-center 
                                                    w-full 
                                                    text-left 
                                                    px-4 
                                                    py-2 
                                                    text-sm 
                                                    text-red-600 
                                                    hover:bg-gray-100
                                                    "
                                                    onClick={() => {
                                                        // Handle delete with confirmation
                                                        if (confirm(t("common.deleteConfirmation"))) {
                                                            // Delete logic here
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="ml-2 text-xl" />
                                                    {t("common.delete")}
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
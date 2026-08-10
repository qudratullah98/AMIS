import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";

import CreateCourse from "./Create";
import EditCourse from "./Edit";

import { Edit2, Trash2, Plus, BookOpen } from "lucide-react";

function Index({ courses }) {
    const { t } = useTranslation();

    const [data, setData] = useState(courses.data || []);
    const [links, setLinks] = useState(courses.links || []);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const columns = [
        { label: t("common.NO") },
        { label: t("education.courses.courseName") },
        { label: t("education.courses.courseType") },
        { label: t("education.courses.validityPeriod") },
        { label: t("common.action") },
    ];

    const handleCreateSuccess = (course) => {
        setCreateModal(false);
        setData((prev) => [course, ...prev]);
    };

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setEditModal(true);
    };

    const handleUpdateSuccess = (updatedCourse) => {
        setEditModal(false);
        setData((prev) =>
            prev.map((item) =>
                item.id === updatedCourse.id ? updatedCourse : item,
            ),
        );
        setSelectedCourse(null);
    };

    const handleDelete = (course) => {
        if (confirm(t("common.confirmDelete"))) {
            router.delete(route("courses.destroy", course.id), {
                onSuccess: () => {
                    setData((prev) =>
                        prev.filter((item) => item.id !== course.id),
                    );
                },
            });
        }
    };
    console.log("Courses Data:", data);
    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("education.courses.courses")} />}
        >
            <SubHeader
                links={[
                    {
                        name: t("education.courses.courses"),
                    },
                ]}
            />

            {/* Create Modal */}
            <CustomModal
                show={createModal}
                handleClose={() => setCreateModal(false)}
                title={t("education.courses.addNewCourse")}
                footer={false}
                size="large"
                stopPropagation={false}
            >
                <CreateCourse
                    onSubmitSuccess={handleCreateSuccess}
                    onCancel={() => setCreateModal(false)}
                />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal
                show={editModal}
                handleClose={() => {
                    setEditModal(false);
                    setSelectedCourse(null);
                }}
                title={t("education.courses.editCourse")}
                footer={false}
                size="large"
            >
                {selectedCourse && (
                    <EditCourse
                        course={selectedCourse}
                        onSubmitSuccess={handleUpdateSuccess}
                        onCancel={() => {
                            setEditModal(false);
                            setSelectedCourse(null);
                        }}
                    />
                )}
            </CustomModal>

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={courses.links}
                            header={t("education.courses.courseList")}
                            enableButton
                            buttonLabel={t("education.courses.addNewCourse")}
                            onButtonClick={() => setCreateModal(true)}
                            icon={<BookOpen className="w-4 h-4" />}
                        >
                            {data.map((course, a) => (
                                <tr
                                    key={course.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-3 text-center text-sm">
                                        {a + 1}
                                    </td>

                                    <td className="p-3 text-center text-bold font-medium text-gray-900">
                                        {course.name}
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                            {course.course_type?.name || "N/A"}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center text-sm">
                                        <span className="flex items-center justify-center gap-1">
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            {course.validity_months}m
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <ThreeDotMenu>
                                            <div className="py-0">
                                                <button
                                                    className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                    onClick={() =>
                                                        handleEdit(course)
                                                    }
                                                >
                                                    <Edit2 className="mr-2 h-4 w-4" />
                                                    {t("common.edit")}
                                                </button>
                                                <button
                                                    className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    onClick={() =>
                                                        handleDelete(course)
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
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

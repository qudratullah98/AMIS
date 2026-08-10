import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";

import CreateTrainingPlan from "./Create";
import EditTrainingPlan from "./Edit";

import {
    Edit2,
    Trash2,
    Plus,
    Calendar,
    MapPin,
    User,
    BookOpen,
    Clock,
} from "lucide-react";

function Index({ trainingPlans }) {
    const { t } = useTranslation();

    const [data, setData] = useState(trainingPlans.data || []);
    const [links, setLinks] = useState(trainingPlans.links || []);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedTrainingPlan, setSelectedTrainingPlan] = useState(null);

    const getStatusBadge = (status) => {
        const colors = {
            planned: "bg-blue-100 text-blue-800",
            in_progress: "bg-yellow-100 text-yellow-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        const labels = {
            planned: t("education.trainingPlans.statuses.planned"),
            in_progress: t("education.trainingPlans.statuses.in_progress"),
            completed: t("education.trainingPlans.statuses.completed"),
            cancelled: t("education.trainingPlans.statuses.cancelled"),
        };
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}
            >
                {labels[status] || status}
            </span>
        );
    };

    const columns = [
        { label: t("common.NO") },
        { label: t("education.trainingPlans.name") },
        { label: t("education.trainingPlans.course") },
        { label: t("education.trainingPlans.trainer") },
        { label: t("education.trainingPlans.period") },
        { label: t("education.trainingPlans.location") },
        { label: t("education.trainingPlans.status") },
        { label: t("common.action") },
    ];

    const handleCreateSuccess = (trainingPlan) => {
        setCreateModal(false);
        setData((prev) => [trainingPlan, ...prev]);
    };

    const handleEdit = (trainingPlan) => {
        setSelectedTrainingPlan(trainingPlan);
        setEditModal(true);
    };

    const handleUpdateSuccess = (updatedTrainingPlan) => {
        setEditModal(false);
        setData((prev) =>
            prev.map((item) =>
                item.id === updatedTrainingPlan.id ? updatedTrainingPlan : item,
            ),
        );
        setSelectedTrainingPlan(null);
    };

    const handleDelete = (trainingPlan) => {
        if (confirm(t("common.confirmDelete"))) {
            router.delete(route("training-plans.destroy", trainingPlan.id), {
                onSuccess: () => {
                    setData((prev) =>
                        prev.filter((item) => item.id !== trainingPlan.id),
                    );
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <SubHeader title={t("education.trainingPlans.trainingPlans")} />
            }
        >
            <SubHeader
                links={[
                    {
                        name: t("education.trainingPlans.trainingPlans"),
                    },
                ]}
            />

            {/* Create Modal */}
            <CustomModal
                show={createModal}
                handleClose={() => setCreateModal(false)}
                title={t("education.trainingPlans.createTrainingPlan")}
                footer={false}
                size="large"
                stopPropagation={false}
            >
                <CreateTrainingPlan
                    onSubmitSuccess={handleCreateSuccess}
                    onCancel={() => setCreateModal(false)}
                />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal
                show={editModal}
                handleClose={() => {
                    setEditModal(false);
                    setSelectedTrainingPlan(null);
                }}
                title={t("education.trainingPlans.editTrainingPlan")}
                footer={false}
                size="large"
            >
                {selectedTrainingPlan && (
                    <EditTrainingPlan
                        trainingPlan={selectedTrainingPlan}
                        onSubmitSuccess={handleUpdateSuccess}
                        onCancel={() => {
                            setEditModal(false);
                            setSelectedTrainingPlan(null);
                        }}
                    />
                )}
            </CustomModal>

            <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={trainingPlans.links}
                            header={t("education.trainingPlans.trainingPlans")}
                            enableButton
                            buttonLabel={t(
                                "education.trainingPlans.createTrainingPlan",
                            )}
                            onButtonClick={() => setCreateModal(true)}
                        >
                            {data.map((plan) => (
                                <tr
                                    key={plan.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-3 text-center text-sm">
                                        #{plan.id}
                                    </td>
                                    <td className="p-3 text-left font-medium text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {plan.name}
                                        </div>
                                    </td>
                                    <td className="p-3 text-left">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm">
                                                {plan.course?.name || "N/A"}
                                                {plan.course?.code && (
                                                    <span className="text-gray-400 text-xs ml-1">
                                                        ({plan.course.code})
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-left">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-green-500" />
                                            <span className="text-sm">
                                                {plan.trainer?.name || "N/A"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="text-xs text-gray-500">
                                                {plan.start_date &&
                                                plan.end_date ? (
                                                    <>
                                                        <span>
                                                            {new Date(
                                                                plan.start_date,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                        <span className="mx-1">
                                                            →
                                                        </span>
                                                        <span>
                                                            {new Date(
                                                                plan.end_date,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </div>
                                            {plan.duration_days && (
                                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {plan.duration_days}{" "}
                                                    {t(
                                                        "education.trainingPlans.days",
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        {plan.location ? (
                                            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                {plan.location}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-sm">
                                                —
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 text-center">
                                        {getStatusBadge(plan.status)}
                                    </td>
                                    <td className="text-center">
                                        <ThreeDotMenu>
                                            <div className="py-0">
                                                <button
                                                    className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                    onClick={() =>
                                                        handleEdit(plan)
                                                    }
                                                >
                                                    <Edit2 className="mr-2 h-4 w-4" />
                                                    {t("common.edit")}
                                                </button>
                                                <button
                                                    className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    onClick={() =>
                                                        handleDelete(plan)
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

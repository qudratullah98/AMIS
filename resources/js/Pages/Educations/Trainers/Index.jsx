import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";

import CreateTrainer from "./Create";
import EditTrainer from "./Edit";

import { Edit2, Trash2, User, Mail, Phone, Building2, Award } from "lucide-react";

function Index({ trainers }) {
    const { t } = useTranslation();

    const [data, setData] = useState(trainers.data || []);
    const [links, setLinks] = useState(trainers.links || []);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);

    const columns = [
        { label: t("common.NO") },
        { label: t("education.trainers.name") },
        { label: t("education.trainers.type") },
        { label: t("education.trainers.phone") },
        { label: t("education.trainers.organization") },
        { label: t("education.trainers.licenseNumber") },
        { label: t("common.action") },
    ];

    const getTypeBadge = (type) => {
        const colors = {
            internal: 'bg-blue-100 text-blue-800',
            external: 'bg-green-100 text-green-800',
            consultant: 'bg-purple-100 text-purple-800',
        };
        const labels = {
            internal: t('education.trainers.types.internal'),
            external: t('education.trainers.types.external'),
            consultant: t('education.trainers.types.consultant'),
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[type] || 'bg-gray-100 text-gray-800'}`}>
                {labels[type] || type}
            </span>
        );
    };

    const handleCreateSuccess = (trainer) => {
        setCreateModal(false);
        setData((prev) => [trainer, ...prev]);
    };

    const handleEdit = (trainer) => {
        setSelectedTrainer(trainer);
        setEditModal(true);
    };

    const handleUpdateSuccess = (updatedTrainer) => {
        setEditModal(false);
        setData((prev) =>
            prev.map((item) =>
                item.id === updatedTrainer.id ? updatedTrainer : item
            )
        );
        setSelectedTrainer(null);
    };

    const handleDelete = (trainer) => {
        if (confirm(t("common.confirmDelete"))) {
            router.delete(route('trainers.destroy', trainer.id), {
                onSuccess: () => {
                    setData((prev) => prev.filter((item) => item.id !== trainer.id));
                },
                onError: (errors) => {
                    alert(errors.message || t('common.deleteError'));
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <SubHeader title={t("education.trainers.trainers")} />
            }
        >
            <SubHeader
                links={[
                    {
                        name: t("education.trainers.trainers"),
                    },
                ]}
            />

            {/* Create Modal */}
            <CustomModal
                show={createModal}
                handleClose={() => setCreateModal(false)}
                title={t("education.trainers.createTrainer")}
                footer={false}
                size="medium"
                stopPropagation={false}
            >
                <CreateTrainer
                    onSubmitSuccess={handleCreateSuccess}
                    onCancel={() => setCreateModal(false)}
                />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal
                show={editModal}
                handleClose={() => {
                    setEditModal(false);
                    setSelectedTrainer(null);
                }}
                title={t("education.trainers.editTrainer")}
                footer={false}
                size="medium"
            >
                {selectedTrainer && (
                    <EditTrainer
                        trainer={selectedTrainer}
                        onSubmitSuccess={handleUpdateSuccess}
                        onCancel={() => {
                            setEditModal(false);
                            setSelectedTrainer(null);
                        }}
                    />
                )}
            </CustomModal>


 <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
<DataTable
                columns={columns}
                links={trainers.links}
                header={t("education.trainers.trainers")}
                enableButton
                buttonLabel={t("education.trainers.createTrainer")}
                onButtonClick={() => setCreateModal(true)}
            >
                {data.map((trainer) => (
                    <tr key={trainer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 text-center text-sm">
                            {trainer.id}
                        </td>
                        <td className="p-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{trainer.name}</p>
                                    {trainer.email && (
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {trainer.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </td>
                        <td className="p-3 text-center">
                            {getTypeBadge(trainer.type)}
                        </td>
                        <td className="p-3">
                            {trainer.phone && (
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    {trainer.phone}
                                </div>
                            )}
                            {!trainer.phone && (
                                <span className="text-gray-400 text-sm">—</span>
                            )}
                        </td>
                        <td className="p-3 text-center">
                            {trainer.organization ? (
                                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                    <Building2 className="w-4 h-4 text-gray-400" />
                                    {trainer.organization}
                                </div>
                            ) : (
                                <span className="text-gray-400 text-sm">—</span>
                            )}
                        </td>
                        <td className="p-3 text-center">
                            {trainer.license_number ? (
                                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                    <Award className="w-4 h-4 text-gray-400" />
                                    {trainer.license_number}
                                </div>
                            ) : (
                                <span className="text-gray-400 text-sm">—</span>
                            )}
                        </td>
                        <td className="text-center">
                            <ThreeDotMenu>
                                <div className="py-0">
                                    <button
                                        className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => handleEdit(trainer)}
                                    >
                                        <Edit2 className="mr-2 h-4 w-4" />
                                        {t("common.edit")}
                                    </button>
                                    <button
                                        className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        onClick={() => handleDelete(trainer)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        {t("common.delete")}
                                    </button>
                                </div>
                            </ThreeDotMenu>
                        </td>
                    </tr>
                ))}
            </DataTable></div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

export default Index;

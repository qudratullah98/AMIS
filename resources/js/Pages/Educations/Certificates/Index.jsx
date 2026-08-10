import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";

import CreateCertificate from "./Create";
import EditCertificate from "./Edit";

import { Edit2, Trash2 } from "lucide-react";

function Index({ certificates }) {
    const { t } = useTranslation();

    const [data, setData] = useState(certificates?.data || []);

    const [createModal, setCreateModal] = useState(false);

    const [editModal, setEditModal] = useState(false);

    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const columns = [
        {
            label: t("common.NO"),
        },
        {
            label: t("education.certificateName"),
        },
        {
            label: t("education.certificateLevel"),
        },
        {
            label: t("common.action"),
        },
    ];

    console.log("certificates:", certificates);
    console.log("certificate data:", certificates?.data);

    /*
     * ============================================================
     * CREATE
     * ============================================================
     */
    const handleCreateSuccess = (certificate) => {
        setCreateModal(false);

        if (!certificate) {
            return;
        }

        setData((prev) => [certificate, ...prev]);
    };

    /*
     * ============================================================
     * EDIT
     * ============================================================
     */
    const handleEdit = (certificate) => {
        setSelectedCertificate(certificate);
        setEditModal(true);
    };

    /*
     * ============================================================
     * UPDATE
     * ============================================================
     */
    const handleUpdateSuccess = (updatedCertificate) => {
        setEditModal(false);

        if (!updatedCertificate) {
            setSelectedCertificate(null);
            return;
        }

        setData((prev) =>
            prev.map((item) =>
                item.id === updatedCertificate.id ? updatedCertificate : item,
            ),
        );

        setSelectedCertificate(null);
    };

    /*
     * ============================================================
     * DELETE
     * ============================================================
     */
    const handleDelete = (certificate) => {
        if (!certificate?.id) {
            return;
        }

        if (!confirm(t("common.confirmDelete"))) {
            return;
        }

        router.delete(route("certificates.destroy", certificate.id), {
            preserveScroll: true,

            onSuccess: () => {
                setData((prev) =>
                    prev.filter((item) => item.id !== certificate.id),
                );
            },

            onError: (errors) => {
                console.error("Certificate delete error:", errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("education.certificates")} />}
        >
            {/* =====================================================
                PAGE HEADER
            ====================================================== */}
            <SubHeader
                links={[
                    {
                        name: t("education.certificates"),
                    },
                ]}
            />

            {/* =====================================================
                CREATE MODAL
            ====================================================== */}
            <CustomModal
                show={createModal}
                handleClose={() => setCreateModal(false)}
                title={t("education.createCertificate")}
                footer={false}
                size="medium"
                stopPropagation={false}
            >
                <CreateCertificate
                    onSubmitSuccess={handleCreateSuccess}
                    onCancel={() => setCreateModal(false)}
                />
            </CustomModal>

            {/* =====================================================
                EDIT MODAL
            ====================================================== */}
            <CustomModal
                show={editModal}
                handleClose={() => {
                    setEditModal(false);
                    setSelectedCertificate(null);
                }}
                title={t("education.editCertificate")}
                footer={false}
                size="medium"
                stopPropagation={false}
            >
                {selectedCertificate && (
                    <EditCertificate
                        certificate={selectedCertificate}
                        onSubmitSuccess={handleUpdateSuccess}
                        onCancel={() => {
                            setEditModal(false);
                            setSelectedCertificate(null);
                        }}
                    />
                )}
            </CustomModal>

            {/* =====================================================
                DATA TABLE
            ====================================================== */}


             <div className="mx-auto">
                <div className="overflow-hidden bg-white shadow-none sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100">
                         <DataTable
                columns={columns}
                links={certificates?.links || []}
                header={t("education.certificates")}
                enableButton
                buttonLabel={t("education.createCertificate")}
                onButtonClick={() => setCreateModal(true)}
            >
                {data && data.length > 0 ? (
                    data.map((certificate, a) => (
                        <tr key={certificate.id} className="hover:bg-gray-50">
                            {" "}
                            <td className="p-2 text-center">
                                {" "}
                                {a + 1}{" "}
                            </td>{" "}
                            <td className="p-2 text-center">
                                {" "}
                                {certificate.name}{" "}
                            </td>{" "}
                            <td className="p-2 text-center">
                                {" "}
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {" "}
                                    {certificate.level || "-"}{" "}
                                </span>{" "}
                            </td>{" "}
                            <td className="text-center">
                                {" "}
                                <ThreeDotMenu>
                                    {" "}
                                    <div className="py-0">
                                        {" "}
                                        {/* Edit */}{" "}
                                        <button
                                            type="button"
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => {
                                                setSelectedCertificate(
                                                    certificate,
                                                );
                                                setEditModal(true);
                                            }}
                                        >
                                            {" "}
                                            <Edit2 className="ml-2 text-xl" />{" "}
                                            {t("common.editInfo")}{" "}
                                        </button>{" "}
                                        {/* Delete */}{" "}
                                        <button
                                            type="button"
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            onClick={() =>
                                                handleDelete(certificate)
                                            }
                                        >
                                            {" "}
                                            <Trash2 className="ml-2 text-xl" />{" "}
                                            {t("common.delete")}{" "}
                                        </button>{" "}
                                    </div>{" "}
                                </ThreeDotMenu>{" "}
                            </td>{" "}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length}
                            className="p-6 text-center text-gray-500"
                        >
                            {t("common.noInfoFound")}
                        </td>
                    </tr>
                )}
            </DataTable>
</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;

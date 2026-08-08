// Pages/EmployeeEducation/EmployeeEducation.jsx

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";
import useTabStore from "@/stores/tabStore";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";

import EducationTab from "./EducationTab";
import CertificateTab from "./CertificateTab";
import TrainingTab from "./TrainingTab";
import CreateEducation from "./CreateEducation";
import CreateCertificate from "./CreateCertificate";
import Breadcrumbs from "@/Components/Breadcrumbs";
import GoBackButton from "@/Components/GoBackButton";

export default function EmployeeEducation({ employee }) {
    const { t } = useTranslation();
    const { activeTab, changeTab } = useTabStore();

    const [showEducationCreateModal, setShowEducationCreateModal] =
        React.useState(false);

    const [showCertificateCreateModal, setShowCertificateCreateModal] =
        React.useState(false);

    /*
     * Set the default tab when this page is opened.
     *
     * This is important because Header.jsx controls the tabs
     * using these exact keys:
     *
     * employee-education
     * employee-certificates
     * employee-trainings
     */
    useEffect(() => {
        if (
            ![
                "employee-education",
                "employee-certificates",
                "employee-trainings",
            ].includes(activeTab)
        ) {
            changeTab("employee-education");
        }
    }, [activeTab, changeTab]);

    /*
     * Render the content according to the tab selected
     * from Header.jsx.
     */
    const renderContent = () => {
        switch (activeTab) {
            case "employee-education":
                return (
                    <EducationTab
                        employee={employee}
                        onOpenEducationModel={() => {
                            setShowEducationCreateModal(true);
                        }}
                    />
                );

            case "employee-certificates":
                return (
                    <CertificateTab
                        employee={employee}
                        onOpenCertificateModel={() => {
                            setShowCertificateCreateModal(true);
                        }}
                    />
                );

            case "employee-trainings":
                return <TrainingTab employee={employee} />;

            default:
                return (
                    <EducationTab
                        employee={employee}
                        onOpenEducationModel={() => {
                            setShowEducationCreateModal(true);
                        }}
                    />
                );
        }
    };

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("education.employeeEducation")} />}
        >
            {/* Page breadcrumb/header */}

            <div className="flex items-center justify-between mx-0  ">
                <Breadcrumbs
                    links={[
                        { name: t("common.dashboard"), href: "/" },
                        {
                            name: t("tashkilat.employees"),
                            href: route("employees.index"),
                        },
                        { name: t("education.employeeEducation") },
                    ]}
                />
                <GoBackButton />
            </div>

            {/* =====================================================
                CREATE EDUCATION MODAL
            ====================================================== */}
            <CustomModal
                show={showEducationCreateModal}
                handleClose={() => setShowEducationCreateModal(false)}
                stopPropagation={false}
                footer={false}
            >
                <CreateEducation
                    employee={employee}
                    educationLevels={[]}
                    onClose={() => setShowEducationCreateModal(false)}
                />
            </CustomModal>

            {/* =====================================================
                CREATE CERTIFICATE MODAL
            ====================================================== */}
            <CustomModal
                show={showCertificateCreateModal}
                handleClose={() => setShowCertificateCreateModal(false)}
                stopPropagation={false}
                footer={false}
            >
                <CreateCertificate
                    employee={employee}
                    educationLevels={[]}
                    onClose={() => setShowCertificateCreateModal(false)}
                />
            </CustomModal>

            {/* =====================================================
                EMPLOYEE INFORMATION
            ====================================================== */}
            <div className="p-0 mx-auto">
                <div className="bg-white rounded-lg p-4 mb-1 shadow-none border border-gray-200">
                    <div className="flex items-start justify-between gap-6">
                        {/* Employee Main Information */}
                        <div className="flex-1">
                            {/* Name */}
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {employee?.first_name ||
                                        t("common.employee")}{" "}
                                    {employee?.last_name || ""}
                                </h2>

                                {/* Status */}
                                {/* <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                        employee?.status
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {employee?.status
                                        ? t("state.active")
                                        : t("state.inactive")}
                                </span> */}
                            </div>

                            {/* Employee Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3 mt-4 text-sm">
                                {/* Father Name */}
                                {employee?.father_name && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("tashkilat.employee.fatherName")}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.father_name}
                                        </p>
                                    </div>
                                )}

                                {/* Gender */}
                                {employee?.gender && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("tashkilat.employee.gender")}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.gender}
                                        </p>
                                    </div>
                                )}

                                {/* National ID */}
                                {employee?.national_id && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("tashkilat.employee.nationalId")}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.national_id}
                                        </p>
                                    </div>
                                )}

                                {/* Phone */}
                                {employee?.phone && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("employee.phone")}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.phone}
                                        </p>
                                    </div>
                                )}

                                {/* Email */}
                                {employee?.email && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("tashkilat.employee.email")}
                                        </p>
                                        <p className="font-medium text-gray-700 break-all">
                                            {employee.email}
                                        </p>
                                    </div>
                                )}

                                {/* Birth Date */}
                                {employee?.birth_date && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("tashkilat.employee.birthDate")}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.birth_date}
                                        </p>
                                    </div>
                                )}

                                {/* Marital Status */}
                                {employee?.marital_status && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t(
                                                "tashkilat.employee.maritalStatus",
                                            )}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.marital_status}
                                        </p>
                                    </div>
                                )}

                                {/* Address */}
                                {employee?.address && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("tashkilat.employee.address")}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.address}
                                        </p>
                                    </div>
                                )}

                                {/* Province */}
                                {employee?.province && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("tashkilat.employee.province")}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.province}
                                        </p>
                                    </div>
                                )}

                                {/* District */}
                                {employee?.district && (
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">
                                            {t("tashkilat.employee.district")}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {employee.district}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* =================================================
                                    TAB CONTENT

                                    The actual tab buttons are in Header.jsx.

                                    Header.jsx calls:

                                    changeTab("employee-education")
                                    changeTab("employee-certificates")
                                    changeTab("employee-trainings")

                                    This component renders the selected content.
                                ================================================== */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 min-h-[200px]">
                    <div className="animate-fadeIn">{renderContent()}</div>
                </div>
            </div>

            {/* =====================================================
                FADE ANIMATION
            ====================================================== */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}

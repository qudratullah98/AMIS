import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  BookOpen,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SubHeader from "@/Components/SubHeader";

import EducationTab from "./EducationTab";
import CertificateTab from "./CertificateTab";
import TrainingTab from "./TrainingTab";
import CreateEducation from "./CreateEducation";
import CustomModal from "@/Components/CustomModal";
import CreateCertificate from "./CreateCertificate";

export default function EmployeeEducation({ employee }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("education");
  const [showEducationCreateModal, setShowEducationCreateModal] = useState(false);
  const [showCertificateCreateModal, setShowCertificateCreateModal] = useState(false);

  const tabs = [
    {
      key: "education",
      label: t("education.education"),
      icon: GraduationCap,
      color: "blue",
    },
    {
      key: "certificates",
      label: t("education.certificates"),
      icon: Award,
      color: "purple",
    },
    {
      key: "trainings",
      label: t("education.trainings"),
      icon: BookOpen,
      color: "green",
    },
  ];

  const getTabStyles = (tabKey) => {
    const isActive = activeTab === tabKey;

    const baseStyles = {
      trainings: {
        active: "bg-blue-50 text-blue-700 border-blue-200",
        inactive: "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
        iconActive: "text-blue-600",
        iconInactive: "text-gray-400",
      },
      certificates: {
        active: "bg-purple-50 text-purple-700 border-purple-200",
        inactive: "text-gray-600 hover:text-purple-600 hover:bg-purple-50",
        iconActive: "text-purple-600",
        iconInactive: "text-gray-400",
      },
      education: {
        active: "bg-green-50 text-green-700 border-green-200",
        inactive: "text-gray-600 hover:text-green-600 hover:bg-green-50",
        iconActive: "text-green-600",
        iconInactive: "text-gray-400",
      },
    };

    return baseStyles[tabKey] || baseStyles.education;
  };

  const renderTab = () => {
    switch (activeTab) {
      case "education":
        return <EducationTab employee={employee} onOpenEducationModel={() => { setShowEducationCreateModal(true);  }} />;
      case "certificates":
        return <CertificateTab employee={employee} onOpenCertificateModel={() => { setShowCertificateCreateModal(true);console.log("onOpenCertificateModel");  }} />;
      case "trainings":
        return <TrainingTab employee={employee} />;
      default:
        return null;
    }
  };
 
  return (
    <AuthenticatedLayout
      header={
        <SubHeader
          title={t("education.employeeEducation")}
        />
      }
    >
      <SubHeader
        links={[
          {
            name: t("education.employeeEducation")
          }
        ]}
      />
      <CustomModal
        show={showEducationCreateModal}
        handleClose={() => setShowEducationCreateModal(false)}
        stopPropagation={false}
      >
        <CreateEducation
          employee={employee}
          educationLevels={[]} // Pass the education levels if available
          onClose={() => setShowEducationCreateModal(false)}
        />
      </CustomModal>

      <CustomModal
        show={showCertificateCreateModal}
        handleClose={() => setShowCertificateCreateModal(false)}
        stopPropagation={false}
      >
        <CreateCertificate
          employee={employee}
          educationLevels={[]} // Pass the education levels if available
          onClose={() => setShowCertificateCreateModal(false)}
        />
      </CustomModal>

      <div className="p-6 mx-auto">
        {/* Employee Info Card */}
        {/* Employee Info Card */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-500" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {employee?.first_name || t("common.employee")}
              </h2>

              <div className="flex flex-wrap items-center gap-5 mt-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>
                    {employee?.email || "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>
                    {employee?.phone || "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {tabs.length}
                </div>

                <div className="text-sm text-gray-500">
                  {t("common.total")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="flex flex-wrap gap-1 p-3 bg-gray-50/50 border-b border-gray-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const styles = getTabStyles(tab.key);
              const isActive = activeTab === tab.key;
              const currentStyles = isActive ? styles.active : styles.inactive;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                                        flex items-center gap-2.5
                                        px-5 py-2.5
                                        rounded-xl
                                        text-sm font-medium
                                        transition-all duration-200
                                        border-2 border-transparent
                                        ${currentStyles}
                                        ${isActive ? "border-current shadow-sm" : ""}
                                        hover:scale-[1.02]
                                        focus:outline-none focus:ring-2 focus:ring-offset-1
                                        ${isActive ? `focus:ring-${tab.color}-500` : "focus:ring-gray-300"}
                                    `}
                >
                  <Icon
                    className={`
                                            w-5 h-5 
                                            transition-colors duration-200
                                            ${isActive ? styles.iconActive : styles.iconInactive}
                                        `}
                  />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="ml-1 w-1.5 h-1.5 rounded-full bg-current"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Indicator */}

        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
          <div className="animate-fadeIn">
            {renderTab()}
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
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
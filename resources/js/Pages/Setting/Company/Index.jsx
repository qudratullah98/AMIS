import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Bus, Car, Edit2, GitBranch, Verified } from "lucide-react";
import StatusBadge from "@/Components/StatusBadge";
import toast from "react-hot-toast";
import EditCompany from "./Edit";
import { convertToShamsi } from "@/Components/utils/ConvertDate";
import { useTranslation } from "react-i18next";
import DocumentPreviewCard from "@/Components/DocumentPreviewCard";

function Index({ company }) { 
    const data = company?.data || [];
    const paginationLinks = company?.meta?.links || [];
    const { t } = useTranslation();
    const { permissions } = usePage().props.auth;
    const columns = [
        { label: t("NO") },
        { label: t("companyName") },
  
        { label: t("lisenceNumber") },
        { label: t("lisenseStartDate") },
        { label: t("lisenseEndDate") },
        { label: t("TIN") },
        { label: t("documents") },
        { label: t("descriptions") },
        { label: t("status") },
        { label: t("action") },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [pagination, setPagination] = useState(paginationLinks);
    const [companyList, setCompany] = useState(data);

    const [loading, setLoading] = useState(false);
    const [editable, seteEitable] = useState(null);
    const verification = async (model, item) => {
        setLoading(true); // Disable button
        try {
            const response = await axios.post(route("verification"), {
                model: model,
                item: item,
            });

            // Update local state with the verified item
            if (response?.data?.data) {
                const updatedVehicle = response.data.data;
                setCompany((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id
                            ? updatedVehicle
                            : vehicle
                    )
                );
                toast.success(t('upprovedSuccessfully'));
            }
        } catch (error) {
            console.error("Error submitting verification:", error);
            toast.error("Failed to approve");
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    const handleEdit = (response) => {
        try {
            setModalOpen(false);
            if (response.data) {
                const updatedVehicle = response.data;
                setCompany((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id
                            ? updatedVehicle
                            : vehicle
                    )
                );
            }
        } catch (error) {
            console.error("Error submitting verification:", error);
        }
    };

    return (
        <AuthenticatedLayout header={<SubHeader title="لیست شرکت ها" />}>
            {/* <SubHeader title={t("companiesList")} /> */}
            {modalOpen && (
                <CustomModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    title={t("changeCompanyInfo")}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <EditCompany
                        editable={editable}
                        handleEdit={(data) => handleEdit(data)}

                    ></EditCompany>
                </CustomModal>
            )}

            <Head title="Vehicle Type" />


                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 pb-20 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={pagination}
                                AddButtonPath={route("setting.company.create")}
                                header={t("companiesList")}
                                buttonLabel={t("newCompany")}
                                addButton={permissions.includes("manageCompany")}
                            >
                                {companyList.map((item, i) => {
                                    return (
                                        <tr className="hover:bg-slate-100" key={i}>
                                            <td className="p-2 text-center">{i + 1}</td>
                                            <td className="p-2 text-center">
                                                {item.company_name}
                                            </td>
                                       
                                            <td className="p-2 text-center">
                                                {item.license_number}
                                            </td>
                                            <td className="p-2 text-center">
                                                {item.license_start_date && convertToShamsi(item.license_start_date)}
                                            </td>

                                            <td className="p-2 text-center">
                                                {item.license_end_date && (new Date(item.license_end_date) > Date() ? <span className="text-red-500">{convertToShamsi(item.license_end_date)}</span> : <span className="text-blue-500">{convertToShamsi(item.license_end_date)}</span>)}
                                            </td>
                                            <td className="p-2 text-center">
                                                {item.tin}
                                            </td>
                                            <td className="p-2 text-center" style={{ verticalAlign: 'middle' }}>
                                                <div className="flex justify-center items-center">
                                                    {item.file && <DocumentPreviewCard fileUrl={item.file} />}
                                                </div>
                                            </td>
                                            <td className="p-2 text-center">
                                                {item.descriptions}
                                            </td>
                                            <td className="p-2 text-center">
                                                <StatusBadge
                                                    status={
                                                        item.is_approved == 1
                                                            ? "approved"
                                                            : "notApproved"
                                                    }
                                                ></StatusBadge>
                                                { }
                                            </td>

                                            <td className="p-2 text-center">
                                                <ThreeDotMenu>
                                                    <div
                                                        className="py-1"
                                                        role="menu"
                                                        aria-orientation="vertical"
                                                        aria-labelledby="options-menu"
                                                    >
                                                        {/* Confirm button */}
                                                        {(item.is_approved == 0 && permissions.includes('manageCompany')) && (
                                                            <button
                                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={() => verification("Company", item.id)}
                                                                disabled={loading}
                                                            >
                                                                <span className="ml-2 text-xl">
                                                                    <Verified />
                                                                </span>
                                                                تایید
                                                            </button>
                                                        )}

                                                        {/* Edit button */}
                                                        {permissions.includes('manageCompany') && (
                                                            <button
                                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={() => {
                                                                    seteEitable(item);
                                                                    setModalOpen(true);
                                                                }}
                                                            >
                                                                <span className="ml-2 text-xl">
                                                                    <Edit2 />
                                                                </span>
                                                                {t('editInfo')}
                                                            </button>
                                                        )}

                                                        {/* Vehicle and Branches */}
                                                        {item.is_approved == 1 && (
                                                            <>
                                                                {permissions.includes('viewCompanyVehicles') && (
                                                                    <Link
                                                                        href={`/setting/company/${item.id}/vehicles`}
                                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                    >
                                                                        <span className="ml-2 text-xl">
                                                                            <Bus />
                                                                        </span>
                                                                        {t('largeVehicles')}
                                                                    </Link>
                                                                )}
                                                                 

                                                                {permissions.includes('viewCompanyBranches') && (
                                                                    <Link
                                                                        href={`/setting/company/${item.id}/branches`}
                                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                    >
                                                                        <span className="ml-2 text-xl">
                                                                            <GitBranch />
                                                                        </span>
                                                                        {t('branches')}
                                                                    </Link>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </ThreeDotMenu>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </DataTable>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

export default Index;

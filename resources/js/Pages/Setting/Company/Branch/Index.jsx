import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Edit2, Verified } from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/Components/StatusBadge";
import { useTranslation } from "react-i18next";

function Index({ branches, company }) {
    const data = branches?.data || [];
    const paginationLinks = branches?.links || [];
    const {t}=useTranslation()
    const columns = [
        { label: t("NO") },
        { label: t("location") },
        { label: t("status") },
        { label: t("action") },
    ];

    const [pagination, setPagination] = useState(paginationLinks);
    const [company_vehicles, setcompany_vehicles] = useState(data);

    const [loading, setLoading] = useState(false);
    const verification = async (model, item) => {
        setLoading(true); // Disable button
        try {
            const response = await axios.post(route('verification'), {
                model: model,
                item: item,
            });

            // Update local state with the verified item
            if (response.data.data) {
                const updatedVehicle = response.data.data;
                setcompany_vehicles((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
                    )
                );
                toast.success(t('upprovedSuccessfully'));
            }
        } catch (error) {
            console.error('Error submitting verification:', error);
            toast.error("Failed to approve");
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <Head
                    title={`لسیت وسایط شرکت ${company.company_name}`}
                />
            }
        >
            {/* <SubHeader title={`${company.company_name}  ${t('companyBranches')} `} /> */}


            <Head title="Vehicle Type" />

                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={pagination}
                                AddButtonPath={route(
                                    "setting.company.branch.create",
                                    company.id
                                )}
                                header={t("companyBranches")}
                                buttonLabel={t("addBranch")}
                            >
                                {company_vehicles.map((item, i) => {
                                    return (
                                        <tr
                                            className="hover:bg-slate-100"
                                            key={i}
                                        >
                                            <td className="p-2 text-center">
                                                {i+1}
                                            </td>
                                            <td className="p-2 text-center">
                                                {item.location.province}
                                            </td>


                                            <td className="p-2 text-center"><StatusBadge status={item.is_approved==1 ?"approved":'notApproved'}></StatusBadge>{}</td>

                                            <td className="p-2 text-center">
                                                <ThreeDotMenu>
                                                    <div
                                                        className="py-1"
                                                        role="menu"
                                                        aria-orientation="vertical"
                                                        aria-labelledby="options-menu"
                                                    >
                                                        {/* Confirm button */}
                                                        <button
                                                            className="flex items-center w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() =>
                                                                verification(
                                                                    "Branch",
                                                                    item.id
                                                                )
                                                            }
                                                            disabled={loading}
                                                        >
                                                            <span className="ml-2 text-xl">
                                                                <Verified />
                                                            </span>
                                                            تایید
                                                        </button>

                                                        {/* Edit button */}
                                                        <Link

                                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            <span className="ml-2 text-xl">
                                                                <Edit2 />
                                                            </span>
                                                            تغیر دادن
                                                        </Link>
                                                    </div>
                                                </ThreeDotMenu>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </DataTable>
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}

export default Index;

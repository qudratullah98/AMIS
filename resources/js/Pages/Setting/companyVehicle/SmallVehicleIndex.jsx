import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Ban, Clock, Edit, Edit2, LoaderIcon, Verified } from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/Components/StatusBadge";
import ImageWithFallback from "@/Components/ImageWithFallback";
import { useTranslation } from "react-i18next";
import DocumentPreviewCard from "@/Components/DocumentPreviewCard";

function SmallVehicleIndex({ vehicles, company }) {
    const data = vehicles?.data || [];
    const paginationLinks = vehicles?.links || [];
    const { t } = useTranslation()
    const columns = [
        { label: t("NO") },
        { label: t("vehicleType") },
        { label: t("plateNO") },
        { label: t("engineNO") },
        { label: t("shaciNO") },
        { label: t("vehicleModal") },
        { label: t("vehicleColor") },
        { label: t("image") },
        { label: t("documents") },
        { label: t("status") }, 
        { label: t("action") }, 
    ];


    const [pagination, setPagination] = useState(paginationLinks);
    const { permissions } = usePage().props.auth;
    const [company_vehicles, setcompany_vehicles] = useState(data);

    const [loading, setLoading] = useState(false);
    const verification = async (model, vehicle_id) => {
        setLoading(true); // Disable button
        try {
            const response = await axios.post(route('verification'), {
                model: model,
                item: vehicle_id,
            });

            // Update local state with the verified item
            if (response.data.data) {
                setcompany_vehicles((data) =>
                    data.map((vehicle) =>
                        vehicle.id === vehicle_id ? { ...vehicle, is_approved: 1 } : vehicle
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
                <h1 title={`${t("companySmallVehiclesList", company.company_name)} ${company.company_name}`} />
            }
        >

            <SubHeader title={t("companySmallVehiclesList", { name: company.company_name })} />


            <Head title="Vehicle Type" />

            <div className="py-12">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={pagination}
                                addButton={false}
                               

                            >
                                {company_vehicles.map((item, i) => {
                                    return (
                                        <tr
                                            className="hover:bg-slate-100"
                                            key={i}
                                        >
                                            <td className="p-2 text-center">
                                                {i + 1}
                                            </td>

                                            <td className="p-2 text-center">
                                                {item.vehicle_type?.vehicle_name}
                                            </td>
                                            <td className="p-2 text-center">
                                                <div style={{ direction: 'rtl', textAlign: 'right' }}>
                                                    {`${item.plate_no} ${item?.province?.province}`}
                                                    <span dir="ltr" className="mx-1 text-purple-900">( {item?.plate_grade?.plate_grade} )</span>
                                                </div>
                                            </td>

                                            <td className="p-2 text-center">
                                                {item.engine_no}
                                            </td>
                                            <td className="p-2 text-center">
                                                {item.shaci_no}
                                            </td>
                                            <td className="p-2 text-center">
                                                {item.modal}
                                            </td>
                                            <td className="p-2 text-center">
                                                {item.vehicle_color}
                                            </td>

                                            <td className="p-2 text-center">

                                                <ImageWithFallback src={item.image}></ImageWithFallback>

                                            </td>
                                            <td className="p-2 text-center">
                                                {item.file && <DocumentPreviewCard fileUrl={item.file} />}

                                            </td>
                                            <td className="p-2 text-center"><StatusBadge status={item.is_approved == 1 ? "approved" : 'notApproved'}></StatusBadge>{ }</td>

                                        <td className="p-2 text-center">
                                        {permissions.includes(
                                            "manageSmallCars"
                                        ) && (
                                            <ThreeDotMenu>
                                                <div
                                                    className="py-1"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="options-menu"
                                                >

                                                    {/* Edit button */}
                                                    <Link
                                                        href={route(
                                                            "setting.small_vehicle.edit",
                                                            item.id
                                                        )}
                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <span className="ml-2 text-xl">
                                                            <Edit2 />{" "}
                                                            {/* Edit icon */}
                                                        </span>
                                                        {t("editInfo")}
                                                    </Link>
                                                     {/* Confirm button */}
                                                    {!item.is_approved && (
                                                        <button
                                                            className="flex items-center w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() =>
                                                                verification(
                                                                    "SmallVehicle",
                                                                    item.id
                                                                )
                                                            }
                                                            disabled={loading}
                                                        >
                                                            <span className="ml-2 text-xl">
                                                                <Verified className="text-green-500"/>
                                                            </span>
                                                            {t("approve")}
                                                        </button>
                                                    )}
                                                          {(item.is_approved!=0 && permissions.includes("DisableSmallVehicle")) && (
                                                        <button
                                                            className="flex items-center w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() =>
                                                                disabling(
                                                                    "SmallVehicle",
                                                                    item.id
                                                                )
                                                            }
                                                            disabled={loading}
                                                        >
                                                            <span className="ml-2 text-xl">
                                                                <Ban className="text-red-500" />
                                                            </span>
                                                            {t("disable")}
                                                        </button>
                                                    )}
                                                </div>
                                            </ThreeDotMenu>
                                        )}

                                        


                                                    
                                                

                                                    
                                                   
                                              
                                    </td>
                                        </tr>
                                    );
                                })}
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default SmallVehicleIndex;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Edit2, LucideLoader, Newspaper, Verified } from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/Components/StatusBadge";
import EditFare from "./Edit";
import ReNew from "./ReNew";
import { convertToShamsi } from "@/Components/utils/ConvertDate";
import { useTranslation } from "react-i18next";

function VehicleType({ fares }) {
    const fare = fares?.data || [];
    const paginationLinks = fares?.meta?.links || [];
    const { t } = useTranslation()
    const columns = [
        { label: t('NO') },
        { label: t('route') },
        { label: t('vehicleType') },
        { label: t('fare') },
        { label: t('startDate') },
        { label: t("endDate") },
        { label: t("status") },
        { label: t("action") },
    ];

    const [reNewModel, setreNewModel] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [pagination, setPagination] = useState(paginationLinks);
    const [fareList, setfareList] = useState(fare);

    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(false);
    const { permissions } = usePage().props.auth;
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
                setfareList((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id ? { ...vehicle, status: 'approved' } : vehicle
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
    const unVerification = async (model, item) => {
        setLoading(true); // Disable button
        try {
            const response = await axios.post(route('unVerification'), {
                model: model,
                item: item,
            });

            // Update local state with the verified item
            if (response.data.data) {
                const updatedVehicle = response.data.data;
                setfareList((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id ? { ...vehicle, status: 'disabled' } : vehicle
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
        <AuthenticatedLayout header={<Head title="لیست کرایه" />}>
            <SubHeader title={t('fareList')} />

            {modalOpen && (
                <CustomModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    title={t('editFare')}
                    size="large"
                    stopPropagation={false}
                    footer={false}

                >
                    <EditFare editable={editable} ></EditFare>
                </CustomModal>
            )}
                {reNewModel && (
                <CustomModal
                    show={reNewModel}
                    handleClose={() => setreNewModel(false)}
                    title={t('fare')+ " " +  t('reNew') }
                    size="large"
                    stopPropagation={false}
                    footer={false}

                >
                    <ReNew editable={editable} ></ReNew>
                </CustomModal>
            )}

            <Head title="Vehicle Type" />

            <div className="mx-auto  sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={pagination}
                            AddButtonPath="/setting/fare/create"
                            header={t('fareList')}
                            buttonLabel={t('newFare')}
                            addButton={permissions.includes('manageFare')}
                           searchPlaceHolder={`${t('startingProvince')} - ${t('endingProvince')}`}
                        >
                            {fareList.map((item, i) => (
                                <tr
                                    className="hover:bg-gray-100 transition duration-200 ease-in-out border-b border-gray-200"
                                    key={i}
                                >
                                    <td className="p-3 text-center font-medium text-gray-800">
                                        {i + 1}
                                    </td>

                                    <td className="p-3 text-center font-semibold text-gray-700  rounded-md shadow-sm">
                                        {item.route && (
                                            <div className="flex flex-col items-center">
                                                <span className="text-blue-600 text-sm">
                                                    {
                                                        item.route
                                                            .start_point
                                                            ?.district
                                                    }{" "}
                                                    (
                                                    {
                                                        item.route
                                                            .start_point
                                                            ?.province
                                                    }
                                                    )
                                                </span>
                                                <span className="text-gray-400 text-xs">
                                                    ⬇️
                                                </span>
                                                <span className="text-red-600 text-sm">
                                                    {
                                                        item.route.end_point
                                                            ?.district
                                                    }{" "}
                                                    (
                                                    {
                                                        item.route.end_point
                                                            ?.province
                                                    }
                                                    )
                                                </span>
                                            </div>
                                        )}
                                    </td>

                                    <td className="p-3 text-center text-gray-700 font-medium">
                                        {item?.vehicle_type}
                                    </td>
                                    <td className="p-3 text-center font-semibold text-green-600">
                                        {item.min_fare} - {item.max_fare}
                                    </td>
                                    <td className="p-3 text-center text-gray-500">
                                        {item.bel_start_date && convertToShamsi(item.bel_start_date)}
                                    </td>
                                    <td className="p-3 text-center text-gray-500">
                                        {item.bel_end_date && convertToShamsi(item.bel_end_date)}
                                    </td>
                                    <td className="p-2 text-center"><StatusBadge status={(item?.status == 'approved' ? 'approved' : (item?.status == "notapproved" ? 'notApproved' : 'deactive'))}></StatusBadge>{ }</td>


                                    <td className="p-3 text-center">
                                        {
                                            (permissions.includes('manageFare')) &&
                                            <ThreeDotMenu>
                                                <div className="py-1 bg-white rounded-md shadow-md border border-gray-200">
                                                    {/* Confirm button */}
                                                    {(item.status == "notapproved") && (
                                                        <>  <button
                                                            className="flex items-center w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() =>
                                                                verification(
                                                                    "Fare",
                                                                    item.id
                                                                )
                                                            }
                                                            disabled={loading}
                                                        >
                                                            <span className="ml-2 text-xl">
                                                                <Verified />
                                                            </span>
                                                            {t('approve')}
                                                            {loading && <LucideLoader></LucideLoader>}
                                                        </button>
                                                            <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={() => {
                                                                    setEditable(item)
                                                                    setModalOpen(true);
                                                                }}
                                                            >
                                                                <span className="ml-2 text-xl text-blue-600">
                                                                    <Edit2 />
                                                                </span>
                                                                {t('editInfo')}
                                                            </button></>)}
                                                    {item.status == "approved" && (
                                                        <button
                                                            className="flex items-center w-full  text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                                            onClick={() =>
                                                                unVerification(
                                                                    "Fare",
                                                                    item.id
                                                                )
                                                            }
                                                            disabled={loading}
                                                        >
                                                            <span className="ml-2 text-xl">
                                                                <Verified />
                                                            </span>
                                                            {t('disable')}
                                                            {loading && <LucideLoader></LucideLoader>}

                                                        </button>)}
                                                    {
                                                        item.status == "disabled" && (
                                                            <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={() => {
                                                                    setEditable(item)
                                                                    setreNewModel(true);
                                                                }}
                                                            >
                                                                <span className="ml-2 text-xl text-blue-600">
                                                                    <Newspaper />
                                                                </span>
                                                                {t('reNew')}
                                                            </button>
                                                        )
                                                    }

                                                    {/* Edit button */}

                                                </div>
                                            </ThreeDotMenu>}
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

export default VehicleType;

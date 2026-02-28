import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import SubHeader from "@/Components/SubHeader";
import { Edit2, Verified } from "lucide-react";
import toast from "react-hot-toast";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import StatusBadge from "@/Components/StatusBadge";
import EditRoute from "./Edit";
import { useTranslation } from "react-i18next";

function VehicleType({ routes }) {
    const routedata = routes?.data || [];
    const paginationLinks = routes?.links || [];
    const { t } = useTranslation()
    const { permissions } = usePage().props.auth;
    const columns = [
        { label: t("NO") },
        { label: t("startingProvince") },
        { label: t("endingProvince") },
        { label: t("status") },
        { label: t("action") },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [pagination, setPagination] = useState(paginationLinks);
    const [routeList, setrouteList] = useState(routedata);

    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(null);
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
                setrouteList((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id ? { ...vehicle, is_approved: 1 } : vehicle
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

    const handelEdit = (response) => {
        setModalOpen(false)
        console.log(response)
        if (response.data) {
            const updatedVehicle = response.data;
            setrouteList((data) =>
                data.map((vehicle) =>
                    vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
                )
            );
        }
    };
    return (
        <AuthenticatedLayout header={<Head title="لیست مسیرها" />}>
            <SubHeader title={t('routesList')} />

            {modalOpen && (
                <CustomModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    title={t('changeRouteInfo')}
                    size="large"
                    stopPropagation={false}
                    footer={false}

                >
                    <EditRoute editable={editable} handleUpdated={(data) => { handelEdit(data) }}></EditRoute>
                </CustomModal>
            )}

            <Head title="Vehicle Type" />

                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                header = {t('routesList')}
                                links={pagination}
                                enableSearch={true}
                                AddButtonPath="/setting/route/create"
                                buttonLabel={t('newRoute')}
searchPlaceHolder={`${t('startingProvince')} / ${t('endingProvince')}`}

                            >
                                {routeList.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td className="p-3 text-center">
                                                {data.id}
                                            </td>
                                            <td className="p-3 text-center  rounded-lg text-lg font-medium text-gray-700">
                                                {data.start_point?.province}{" "}
                                                <span className="text-blue-500 font-semibold">
                                                    {
                                                        data.start_district
                                                            ?.district_dr
                                                    }
                                                </span>
                                            </td>
                                            <td className="p-3 text-center  rounded-lg text-lg font-medium text-gray-700">
                                                {data.end_point?.province}{" "}
                                                <span className="text-red-500 font-semibold">
                                                    {
                                                        data.end_district
                                                            ?.district_dr
                                                    }
                                                </span>
                                            </td>
                                            <td className="p-2 text-center"><StatusBadge status={data.is_approved == 1 ? "approved" : 'notApproved'}></StatusBadge>{ }</td>

                                        <td>
                                            {(data.is_approved == 0  && permissions.includes('manageRoutes')) &&
                                                <ThreeDotMenu>   <button
                                                    className="flex items-center w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => {
                                                        setEditable(data);
                                                        setModalOpen(true);
                                                    }}
                                                    disabled={loading}
                                                >
                                                    <span className="ml-2 text-xl">
                                                        <Edit2 />
                                                    </span>
                                                    {t('editInfo')}
                                                </button>
                                                    <button
                                                        className="flex items-center w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() =>
                                                            verification(
                                                                "route",
                                                                data.id
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        <span className="ml-2 text-xl">
                                                            <Verified />
                                                        </span>
                                                        {t('approve')}

                                                    </button>

                                                </ThreeDotMenu>
                                            }
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

export default VehicleType;

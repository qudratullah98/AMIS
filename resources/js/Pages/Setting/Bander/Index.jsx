import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Edit2, Verified } from "lucide-react";
import StatusBadge from "@/Components/StatusBadge";
import toast from "react-hot-toast";
import EditBander from "./Edit";
import { useTranslation } from "react-i18next";

function Owner({ banders }) {
    const {t}=useTranslation()
    const data = banders?.data || [];
    const paginationLinks = banders?.links || [];
    const { permissions } = usePage().props.auth; // Assuming you have permissions in your page props
    const columns = [
        { label: t("NO")},
        { label: t("name")},
        { label: t("province") },
        { label: t("descriptions") },
        { label: t("routes") },
        { label: t("status") },
        { label: t("action") },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [BanderList, setBanderList] = useState(data);

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
                setBanderList((data) =>
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

    const handleEdit = (response) => {
        setModalOpen(false)
        if (response.data) {
            const updatedVehicle = response.data;
            setBanderList((data) =>
                data.map((vehicle) =>
                    vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
                )
            );
        }
    };


    return (
        <AuthenticatedLayout header={<Head title="لیست بندرها " />}>
                        <SubHeader title={t('bandarsList')} />

            {modalOpen && (
                <CustomModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    title={t('editBandar')}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <EditBander editable={editable} handleEdit={(data) => handleEdit(data)}></EditBander>
                </CustomModal>
            )}

            <Head title="Vehicle Type" />

                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={paginationLinks}
                                AddButtonPath={route("setting.bander.create")}
                                header={t('bandarsList')}
                                buttonLabel={t('newBandar')}
                                addButton={permissions.includes('manageBandars')}
                            >
                                {BanderList.map((item,i) => (
                                    <tr
                                        className="hover:bg-slate-100"
                                        key={item.id}
                                    >
                                        <td className="p-2 text-center">
                                            {i+1}
                                        </td>
                                        <td className="p-2 text-center">
                                            {item.bandar_name}
                                        </td>
                                        <td className="p-2 text-center">
                                            {item.province.province}
                                        </td>
                                        {/* Assuming province_id is displayed; adjust if you want the name */}
                                        <td className="p-2 text-center">
                                            {item.descriptions}
                                        </td>
                                        <td>
                                            {item.routes.map((route, index) => (
                                                <div key={index} className="route-display">
                                                    <span className="district-name">{route.start_district.district_dr} ({route.start_point.province})</span>
                                                    <span className="arrow"> ⬅️  </span>
                                                    <span className="district-name">{route.end_district.district_dr} ({route.end_point.province})</span>
                                                    {index < item.routes.length - 1 && <br />} {/* Add a line break between routes except for the last one */}
                                                </div>
                                            ))}</td>
                                        <td className="p-2 text-center"><StatusBadge status={item.is_approved == 1 ? "approved" : 'notApproved'}></StatusBadge>{ }</td>

                                        <td className="p-2 text-center">
                                            {( !item.is_approved && permissions.includes('manageBandars')) && (
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
                                                                "Bander",
                                                                item.id
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        <span className="ml-2 text-xl">
                                                            <Verified />
                                                        </span>
                                                        {t('approve')}
                                                    </button>

                                                    {/* Edit button */}
                                                    <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => { setModalOpen(true); setEditable(item) }}
                                                    >
                                                        <span className="ml-2 text-xl">
                                                            <Edit2 />
                                                        </span>
                                                        {t('editInfo')}
                                                    </button>

                                                    {/* Additional action button can be added here */}
                                                </div>
                                            </ThreeDotMenu>
                                            )}

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

export default Owner;

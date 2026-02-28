import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { DoorClosedIcon, Edit2, Verified } from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/Components/StatusBadge";
import EditOwner from "./Edit";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ImageWithFallback from "@/Components/ImageWithFallback";
import BASE_URL from "@/BaseUrl";
import DocumentPreviewCard from "@/Components/DocumentPreviewCard";

function Owner({ owners }) {
    const data = owners?.data || [];
    const paginationLinks = owners?.meta?.links || [];
    const [ownersList, setOwners] = useState(data)
    const { t } = useTranslation()
    const { permissions } = usePage().props.auth;


    const columns = [
        { label: t('NO') },
        { label: t('name') },
        { label: t('fatherName') },
        { label: t('phoneNO') },
        { label: t('nationalID') },
        { label: t("documents") },
        { label: t('image') },
        { label: t("status") },
        { label: t("action") },
    ];

    const [modalOpen, setModalOpen] = useState(false);

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
                setOwners((data) =>
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

    const handleEdit = (response) => {
        try {
            setModalOpen(false)
            if (response.data) {
                const updatedVehicle = response.data;
                setOwners((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
                    )
                );
            }
        } catch (error) {
            console.error('Error submitting verification:', error);
        }
    };
    return (
        <AuthenticatedLayout header={<SubHeader title="لیست مالیکین" />}>
            {/* <SubHeader title={t('vehicleOwner')} /> */}
            {modalOpen && (
                <CustomModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    title={t('editOwner')}
                    size="large"
                    stopPropagation={false}
                    footer={false}
                >
                    <EditOwner editable={editable} handleEdit={(data) => { handleEdit(data) }}></EditOwner>
                </CustomModal>
            )}

            <Head title="Vehicle Type" />

            <div className="py-2">

                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={paginationLinks}
                                AddButtonPath={route("setting.owner.create")}
                                header={t('vehicleOwnersList')}
                                buttonLabel={t('newOwner')}
                                addButton={permissions.includes('manageVehicleOwners')}

                            >
                                {ownersList.map((data, i) => {
                                    return (
                                        <tr
                                            className="hover:bg-slate-100"
                                            key={i}
                                        >
                                            <td className="p-2 text-center">
                                                {i+1}
                                            </td>
                                            <td className="p-2 text-center">
                                                {data.name}
                                            </td>
                                            <td className="p-2 text-center">
                                                {data.father_name}
                                            </td>
                                            <td className="p-2 text-center">
                                                {data.contact_no}
                                            </td>
                                            <td className="p-2 text-center">
                                                {data.national_id}
                                            </td>
                                            <td className="p-2 text-center" style={{ verticalAlign: 'middle' }}>
                                                <div className="flex justify-center items-center">
                                                    {data.file && <DocumentPreviewCard fileUrl={data.file} />}
                                                </div>
                                            </td>

                                            <td className="p-2 text-center">
                                                <ImageWithFallback src={data.photo}></ImageWithFallback>
                                            </td>
                                            <td className="p-2 text-center"><StatusBadge status={data.is_approved == 1 ? "approved" : 'notApproved'}></StatusBadge>{ }</td>

                                            <td className="p-2 text-center">
                                                {/* Three dot menu for actions */}
                                                {permissions.includes('manageVehicleOwners') &&
                                                <ThreeDotMenu>
                                                    <div
                                                        className="py-1"
                                                        role="menu"
                                                        aria-orientation="vertical"
                                                        aria-labelledby="options-menu"
                                                    >
                                                        {/* Confirm button */}
                                                        {/* ThreeDotMenu for actions */
                                                            !data.is_approved && (<button
                                                                className="flex items-center w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={() =>
                                                                    verification(
                                                                        "Owner",
                                                                        data.id
                                                                    )
                                                                }
                                                                disabled={loading}
                                                            >
                                                                <span className="ml-2 text-xl">
                                                                    <Verified />
                                                                </span>
                                                                {t('approve')}
                                                            </button>)
                                                        }

                                                        {/* Edit button */}
                                                        <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => { setEditable(data); setModalOpen(true) }}
                                                        >
                                                            <span className="ml-2 text-xl">
                                                                <Edit2 />{" "}
                                                                {/* Edit icon */}
                                                            </span>
                                                            {t('editInfo')}
                                                        </button>
                                                    </div>
                                                </ThreeDotMenu>}
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

export default Owner;

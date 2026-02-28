import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { EditIcon, Plus, Verified } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import StatusBadge from "@/Components/StatusBadge";
import EditVehicleType from "./Edit";
import Create from "./Create";
import { useTranslation } from "react-i18next"; 

function VehicleType({ VehicleTypes }) {
    
    const vehicleTypes = VehicleTypes?.data || [];
    const paginationLinks = VehicleTypes?.links || [];
    const [vehileTypeList, setVehileTypeList] = useState(vehicleTypes);
    const [editable, setEditable] = useState(null);
    const { permissions } = usePage().props.auth;
    const { t } = useTranslation();
    const columns = [
        { label: t("NO") },
        { label: t("name") },
        { label: t("vehicleTonnage") },
        { label: t("status") },
        { label: t("action") },
    ];
 
    const [EditModel, setEditModel] = useState(false);
    const [CreateModel, setCreateModel] = useState(false);

    const [loading, setLoading] = useState(false);
    const verification = async (model, item) => {
        setLoading(true); // Disable button
        try {
            const response = await axios.post(route("verification"), {
                model: model,
                item: item,
            });

            // Update local state with the verified item
            
            if (response.data.data) {
                const updatedVehicle = response.data.data;
                setVehileTypeList((prevVehicles) =>
                    prevVehicles.map((vehicle) =>
                        // update just status, not the whole object to prevent losing other data
                        vehicle.id === updatedVehicle.id
                            ? { ...vehicle, is_approved:true }
                            : vehicle,
                    ),
                );
                toast.success(t("upprovedSuccessfully"));
            }
        } catch (error) {
            console.error("Error submitting verification:", error);
            toast.error(t("Failed to approve"));
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    const handleUpdated = (response) => {
        setEditModel(false);
        try {
            if (response.data) {
                const updatedVehicle = response.data;
                setVehileTypeList((prevVehicles) =>
                    prevVehicles.map((vehicle) =>
                        vehicle.id === updatedVehicle.id
                            ? updatedVehicle
                            : vehicle,
                    ),
                );
            }
        } catch (error) {
            console.error("Error submitting verification:", error);
        }
    };


    return (
        <AuthenticatedLayout header={<Head title={t("vehiclesTypes")} />}>
            <SubHeader title={t("vehiclesTypes")}></SubHeader>
            {EditModel && (
                <CustomModal
                    show={EditModel}
                    handleClose={() => setEditModel(false)}
                    title={t("editVehicleType")}
                    size="large"
                    stopPropagation={true}
                    footer={false}
                >
                    <EditVehicleType
                        editable={editable}
                        handleUpdated={(response) => {
                            handleUpdated(response);
                        }}
                    ></EditVehicleType>
                </CustomModal>
            )}

            {CreateModel && (
                <CustomModal
                    show={CreateModel}
                    handleClose={() => setCreateModel(false)}
                    title={t("createVehicleType")}
                    size="large"
                    stopPropagation={true}
                    footer={false} 
                >
                    <Create AddVehicleTypeToList={(data) => {
                        setVehileTypeList(prev => [data, ...prev]);
                        setCreateModel(false);
                    }}></Create>
                </CustomModal>
            )}

            <Head title={t("vehiclesTypes")} />

            <div className="mx-auto  sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-1 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks} 
                            header={t("vehiclesTypes")}
                            buttonLabel={
                                <span className="flex items-center gap-1">
                                    <Plus className="w-3 h-3" />
                                    {t("newVehicle")}
                                </span>
                            }
                            addButton={permissions?.includes(
                                "manageVehiclesType",
                            )}
                            enableButton={permissions?.includes("manageVehiclesType")}
                            onButtonClick={() => setCreateModel(true)}
                        >
                            {vehileTypeList.map((vehicle, index) => (
                                <tr
                                    key={index}
                                    className="transition-colors duration-300 hover:bg-slate-100/80 dark:hover:bg-gray-700/50"
                                >
                                    {/* Index */}
                                    <td className="p-1 text-center font-medium text-gray-700 dark:text-gray-300">
                                        {index + 1}
                                    </td>

                                    {/* Vehicle Name */}
                                    <td className="p-1 text-center text-gray-700 dark:text-gray-300">
                                        {vehicle.name}
                                    </td>
 
                                    <td className="p-1 text-center text-gray-700 dark:text-gray-300">
                                        {vehicle.vehicle_tonnage?.name || "N/A"}
                                    </td>

                                    {/* Status */}
                                    <td className="p-1 text-center">
                                        <StatusBadge
                                            status={
                                                vehicle.is_approved == 1
                                                    ? "approved"
                                                    : "notApproved"
                                            }
                                            className="transition-all duration-300"
                                        />
                                    </td>

                                    {/* Actions */}
                                    <td className="p-1 text-center">
                                        {vehicle.is_approved == 0 &&
                                            permissions.includes(
                                                "manageVehiclesType",
                                            ) && (
                                                <ThreeDotMenu>
                                                    <div
                                                        className="py-1 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out"
                                                        role="menu"
                                                        aria-orientation="vertical"
                                                        aria-labelledby="options-menu"
                                                    >
                                                        <button
                                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                                                            onClick={() =>
                                                                verification(
                                                                    "vehicleType",
                                                                    vehicle.id,
                                                                )
                                                            }
                                                            disabled={loading}
                                                        >
                                                            <span className="mr-2 text-xl">
                                                                <Verified />
                                                            </span>
                                                            {t("approve")}
                                                        </button>

                                                        <button
                                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                                                            onClick={() => {
                                                                setEditable(
                                                                    vehicle,
                                                                );
                                                                setEditModel(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            <span className="mr-2 text-xl">
                                                                <EditIcon />
                                                            </span>
                                                            {t("editInfo")}
                                                        </button>
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

export default VehicleType;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Edit2, Verified, VerifiedIcon } from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/Components/StatusBadge";
import { useTranslation } from "react-i18next";

function VehicleType({ users }) {
    const tr = users?.data || [];
    const { t } = useTranslation();
    const paginationLinks = users?.links || [];

    const columns = [
        { label: t("common.NO") },
        { label: t("common.name") },
        { label: t("user.email") },
        { label: t("user.role") },
        { label: t("user.positionTitle") },
        { label: t("airport.airport") },
        { label: t("user.generalDepartment") },
        { label: t("state.activityStatus") },
        { label: t("common.action") },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [usersList, setusers] = useState(tr);

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
                setusers((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id
                            ? updatedVehicle
                            : vehicle,
                    ),
                );
                toast.success("Approved successfully");
            }
        } catch (error) {
            // console.error("Error submitting verification:", error);
            toast.error("Failed to approve");
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    return (
        <AuthenticatedLayout>
            {modalOpen && (
                <CustomModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    title="My Modal"
                    size="large"
                    stopPropagation={false}
                >
                    <p>This is the content of the modal.</p>
                </CustomModal>
            )}

            <SubHeader
                links={[
                    { name: t("user.users") },
                ]}
            />

            <div className="mx-auto">
                <div className="overflow-hidden bg-white  sm:rounded-lg border border-gray-100 dark:bg-gray-800">
                    <div className="px-4 py-2 text-gray-900 dark:text-gray-100 ">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            AddButtonPath={route("user.create")}
                            header={t("user.list")}
                            buttonLabel={t("user.addingNewUser")}
                        >
                            {usersList.map((item, i) => (
                                <tr className="hover:bg-slate-100" key={i}>
                                    <td className="p-2 text-center">{i + 1}</td>
                                    <td className="p-2 text-center">
                                        {item.name}
                                    </td>
                                    <td className="p-2 text-center">
                                        {item.email}
                                    </td>
                                    <td className="p-2 text-center">
                                        {item.roles.map((role, index) => (
                                            <span
                                                key={index}
                                                className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full"
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="p-2 text-center">
                                        {item.position_title
                                            ? item.position_title
                                            : "-"}
                                    </td>
                                    <td className="p-2 text-center">
                                        {item.airport
                                            ? item.airport.name_ps
                                            : "-"}
                                    </td>
                                    <td className="p-2 text-center">
                                        {item.general_department
                                            ? item.general_department.name_ps
                                            : "-"}
                                    </td>

                                    <td className="p-2 text-center">
                                        <StatusBadge
                                            status={
                                                item.is_blocked
                                                    ? "blocked"
                                                    : "active"
                                            }
                                        ></StatusBadge>
                                        {}
                                    </td>

                                    <td className="p-0 text-center">
                                        <ThreeDotMenu>
                                            <div
                                                className="py-0"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="options-menu"
                                            >
                                                {/* Edit button */}

                                                <Link
                                                    href={route("user.edit", {
                                                        id: item.id,
                                                    })}
                                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <span className="ml-2 text-xl">
                                                        <Edit2 />
                                                    </span>
                                                    {t("common.editInfo")}
                                                </Link>
                                            </div>
                                        </ThreeDotMenu>
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

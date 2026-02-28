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

function VehicleType({ users }) {console.log(users)
    const tr = users?.data || [];
    const { t } = useTranslation();
    const paginationLinks = users?.links || [];

    const columns = [
        { label: t("id") },
        { label: t("name") },
        { label: t("email") },
        { label: t("roles") },
        { label: t("userType") },
        { label: t("details") },
        { label: t("status") },
        { label: t("action") },
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
                            : vehicle
                    )
                );
                toast.success("Approved successfully");
            }
        } catch (error) {
            console.error("Error submitting verification:", error);
            toast.error("Failed to approve");
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    return (
        <AuthenticatedLayout header={<SubHeader title="لیست کاربران" />}>
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

                        <SubHeader title={t("usersList")} />

            <div className="py-12">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={paginationLinks}
                                AddButtonPath={route('user.create')}
                                header={t("usersList")}
                                buttonLabel={t("addNewUser")}
                            >
                                {usersList.map((item, i) => (
                                    <tr className="hover:bg-slate-100" key={i}>
                                        <td className="p-2 text-center">
                                            {item.id}
                                        </td>
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
                                            {item?.user_types?.user_type}
                                        </td>
                                        <td className="p-2 text-center" dir="ltr">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-700 bg-indigo-200 rounded-full">{ item.details ?? '—'}</span>

                                        </td>
                                        <td className="p-2 text-center">
                                            <StatusBadge
                                                status={
                                                    true
                                                        ? "approved"
                                                        : "notApproved"
                                                }
                                            ></StatusBadge>
                                            {}
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
                                                    <button
                                                        className="flex items-center w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() =>
                                                            verification(
                                                                "terminal",
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

                                                    <Link href={route('user.edit',{"id":item.id})} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        <span className="ml-2 text-xl">
                                                            <Edit2 />{" "}
                                                            {/* View icon */}
                                                        </span>
                                                        {t('editInfo')}
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
            </div>
        </AuthenticatedLayout>
    );
}

export default VehicleType;

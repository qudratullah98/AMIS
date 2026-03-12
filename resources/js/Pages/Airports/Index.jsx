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

function AirportsIndex({ airports }) {
    const tr = airports?.data || [];
    const { t } = useTranslation();
    const paginationLinks = airports?.links || [];

    const columns = [
        { label: t("id") },
        { label: t("name") },
        { label: t("code") },
        { label: t("city") },
        { label: t("country") },
        { label: t("status") },
        { label: t("actions") },


    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [airportsList, setAirports] = useState(tr);

    const [loading, setLoading] = useState(false);
   

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
                                {airportsList.map((item, i) => (
                                    <tr className="hover:bg-slate-100" key={i}>
                                        <td className="p-2 text-center">
                                            {item.id}
                                        </td>
                                        <td className="p-2 text-center">
                                            {item.name}
                                        </td>
                                        <td className="p-2 text-center">
                                            {item.code}
                                        </td>
                                        <td className="p-2 text-center">
                                            {item.city}
                                        </td>
                                        <td className="p-2 text-center">
                                            {item.country}
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

export default AirportsIndex;

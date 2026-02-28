import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Edit2 } from "lucide-react";
import { useTranslation } from "react-i18next";

function VehicleType({ roles }) {
    const tr = roles?.data || [];
    const paginationLinks = roles?.meta?.links || [];
    const { t } = useTranslation();
    const columns = [
        { label: t("NO") },
        { label: t("name") },
        { label: t("permissions") },
        { label: t("action") },
    ];

    const [modalOpen, setModalOpen] = useState(false); 
    const [rolesList, setroles] = useState(tr);

    const [loading, setLoading] = useState(false);


    return (
        <AuthenticatedLayout header={<SubHeader title="لیست صلاحیتها" />}>
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

                        {/* <SubHeader title={t("roles")} /> */}


            <div className="py-12">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={paginationLinks}
                                AddButtonPath={route('role.create')}
                                buttonLabel={t("addNewRole")}
                                header="لیست صلاحیتها"
                            >
                                {rolesList.map((item, i) => (
                                    <tr className="hover:bg-slate-100" key={i}>
                                        <td className="p-2 text-center">
                                            {item.id}
                                        </td>
                                        <td className="p-2 text-center">
                                            {item.name}
                                        </td>
                                        <td className="p-2 text-center max-w-[200px]">
                                            <div className="flex flex-wrap justify-center gap-1">
                                                {item?.permissions?.map((permission, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                                                    >
                                                        {permission.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>



                                        <td className="p-2 text-center">
                                            <ThreeDotMenu>
                                                <div
                                                    className="py-1"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="options-menu"
                                                >


                                                    {/* Edit button */}
                                                    <Link href={route('role.edit', { roleId: item.id })} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        <span className="ml-2 text-xl">
                                                            <Edit2 />{" "}
                                                            {/* Edit icon */}
                                                        </span>
                                                        تغیر دادن
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

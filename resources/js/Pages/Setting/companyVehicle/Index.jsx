import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { Clock, Edit, LoaderIcon, Verified } from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/Components/StatusBadge";
import ImageWithFallback from "@/Components/ImageWithFallback";
import { useTranslation } from "react-i18next";
import DocumentPreviewCard from "@/Components/DocumentPreviewCard";

function Index({ vehicles, company }) {
    const data = vehicles?.data || [];
    const paginationLinks = vehicles?.links || [];
    const { t } = useTranslation();
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
            const response = await axios.post(route("verification"), {
                model: model,
                item: vehicle_id,
            });

            // Update local state with the verified item
            if (response.data.data) {
                setcompany_vehicles((data) =>
                    data.map((vehicle) =>
                        vehicle.id === vehicle_id
                            ? { ...vehicle, is_approved: 1 }
                            : vehicle,
                    ),
                );

                toast.success(t("upprovedSuccessfully"));
            }
        } catch (error) {
            console.error("Error submitting verification:", error);
            toast.error("Failed to approve");
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h1
                    title={`${t("companyVehiclesList", company?.company_name ?? "")} ${company?.company_name ?? ""}`}
                />
            }
        >
            <Head title="Vehicle Type" />

            <div className="py-2">
                <div className="mx-auto  sm:px-6 lg:px-2">
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                columns={columns}
                                links={pagination}
                                AddButtonPath={
                                    company?.id
                                        ? route(
                                              "setting.company.vehicle.create",
                                              company.id,
                                          )
                                        : route(
                                              "setting.company.vehicle.createVehicle",
                                          )
                                }
                                buttonLabel={t("newVehicle")}
                                addButton={permissions.includes(
                                    "manageCompanyVehicles",
                                )}
                                header={"لیست وسایط"}
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
                                                {item.vehicle_type?.name}
                                            </td>
                                            <td className="p-2 text-center">
                                                <div
                                                    style={{
                                                        direction: "rtl",
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    {`${item.plate_no} ${item?.plate_province?.province}`}
                                                    <span
                                                        dir="ltr"
                                                        className="mx-1 text-purple-900"
                                                    >
                                                        ({" "}
                                                        {
                                                            item?.plate_grade
                                                                ?.plate_grade
                                                        }{" "}
                                                        )
                                                    </span>
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
                                                <ImageWithFallback
                                                    src={item.image}
                                                ></ImageWithFallback>
                                            </td>
                                            <td className="p-2 text-center">
                                                {item.file && (
                                                    <DocumentPreviewCard
                                                        fileUrl={item.file}
                                                    />
                                                )}
                                            </td>
                                            <td className="p-2 text-center">
                                                <StatusBadge
                                                    status={
                                                        item.is_approved == 1
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
                                                        {permissions.includes(
                                                            "manageCompanyVehicles",
                                                        ) && (
                                                            <button
                                                                className={`flex items-center w-full text-left px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                                                                    loading
                                                                        ? "bg-gray-200 cursor-not-allowed text-gray-500"
                                                                        : "text-gray-700 hover:bg-gray-100"
                                                                }`}
                                                                onClick={() =>
                                                                    verification(
                                                                        "company_vehicle",
                                                                        item.id,
                                                                    )
                                                                }
                                                                disabled={
                                                                    loading
                                                                }
                                                            >
                                                                {loading ? (
                                                                    <span className="flex items-center gap-2">
                                                                        <LoaderIcon className="animate-spin h-5 w-5 text-blue-500" />
                                                                        <span>
                                                                            {t(
                                                                                "approving",
                                                                            )}
                                                                            ...
                                                                        </span>
                                                                    </span>
                                                                ) : (
                                                                    <span className="flex items-center gap-2">
                                                                        <Verified className="text-green-500" />
                                                                        <span>
                                                                            {t(
                                                                                "approve",
                                                                            )}
                                                                        </span>
                                                                    </span>
                                                                )}
                                                            </button>
                                                        )}

                                                        {/* Edit button */}
                                                        {permissions.includes(
                                                            "manageCompanyVehicles",
                                                        ) && (
                                                            <>
                                                                {" "}
                                                                <Link
                                                                    href={
                                                                        loading
                                                                            ? "#" // Prevent navigation while loading
                                                                            : route(
                                                                                  "setting.company.vehicle.edit",
                                                                                  {
                                                                                      company_id:
                                                                                          company?.id ||
                                                                                          0,
                                                                                      vehicle_id:
                                                                                          item?.id ||
                                                                                          0,
                                                                                  },
                                                                              )
                                                                    }
                                                                    className={`flex items-center w-full text-left px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                                                                        loading
                                                                            ? "bg-gray-200 cursor-not-allowed text-gray-500"
                                                                            : "text-gray-700 hover:bg-gray-100"
                                                                    }`}
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                        loading &&
                                                                        e.preventDefault()
                                                                    } // Block click if loading
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        <Edit className="text-yellow-500" />
                                                                        <span>
                                                                            {t(
                                                                                "editInfo",
                                                                            )}
                                                                        </span>
                                                                    </span>
                                                                </Link>
                                                                <Link
                                                                    href={
                                                                        loading
                                                                            ? "#"
                                                                            : route(
                                                                                  "vehicles.history",
                                                                                  {
                                                                                      vehicle:
                                                                                          item?.id ??
                                                                                          0,
                                                                                  },
                                                                              )
                                                                    }
                                                                    className={`flex items-center w-full px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                                                                        loading
                                                                            ? "bg-gray-200 cursor-not-allowed text-gray-500"
                                                                            : "text-gray-700 hover:bg-gray-100"
                                                                    }`}
                                                                    onClick={
                                                                        loading
                                                                            ? (
                                                                                  e,
                                                                              ) =>
                                                                                  e.preventDefault()
                                                                            : undefined
                                                                    }
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        <Clock className="text-blue-500" />{" "}
                                                                        {/* history icon */}
                                                                        <span>
                                                                            {t(
                                                                                "viewHistory",
                                                                            )}
                                                                        </span>
                                                                    </span>
                                                                </Link>
                                                            </>
                                                        )}
                                                    </div>
                                                </ThreeDotMenu>
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

export default Index;

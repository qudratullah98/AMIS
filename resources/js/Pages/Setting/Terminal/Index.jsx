import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import CustomModal from "@/Components/CustomModal";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import SubHeader from "@/Components/SubHeader";
import { ArrowLeft, Edit2, Turtle, Verified } from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/Components/StatusBadge";
import Edit from "./Edit";
import { useTranslation } from "react-i18next";

function VehicleType({ terminals }) {
    const tr = terminals?.data || [];
    const paginationLinks = terminals.links || [];
    const { t } = useTranslation();
    const columns = [
        { label: t("NO") },
        { label: t("terminalName") },
        { label: t("descriptions") },
        { label: t("companies") },
        { label: t("routes") },
        { label: t("status") },
        { label: t("action") },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [terminalsList, setterminals] = useState(tr);
    const { permissions } = usePage().props.auth;

    const [loading, setLoading] = useState(false);
    const [Editable, setEditable] = useState(false);
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
                setterminals((data) =>
                    data.map((vehicle) =>
                        vehicle.id === updatedVehicle.id
                            ? updatedVehicle
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

    const handleEditSuccess = (data) => {
        setEditable(false);
        setModalOpen(false);
        toast.success(t("updatedSuccessfully"));

        setterminals((prevTerminals) =>
            prevTerminals.map((terminal) =>
                terminal.id === data.id ? { ...terminal, ...data } : terminal,
            ),
        );
    };

    return (
        <AuthenticatedLayout header={<h1 title="لیست ترمینل" />}>
            <SubHeader title={t("terminalsList")} />

            {modalOpen && (
                <CustomModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    title={t("terminalsList")}
                    size="xlarge"
                    stopPropagation={true}
                    footer={false}
                >
                    <Edit
                        Editable={Editable}
                        closeModel={() => {
                            setModalOpen(false);
                        }}
                        handleSuccess={(data) => {
                            handleEditSuccess(data);
                        }}
                    />
                </CustomModal>
            )}

            <Head title="Vehicle Type" />

            <div className="mx-auto  sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <DataTable
                            columns={columns}
                            links={paginationLinks}
                            header={t("terminalsList")}
                            AddButtonPath="/setting/terminal/create"
                            buttonLabel={t("newTerminal")}
                            addButton={permissions.includes("manageTerminals")}
                        >
                            {terminalsList.map((item, i) => (
                                <tr className="hover:bg-slate-100" key={i}>
                                    <td className="p-2 text-center">{i + 1}</td>
                                    <td className="p-2 text-center">
                                        {item.terminal_name}
                                    </td>
                                    <td className="p-2 text-center">
                                        {item.descriptions}
                                    </td>
                                    <td className="p-2 text-center">
                                        {item?.companies?.map((data, index) => (
                                            <div
                                                key={index}
                                                className="p-1 m-1 bg-gray-200 rounded-full"
                                            >
                                                {data.company_name}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="p-2 text-center">
                                        {item?.routes?.map((data, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-center p-1 m-2 bg-gray-200 rounded-lg shadow-lg transition duration-200  hover:scale-105"
                                            >
                                                <span className="font-semibold">
                                                    {data.start_point.province},
                                                    {
                                                        data.start_district
                                                            .district_dr
                                                    }
                                                </span>
                                                <span className="mx-2 text-xl font-bold">
                                                    <ArrowLeft />
                                                </span>
                                                <span className="font-semibold text-lg">
                                                    {data.end_point.province},
                                                    {
                                                        data.end_district
                                                            .district_dr
                                                    }
                                                </span>
                                            </div>
                                        ))}
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
                                        {permissions.includes(
                                            "manageTerminals",
                                        ) && (
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
                                                                item.id,
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        <span className="ml-2 text-xl">
                                                            <Verified />
                                                        </span>
                                                        {t("approve")}
                                                    </button>

                                                    {/* Edit button */}
                                                    <button
                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => {
                                                            setModalOpen(true);
                                                            setEditable(item);
                                                        }}
                                                    >
                                                        <span className="ml-2 text-xl">
                                                            <Edit2 />{" "}
                                                            {/* Edit icon */}
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

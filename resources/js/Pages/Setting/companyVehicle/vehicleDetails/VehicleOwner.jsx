import AsyncSelect from "@/Components/AsyncSelect";
import CustomModal from "@/Components/CustomModal";
import DataTable from "@/Components/DataTable";
import ThreeDotMenu from "@/Components/ThreeDotMenu";
import { Link, useForm } from "@inertiajs/react";
import { Edit2, VerifiedIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useTranslation } from "react-i18next"; // Import translation hook

function VehicleOwner({ vehicle }) {
    const { t } = useTranslation(); // Initialize translation hook

    const [Owners, setOwners] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, setrefresh] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        owner_id: null,
        vehicle_id: vehicle.id,
        isDriverToo: false,
    });

    const handleSubmit = () => {
        if (!data.owner_id) {
            toast.error(t("owner_not_selected")); // translation key
            return false;
        }

        post(route("setting.company.vehicle.storeVehileOwner"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t("owner_added")); // translation key
                setModalShow(false);
                setrefresh(!refresh);
            },
            onError: (errors) => {
                console.error("Error response:", errors);
                toast.error(t("error_updating_vehicle")); // translation key
            },
        });
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(route("setting.company.vehicle.getVehicleOwners", { vehicle_id: vehicle.id }))
            .then((response) => {
                setOwners(response);
            })
            .catch((error) => {
                console.error("Error fetching owners:", error);
                toast.error(t("error_loading_owners")); // Optional: show toast
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refresh]);
    

    const columns = [
        { label: t("id") },
        { label: t("name") },
        { label: t("fatherName") },
        { label: t("phoneNO") },
        { label: t("nationalID") },
        { label: t("documents") },
        { label: t("image") },
        { label: t("action") },
    ];

    if (loading) {
        return (
            <div className="flex justify-center my-4">
                <LoaderIcon />
            </div>
        );
    }
    
    return (
        <div>
            {modalShow && (
                <CustomModal
                    size="large"
                    show={modalShow}
                    handleClose={() => setModalShow(!modalShow)}
                    buttonLable={t("addVehicleOwner")}
                    buttonDisabled={processing}
                    onsubmit={handleSubmit}
                >
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg">
                        {/* Driver Search */}
                        <div className="flex flex-col space-y-4 mb-20">
                            <label className="text-gray-700 font-medium mb-1">
                                {t('search_owner')} <span className="text-sm text-gray-500 mb-2">
                                    {t("search_by_name_or_id")}
                                </span>
                            </label>

                            <AsyncSelect
                                onSelect={(data) => setData("owner_id", data.id)}
                                apiEndpoint={route("setting.owner.allOwners")}
                                placeholder="e.g. Ali Khan - 123456789"
                                formatOption={(item) => `${item.name} - ${item.national_id}`}
                                className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
 
                    </div>
                </CustomModal>
            )}

            {loading && (
                <div className="flex justify-center my-4">
                    <LoaderIcon />
                </div>
            )}

            <DataTable
                columns={columns}
                data={Owners?.data || []}
                links={Owners.links}
                enableButton={true}
                onButtonClick={() => setModalShow(true)}
                buttonLabel={t("addVehicleOwner")}
                enableSearch={false}
            >
                {Owners?.data?.map((item, i) => (
                    <tr className="hover:bg-slate-100" key={i}>
                        <td className="p-2 text-center">{item.id}</td>
                        <td className="p-2 text-center">{item.name}</td>
                        <td className="p-2 text-center">{item.father_name}</td>
                        <td className="p-2 text-center">{item.contact_no}</td>
                        <td className="p-2 text-center">{item.national_id}</td>
                        <td className="p-2 text-center">{item.file}</td>
                        <td className="p-2 text-center">
                            <img
                                src={item.photo}
                                alt={t("owner_photo")}
                                className="w-16 h-16 object-cover"
                            />
                        </td>
                        <td className="p-2 text-center">
                            <ThreeDotMenu>
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <span className="ml-2 text-xl">
                                            <VerifiedIcon />
                                        </span>
                                        {t("confirm")}
                                    </button>

                                    <Link className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <span className="ml-2 text-xl">
                                            <Edit2 />
                                        </span>
                                        {t("edit")}
                                    </Link>
                                </div>
                            </ThreeDotMenu>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
}

export default VehicleOwner;

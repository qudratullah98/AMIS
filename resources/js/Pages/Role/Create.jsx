import { useForm } from "@inertiajs/react";
import PermissionsForm from "./PermissionsForm";
import RoleForm from "./RoleForm";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SubHeader from "@/Components/SubHeader";
import PrimaryButton from "@/Components/PrimaryButton";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ListRestart, Loader } from "lucide-react";

function CreateRole({ permission }) {
    const { t } = useTranslation();

    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        permissions: selectedPermissions,
    });

    const handleSelect = (id) => {
        if (!selectedPermissions.includes(id)) {
            const updated = [...selectedPermissions, id];
            setSelectedPermissions(updated);
            setData("permissions", updated);
        } else {
            const updated = selectedPermissions.filter((perm) => perm !== id);
            setSelectedPermissions(updated);
            setData("permissions", updated);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("role.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t("common.inoformationtStoredSuccessfully"));
                reset();
                setSelectedPermissions([]);
                setSearchTerm("");
            },
            onError: () => {
                toast.error(t("error.general"));
            },
        });
    };

    return (
        <AuthenticatedLayout header={<SubHeader title="نوی صلاحیت" />}>
            <SubHeader
                links={[
                    { name: t("user.roles"), href:"/user/roles" },
                    { name: t("user.addNewRole") },
                ]}
            />

            <div className="bg-white p-6 rounded-lg ">
                <form onSubmit={handleSubmit} className="space-y-2">
                    {/* First row: Role input */}
                    <RoleForm data={data} setData={setData} errors={errors} />

                    {/* Second row: Permissions */}
                    <PermissionsForm
                        permissions={permission}
                        selectedPermissions={selectedPermissions}
                        setSelectedPermissions={handleSelect}
                        errors={errors}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setSelectedPermissions([]);
                                setSearchTerm("");
                            }}
                            className="w-52 px-5 py-2.5 rounded-lg bg-gray-100 text-primary-color-dark border border-gray-200 hover:bg-gray-200 transition-all duration-500 flex items-center justify-center gap-2"
                        >
                            <ListRestart size={16} />
                            {t("user.reset")}
                        </button>

                        <PrimaryButton
                            disabled={processing}
                            className="w-52 px-5 py-2.5 rounded-lg bg-gray-100 text-primary-color-dark border border-gray-200 hover:bg-gray-200 transition-all duration-500 flex items-center justify-center gap-2"
                        >
                            {processing && (
                                <Loader className="animate-spin" size={16} />
                            )}

                            <span>
                                {processing
                                    ? t("common.storingInfo")
                                    : t("common.storInfo")}
                            </span>
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

export default CreateRole;

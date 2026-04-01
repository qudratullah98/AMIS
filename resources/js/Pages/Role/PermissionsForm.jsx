import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";

function PermissionsForm({
    permissions,
    selectedPermissions,
    setSelectedPermissions,
    errors,
    searchTerm,
    setSearchTerm,
}) {
    const { t } = useTranslation();

    // Filter permissions by searchTerm
    const filteredPermissions =
        permissions?.filter((perm) =>
            perm.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ) || [];

    return (
        <div className="mt-0">
            <InputLabel>{t("user.permissionsList")}</InputLabel>
            {/* Search Input */}
            <TextInput
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
                value={searchTerm}
                placeholder={t("user.searchByRoleName")}
                autoComplete="off"
            />


            {/* Permissions Grid */}
            <div className="mt-4 max-h-96 overflow-y-auto">
                <div
                    dir="ltr"
                    className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
                >
                    {filteredPermissions.map((perm) => (
                        <label
                            key={perm.id}
                            className="flex items-center p-2 border rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedPermissions.includes(perm.id)}
                                onChange={() => setSelectedPermissions(perm.id)}
                                className="h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700 text-sm">
                                {perm.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <InputError message={errors.permissions ? t(`error.${errors.permissions}`) : ""} />
        </div>
    );
}

export default PermissionsForm;

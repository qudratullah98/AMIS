// RoleForm.js
import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useTranslation } from "react-i18next";

function RoleForm({ data, setData, errors }) {
        const { t } = useTranslation();

    return (
        <div className="mt-0">
            <InputLabel htmlFor="role">{t("user.role")}</InputLabel>
            <TextInput
                id="role"
                onChange={(e) => setData("name", e.target.value)}
                className={`${
                    errors.name ? "border-red-500" : "border-gray-300"
                } transition duration-200 ease-in-out mt-1 `}
                value={data.name}
                placeholder={t("input.enterRoleName")}
                autoComplete="off"
            />
            <InputError message={errors.name ? t(`error.${errors.name}`) : ""} />
        </div>
    );
}

export default RoleForm;

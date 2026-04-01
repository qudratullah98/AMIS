import CustomSelect from "@/Components/CustomSelect";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function CreateUser({ roles, airports, general_departments }) {
    const { t } = useTranslation();
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        photo: "",
        role_id: [],
        airport_id: "",
        general_department_id: "",
        position_title: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t("common.inoformationtStoredSuccessfully"));
                reset();
            },
            onError: (error) => {
                toast.error(
                    t("error.general"),
                );
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <SubHeader
                links={[
                    { name: t("user.users"), href: "/users" },
                    { name: t("user.addingNewUser") },
                ]}
            />

            <main className="flex-grow w-full max-w-3xl py-8 mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-4 rounded-lg shadow-none border border-gray-200">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {/* Company Name */}
                        <div>
                            <InputLabel htmlFor="name">
                                {t("common.name")}
                            </InputLabel>
                            <TextInput
                                id="name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={` ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                value={data.name}
                                placeholder={t("input.enterName")}
                            />
                            <InputError message={errors.name ? t(`error.${errors.name}`) : ""}  />
                        </div>

                        {/* email */}
                        <div>
                            <InputLabel htmlFor="email">
                                {t("user.email")}
                            </InputLabel>
                            <TextInput
                                id="email"
                                value={data.email}
                                type="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={` ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                autoComplete="email"
                                placeholder={t("input.enterUserEmail")}
                            />
                            <InputError message={errors.email ? t(`error.${errors.email}`) : ""}></InputError>
                        </div>

                        {/* Passwrod */}
                        <div>
                            <InputLabel htmlFor="password">
                                {t("user.password")}
                            </InputLabel>
                            <TextInput
                                id="password"
                                value={data.password}
                                type="password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                autoComplete="new-password"
                                className={` ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                placeholder={t("input.enterUserPassword")}
                            />
                            <InputError message={errors.password ? t(`error.${errors.password}`) : ""}></InputError>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <InputLabel htmlFor="password">
                                {t("user.confirmPassword")}
                            </InputLabel>
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                type="password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className={` ${
                                    errors.password_confirmation
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                autoComplete="new-password"
                                placeholder={t(
                                    "input.enterPasswordConfirmation",
                                )}
                            />
                            <InputError
                                message={errors.password == "passwordNotMatch" ? t(`error.passwordNotMatch`) : ""}
                            ></InputError>
                        </div>
                        {/* Position Title */}
                        <div>
                            <InputLabel htmlFor="position_title">
                                {t("user.positionTitle")}
                            </InputLabel>
                            <TextInput
                                id="position_title"
                                value={data.position_title}
                                type="text"
                                onChange={(e) =>
                                    setData("position_title", e.target.value)
                                }
                                className={` ${
                                    errors.position_title
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                placeholder={t("input.enterPositionTitle")}
                            />
                            <InputError
                                message={errors.position_title ? t(`error.${errors.position_title}`) : ""}
                            ></InputError>
                        </div>

                        {/* صلاحیت */}
                        <div>
                            <InputLabel htmlFor="license_end_date">
                                {t("user.role")}
                            </InputLabel>
                            <CustomSelect
                                id="role_id"
                                options={roles.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    };
                                })}
                                onChange={(e) => {
                                    setData("role_id", e);
                                }}
                                value={data.role_id}
                                multiple={true}
                                placeholder={t("input.selectRole")}
                            ></CustomSelect>
                            <InputError
                            message={errors.role_id ? t(`error.${errors.role_id}`) : ""}></InputError>
                        </div>
                        {/* Airport */}
                        <div>
                            <InputLabel htmlFor="airport_id">
                                {t("airport.airport")}
                            </InputLabel>
                            <CustomSelect
                                id="airport_id"
                                options={airports.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name_ps,
                                    };
                                })}
                                onChange={(e) => {
                                    setData("airport_id", e);
                                }}
                                value={data.airport_id}
                                placeholder={t("input.selectAirport")}
                            ></CustomSelect>
                            <InputError
                                message={errors.airport_id ? t(`error.${errors.airport_id}`) : ""}
                            ></InputError>
                        </div>

                        {/* General Department */}
                        <div>
                            <InputLabel htmlFor="general_department_id">
                                {t("user.generalDepartment")}
                            </InputLabel>
                            <CustomSelect
                                id="general_department_id"
                                options={general_departments.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name_ps,
                                    };
                                })}
                                onChange={(e) => {
                                    setData("general_department_id", e);
                                }}
                                value={data.general_department_id}
                                placeholder={t("input.selectGeneralBranch")}
                            ></CustomSelect>
                            <InputError
                                message={errors.general_department_id ? t(`error.${errors.general_department_id}`) : ""}
                            ></InputError>
                        </div>
                        {/* photo */}
                        <div>
                            <InputLabel htmlFor="license_start_date">
                                {t("common.image")}
                            </InputLabel>
                            <FileUpload
                                id="photo"
                                onChange={(e) =>
                                    setData("photo", e.target.value)
                                }
                            />
                            {/* <InputError
                                message={errors.file ? t(`error.${errors.file}`) : ""}
                            ></InputError> */}
                        </div>
                        {/* Buttons */}
                        <div className="flex space-x-4 col-span-2">
                            <PrimaryButton
                                disabled={processing}
                                className="w-52 px-5 py-2.5 rounded-lg bg-gray-100 text-primary-color-dark border border-gray-200 hover:bg-gray-200 transition-all duration-500 flex items-center justify-center gap-2"
                            >
                                {processing && (
                                    <Loader
                                        className="animate-spin"
                                        size={16}
                                    />
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
            </main>
        </AuthenticatedLayout>
    );
}

export default CreateUser;

import CreateHeader from "@/Components/CreateHeader";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomSelect from "@/Components/CustomSelect";
import React from "react";
import toast from "react-hot-toast";
import CustomDatePicker from "@/Components/CustomDatePicker";
import { useTranslation } from "react-i18next";
import convertTimestamp from "@/Components/utils/ConvertDate";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
function CreateCompany({companyTypes}) {
    const { t } = useTranslation(); 
    const { data, setData, post, reset, errors, processing, setError } =
        useForm({
            company_name: "",
            company_type_id: null,
            license_number: "",
            license_start_date: "",
            license_end_date: "",
            tin: "",
            descriptions: "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("setting.company.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t("storedSuccessfully"));

                reset();
            },
            onError: (error) => {
                if (error.status === 422) {
                    setError(
                        "company_name",
                        error.response.data.errors.company_name,
                    );

                    setError(
                        "license_number",
                        error.response.data.errors.license_number,
                    );
                    setError(
                        "license_start_date",
                        error.response.data.errors.license_start_date,
                    );
                    setError(
                        "license_end_date",
                        error.response.data.errors.license_end_date,
                    );
                    setError(
                        "company_type_id",
                        error.response.data.errors.company_type_id,
                    );
                    setError("tin", error.response.data.errors.tin);
                    setError(
                        "descriptions",
                        error.response.data.errors.descriptions,
                    );
                } else
                    toast.error(
                        "Something went wrong! Please check your input fild .",
                    );
            },
        });
    };

    return (
        <AuthenticatedLayout header={<SubHeader title="شرکت جدید" />}>
            {/* <SubHeader title={t("newCompany")} /> */}

            <main className="flex-grow w-full max-w-3xl py-8 mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {/* Company Name */}
                        <div>
                            <InputLabel htmlFor="company_name">
                                {t("companyName")}
                            </InputLabel>
                            <TextInput
                                id="company_name"
                                onChange={(e) =>
                                    setData("company_name", e.target.value)
                                }
                                className={` ${
                                    errors.company_name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                value={data.company_name}
                            />
                            <InputError
                                message={t(errors.company_name)}
                            ></InputError>
                        </div>

                       <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    {t("companyType")}
                                </label>

                                <CustomSelect
                                    options={companyTypes?.map((type) => ({
                                        label: type.name_fr,
                                        value: type.id,
                                    }))}
                                    onChange={(data) =>
                                        setData("company_type_id", data)
                                    }
                                    value={data.company_type_id}
                                />
                            </div>
                        {/* License Number */}
                        <div>
                            <InputLabel htmlFor="license_number">
                                {t("lisenceNumber")}
                            </InputLabel>
                            <TextInput
                                id="license_number"
                                value={data.license_number}
                                onChange={(e) =>
                                    setData("license_number", e.target.value)
                                }
                                className={` ${
                                    errors.license_number
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out text-right`}
                                dir="ltr"
                            />
                            <InputError
                                message={t(errors.license_number)}
                            ></InputError>
                        </div>

                        {/* License Start Date */}
                        <div>
                            <InputLabel htmlFor="license_start_date">
                                {t("lisenseStartDate")}
                            </InputLabel>
                            <CustomDatePicker
                                handelChange={(e) =>
                                    setData(
                                        "license_start_date",
                                        convertTimestamp(e),
                                    )
                                }
                                error={t(errors.license_start_date)}
                                placeholder={"تاریخ شروع اعتبار"}
                            />
                        </div>

                        {/* License End Date */}
                        <div>
                            <InputLabel htmlFor="license_end_date">
                                {t("lisenseEndDate")}
                            </InputLabel>
                            <CustomDatePicker
                                handelChange={(e) =>
                                    setData(
                                        "license_end_date",
                                        convertTimestamp(e),
                                    )
                                }
                                error={t(errors.license_end_date)}
                                placeholder={"تاریخ ختم اعتبار"}
                            />
                        </div>

                        {/* TIN */}
                        <div>
                            <InputLabel htmlFor="tin">{t("TIN")}</InputLabel>
                            <TextInput
                                id="tin"
                                value={data.tin}
                                onChange={(e) => setData("tin", e.target.value)}
                                className={` ${
                                    errors.tin
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                            />
                            <InputError message={t(errors.tin)}></InputError>
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <InputLabel htmlFor="descriptions">
                                {t("descriptions")}
                            </InputLabel>
                            <TextArea
                                id="descriptions"
                                value={data.descriptions}
                                onChange={(e) =>
                                    setData("descriptions", e.target.value)
                                }
                                className={` ${
                                    errors.descriptions
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                            />
                            <InputError
                                message={errors.descriptions}
                            ></InputError>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4 col-span-2">
                            <PrimaryButton
                                className={`px-5 py-2.5 rounded-lg border border-tertiary-color-light/10 transition-all duration-500 
                                ${
                                    processing
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        : "bg-secondary-color-light/60 text-primary-color-dark hover:bg-secondary-color-light"
                                }`}
                                disabled={processing}
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-primary-color-dark border-t-transparent rounded-full animate-spin"></span>
                                        <span>Saving...</span>
                                    </div>
                                ) : (
                                    t("save")
                                )}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default CreateCompany;

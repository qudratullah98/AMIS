import AsyncSelect from "@/Components/AsyncSelect";
import CreateHeader from "@/Components/CreateHeader";
import CustomSelect from "@/Components/CustomSelect";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function CreateSmallVehicle({
    plateType,
    plateGrades,
    provinces,
    vehicleTypes,
    company = null,
}) {
    const { t } = useTranslation();
 const { data, setData, post, reset, errors, processing } = useForm({
    company_id: company?.id ?? null,
    company_name: company?.company_name ?? null,
    plate_no: "",
    plate_grade_id: "",
    plate_province_id: "",
    serial_number: "",        // added
    engine_no: "",
    shaci_no: "",
    vehicle_type_id: "",
    modal: "",
    vehicle_color: "",
    owner_id: "",
    driver_id: "",
    owner_is_driver: false,

    is_approved: false,
    image: "",
    file: "",

    vehicleweight: "",          // added
    vehicle_max_capacity: 0,    // added
    is_blocked: false,          // added
    block_date: null,           // added
    created_by: null,           // optional, if you track creator
    updated_by: null,           // optional, if you track updater
});


    const handleSubmit = (e) => {
        e.preventDefault();
        post(
            company?.id
                ? route("setting.company.vehicle.store.withCompany", company.id)
                : route("setting.company.vehicle.store"),
            {
                onSuccess: () => {
                    toast.success(t("storedSuccessfully"));
                    reset();
                },
                onError: () => {
                    toast.error("Something went wrong! Please try again.");
                },
            },
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <Head
                    title={
                        t("addvehicleto", {
                            company: company?.company_name ?? t("company"),
                        }) +
                        " " +
                        t("addvehicle")
                    }
                />
            }
        >
            <SubHeader
                title={t("addNewVehicle", {
                    company: company?.company_name ?? t("company"),
                })}
            />

            <main className="flex-grow w-full max-w-4xl py-2 mx-auto sm:px-2 lg:px-1">
                <div className="bg-white p-5 rounded-lg shadow-lg">
                    {/* <CreateHeader title=" وسایل نقلیه جدید" /> */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* Plate Number */}
                        <div className="col-span-2">
                            <InputLabel>{t("plateNO")}</InputLabel>
                            <TextInput
                                onChange={(e) =>
                                    setData("plate_no", e.target.value)
                                }
                            />
                            {errors.plate_no && (
                                <p className="text-red-500 text-sm">
                                    {errors.plate_no}
                                </p>
                            )}
                        </div>
                        <div>
                            <InputLabel>{t("shaciNO")}</InputLabel>
                            <TextInput
                                onChange={(e) =>
                                    setData("shaci_no", e.target.value)
                                }
                            />
                            {errors.shaci_no && (
                                <p className="text-red-500 text-sm">
                                    {errors.shaci_no}
                                </p>
                            )}
                        </div>

                        {/* Company */}
                        <div className="w-full"> 
                            <InputLabel>{t("company")}</InputLabel>
                            <AsyncSelect
                              className="w-full h-10"
                                apiEndpoint={route("setting.getAllTransportCompanies")}
                                placeholder={
                                    data.company_name || t("searchByName")
                                }
                                formatOption={(item) => `${item.company_name}`}
                                onSelect={(data) => {
                                    setData("company_id", data.id);
                                }}
                            ></AsyncSelect>

                            {errors.company_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.company_id}
                                </p>
                            )}
                        </div>

                        {/* Engine Number */}
                        <div>
                            <InputLabel>{t("engineNO")}</InputLabel>
                            <TextInput
                                onChange={(e) =>
                                    setData("engine_no", e.target.value)
                                }
                            />
                            {errors.engine_no && (
                                <p className="text-red-500 text-sm">
                                    {errors.engine_no}
                                </p>
                            )}
                        </div>

                        {/* Vehicle Type */}
                        <div>
                            <InputLabel>{t("vehicleType")}</InputLabel>
                            <CustomSelect
                                options={vehicleTypes?.map((type) => ({
                                    label: type.name,
                                    value: type.id,
                                }))}
                                onChange={(data) =>
                                    setData("vehicle_type_id", data)
                                }
                                value={data.vehicle_type_id}
                            />
                            {errors.vehicle_type_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.vehicle_type_id}
                                </p>
                            )}
                        </div>

                        {/* province */}
                        <div>
                            <InputLabel>{t("plateProvince")}</InputLabel>
                            <CustomSelect
                                options={provinces?.map((data) => ({
                                    label: data.province,
                                    value: data.id,
                                }))}
                                onChange={(data) =>
                                    setData("plate_province_id", data)
                                }
                                value={data.plate_province_id}
                            />
                            {errors.plate_province_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.plate_province_id}
                                </p>
                            )}
                        </div>

                        {/* grade */}
                        <div>
                            <InputLabel>{t("plateGrade")}</InputLabel>
                            <CustomSelect
                                options={plateGrades?.map((data) => ({
                                    label: data.plate_grade,
                                    value: data.id,
                                }))}
                                onChange={(data) =>
                                    setData("plate_grade_id", data)
                                }
                                value={data.plate_grade_id}
                            />
                            {errors.plate_grade_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.plate_grade_id}
                                </p>
                            )}
                        </div>
                         {/* grade */}
                        <div>
                            <InputLabel>{t("plateType")}</InputLabel>
                            <CustomSelect
                                options={plateType?.map((data) => ({
                                    label: data.name,
                                    value: data.id,
                                }))}
                                onChange={(data) =>
                                    setData("plate_type_id", data)
                                }
                                value={data.plate_type_id}
                            />
                            {errors.plate_type_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.plate_type_id}
                                </p>
                            )}
                        </div>

                        {/* Modal */}
                        <div>
                            <InputLabel>{t("vehicleModal")}</InputLabel>
                            <TextInput
                                onChange={(e) =>
                                    setData("modal", e.target.value)
                                }
                            />
                            {errors.modal && (
                                <p className="text-red-500 text-sm">
                                    {errors.modal}
                                </p>
                            )}
                        </div>

                        {/* Color */}
                        <div>
                            <InputLabel>{t("vehicleColor")}</InputLabel>
                            <TextInput
                                onChange={(e) =>
                                    setData("vehicle_color", e.target.value)
                                }
                            />
                            {errors.vehicle_color && (
                                <p className="text-red-500 text-sm">
                                    {errors.vehicle_color}
                                </p>
                            )}
                        </div>

                        {/* Owner */}
                        <div>
                            <InputLabel>{t("vehicleOwner")}</InputLabel>
                            <AsyncSelect
                                onSelect={(data) => {
                                    setData("owner_id", data.id); // Assuming `data.id` is the selected Owner's ID
                                }}
                                apiEndpoint={route("setting.owner.allOwners")}
                                placeholder={t("search_by_name_or_id")}
                                formatOption={(item) =>
                                    `${item.name} - ${item.national_id}`
                                }
                            />
                            {errors.owner_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.owner_id}
                                </p>
                            )}
                        </div>

                        {/* Driver */}

                        {/* Image Upload */}
                        <div>
                            <InputLabel htmlFor="image">
                                {t("image")}
                            </InputLabel>
                            <FileUpload
                                id="image"
                                onFileSelect={(file) => setData("image", file)}
                                accept=".jpg,.jpeg,.png,.gif" // Accepting common image formats
                            />
                            <InputError message={t(errors.image)}></InputError>
                        </div>

                        {/* File Upload */}
                        <div>
                            <InputLabel htmlFor="file">
                                {t("documents")}
                            </InputLabel>
                            <FileUpload
                                id="file"
                                onFileSelect={(file) => setData("file", file)}
                                accept=".pdf,.doc,.docx" // Accepting common document formats
                            />
                            <InputError message={t(errors.file)}></InputError>
                        </div>

                        {/* Vehicle Weight */}
<div>
    <InputLabel>{t("vehicleWeight")}</InputLabel>
    <TextInput
        type="number"
        onChange={(e) => setData("vehicleweight", e.target.value)}
        value={data.vehicleweight}
    />
    {errors.vehicleweight && (
        <p className="text-red-500 text-sm">{errors.vehicleweight}</p>
    )}
</div>

{/* Vehicle Max Capacity */}
<div>
    <InputLabel>{t("vehicleMaxCapacity")}</InputLabel>
    <TextInput
        type="number"
        step="0.01"
        onChange={(e) => setData("vehicle_max_capacity", e.target.value)}
        value={data.vehicle_max_capacity}
    />
    {errors.vehicle_max_capacity && (
        <p className="text-red-500 text-sm">{errors.vehicle_max_capacity}</p>
    )}
</div>

 

 


                        {/* Buttons */}
                        <div className="col-span-2 flex space-x-2">
                            <PrimaryButton disabled={processing}>
                                {t("save")}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default CreateSmallVehicle;

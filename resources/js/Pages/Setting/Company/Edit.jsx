import CustomDatePicker from "@/Components/CustomDatePicker";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import convertTimestamp, {
    convertToShamsi,
} from "@/Components/utils/ConvertDate";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function EditCompany({ editable, handleEdit }) {
    const { t } = useTranslation();
    const [processing, setProcessing] = useState(false);
    const { data, setData, errors, setError } =
        useForm({
            id: editable.id,
            company_name: editable.company_name,
  
            license_number: editable.license_number,
            license_start_date: editable?.license_start_date
                ? editable.license_start_date
                : "",
            license_end_date: editable?.license_end_date
                ? editable.license_end_date
                : "",
            tin: editable?.tin || "",
            descriptions: editable.descriptions,
            is_approved: editable.is_approved,
            file: "",
        });


    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        axios.post(route("setting.company.update"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                setProcessing(false);
                toast.success(t("updatedSuccessfully"));
                handleEdit(response);
            })
            .catch((err) => {
                setProcessing(false);
                if (err.response && err.response.status === 422) {
                    Object.keys(err.response.data.errors).forEach((field) => {
                        setError(field, err.response.data.errors[field][0]);
                    });
                } else {
                    toast.error("Something went wrong!");
                }
            });
    };


    return (
        <main className="flex-grow w-full max-w-3xl py-4 mx-auo sm:px-6 lg:px-4 ">
            {/* <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200"> */}
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
                        className={` ${errors.company_name
                                ? "border-red-500"
                                : "border-gray-300"
                            } transition duration-200 ease-in-out`}
                        value={data.company_name}
                        disabled={editable.is_approved}
                    />
                    <InputError message={t(errors.company_name)}></InputError>
                </div>

       
               

                {/* License Number */}
                <div>
                    <InputLabel htmlFor="license_number">
                        {t("lisenceNumber")}
                    </InputLabel>
                    <TextInput
                        id="license_number"
                        value={data.license_number || ""}
                        onChange={(e) =>
                            setData("license_number", e.target.value)
                        }
                        className={` ${errors.license_number
                                ? "border-red-500"
                                : "border-gray-300"
                            } transition duration-200 ease-in-out`}
                        disabled={editable.is_approved}
                    />
                    <InputError message={t(errors.license_number)}></InputError>
                </div>

                {/* License Start Date */}
                <div>
                    <InputLabel htmlFor="license_start_date">
                        {t("lisenseStartDate")}
                    </InputLabel>
                    <CustomDatePicker
                        value={convertToShamsi(editable.license_start_date)}
                        handelChange={(e) => setData("license_start_date", e)}
                        error={errors.license_start_date}
                        placeholder={"تاریخ شروع اعتبار"}
                    />

                    <InputError
                        message={t(errors.license_start_date)}
                    ></InputError>
                </div>

                {/* License End Date */}
                <div>
                    <InputLabel htmlFor="license_end_date">
                        {t("lisenseEndDate")}
                    </InputLabel>
                    <CustomDatePicker
                        value={convertToShamsi(editable.license_end_date)}
                        handelChange={(e) => setData("license_end_date", e)}
                        error={errors.license_end_date}
                        placeholder={"تاریخ ختم اعتبار"}
                    />
                    <InputError
                        message={t(errors.license_end_date)}
                    ></InputError>
                </div>

                {/* TIN */}
                <div>
                    <InputLabel htmlFor="tin">{t("TIN")}</InputLabel>
                    <TextInput
                        id="tin"
                        value={data?.tin || ""}
                        onChange={(e) => setData("tin", e.target.value)}
                        className={` ${errors.tin ? "border-red-500" : "border-gray-300"
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
                        value={data?.descriptions || ""}
                        onChange={(e) =>
                            setData("descriptions", e.target.value)
                        }
                        className={` ${errors.descriptions
                                ? "border-red-500"
                                : "border-gray-300"
                            } transition duration-200 ease-in-out`}
                    />
                    <InputError message={errors.descriptions}></InputError>
                </div>

                {/* File Upload */}
                {editable.is_approved ? (
                    <div>
                        <InputLabel>{t("licenseScanFile")}</InputLabel>
                        <FileUpload
                            label="Upload File"
                            name="file"
                            onFileSelect={(file) => setData("file", file)}
                            accept=".pdf"
                        />
                        {errors.file && (
                            <p className="text-red-500 text-sm">
                                {errors.file}
                            </p>
                        )}
                    </div>
                ) : null}

                {/* Buttons */}
                <div className="flex space-x-4 col-span-2">
                    <PrimaryButton
                        className={`px-5 py-2.5 rounded-lg border border-tertiary-color-light/10 transition-all duration-500 
                            ${processing
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-secondary-color-light/60 text-primary-color-dark hover:bg-secondary-color-light'
                            }`}
                        disabled={processing}
                    >
                        {processing ? (
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-primary-color-dark border-t-transparent rounded-full animate-spin"></span>
                                <span>{t('save')}...</span>
                            </div>
                        ) : (
                            t("save")
                        )}
                    </PrimaryButton>

                </div>
            </form>
            {/* </div> */}
        </main>
    );
}

export default EditCompany;

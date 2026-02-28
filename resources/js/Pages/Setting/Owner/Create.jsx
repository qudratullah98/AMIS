import BackButton from "@/Components/BackButton";
import Breadcrumbs from "@/Components/Breadcrumbs";
import CreateHeader from "@/Components/CreateHeader";
import FileUpload from "@/Components/FileUpload";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader"; 
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

function CreateOwener() {
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        father_name: "",
        contact_no: "",
        national_id: "",
        file: "",
        photo: "",
    });
    
    const { t } = useTranslation()
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("setting.owner.store"), {
            onSuccess: () => { 
            },
        });


    };

    return (
        <AuthenticatedLayout header={<SubHeader title="مالک جدید" />}>
            {/* Header Bar */}
            <SubHeader title={t('newOwner')}></SubHeader>
            {/* Main Form Section */}
            <main className="flex-grow w-full max-w-3xl py-10 mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                {t("name")}
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border transition focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Father Name */}
                        <div>
                            <label htmlFor="father_name" className="block text-sm font-semibold text-gray-700 mb-1">
                                {t("fatherName")}
                            </label>
                            <input
                                type="text"
                                id="father_name"
                                value={data.father_name}
                                onChange={(e) => setData("father_name", e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border transition focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.father_name ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.father_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.father_name}</p>
                            )}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label htmlFor="contact_no" className="block text-sm font-semibold text-gray-700 mb-1">
                                {t("phoneNO")}
                            </label>
                            <input
                                type="text"
                                id="contact_no"
                                value={data.contact_no}
                                onChange={(e) => setData("contact_no", e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border transition focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.contact_no ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.contact_no && (
                                <p className="text-red-500 text-xs mt-1">{errors.contact_no}</p>
                            )}
                        </div>

                        {/* National ID */}
                        <div>
                            <label htmlFor="national_id" className="block text-sm font-semibold text-gray-700 mb-1">
                                {t("nationalID")}
                            </label>
                            <input
                                type="text"
                                id="national_id"
                                value={data.national_id}
                                onChange={(e) => setData("national_id", e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border transition focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.national_id ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.national_id && (
                                <p className="text-red-500 text-xs mt-1">{errors.national_id}</p>
                            )}
                        </div>

                        {/* File Upload */}
                        <div>
                            <InputLabel>{t("documents")}</InputLabel>
                            <FileUpload
                                label="Upload File"
                                name="file"
                                onFileSelect={(file) => setData("file", file)}
                                accept=".pdf,.doc,.docx"
                            />
                            {errors.file && (
                                <p className="text-red-500 text-xs mt-1">{errors.file}</p>
                            )}
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <InputLabel>{t("image")}</InputLabel>
                            <FileUpload
                                label="Upload File"
                                name="photo"
                                onFileSelect={(file) => setData("photo", file)}
                                accept=".jpg,.jpeg,.png,.gif,.webp"
                            />
                            {errors.photo && (
                                <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-1 sm:col-span-2 mt-6">
                            <PrimaryButton className=" ">
                                {processing && <Loader className="mx-2" />}
                                {t("save")}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>

    );
}

export default CreateOwener;

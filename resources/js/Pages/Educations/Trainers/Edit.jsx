import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CustomSelect from "@/Components/CustomSelect";

function EditTrainer({ trainer, onSubmitSuccess, onCancel }) {
    const { t } = useTranslation();

    const typeOptions = [
        { value: 'internal', label: t('trainers.types.internal') },
        { value: 'external', label: t('trainers.types.external') },
        { value: 'consultant', label: t('trainers.types.consultant') },
    ];

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t("validation.required"))
            .max(255, t("validation.max", { max: 255 })),
        type: Yup.string()
            .required(t("validation.required"))
            .oneOf(['internal', 'external', 'consultant'], t("validation.invalid")),
        phone: Yup.string()
            .nullable()
            .max(50, t("validation.max", { max: 50 })),
        email: Yup.string()
            .nullable()
            .email(t("validation.email"))
            .max(255, t("validation.max", { max: 255 })),
        license_number: Yup.string()
            .nullable()
            .max(100, t("validation.max", { max: 100 })),
        organization: Yup.string()
            .nullable()
            .max(255, t("validation.max", { max: 255 })),
        address: Yup.string()
            .nullable()
            .max(500, t("validation.max", { max: 500 })),
        description: Yup.string()
            .nullable(),
    });

    const formik = useFormik({
        initialValues: {
            name: trainer.name || '',
            type: trainer.type || '',
            phone: trainer.phone || '',
            email: trainer.email || '',
            license_number: trainer.license_number || '',
            organization: trainer.organization || '',
            address: trainer.address || '',
            description: trainer.description || '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axios.put(route('trainers.update', trainer.id), values);
                if (onSubmitSuccess) {
                    onSubmitSuccess(response.data.trainer);
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                }
                console.error('Error updating trainer:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                    <InputLabel
                        value={t("trainers.name")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainers.namePlaceholder")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.name && formik.errors.name 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.name && formik.errors.name}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Type */}
                <div>
                    <InputLabel
                        value={t("trainers.type")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <CustomSelect
                        id="type"
                        options={typeOptions}
                        value={formik.values.type}
                        onChange={(value) => formik.setFieldValue("type", value)}
                        onBlur={() => formik.setFieldTouched("type", true)}
                        placeholder={t("trainers.selectType")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-white ${
                            formik.touched.type && formik.errors.type 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.type && formik.errors.type}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Phone */}
                <div>
                    <InputLabel
                        value={t("trainers.phone")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="phone"
                        type="text"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainers.phonePlaceholder")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.phone && formik.errors.phone 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.phone && formik.errors.phone}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <InputLabel
                        value={t("trainers.email")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainers.emailPlaceholder")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.email && formik.errors.email 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.email && formik.errors.email}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* License Number */}
                <div>
                    <InputLabel
                        value={t("trainers.licenseNumber")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="license_number"
                        type="text"
                        value={formik.values.license_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainers.licensePlaceholder")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.license_number && formik.errors.license_number 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.license_number && formik.errors.license_number}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Organization */}
                <div>
                    <InputLabel
                        value={t("trainers.organization")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="organization"
                        type="text"
                        value={formik.values.organization}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainers.organizationPlaceholder")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.organization && formik.errors.organization 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.organization && formik.errors.organization}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Address - Full Width */}
                <div className="md:col-span-2">
                    <InputLabel
                        value={t("trainers.address")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <textarea
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainers.addressPlaceholder")}
                        rows="2"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-y ${
                            formik.touched.address && formik.errors.address 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.address && formik.errors.address}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Description - Full Width */}
                <div className="md:col-span-2">
                    <InputLabel
                        value={t("trainers.description")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainers.descriptionPlaceholder")}
                        rows="3"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-y ${
                            formik.touched.description && formik.errors.description 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.description && formik.errors.description}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-6 border-t border-gray-200">
                <div className="flex gap-3 w-full sm:w-auto order-2 sm:order-1">
                    <button
                        type="button"
                        onClick={() => {
                            formik.resetForm();
                            if (onCancel) onCancel();
                        }}
                        className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formik.isSubmitting}
                    >
                        {t("common.cancel")}
                    </button>

                    <button
                        type="button"
                        onClick={() => formik.resetForm()}
                        className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formik.isSubmitting}
                    >
                        {t("common.reset")}
                    </button>
                </div>

                <PrimaryButton
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full sm:w-auto min-w-[140px] px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md justify-center flex items-center gap-2 order-1 sm:order-2"
                >
                    {formik.isSubmitting ? (
                        <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t("common.updating")}
                        </>
                    ) : (
                        t("common.update")
                    )}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default EditTrainer;
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CustomSelect from "@/Components/CustomSelect";

function CreateCertificate({ onSubmitSuccess, onCancel }) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            name: "",
            level: "",
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required(t("validation.required"))
                .max(255, t("validation.max", { max: 255 })),
            level: Yup.string()
                .required(t("validation.required")),
        }),

        onSubmit: async (values, { resetForm, setSubmitting, setErrors }) => {
            try {
                const response = await axios.post(
                    route("education..store"),
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.success) {
                    toast.success(response.data.message || t("common.savedSuccessfully"));
                    resetForm();
                    if (onSubmitSuccess) {
                        onSubmitSuccess(response.data.data);
                    }
                }
            } catch (error) {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error("Error creating certificate:", error);
                    toast.error(
                        error.response?.data?.message ||
                        t("common.somethingWentWrong")
                    );
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Level options
    const levelOptions = [
        { label: t("education.levels.beginner"), value: "Beginner" },
        { label: t("education.levels.intermediate"), value: "Intermediate" },
        { label: t("education.levels.advanced"), value: "Advanced" },
        { label: t("education.levels.expert"), value: "Expert" },
    ];

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Certificate Name */}
                <div>
                    <InputLabel
                        value={t("education.certificateName")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("education.certificateName")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                        style={{
                            borderColor: formik.touched.name && formik.errors.name ? '#ef4444' : undefined,
                        }}
                    />
                    <InputError
                        message={formik.touched.name && formik.errors.name}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Level */}
                <div>
                    <InputLabel
                        value={t("education.certificateLevel")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <CustomSelect
                        id="level"
                        options={levelOptions}
                        value={formik.values.level}
                        onChange={(value) => formik.setFieldValue("level", value)}
                        onBlur={() => formik.setFieldTouched("level", true)}
                        placeholder={t("education.certificateLevel")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-white"
                        style={{
                            borderColor: formik.touched.level && formik.errors.level ? '#ef4444' : undefined,
                        }}
                    />
                    <InputError
                        message={formik.touched.level && formik.errors.level}
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
                            {t("common.saving")}
                        </>
                    ) : (
                        t("common.save")
                    )}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default CreateCertificate;
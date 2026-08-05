import React from "react";
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

function EditCertificate({ certificate, onSubmitSuccess, onCancel }) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            name: certificate.name || "",
            level: certificate.level || "",
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required(t("validation.required"))
                .max(255, t("validation.max", { max: 255 })),
            level: Yup.string()
                .required(t("validation.required")),
        }),

        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axios.put(
                    route("certificates.update", certificate.id),
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.success) {
                    toast.success(response.data.message || t("common.updatedSuccessfully"));
                    if (onSubmitSuccess) {
                        onSubmitSuccess(response.data.data);
                    }
                }
            } catch (error) {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
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
        { label: t("education.certificate.levels.beginner"), value: "Beginner" },
        { label: t("education.certificate.levels.intermediate"), value: "Intermediate" },
        { label: t("education.certificate.levels.advanced"), value: "Advanced" },
        { label: t("education.certificate.levels.expert"), value: "Expert" },
    ];

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-5"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Certificate Name */}
                <div>
                    <InputLabel 
                        value={t("education.certificate.name")}
                        required={true}
                    />
                    <TextInput
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("education.certificate.namePlaceholder")}
                        className="w-full"
                    />
                    <InputError
                        message={formik.touched.name && formik.errors.name}
                    />
                </div>

                {/* Level */}
                <div>
                    <InputLabel 
                        value={t("education.certificate.level")}
                        required={true}
                    />
                    <CustomSelect
                        id="level"
                        options={levelOptions}
                        value={formik.values.level}
                        onChange={(value) => formik.setFieldValue("level", value)}
                        onBlur={() => formik.setFieldTouched("level", true)}
                        placeholder={t("education.certificate.selectLevel")}
                    />
                    <InputError
                        message={formik.touched.level && formik.errors.level}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={() => {
                        formik.resetForm();
                        if (onCancel) onCancel();
                    }}
                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    disabled={formik.isSubmitting}
                >
                    {t("common.cancel")}
                </button>

                <button
                    type="button"
                    onClick={() => formik.resetForm()}
                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    disabled={formik.isSubmitting}
                >
                    {t("common.reset")}
                </button>

                <PrimaryButton
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="min-w-32 justify-center"
                >
                    {formik.isSubmitting
                        ? t("common.updating")
                        : t("common.update")}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default EditCertificate;
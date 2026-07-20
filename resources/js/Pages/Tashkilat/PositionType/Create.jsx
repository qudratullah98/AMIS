import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

function CreatePositionType({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            title: "",
            grade: "",
            code: "",
        },

        validationSchema: Yup.object({
            title: Yup.string()
                .required(t("validation.required"))
                .max(255),

            grade: Yup.string()
                .required(t("validation.required"))
                .max(100),

            code: Yup.string()
                .required(t("validation.required"))
                .max(50),
        }),

        onSubmit: async (
            values,
            { setSubmitting, resetForm, setErrors }
        ) => {
            try {
                const response = await axios.post(
                    route("position-types.store"),
                    values
                );

                if (response.data.success) {
                    toast.success(response.data.message);
                    resetForm();

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

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
                <InputLabel value={t("tashkilat.positionType")} />

                <TextInput
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={
                        formik.touched.title
                            ? formik.errors.title
                            : ""
                    }
                />
            </div>


            {/* Grade */}
            <div>
                <InputLabel value={t("tashkilat.grade")} />

                <TextInput
                    name="grade"
                    value={formik.values.grade}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={
                        formik.touched.grade
                            ? formik.errors.grade
                            : ""
                    }
                />
            </div>


            {/* Code */}
            <div>
                <InputLabel value={t("tashkilat.code")} />

                <TextInput
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={
                        formik.touched.code
                            ? formik.errors.code
                            : ""
                    }
                />
            </div>


            {/* Submit */}
            <div className="flex justify-end">
                <PrimaryButton disabled={formik.isSubmitting}>
                    {formik.isSubmitting
                        ? t("common.saving")
                        : t("common.save")}
                </PrimaryButton>
            </div>

        </form>
    );
}

export default CreatePositionType;
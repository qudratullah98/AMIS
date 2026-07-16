import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import axios from "axios";
import toast from "react-hot-toast";

import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

function Create({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t("validation.required"))
            .max(255),

        code: Yup.string()
            .max(100)
            .nullable()
            .transform((value) => (value === "" ? null : value)),

        email: Yup.string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .email(t("validation.invalidEmail")),

        phone: Yup.string()
            .max(50)
            .nullable()
            .transform((value) => (value === "" ? null : value)),

        website: Yup.string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .url(t("validation.invalidUrl")),

        address: Yup.string()
            .nullable()
            .transform((value) => (value === "" ? null : value)),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            email: "",
            phone: "",
            website: "",
            address: "",
        },

        validationSchema,

        onSubmit: async (
            values,
            { setSubmitting, resetForm, setErrors }
        ) => {
            try {
                const response = await axios.post(
                    route("organizations.store"),
                    values
                );

                resetForm();

                toast.success(
                    t("success.organization_stored_successfully")
                );

                if (onSubmitSuccess) {
                    onSubmitSuccess(response.data);
                }
            } catch (error) {
                if (error.response?.status === 422) {
                    const laravelErrors = error.response.data.errors;
                    const errors = {};

                    Object.keys(laravelErrors).forEach((key) => {
                        errors[key] = laravelErrors[key][0];
                    });

                    setErrors(errors);

                    toast.error(t("validation.fix_errors"));
                } else {
                    console.error(error);

                    toast.error(
                        t("something_went_wrong") ||
                            "Something went wrong while submitting the form."
                    );
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
                <InputLabel value={t("tashkilat.organization.name")} />

                <TextInput
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={
                      t(  formik.touched.name ? formik.errors.name : "")
                    }
                />
            </div>

            {/* Code */}
            <div>
                <InputLabel value={t("tashkilat.organization.code")} />

                <TextInput
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={
                       t(formik.touched.code ? formik.errors.code : "") 
                    }
                />
            </div>

            {/* Email */}
            <div>
                <InputLabel value={t("tashkilat.organization.email")} />

                <TextInput
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={
                       t(formik.touched.email ? formik.errors.email : "") 
                    }
                />
            </div>

            {/* Phone */}
            <div>
                <InputLabel value={t("tashkilat.organization.phone")} />

                <TextInput
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={
                        t(formik.touched.phone ? formik.errors.phone : "")
                    }
                />
            </div>

            {/* Website */}
            <div>
                <InputLabel value={t("tashkilat.organization.website")} />

                <TextInput
                    type="url"
                    name="website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={
                       t(formik.touched.website
                            ? formik.errors.website
                            : "") 
                    }
                />
            </div>

            {/* Address */}
            <div>
                <InputLabel value={t("tashkilat.organization.address")} />

                <textarea
                    name="address"
                    rows={4}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />

                <InputError
                    message={
                       t(formik.touched.address
                            ? formik.errors.address
                            : "") 
                    }
                />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <PrimaryButton
                    type="submit"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting
                        ? t("common.saving")
                        : t("common.save")}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default Create;
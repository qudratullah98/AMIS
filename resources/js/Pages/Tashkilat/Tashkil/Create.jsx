import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CustomSelect from "@/Components/CustomSelect";
import toast from "react-hot-toast";

function Create({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const [organizations, setOrganizations] = useState([]);

    const formik = useFormik({
        initialValues: {
            organization_id: "",
            year: "",
            name: "",
            reference_number: "",
            description: "",
        },

        validationSchema: Yup.object({
            organization_id: Yup.number().required(t("validation.required")),

            year: Yup.number()
                .required(t("validation.required"))
                .min(2000)
                .max(2100),

            reference_number: Yup.string()
                .required(t("validation.required"))
                .max(255),

            description: Yup.string().nullable(),
        }),

        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
                const response = await axios.post(
                    route("tashkilat.store"),
                    values,
                );

                toast.success(response.data.message);

                resetForm();

                if (onSubmitSuccess) {
                    onSubmitSuccess(response.data.tashkil);
                }
            } catch (error) {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    toast.error("Something went wrong.");
                }
            } finally {
                setSubmitting(false);
            }
        },
    });
    /**
     * Load Organizations
     */
    useEffect(() => {
        axios
            .get(route("organizations.json"))
            .then((res) => {
                setOrganizations(res.data);
            })
            .catch(console.error);
    }, []);

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Organization */}
            <div>
                <InputLabel value={t("tashkilat.organization.name")} />

                <CustomSelect
                    value={formik.values.organization_id}
                    options={organizations.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    onChange={(value) =>
                        formik.setFieldValue("organization_id", value)
                    }
                />

                <InputError
                    message={t(
                        formik.touched.organization_id &&
                            formik.errors.organization_id,
                    )}
                />
            </div>

            {/* Year */}
            <div>
                <InputLabel value={t("tashkilat.year")} />

                <TextInput
                    type="number"
                    name="year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={t(formik.touched.year && formik.errors.year)}
                />
            </div>

            {/* Reference Number */}
            <div>
                <InputLabel value={t("tashkilat.reference_number")} />

                <TextInput
                    name="reference_number"
                    value={formik.values.reference_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={t(
                        formik.touched.reference_number &&
                            formik.errors.reference_number,
                    )}
                />
            </div>

            {/* Description */}
            <div>
                <InputLabel value={t("common.descriptions")} />

                <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={4}
                    className="w-full rounded-md border-gray-300"
                />

                <InputError
                    message={t(
                        formik.touched.description && formik.errors.description,
                    )}
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

export default Create;

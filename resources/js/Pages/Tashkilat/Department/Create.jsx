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

function CreateDepartment({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const [tashkils, setTashkils] = useState([]);
    const [departments, setDepartments] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            description: "",
            tashkil_id: "",
            parent_id: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required(t("validation.required")).max(255),

            code: Yup.string().nullable().max(100),

            description: Yup.string().nullable(),

            tashkil_id: Yup.number().required(t("validation.required")),

            parent_id: Yup.number().nullable(),
        }),

        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
                const response = await axios.post(
                    route("departments.store"),
                    values,
                );

                if (response.data.success) {
                    toast.success(response.data.message);
                    resetForm();
                    onSubmitSuccess(response.data.data);
                }
            } catch (error) {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    toast.error(
                        error.response?.data?.message ||
                            "Something went wrong.",
                    );
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    /**
     * Load Tashkils
     */
    useEffect(() => {
        axios
            .get(route("tashkils.json"))
            .then((res) => {
                setTashkils(res.data);
            })
            .catch(console.error);
    }, []);

    /**
     * Load departments when tashkil changes
     */
    useEffect(() => {
        axios
            .get(route("departments.json"), {
                params: {
                    tashkil_id: formik.values.tashkil_id,
                },
            })
            .then((res) => {
                setDepartments(res.data);
            })
            .catch(console.error);
    }, [formik.values.tashkil_id]);

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Name */}

            <div>
                <InputLabel value={t("tashkilat.departmentName")} />

                <TextInput
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={t(formik.touched.name && formik.errors.name)}
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
                    message={t(formik.touched.code && formik.errors.code)}
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
                    className="w-full rounded-md border-gray-300"
                    rows={4}
                />

                <InputError
                    message={
                       t(formik.touched.description && formik.errors.description) 
                    }
                />
            </div>

            {/* Tashkil */}

            <div>
                <InputLabel value={t("tashkilat.tashkil")} />

                <CustomSelect
                    value={formik.values.tashkil_id}
                    options={tashkils.map((item) => ({
                        value: item.id,
                        label: item.year +" - "+ item?.organization?.name,
                    }))}
                    onChange={(value) => {
                        formik.setFieldValue("tashkil_id", value);

                        // Clear parent when tashkil changes
                        formik.setFieldValue("parent_id", "");
                    }}
                />

                <InputError
                    message={
                        t(formik.touched.tashkil_id && formik.errors.tashkil_id)
                    }
                />
            </div>

            {/* Parent Department */}

            <div>
                <InputLabel value={t("tashkilat.parentDepartment")} />

                <CustomSelect
                    value={formik.values.parent_id}
                    options={[
                        {
                            value: "",
                            label: t("common.none"),
                        },
                        ...departments.map((item) => ({
                            value: item.id,
                            label: item.name,
                        })),
                    ]}
                    onChange={(value) => {
                        formik.setFieldValue("parent_id", value);
                    }}
                />

                <InputError
                    message={
                        t(formik.touched.parent_id && formik.errors.parent_id)
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

export default CreateDepartment;

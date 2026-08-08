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


function CreateEmployee({ onSubmitSuccess }) {

    const { t } = useTranslation();

    const [preview, setPreview] = useState(null);


    const formik = useFormik({

        initialValues: {
 
            first_name: "",
            last_name: "",
            father_name: "",

            gender: "",
            birth_date: "",

            phone: "",
            email: "",

            national_id: "",
            passport_no: "",

            marital_status: "",

            blood_group_id: "",

            province: "",
            district: "",
            address: "",

            photo: null,

            approval_status_id: 2,

            status: true,

        },


        validationSchema: Yup.object({

             first_name: Yup.string()
                    .required(t("validation.required")),
                     gender:Yup.string()
                    .required(t("validation.required")), 
                    email: Yup.string()
                    .email(t("validation.email"))
                    .nullable(), photo:
                Yup.mixed()
                    .nullable()
                    .test(
                        "fileSize",
                        "Image size must be less than 2MB",
                        value =>
                            !value ||
                            value.size <= 2 * 1024 * 1024
                    ),

        }),



        onSubmit: async (
            values,
            {
                resetForm,
                setSubmitting,
                setErrors
            }
        ) => {
            try {
                const formData = new FormData(); Object.keys(values).forEach(key => {
                    formData.append(
                        key,
                        values[key] ?? ""
                    );
                });
                const response =
                    await axios.post(
                        route("employees.store"),
                        formData,
                        {
                            headers: {
                                "Content-Type":
                                    "multipart/form-data"
                            }
                        }
                    );
                if (response.data.success) {
                    toast.success(
                        response.data.message
                    ); resetForm(); setPreview(null); onSubmitSuccess(
                        response.data.data
                    );
                }
            }
            catch (error) {
                if (error.response?.status === 422) {
                    setErrors(
                        error.response.data.errors
                    );
                }
                else {
                    toast.error(
                        error.response?.data?.message ||
                        t("common.somethingWentWrong")
                    );
                }
            }
            finally {
                setSubmitting(false);

            }


        }


    });



    const handleImage = (e) => {

        const file = e.target.files[0];


        if (file) {

            formik.setFieldValue(
                "photo",
                file
            ); setPreview(
                URL.createObjectURL(file)
            );

        }

    };







    return (

        <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className="space-y-5"
        >{/* Photo */}


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                {/* First Name */}
                <div>
                    <InputLabel value={t("tashkilat.employee.firstName")} />
                    <TextInput
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.first_name && formik.errors.first_name}
                    />
                </div>

                {/* Last Name */}
                <div>
                    <InputLabel value={t("tashkilat.employee.lastName")} />
                    <TextInput
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.last_name && formik.errors.last_name}
                    />
                </div>

                {/* Father Name */}
                <div>
                    <InputLabel value={t("tashkilat.employee.fatherName")} />
                    <TextInput
                        name="father_name"
                        value={formik.values.father_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.father_name && formik.errors.father_name}
                    />
                </div>

                {/* Phone */}
                <div>
                    <InputLabel value={t("tashkilat.employee.phone")} />
                    <TextInput
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.phone && formik.errors.phone}
                    />
                </div>

                {/* Email */}
                <div>
                    <InputLabel value={t("tashkilat.employee.email")} />
                    <TextInput
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.email && formik.errors.email}
                    />
                </div>

                {/* National ID */}
                <div>
                    <InputLabel value={t("tashkilat.employee.nationalId")} />
                    <TextInput
                        name="national_id"
                        value={formik.values.national_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.national_id && formik.errors.national_id}
                    />
                </div>

                {/* Passport No */}
                <div>
                    <InputLabel value={t("tashkilat.employee.passportNo")} />
                    <TextInput
                        name="passport_no"
                        value={formik.values.passport_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.passport_no && formik.errors.passport_no}
                    />
                </div>

                {/* Province */}
                <div>
                    <InputLabel value={t("tashkilat.employee.province")} />
                    <TextInput
                        name="province"
                        value={formik.values.province}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.province && formik.errors.province}
                    />
                </div>

                {/* District */}
                <div>
                    <InputLabel value={t("tashkilat.employee.district")} />
                    <TextInput
                        name="district"
                        value={formik.values.district}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.district && formik.errors.district}
                    />
                </div>

                {/* Birth Date */}
                <div>
                    <InputLabel value={t("tashkilat.employee.birthDate")} />
                    <TextInput
                        type="date"
                        name="birth_date"
                        value={formik.values.birth_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputError
                        message={formik.touched.birth_date && formik.errors.birth_date}
                    />
                </div>

                {/* Gender */}
                <div>
                    <InputLabel value={t("tashkilat.employee.gender")} />
                    <CustomSelect
                        id="gender"
                        options={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" },
                        ]}
                        value={formik.values.gender}
                        onChange={(value) => formik.setFieldValue("gender", value)}
                        onBlur={() => formik.setFieldTouched("gender", true)}
                        placeholder="Select Gender"
                    />
                    <InputError
                        message={formik.touched.gender && formik.errors.gender}
                    />
                </div>

                {/* Marital Status */}
                <div>
                    <InputLabel value={t("tashkilat.employee.maritalStatus")} />
                    <CustomSelect
                        id="marital_status"
                        options={[
                            { label: "Single", value: "Single" },
                            { label: "Married", value: "Married" },
                            { label: "Divorced", value: "Divorced" },
                            { label: "Widowed", value: "Widowed" },
                        ]}
                        value={formik.values.marital_status}
                        onChange={(value) =>
                            formik.setFieldValue("marital_status", value)
                        }
                        onBlur={() =>
                            formik.setFieldTouched("marital_status", true)
                        }
                        placeholder="Select Marital Status"
                    />
                    <InputError
                        message={
                            formik.touched.marital_status &&
                            formik.errors.marital_status
                        }
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <InputLabel value={t("tashkilat.employee.bloodGroup")} />
                    <CustomSelect
                        id="blood_group_id"
                        options={[
                            { label: "A+", value: 1 },
                            { label: "B+", value: 2 },
                            { label: "O+", value: 3 },
                        ]}
                        value={formik.values.blood_group_id}
                        onChange={(value) =>
                            formik.setFieldValue("blood_group_id", value)
                        }
                        placeholder="Select Blood Group"
                    />
                    <InputError
                        message={
                            formik.touched.blood_group_id &&
                            formik.errors.blood_group_id
                        }
                    />
                </div>

            </div>

            {/* Address */}
            <div>
                <InputLabel value={t("tashkilat.employee.address")} />
                <textarea
                    name="address"
                    rows={4}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <InputError
                    message={formik.touched.address && formik.errors.address}
                />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => {
                        formik.resetForm();
                        setPreview(null);
                    }}
                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                    {t("common.reset")}
                </button>

                <PrimaryButton
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="min-w-32 justify-center"
                >
                    {formik.isSubmitting
                        ? t("common.saving")
                        : t("common.save")}
                </PrimaryButton>
            </div>



        </form>

    );

}


export default CreateEmployee;
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

            employee_no: "",
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

            approval_status_id: "",

            status: true,

        },


        validationSchema: Yup.object({

            employee_no:
                Yup.string()
                    .required(t("validation.required")),


            first_name:
                Yup.string()
                    .required(t("validation.required")),


            gender:
                Yup.string()
                    .required(t("validation.required")),


            email:
                Yup.string()
                    .email(t("validation.email"))
                    .nullable(),


            photo:
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

                const formData = new FormData();


                Object.keys(values).forEach(key => {

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
                    );


                    resetForm();

                    setPreview(null);


                    onSubmitSuccess(
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
            );


            setPreview(
                URL.createObjectURL(file)
            );

        }

    };



    const renderInput = (
        name,
        label
    ) => (

        <div>

            <InputLabel
                value={t(label)}
            />


            <TextInput

                name={name}

                value={
                    formik.values[name]
                }

                onChange={
                    formik.handleChange
                }

                onBlur={
                    formik.handleBlur
                }

            />


            <InputError

                message={
                    formik.touched[name] &&
                    formik.errors[name]
                }

            />


        </div>

    );



    return (

        <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className="space-y-5"
        >


            {/* Photo */}

            <div>

                <InputLabel
                    value={t("tashkilat.employee.photo")}
                />


                <input

                    type="file"

                    accept="image/*"

                    onChange={handleImage}

                    className="block w-full rounded-md border"

                />


                {
                    preview &&

                    <img

                        src={preview}

                        className="mt-3 h-24 w-24 rounded-full object-cover"

                    />

                }


                <InputError
                    message={formik.errors.photo}
                />


            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                {renderInput(
                    "employee_no",
                    "tashkilat.employee.employeeNo"
                )}


                {renderInput(
                    "first_name",
                    "tashkilat.employee.firstName"
                )}


                {renderInput(
                    "last_name",
                    "tashkilat.employee.lastName"
                )}


                {renderInput(
                    "father_name",
                    "tashkilat.employee.fatherName"
                )}


                {renderInput(
                    "phone",
                    "tashkilat.employee.phone"
                )}


                {renderInput(
                    "email",
                    "tashkilat.employee.email"
                )}


                {renderInput(
                    "national_id",
                    "tashkilat.employee.nationalId"
                )}


                {renderInput(
                    "passport_no",
                    "tashkilat.employee.passportNo"
                )}


                {renderInput(
                    "province",
                    "tashkilat.employee.province"
                )}


                {renderInput(
                    "district",
                    "tashkilat.employee.district"
                )}


            </div>




            {/* Birth Date */}

            <div>

                <InputLabel
                    value={t("tashkilat.employee.birthDate")}
                />


                <TextInput

                    type="date"

                    name="birth_date"

                    value={
                        formik.values.birth_date
                    }

                    onChange={
                        formik.handleChange
                    }

                />

            </div>





            {/* Gender */}

            <div>

                <InputLabel
                    value={t("tashkilat.employee.gender")}
                />

                <CustomSelect

                    id="gender"

                    options={[
                        {
                            label: "Male",
                            value: "Male"
                        },
                        {
                            label: "Female",
                            value: "Female"
                        }
                    ]}

                    value={
                        formik.values.gender
                    }

                    onChange={(value) => {

                        formik.setFieldValue(
                            "gender",
                            value
                        );

                    }}

                    placeholder="Select Gender"

                    onBlur={() => {
                        formik.setFieldTouched(
                            "gender",
                            true
                        );
                    }}

                />


                <InputError

                    message={
                        formik.touched.gender &&
                        formik.errors.gender
                    }

                />


            </div>



            {/* Marital Status */}

            <div>

                <InputLabel
                    value={
                        t("tashkilat.employee.maritalStatus")
                    }
                />


                <CustomSelect

                    id="marital_status"

                    options={[
                        {
                            label: "Single",
                            value: "Single"
                        },
                        {
                            label: "Married",
                            value: "Married"
                        },
                        {
                            label: "Divorced",
                            value: "Divorced"
                        },
                        {
                            label: "Widowed",
                            value: "Widowed"
                        }
                    ]}


                    value={
                        formik.values.marital_status
                    }


                    onChange={(value) => {

                        formik.setFieldValue(
                            "marital_status",
                            value
                        );

                    }}


                    placeholder="Select Marital Status"


                    onBlur={() => {

                        formik.setFieldTouched(
                            "marital_status",
                            true
                        );

                    }}


                />


            </div>




            {/* Address */}

            <div>

                <InputLabel
                    value={t("tashkilat.employee.address")}
                />


                <textarea

                    name="address"

                    rows="3"

                    value={
                        formik.values.address
                    }

                    onChange={
                        formik.handleChange
                    }

                    className="w-full rounded-md border-gray-300"

                />


            </div>





            {/* blood_group */}

            <div>

                <CustomSelect

                    id="blood_group_id"

                    options={[
                        {
                            label: "A+",
                            value: 1
                        },
                        {
                            label: "B+",
                            value: 2
                        },
                        {
                            label: "O+",
                            value: 3
                        }
                    ]}

                    value={
                        formik.values.blood_group_id
                    }

                    onChange={(value) => {

                        formik.setFieldValue(
                            "blood_group_id",
                            value
                        );

                    }}

                    placeholder="Select Blood Group"

                />

            </div>





            <div className="flex justify-end">


                <PrimaryButton
                    disabled={formik.isSubmitting}
                >


                    {
                        formik.isSubmitting
                            ?
                            t("common.saving")
                            :
                            t("common.save")
                    }


                </PrimaryButton>


            </div>



        </form>

    );

}


export default CreateEmployee;
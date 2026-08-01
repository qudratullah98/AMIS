import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";

import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";


export default function CreateCertificate({ employee, onClose }) {

    const { t } = useTranslation();

    const [certificates, setCertificates] = useState([]);


    useEffect(() => {

        axios
            .get(route("employees.certificates.json", { employee: employee.id }))
            .then((response) => {

                setCertificates([...response.data]);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);



    const formik = useFormik({

        initialValues: {

            employee_id: employee?.id || "",
            certificate_id: "",
            obtained_date: "",
            certificate_number: "",

        },


        validationSchema: Yup.object({

            certificate_id: Yup.string()
                .required(t("validation.required")),


            obtained_date: Yup.string()
                .required(t("validation.required")),


            certificate_number: Yup.string()
                .max(100),

        }),



        onSubmit: (values) => {

            axios.post(
                route("employees.certificates.store", employee.id),
                values
            )
                .then(() => {

                    onClose();

                })
                .catch((error) => {

                    console.log(error);

                });

        },

    });



    return (

        <form
            onSubmit={formik.handleSubmit}
            className="space-y-5"
        >


            {/* Certificate */}
            <div>

                <InputLabel
                    value={t("certificate.certificate")}
                />


                <CustomSelect

                    value={formik.values.certificate_id}

                    options={
                        certificates?.map((item) => ({

                            value: item.id,
                            label: item.name

                        }))
                    }


                    onChange={(value) => {

                        formik.setFieldValue(
                            "certificate_id",
                            value
                        );

                    }}

                />


                <InputError
                    message={
                        formik.touched.certificate_id &&
                        formik.errors.certificate_id
                    }
                />

            </div>




            {/* Obtained Date */}
            <div>

                <InputLabel
                    value={t("certificate.obtainedDate")}
                />


                <TextInput

                    type="date"

                    name="obtained_date"

                    className="mt-1 block w-full"

                    value={formik.values.obtained_date}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />


                <InputError
                    message={
                        formik.touched.obtained_date &&
                        formik.errors.obtained_date
                    }
                />

            </div>





            {/* Certificate Number */}
            <div>

                <InputLabel
                    value={t("certificate.certificateNumber")}
                />


                <TextInput

                    name="certificate_number"

                    className="mt-1 block w-full"

                    value={formik.values.certificate_number}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />


                <InputError
                    message={
                        formik.touched.certificate_number &&
                        formik.errors.certificate_number
                    }
                />

            </div>





            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">


                <button

                    type="button"

                    onClick={onClose}

                    className="px-5 py-2 rounded-lg border border-gray-300"

                >

                    {t("common.cancel")}

                </button>



                <PrimaryButton type="submit">

                    {t("common.save")}

                </PrimaryButton>


            </div>


        </form>

    );
}
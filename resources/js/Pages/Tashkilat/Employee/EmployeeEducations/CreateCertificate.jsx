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
import FileUpload from "@/Components/FileUpload";


export default function CreateCertificate({ employee, onClose }) {

    const { t } = useTranslation();

    const [certificates, setCertificates] = useState([]);


    useEffect(() => {
        axios.get(route("education.certificates.json", { employee: employee.id })).then((response) => {
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
            file: null,

        },


        validationSchema: Yup.object({

            certificate_id: Yup.string()
                .required(t("validation.required")),
            obtained_date: Yup.string()
                .required(t("validation.required")),
            employee_id: Yup.string()
                .required(t("validation.required")),

            file: Yup.mixed()
                .required(t("validation.required"))
                .test("fileSize", t("validation.fileSize"), (value) => {
                    return value && value.size <= 5 * 1024 * 1024; // 5MB
                }),

        }),



        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append("employee_id", values.employee_id);
            formData.append("certificate_id", values.certificate_id);
            formData.append("obtained_date", values.obtained_date);

            if (values.file) {
                formData.append("file", values.file);
            }

            try {
                await axios.post(
                    route("employees.certificates.store", employee.id),
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                onClose();
            } catch (error) {
                console.log(error);
            }
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
                    value={t("education.certificate")}
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
                    value={t("education.obtainedDate")}
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

            {/* File uploading */}
            <div>
                <FileUpload
                    name="file"
                    label={t("education.uploadDocument")}
                    onFileSelect={(file) => {
                        formik.setFieldTouched("file", true);
                        console.log("Selected file:", file);
                        formik.setFieldValue("file", file);
                    }}
                    size={"5mb"}
                />
                <InputError
                    message={
                        formik.touched.file &&
                        formik.errors.file
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
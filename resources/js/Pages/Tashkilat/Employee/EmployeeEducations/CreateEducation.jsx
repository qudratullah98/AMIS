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


export default function CreateEducation({ employee, onClose }) {

    const { t } = useTranslation();

    const [educationLevels, setEducationLevels] = useState([]);
    


    useEffect(() => {

        axios
            .get(route("education.levels.json"))
            .then((response) => {
                setEducationLevels(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);



    const formik = useFormik({

        initialValues: {
            employee_id: employee?.id || "",
            education_level_id: "",
            field_of_study: "",
            institution_name: "",
            graduation_year: "",
            gpa: "",
        },


        validationSchema: Yup.object({

            education_level_id: Yup.string()
                .required(t("validation.required")),


            field_of_study: Yup.string()
                .required(t("validation.required")),


            institution_name: Yup.string()
                .required(t("validation.required")),


            graduation_year: Yup.number()
                .required(t("validation.required")),


            gpa: Yup.number()
                .nullable()
                .min(0, "GPA must be greater than 0")
                .max(4, "GPA must be less than 4"),

        }),


        onSubmit: (values) => {

            axios.post(
                route("employees.educations.store", { employee: employee.id }),
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


            {/* Education Level */}
            <div>

                <InputLabel 
                    value={t("education.educationLevel")} 
                />


                <CustomSelect

                    value={formik.values.education_level_id}

                    options={
                        educationLevels.map((item)=>({
                            value:item.id,
                            label:item.name
                        }))
                    }


                    onChange={(value)=>{

                        formik.setFieldValue(
                            "education_level_id",
                            value
                        );

                    }}

                />


                <InputError 
                    message={
                        formik.touched.education_level_id &&
                        formik.errors.education_level_id
                    }
                />

            </div>




            {/* Field Of Study */}
            <div>

                <InputLabel 
                    value={t("education.fieldOfStudy")} 
                />


                <TextInput

                    name="field_of_study"

                    className="mt-1 block w-full"

                    value={formik.values.field_of_study}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />


                <InputError
                    message={
                        formik.touched.field_of_study &&
                        formik.errors.field_of_study
                    }
                />

            </div>




            {/* Institution Name */}
            <div>

                <InputLabel 
                    value={t("education.institutionName")} 
                />


                <TextInput

                    name="institution_name"

                    className="mt-1 block w-full"

                    value={formik.values.institution_name}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />


                <InputError
                    message={
                        formik.touched.institution_name &&
                        formik.errors.institution_name
                    }
                />

            </div>




            {/* Graduation Year */}
            <div>

                <InputLabel 
                    value={t("education.graduationYear")} 
                />


                <TextInput

                    type="number"

                    name="graduation_year"

                    className="mt-1 block w-full"

                    value={formik.values.graduation_year}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />


                <InputError
                    message={
                        formik.touched.graduation_year &&
                        formik.errors.graduation_year
                    }
                />

            </div>





            {/* GPA */}
            <div>

                <InputLabel value="GPA" />


                <TextInput

                    type="number"

                    step="0.01"

                    name="gpa"

                    className="mt-1 block w-full"

                    value={formik.values.gpa}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />


                <InputError
                    message={
                        formik.touched.gpa &&
                        formik.errors.gpa
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



                <PrimaryButton 
                    type="submit"
                    onClick={formik.handleSubmit}
                >

                    {t("common.save")}

                </PrimaryButton>


            </div>


        </form>

    );
}
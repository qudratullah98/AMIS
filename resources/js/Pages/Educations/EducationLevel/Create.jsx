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

function CreateEducationLevel({ onSubmitSuccess }) {

    const { t } = useTranslation();


    const formik = useFormik({

        initialValues: {
            name: "",
        },


        validationSchema: Yup.object({

            name: Yup.string()
                .required(t("validation.required"))
                .max(255),

        }),


        onSubmit: async (values, {setSubmitting, resetForm, setErrors}) => {

            try {

                const response = await axios.post(
                    route("education.levels.store"),
                    values
                );
 
                if(response.data.success){

                    toast.success(response.data.message);

                    resetForm();

                    onSubmitSuccess(response.data.data);

                }


            } catch(error){

                if(error.response?.status === 422){

                    setErrors(error.response.data.errors);

                }else{

                    toast.error(
                        error.response?.data?.message ||
                        "Something went wrong"
                    );

                }

            }finally{

                setSubmitting(false);

            }

        }

    });



    return (

        <form
            onSubmit={formik.handleSubmit}
            className="space-y-5"
        >


            <div>

                <InputLabel value={t("education.educationLevel")} />


                <TextInput

                    name="name"

                    value={formik.values.name}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />


                <InputError

                    message={
                        formik.touched.name &&
                        formik.errors.name
                    }

                />

            </div>



            <div className="flex justify-end">

                <PrimaryButton disabled={formik.isSubmitting}>

                    {
                        formik.isSubmitting
                        ? t("common.saving")
                        : t("common.save")
                    }

                </PrimaryButton>

            </div>


        </form>

    );

}


export default CreateEducationLevel;
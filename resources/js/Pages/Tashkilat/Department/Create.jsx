import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton"; 
function CreateDepartment({
    tashkils = [],
    parentDepartments = [],
    onSubmitSuccess,
}) {

    const { t } = useTranslation();


    const formik = useFormik({

        initialValues:{
            name:"",
            tashkil_id:"",
            parent_id:"",
        },


        validationSchema:Yup.object({

            name:Yup.string()
                .required(t("validation.required"))
                .max(255),


            tashkil_id:Yup.number()
                .required(t("validation.required")),


            parent_id:Yup.number()
                .nullable(),

        }),


        onSubmit:(values,{setSubmitting,resetForm})=>{


            router.post(
                route("departments.store"),
                values,
                {

                    preserveScroll:true,


                    onSuccess:(page)=>{

                        const department =
                            page.props.flash?.department;


                        if(department){

                            onSubmitSuccess(
                                department
                            );

                        }


                        resetForm();

                    },


                    onFinish:()=>{

                        setSubmitting(false);

                    }

                }
            );

        }

    });



    return (

        <form
            onSubmit={formik.handleSubmit}
            className="space-y-5"
        >


            {/* Department Name */}

            <div>

                <InputLabel
                    htmlFor="name"
                    value={
                        t(
                            "tashkilat.departmentName"
                        )
                    }
                />


                <TextInput

                    id="name"

                    name="name"

                    value={
                        formik.values.name
                    }

                    onChange={
                        formik.handleChange
                    }

                    onBlur={
                        formik.handleBlur
                    }

                    className="mt-1 block w-full"

                />


                <InputError

                    message={
                        formik.touched.name &&
                        formik.errors.name
                    }

                />

            </div>




            {/* Tashkil */}

            <div>

                <InputLabel

                    value={
                        t(
                            "tashkilat.tashkil"
                        )
                    }

                />


                <select

                    name="tashkil_id"

                    value={
                        formik.values.tashkil_id
                    }

                    onChange={
                        formik.handleChange
                    }

                    className="
                        mt-1 
                        block 
                        w-full 
                        rounded-md 
                        border-gray-300
                    "

                >

                    <option value="">
                        {t("common.select")}
                    </option>


                    {
                        tashkils.map((item)=>(

                            <option

                                key={item.id}

                                value={item.id}

                            >

                                {item.name}

                            </option>

                        ))
                    }


                </select>



                <InputError

                    message={
                        formik.touched.tashkil_id &&
                        formik.errors.tashkil_id
                    }

                />

            </div>





            {/* Parent Department */}

            <div>


                <InputLabel

                    value={
                        t(
                            "tashkilat.parentDepartment"
                        )
                    }

                />


 

                <InputError

                    message={
                        formik.touched.parent_id &&
                        formik.errors.parent_id
                    }

                />


            </div>




            {/* Submit */}


            <div className="flex justify-end">


                <PrimaryButton

                    disabled={
                        formik.isSubmitting
                    }

                >

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


export default CreateDepartment;
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
import React, { useEffect, useState } from "react";

function CreateDepartmentPosition({ onSubmitSuccess }) {


    const { t } = useTranslation();

    const [departments, setDepartments] = useState([]);
    const [positionTypes, setPositionTypes] = useState([]);

    const formik = useFormik({

        initialValues: {
            title: "",
            department_id: "",
            position_type_id: "",
            total_positions: 1,
            description: "",
        },

        validationSchema: Yup.object({

            title: Yup.string()
                .required(t("validation.required"))
                .max(255),

            department_id: Yup.number()
                .required(t("validation.required")),

            position_type_id: Yup.number()
                .required(t("validation.required")),

      

            total_positions: Yup.number()
                .required(t("validation.required"))
                .min(1),

            description: Yup.string()
                .nullable(),

        }),

        onSubmit: async (values, { resetForm, setSubmitting, setErrors }) => {

            try {

                const response =
                    await axios.post(
                        route("department-positions.store"),
                        values
                    );


                if (response.data.success) {

                    toast.success(response.data.message);

                    resetForm();

                    onSubmitSuccess(response.data.data);

                }


            } catch (error) {

                if (error.response?.status === 422) {

                    setErrors(
                        error.response.data.errors
                    );

                } else {

                    toast.error(
                        "Something went wrong"
                    );

                }

            }
            finally {

                setSubmitting(false);

            }


        }


    });

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [
                    departmentsResponse,
                    positionTypesResponse
                ] = await Promise.all([

                    axios.get(
                        route("departments.json")
                    ),

                    axios.get(
                        route("position-types.json")
                    )

                ]);


                setDepartments(
                    departmentsResponse.data
                );


                setPositionTypes(
                    positionTypesResponse.data
                );


            } catch (error) {

                toast.error(
                    t("common.somethingWentWrong")
                );

            }

        };


        fetchData();

    }, []);

    return (

        <form
            onSubmit={formik.handleSubmit}
            className="space-y-5"
        >


            <div>

                <InputLabel
                    value={t("tashkilat.positionTitle")}
                />

                <TextInput

                    name="title"

                    value={formik.values.title}

                    onChange={formik.handleChange}

                />


                <InputError
                    message={
                        formik.touched.title &&
                        formik.errors.title
                    }
                />


            </div>


            <div>
                <InputLabel value={t("tashkilat.totalPositions")} />

                <TextInput
                    type="number"
                    name="total_positions"
                    value={formik.values.total_positions}
                    onChange={formik.handleChange}
                />

                <InputError
                    message={
                        formik.touched.total_positions &&
                        formik.errors.total_positions
                    }
                />
            </div>

            <div>

                <InputLabel
                    value={t("tashkilat.department")}
                />


                <CustomSelect

                    value={
                        formik.values.department_id
                    }


                    options={
                        departments.map(item => ({

                            value: item.id,

                            label: item.name

                        }))
                    }


                    onChange={(value) =>
                        formik.setFieldValue(
                            "department_id",
                            value
                        )
                    }


                />

            </div>




            <div>

                <InputLabel
                    value={t("tashkilat.positionType")}
                />


                <CustomSelect

                    value={
                        formik.values.position_type_id
                    }


                    options={
                        positionTypes.map(item => ({

                            value: item.id,

                            label: item.title

                        }))
                    }


                    onChange={(value) =>
                        formik.setFieldValue(
                            "position_type_id",
                            value
                        )
                    }


                />

            </div>
            <div>
                <InputLabel value={t("common.description")} />

                <textarea
                    name="description"
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className="w-full rounded-md border-gray-300"
                />

                <InputError
                    message={
                        formik.touched.description &&
                        formik.errors.description
                    }
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


export default CreateDepartmentPosition;
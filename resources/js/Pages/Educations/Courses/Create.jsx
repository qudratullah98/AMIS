import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { router } from '@inertiajs/react';
import axios from 'axios';

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CustomSelect from "@/Components/CustomSelect";

function CreateCourse({ onSubmitSuccess, onCancel }) {
    const { t } = useTranslation();
    const [courseTypes, setCourseTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseTypes();
    }, []);

    const fetchCourseTypes = async () => {
        try {
            const response = await axios.get(route('education.course-types.list'));
            const options = response.data.map(type => ({
                value: type.id,
                label: type.name
            }));
            setCourseTypes(options);
        } catch (error) {
            console.error('Error fetching course types:', error);
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = Yup.object({
        course_type_id: Yup.number()
            .required(t("validation.required")),
        name: Yup.string()
            .required(t("validation.required")),
        description: Yup.string()
            .nullable(),
        validity_months: Yup.number()
            .required(t("validation.required"))
            .min(1, t("validation.min", { min: 1 }))
            .integer(t("validation.integer")),
    });

    const formik = useFormik({
        initialValues: {
            course_type_id: '',
            name: '', 
            description: '',
            validity_months: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axios.post(route('education.courses.store'), values);
                if (onSubmitSuccess) {
                    onSubmitSuccess(response.data.course);
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                }
                console.error('Error creating course:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Type */}
                <div>
                    <InputLabel
                        value={t("education.courses.courseType")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <CustomSelect
                        id="course_type_id"
                        options={courseTypes}
                        value={formik.values.course_type_id}
                        onChange={(value) => formik.setFieldValue("course_type_id", value)}
                        onBlur={() => formik.setFieldTouched("course_type_id", true)}
                        placeholder={t("education.courses.courseType")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-white ${formik.touched.course_type_id && formik.errors.course_type_id
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                        disabled={loading}
                    />
                    <InputError
                        message={formik.touched.course_type_id && formik.errors.course_type_id}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>



                {/* Course Name */}
                <div>
                    <InputLabel
                        value={t("education.courses.courseName")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("education.courses.courseName")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${formik.touched.name && formik.errors.name
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                    />
                    <InputError
                        message={formik.touched.name && formik.errors.name}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>



                {/* Validity Months */}
                <div>
                    <InputLabel
                        value={t("education.courses.validity")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="validity_months"
                        type="number"
                        value={formik.values.validity_months}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("education.courses.validity")}
                        min="1"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${formik.touched.validity_months && formik.errors.validity_months
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                    />
                    <InputError
                        message={formik.touched.validity_months && formik.errors.validity_months}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Description - Full Width */}
                <div className="md:col-span-2">
                    <InputLabel
                        value={t("education.courses.description")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("education.courses.description")}
                        rows="3"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-y ${formik.touched.description && formik.errors.description
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                    />
                    <InputError
                        message={formik.touched.description && formik.errors.description}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-6 border-t border-gray-200">
                <div className="flex gap-3 w-full sm:w-auto order-2 sm:order-1">
                    <button
                        type="button"
                        onClick={() => {
                            formik.resetForm();
                            if (onCancel) onCancel();
                        }}
                        className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formik.isSubmitting}
                    >
                        {t("common.cancel")}
                    </button>

                    <button
                        type="button"
                        onClick={() => formik.resetForm()}
                        className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formik.isSubmitting}
                    >
                        {t("common.reset")}
                    </button>
                </div>

                <PrimaryButton
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full sm:w-auto min-w-[140px] px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md justify-center flex items-center gap-2 order-1 sm:order-2"
                >
                    {formik.isSubmitting ? (
                        <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t("common.saving")}
                        </>
                    ) : (
                        t("common.save")
                    )}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default CreateCourse;
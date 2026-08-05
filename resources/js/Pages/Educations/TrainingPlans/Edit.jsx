import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CustomSelect from "@/Components/CustomSelect";

function EditTrainingPlan({ trainingPlan, onSubmitSuccess, onCancel }) {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [coursesRes, trainersRes] = await Promise.all([
                axios.get(route('training-plans.courses')),
                axios.get(route('training-plans.trainers'))
            ]);
            
            setCourses(coursesRes.data.map(c => ({
                value: c.id,
                label: `${c.code} - ${c.name}`
            })));
            
            setTrainers(trainersRes.data.map(t => ({
                value: t.id,
                label: t.name
            })));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t("validation.required"))
            .max(255, t("validation.max", { max: 255 })),
        course_id: Yup.number()
            .required(t("validation.required"))
            .positive(t("validation.invalid")),
        trainer_id: Yup.number()
            .required(t("validation.required"))
            .positive(t("validation.invalid")),
        start_date: Yup.date()
            .required(t("validation.required")),
        end_date: Yup.date()
            .required(t("validation.required"))
            .min(Yup.ref('start_date'), t("validation.endDateAfterStart")),
        location: Yup.string()
            .nullable()
            .max(500, t("validation.max", { max: 500 })),
        status: Yup.string()
            .required(t("validation.required"))
            .oneOf(['planned', 'in_progress', 'completed', 'cancelled'], t("validation.invalid")),
        description: Yup.string()
            .nullable(),
    });

    const formik = useFormik({
        initialValues: {
            name: trainingPlan.name || '',
            course_id: trainingPlan.course_id || '',
            trainer_id: trainingPlan.trainer_id || '',
            start_date: trainingPlan.start_date || '',
            end_date: trainingPlan.end_date || '',
            location: trainingPlan.location || '',
            status: trainingPlan.status || 'planned',
            description: trainingPlan.description || '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axios.put(route('training-plans.update', trainingPlan.id), values);
                if (onSubmitSuccess) {
                    onSubmitSuccess(response.data.trainingPlan || response.data);
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                }
                console.error('Error updating training plan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const statusOptions = [
        { value: 'planned', label: t('trainingPlans.statuses.planned') },
        { value: 'in_progress', label: t('trainingPlans.statuses.in_progress') },
        { value: 'completed', label: t('trainingPlans.statuses.completed') },
        { value: 'cancelled', label: t('trainingPlans.statuses.cancelled') },
    ];

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Training Plan Name */}
                <div className="md:col-span-2">
                    <InputLabel
                        value={t("trainingPlans.name")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainingPlans.namePlaceholder")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.name && formik.errors.name 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.name && formik.errors.name}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Course */}
                <div>
                    <InputLabel
                        value={t("trainingPlans.course")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <CustomSelect
                        id="course_id"
                        options={courses}
                        value={formik.values.course_id}
                        onChange={(value) => formik.setFieldValue("course_id", value)}
                        onBlur={() => formik.setFieldTouched("course_id", true)}
                        placeholder={t("trainingPlans.selectCourse")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-white ${
                            formik.touched.course_id && formik.errors.course_id 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                        disabled={loading}
                    />
                    <InputError
                        message={formik.touched.course_id && formik.errors.course_id}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Trainer */}
                <div>
                    <InputLabel
                        value={t("trainingPlans.trainer")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <CustomSelect
                        id="trainer_id"
                        options={trainers}
                        value={formik.values.trainer_id}
                        onChange={(value) => formik.setFieldValue("trainer_id", value)}
                        onBlur={() => formik.setFieldTouched("trainer_id", true)}
                        placeholder={t("trainingPlans.selectTrainer")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-white ${
                            formik.touched.trainer_id && formik.errors.trainer_id 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                        disabled={loading}
                    />
                    <InputError
                        message={formik.touched.trainer_id && formik.errors.trainer_id}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <InputLabel
                        value={t("trainingPlans.startDate")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="start_date"
                        type="date"
                        value={formik.values.start_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.start_date && formik.errors.start_date 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.start_date && formik.errors.start_date}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* End Date */}
                <div>
                    <InputLabel
                        value={t("trainingPlans.endDate")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="end_date"
                        type="date"
                        value={formik.values.end_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.end_date && formik.errors.end_date 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.end_date && formik.errors.end_date}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Location */}
                <div>
                    <InputLabel
                        value={t("trainingPlans.location")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <TextInput
                        name="location"
                        type="text"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainingPlans.locationPlaceholder")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none ${
                            formik.touched.location && formik.errors.location 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.location && formik.errors.location}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Status */}
                <div>
                    <InputLabel
                        value={t("trainingPlans.status")}
                        required={true}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <CustomSelect
                        id="status"
                        options={statusOptions}
                        value={formik.values.status}
                        onChange={(value) => formik.setFieldValue("status", value)}
                        onBlur={() => formik.setFieldTouched("status", true)}
                        placeholder={t("trainingPlans.selectStatus")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-white ${
                            formik.touched.status && formik.errors.status 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                        }`}
                    />
                    <InputError
                        message={formik.touched.status && formik.errors.status}
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Description - Full Width */}
                <div className="md:col-span-2">
                    <InputLabel
                        value={t("trainingPlans.description")}
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    />
                    <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t("trainingPlans.descriptionPlaceholder")}
                        rows="3"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-y ${
                            formik.touched.description && formik.errors.description 
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
                            {t("common.updating")}
                        </>
                    ) : (
                        t("common.update")
                    )}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default EditTrainingPlan;
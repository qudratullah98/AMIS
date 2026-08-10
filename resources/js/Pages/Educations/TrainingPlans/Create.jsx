import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CustomSelect from "@/Components/CustomSelect";

function CreateTrainingPlan({ onSubmitSuccess, onCancel }) {
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
                axios.get(route("education.training-plans.courses")),
                axios.get(route("education.training-plans.trainers")),
            ]);

            setCourses(
                Array.isArray(coursesRes.data)
                    ? coursesRes.data.map((course) => ({
                          value: Number(course.id),
                          label: course.name,
                      }))
                    : [],
            );

            setTrainers(
                Array.isArray(trainersRes.data)
                    ? trainersRes.data.map((trainer) => ({
                          value: Number(trainer.id),
                          label: (
                              <div className="flex flex-col">
                                  <span className="font-medium text-gray-800">
                                      {trainer.name}
                                  </span>

                                  {trainer.email && (
                                      <span className="text-xs text-gray-500">
                                          {trainer.email}
                                      </span>
                                  )}
                              </div>
                          ),
                      }))
                    : [],
            );
        } catch (error) {
            console.error("Error fetching courses/trainers:", error);
            console.error("Response:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t("error.required"))
            .max(255, t("validation.max", { max: 255 })),

        course_id: Yup.number()
            .typeError(t("validation.invalid"))
            .required(t("error.required"))
            .positive(t("validation.invalid")),

        trainer_id: Yup.number()
            .typeError(t("validation.invalid"))
            .required(t("error.required"))
            .positive(t("validation.invalid")),

        start_date: Yup.date()
            .required(t("error.required"))
            .typeError(t("validation.invalid")),

        end_date: Yup.date()
            .required(t("error.required"))
            .typeError(t("validation.invalid"))
            .min(
                Yup.ref("start_date"),
                t("error.trainingPlans.endDateAfterStart"),
            ),

        location: Yup.string()
            .nullable()
            .max(500, t("validation.max", { max: 500 })),

        status: Yup.string()
            .required(t("error.required"))
            .oneOf(
                ["planned", "in_progress", "completed", "cancelled"],
                t("validation.invalid"),
            ),

        description: Yup.string().nullable(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            course_id: "",
            trainer_id: "",
            start_date: "",
            end_date: "",
            location: "",
            status: "planned",
            description: "",
        },

        validationSchema,

        onSubmit: async (
            values,
            { setSubmitting, setErrors, setStatus },
        ) => {
            try {
                setStatus(null);

                // Prepare clean data before sending to Laravel
                const payload = {
                    name: values.name?.trim() || "",
                    course_id: Number(values.course_id),
                    trainer_id: Number(values.trainer_id),
                    start_date: values.start_date,
                    end_date: values.end_date,
                    location: values.location?.trim() || null,
                    status: values.status,
                    description: values.description?.trim() || null,
                };

                // console.log("Training plan payload:", payload);

                const response = await axios.post(
    route("training-plans.store"),
    values,
);


if (onSubmitSuccess) {
    onSubmitSuccess(response.data.trainingPlan);
}
            } catch (error) {
                console.error(
                    "Error creating training plan:",
                    error,
                );

                console.error(
                    "Status:",
                    error.response?.status,
                );

                console.error(
                    "Response data:",
                    error.response?.data,
                );

                console.error(
                    "Response message:",
                    error.response?.data?.message,
                );

                if (error.response?.status === 422) {
                    if (error.response?.data?.errors) {
                        setErrors(error.response.data.errors);
                    }
                }

                if (error.response?.status === 500) {
                    setStatus(
                        error.response?.data?.message ||
                            "An error occurred while creating the training plan.",
                    );
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    const statusOptions = [
        {
            value: "planned",
            label: t("education.trainingPlans.statuses.planned"),
        },
        {
            value: "in_progress",
            label: t("education.trainingPlans.statuses.in_progress"),
        },
        {
            value: "completed",
            label: t("education.trainingPlans.statuses.completed"),
        },
        {
            value: "cancelled",
            label: t("education.trainingPlans.statuses.cancelled"),
        },
    ];

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-6"
        >
            {/* Server Error */}
            {formik.status && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formik.status}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Training Plan Name */}
                <div className="md:col-span-2">
                    <InputLabel
                        value={t("education.trainingPlans.name")}
                        required={true}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    />

                    <TextInput
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t(
                            "education.trainingPlans.namePlaceholder",
                        )}
                        className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                            formik.touched.name &&
                            formik.errors.name
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    <InputError
                        message={
                            formik.touched.name &&
                            formik.errors.name
                        }
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Course */}
                <div>
                    <InputLabel
                        value={t("education.trainingPlans.course")}
                        required={true}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    />

                    <CustomSelect
                        id="course_id"
                        options={courses}
                        value={formik.values.course_id}
                        onChange={(value) => {
                            formik.setFieldValue(
                                "course_id",
                                value ? Number(value) : "",
                            );
                        }}
                        onBlur={() =>
                            formik.setFieldTouched(
                                "course_id",
                                true,
                            )
                        }
                        placeholder={t(
                            "education.trainingPlans.selectCourse",
                        )}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                            formik.touched.course_id &&
                            formik.errors.course_id
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        disabled={loading}
                    />

                    <InputError
                        message={
                            formik.touched.course_id &&
                            formik.errors.course_id
                        }
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Trainer */}
                <div>
                    <InputLabel
                        value={t("education.trainingPlans.trainer")}
                        required={true}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    />

                    <CustomSelect
                        id="trainer_id"
                        options={trainers}
                        value={formik.values.trainer_id}
                        onChange={(value) => {
                            formik.setFieldValue(
                                "trainer_id",
                                value ? Number(value) : "",
                            );
                        }}
                        onBlur={() =>
                            formik.setFieldTouched(
                                "trainer_id",
                                true,
                            )
                        }
                        placeholder={t(
                            "education.trainingPlans.selectTrainer",
                        )}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                            formik.touched.trainer_id &&
                            formik.errors.trainer_id
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        disabled={loading}
                    />

                    <InputError
                        message={
                            formik.touched.trainer_id &&
                            formik.errors.trainer_id
                        }
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <InputLabel
                        value={t(
                            "education.trainingPlans.startDate",
                        )}
                        required={true}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    />

                    <TextInput
                        name="start_date"
                        type="date"
                        value={formik.values.start_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                            formik.touched.start_date &&
                            formik.errors.start_date
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    <InputError
                        message={
                            formik.touched.start_date &&
                            formik.errors.start_date
                        }
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* End Date */}
                <div>
                    <InputLabel
                        value={t(
                            "education.trainingPlans.endDate",
                        )}
                        required={true}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    />

                    <TextInput
                        name="end_date"
                        type="date"
                        value={formik.values.end_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                            formik.touched.end_date &&
                            formik.errors.end_date
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    <InputError
                        message={
                            formik.touched.end_date &&
                            formik.errors.end_date
                        }
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Location */}
                <div>
                    <InputLabel
                        value={t(
                            "education.trainingPlans.location",
                        )}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    />

                    <TextInput
                        name="location"
                        type="text"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t(
                            "education.trainingPlans.locationPlaceholder",
                        )}
                        className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                            formik.touched.location &&
                            formik.errors.location
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    <InputError
                        message={
                            formik.touched.location &&
                            formik.errors.location
                        }
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Status */}
                <div>
                    <InputLabel
                        value={t(
                            "education.trainingPlans.status",
                        )}
                        required={true}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    />

                    <CustomSelect
                        id="status"
                        options={statusOptions}
                        value={formik.values.status}
                        onChange={(value) =>
                            formik.setFieldValue(
                                "status",
                                value,
                            )
                        }
                        onBlur={() =>
                            formik.setFieldTouched(
                                "status",
                                true,
                            )
                        }
                        placeholder={t(
                            "education.trainingPlans.selectStatus",
                        )}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                            formik.touched.status &&
                            formik.errors.status
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    <InputError
                        message={
                            formik.touched.status &&
                            formik.errors.status
                        }
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <InputLabel
                        value={t(
                            "education.trainingPlans.description",
                        )}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    />

                    <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t(
                            "education.trainingPlans.descriptionPlaceholder",
                        )}
                        rows="3"
                        className={`w-full resize-y rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                            formik.touched.description &&
                            formik.errors.description
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    <InputError
                        message={
                            formik.touched.description &&
                            formik.errors.description
                        }
                        className="mt-1.5 text-sm text-red-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-end gap-3 border-t border-gray-200 pt-6 sm:flex-row">
                <div className="order-2 flex w-full gap-3 sm:order-1 sm:w-auto">
                    {/* Cancel */}
                    <button
                        type="button"
                        onClick={() => {
                            formik.resetForm();

                            if (onCancel) {
                                onCancel();
                            }
                        }}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                        disabled={formik.isSubmitting}
                    >
                        {t("common.cancel")}
                    </button>

                    {/* Reset */}
                    <button
                        type="button"
                        onClick={() => formik.resetForm()}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                        disabled={formik.isSubmitting}
                    >
                        {t("common.reset")}
                    </button>
                </div>

                {/* Save */}
                <PrimaryButton
                    type="submit"
                    disabled={
                        formik.isSubmitting ||
                        loading
                    }
                    className="order-1 flex w-full min-w-[140px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 sm:order-2 sm:w-auto"
                >
                    {formik.isSubmitting ? (
                        <>
                            <svg
                                className="h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />

                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
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

export default CreateTrainingPlan;

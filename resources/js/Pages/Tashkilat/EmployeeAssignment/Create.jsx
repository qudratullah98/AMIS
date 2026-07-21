import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";

import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CustomSelect from "@/Components/CustomSelect";
import toast from "react-hot-toast"; 
import AsyncSelect from "@/Components/AsyncSelect";

function CreateEmployeeAssignment({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const [employees, setEmployees] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [approvalStatuses, setApprovalStatuses] = useState([]);

    const formik = useFormik({
        initialValues: {
            employee_id: "",
            vacancy_id: "",
            start_date: "",
            end_date: "", 
            remarks: "",
        },

        validationSchema: Yup.object({
            employee_id: Yup.number()
                .required(t("validation.required"))
                .typeError(t("validation.number")),

            vacancy_id: Yup.number()
                .required(t("validation.required"))
                .typeError(t("validation.number")),

            start_date: Yup.date()
                .required(t("validation.required"))
                .typeError(t("validation.date")),

            end_date: Yup.date()
                .nullable()
                .typeError(t("validation.date"))
                .min(
                    Yup.ref("start_date"),
                    t("validation.end_date_must_be_after_start_date")
                ),

          

            remarks: Yup.string().nullable().max(1000, t("validation.max_length")),
        }),

        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
                const response = await axios.post(
                    route("employee-assignments.store"),
                    values,
                );

                if (response.data.success) {
                    toast.success(response.data.message);
                    resetForm();
                    onSubmitSuccess(response.data.data);
                }
            } catch (error) {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    toast.error(
                        error.response?.data?.message ||
                            t("common.somethingWentWrong"),
                    );
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    /**
     * Load Employees
     */
    // useEffect(() => {
    //     axios
    //         .get(route("employees.json"))
    //         .then((res) => {
    //             setEmployees(res.data);
    //         })
    //         .catch(console.error);
    // }, []);

    /**
     * Load Vacancies
     */
    useEffect(() => {
        axios
            .get(route("position-vacancies.json"))
            .then((res) => {
                setVacancies(res.data);
            })
            .catch(console.error);
    }, []);

    /**
     * Load Approval Statuses
     */
    // useEffect(() => {
    //     axios
    //         .get(route("approval-statuses.json"))
    //         .then((res) => {
    //             setApprovalStatuses(res.data);
    //         })
    //         .catch(console.error);
    // }, []);

    const handleEmployeeSelect = (flight) => {
        formik.setFieldValue("employee_id", flight.id);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Employee */}
           
                <InputLabel value={t("tashkilat.employee.employeeName")} />

                      <AsyncSelect
                        apiEndpoint={route("employee.json")}
                        onSelect={handleEmployeeSelect}
                        formatOption={(employess) =>
                            `${employess.national_id} - ${employess.first_name}`
                        }
                         placeholder={t("tashkilat.employeeAssignment.selectEmployee")}
                    />

                <InputError
                    message={t(formik.touched.employee_id && formik.errors.employee_id)}
                />
            

            {/* Vacancy */}
            <div>
                <InputLabel value={t("tashkilat.employeeAssignment.position")} />

                <CustomSelect
                    value={formik.values.vacancy_id}
                    options={vacancies.map((item) => ({
                        value: item.id,
                        label: `${item.vacancy_no} - ${item.department_position?.title || ""}`,
                    }))}
                    onChange={(value) => {
                        formik.setFieldValue("vacancy_id", value);
                    }}
                    placeholder={t("vacancy.selectVacancy")}
                />

                <InputError
                    message={t(formik.touched.vacancy_id && formik.errors.vacancy_id)}
                />
            </div>

            {/* Start Date */}
            <div>
                <InputLabel value={t("tashkilat.employeeAssignment.startDate")} />

                <TextInput
                    type="date"
                    name="start_date"
                    value={formik.values.start_date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={t(formik.touched.start_date && formik.errors.start_date)}
                />
            </div>

            {/* End Date */}
            <div>
                <InputLabel value={t("tashkilat.employeeAssignment.endDate")} />

                <TextInput
                    type="date"
                    name="end_date"
                    value={formik.values.end_date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <InputError
                    message={t(formik.touched.end_date && formik.errors.end_date)}
                />
            </div>
 

            {/* Remarks */}
            <div>
                <InputLabel value={t("common.remarks")} />

                <textarea
                    name="remarks"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-md border-gray-300"
                    rows={4}
                    placeholder={t("common.enterRemarks")}
                />

                <InputError
                    message={t(formik.touched.remarks && formik.errors.remarks)}
                />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <PrimaryButton disabled={formik.isSubmitting}>
                    {formik.isSubmitting
                        ? t("common.saving")
                        : t("common.save")}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default CreateEmployeeAssignment;
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";
import SmallLoader from "@/Components/SmallLoader";
import FullPageLoader from "@/Components/FullPageLoader";
import axios from "axios";
import useValidation from "@/lib/validation/useValidation";
import { max, min, required } from "@/lib/validation/rules";

// IconLabel Component
const IconLabel = ({ htmlFor, icon, text, className = "" }) => (
    <label
        htmlFor={htmlFor}
        className={`flex items-center gap-2 text-sm font-semibold text-gray-700 ${className}`}
    >
        {icon && <span className="text-blue-600">{icon}</span>}
        {text}
    </label>
);

export default function CreateSghaService({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const { data, setData, processing, errors, reset, setError ,clearErrors} = useForm({
        name_ps: "",
        name_dr: "",
        name_en: "",
        sgha_service_unit_id: "",
        airline_id: "",
        complation_rate: "",
        approval_status_id: "",
    });

    const [airlines, setAirlines] = useState([]);
    const [sghaServiceUnits, setSghaServiceUnits] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [smallLoading, setSmallLoading] = useState(false);
    const { validateOnBlur ,validateAll } = useValidation(data, setError,clearErrors);

    const rules = {
    name_en: [required("English name is required")],
    name_ps: [required("Pashto name is required")],
    name_dr: [required("Dari name is required")],
    sgha_service_unit_id: [required("Service unit is required")],
    airline_id: [required("Airline is required")],
    complation_rate: [
        required("Rate is required"),
        min(0),
        max(100),
    ],
};

    // Fetch dropdown data
    useEffect(() => {
        const fetchDropdowns = async () => {
            setSmallLoading(true);
            try {
                const [unitsRes, airlinesRes] = await Promise.all([
                    axios.get(route("sgha.services_units.json")),
                    axios.get(route("airlines.json")),
                ]);

                setSghaServiceUnits(unitsRes.data);
                setAirlines(airlinesRes.data);
            } catch (err) {
                console.error("Error fetching dropdowns:", err);
            } finally {
                setPageLoading(false);
                setSmallLoading(false);
            }
        };

        fetchDropdowns();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Final validation before submit
        const validationErrors = validateAll(rules);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        setSmallLoading(true);
        axios
            .post(route("sgha.services.store"), data)
            .then((response) => {
                setSmallLoading(false);
                onSubmitSuccess(response.data);
                reset();
            })
            .catch((error) => {
                setSmallLoading(false);
                console.error("Error submitting form:", error);
            });
    };

    if (pageLoading) return <FullPageLoader message={t("common.loading")} />;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Grid Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
                {/* Name EN */}
                <div>
                    <IconLabel
                        htmlFor="name_en"
                        icon="✈️"
                        text={t("Name (English)")}
                    />
                    <TextInput
                        id="name_en"
                        value={data.name_en}
                        onChange={(e) => setData("name_en", e.target.value)}
                        onBlur={validateOnBlur("name_en", rules.name_en)}
                    />
                    <InputError message={errors.name_en} />
                </div>

                {/* Name PS */}
                <div>
                    <IconLabel
                        htmlFor="name_ps"
                        icon="🛫"
                        text={t("Name (Pashto)")}
                    />
                    <TextInput
                        id="name_ps"
                        value={data.name_ps}
                        onChange={(e) => setData("name_ps", e.target.value)}
                        onBlur={validateOnBlur("name_ps", rules.name_ps)}
                    />
                    <InputError message={errors.name_ps} />
                </div>

                {/* Name DR */}
                <div>
                    <IconLabel
                        htmlFor="name_dr"
                        icon="🛫"
                        text={t("Name (Dari)")}
                    />
                    <TextInput
                        id="name_dr"
                        value={data.name_dr}
                        onChange={(e) => setData("name_dr", e.target.value)}
                        onBlur={validateOnBlur("name_dr", rules.name_dr)}
                    />
                    <InputError message={errors.name_dr} />
                </div>

                {/* Service Unit */}
                <div>
                    <IconLabel
                        htmlFor="sgha_service_unit_id"
                        icon="📦"
                        text={t("Service Unit")}
                    />
                    <CustomSelect
                        id="sgha_service_unit_id"
                        options={sghaServiceUnits.map((unit) => ({
                            value: unit.id,
                            label: unit.service_name,
                        }))}
                        value={data.sgha_service_unit_id}
                        onChange={(e) => setData("sgha_service_unit_id", e)}
                        onBlur={validateOnBlur("sgha_service_unit_id", rules.sgha_service_unit_id)}
                    />
                    <InputError message={errors.sgha_service_unit_id} />
                </div>

                {/* Airline */}
                <div>
                    <IconLabel
                        htmlFor="airline_id"
                        icon="🏢"
                        text={t("Airline")}
                    />
                    <CustomSelect
                        id="airline_id"
                        options={airlines.map((airline) => ({
                            value: airline.id,
                            label:
                                airline.name_en ||
                                `${airline.name_ps} (${airline.name_en})`,
                        }))}
                        value={data.airline_id}
                        onChange={(e) => setData("airline_id", e)}
                        onBlur={validateOnBlur("airline_id", rules.airline_id)}
                    />
                    <InputError message={errors.airline_id} />
                </div>

                {/* Completion Rate */}
                <div>
                    <IconLabel
                        htmlFor="complation_rate"
                        icon="📊"
                        text={t("Rate")}
                    />
                    <TextInput
                        id="complation_rate"
                        type="number"
                        step="0.01"
                        value={data.complation_rate}
                        onChange={(e) =>
                            setData("complation_rate", e.target.value)
                        }
                        onBlur={validateOnBlur("complation_rate", rules.complation_rate)}
                    />
                    <InputError message={errors.complation_rate} />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || smallLoading || Object.keys(errors).length > 0}
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${( Object.keys(errors).length > 0) ? "cursor-not-allowed" : ""}`} 
                >
                    📦 {t("Save SGHA Service")}
                    {Object.keys(errors).length }
                    {smallLoading && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}

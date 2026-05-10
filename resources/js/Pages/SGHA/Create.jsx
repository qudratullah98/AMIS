import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";
import SmallLoader from "@/Components/SmallLoader";
import FullPageLoader from "@/Components/FullPageLoader";

import useValidation from "@/lib/validation/useValidation";
import { min, required } from "@/lib/validation/rules";

const IconLabel = ({ htmlFor, icon, text }) => (
    <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700"
    >
        {icon && <span className="text-blue-600">{icon}</span>}
        {text}
    </label>
);

export default function CreateSghaService({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const { data, setData, processing, errors, reset, setError, clearErrors } =
        useForm({
            name_ps: "",
            name_dr: "",
            name_en: "",
            sgha_service_unit_id: "",

            airline_rates: [
                {
                    airline_id: "",
                    complation_rate: "",
                },
            ],
        });

    const { validateOnBlur, validateAll } = useValidation(
        data,
        setError,
        clearErrors,
    );

    const [airlines, setAirlines] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const rules = {
        name_en: [required("English name is required")],
        name_ps: [required("Pashto name is required")],
        name_dr: [required("Dari name is required")],
        sgha_service_unit_id: [required("Service unit is required")],
    };

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const [u, a] = await Promise.all([
                    axios.get(route("sgha.services_units.json")),
                    axios.get(route("airlines.json")),
                ]);

                setUnits(u.data);
                setAirlines(a.data);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const handleChange = (field, value) => {
        setData(field, value);

        if (errors[field]) clearErrors(field);
    };

    // ---------------- AIRLINE RATE CHANGE ----------------
    const handleAirlineRateChange = (index, field, value) => {
        const updated = [...data.airline_rates];

        updated[index][field] = value;

        setData("airline_rates", updated);
    };

    // ---------------- ADD ROW ----------------
    const addAirlineRate = () => {
        setData("airline_rates", [
            ...data.airline_rates,
            {
                airline_id: "",
                complation_rate: "",
            },
        ]);
    };

    // ---------------- REMOVE ROW ----------------
    const removeAirlineRate = (index) => {
        const updated = data.airline_rates.filter((_, i) => i !== index);

        setData("airline_rates", updated);
    };

    // ---------------- SUBMIT ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAll(rules)) return;

        setSubmitting(true);

        try {
            const { data: res } = await axios.post(
                route("sgha.services_units.store"),
                data,
            );

            onSubmitSuccess?.(res.sgha_service);

            reset();
        } catch (error) {
            console.error(error);

            if (error.response?.status === 422) {
                setError(error.response.data.errors);
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <FullPageLoader message={t("common.loading")} />;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
                {/* NAME EN */}
                <div>
                    <IconLabel
                        htmlFor="name_en"
                        icon="✈️"
                        text="English Name"
                    />

                    <TextInput
                        id="name_en"
                        value={data.name_en}
                        onChange={(e) =>
                            handleChange("name_en", e.target.value)
                        }
                    />

                    <InputError message={errors.name_en} />
                </div>

                {/* NAME PS */}
                <div>
                    <IconLabel
                        htmlFor="name_ps"
                        icon="🛫"
                        text="Pashto Name"
                    />

                    <TextInput
                        id="name_ps"
                        value={data.name_ps}
                        onChange={(e) =>
                            handleChange("name_ps", e.target.value)
                        }
                    />

                    <InputError message={errors.name_ps} />
                </div>

                {/* NAME DR */}
                <div>
                    <IconLabel htmlFor="name_dr" icon="🛫" text="Dari Name" />

                    <TextInput
                        id="name_dr"
                        value={data.name_dr}
                        onChange={(e) =>
                            handleChange("name_dr", e.target.value)
                        }
                    />

                    <InputError message={errors.name_dr} />
                </div>

                {/* UNIT */}
                <div>
                    <IconLabel
                        htmlFor="unit"
                        icon="📦"
                        text="Service Unit"
                    />

                    <CustomSelect
                        value={data.sgha_service_unit_id}
                        options={units.map((u) => ({
                            value: u.id,
                            label: u.service_name,
                        }))}
                        onChange={(val) =>
                            handleChange("sgha_service_unit_id", val)
                        }
                    />

                    <InputError message={errors.sgha_service_unit_id} />
                </div>
            </div>

            {/* AIRLINES + RATES */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">
                        Airlines & Completion Rates
                    </h3>

                    <button
                        type="button"
                        onClick={addAirlineRate}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                        + Add
                    </button>
                </div>

                {data.airline_rates.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-lg"
                    >
                        {/* AIRLINE */}
                        <div>
                            <IconLabel
                                htmlFor={`airline_${index}`}
                                icon="🏢"
                                text="Airline"
                            />

                            <CustomSelect
                                value={item.airline_id}
                                options={airlines.map((a) => ({
                                    value: a.id,
                                    label: a.name_en,
                                }))}
                                onChange={(val) =>
                                    handleAirlineRateChange(
                                        index,
                                        "airline_id",
                                        val,
                                    )
                                }
                            />
                        </div>

                        {/* RATE */}
                        <div>
                            <IconLabel
                                htmlFor={`rate_${index}`}
                                icon="📊"
                                text="Completion Rate"
                            />

                            <TextInput
                                type="number"
                                value={item.complation_rate}
                                onChange={(e) =>
                                    handleAirlineRateChange(
                                        index,
                                        "complation_rate",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        {/* REMOVE */}
                        <div className="flex items-end">
                            {data.airline_rates.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeAirlineRate(index)
                                    }
                                    className="px-3 py-2 bg-red-600 text-white rounded"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Save Service
                    {submitting && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}
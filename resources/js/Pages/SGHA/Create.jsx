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
import { max, min, required } from "@/lib/validation/rules";

// IconLabel
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
            airline_id: "",
            complation_rate: "",
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

    // ---------------- RULES ----------------
    const rules = {
        name_en: [required("English name is required")],
        name_ps: [required("Pashto name is required")],
        name_dr: [required("Dari name is required")],
        sgha_service_unit_id: [required("Service unit is required")],
        airline_id: [required("Airline is required")],
        complation_rate: [required("Rate is required"), min(0)],
    };

    // ---------------- FETCH DATA ----------------
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

    // ---------------- CHANGE HANDLER ----------------
    const handleChange = (field, value) => {
        setData(field, value);
        if (errors[field]) clearErrors(field);
    };

    // ---------------- SUBMIT ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAll(rules)) return;

        setSubmitting(true);

        try {
            const { data: res } = await axios
                .post(route("sgha.services_units.store"), data)
                .catch((err) => {
                    if (err.response.status === 422) {
                        setError(err.response.data.errors);
                    }
                });

                console.log(data);
            onSubmitSuccess?.(res.data.sgha_service);
            reset();
        } catch (error) {
            console.error(error.response.data.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <FullPageLoader message={t("common.loading")} />;

    // ---------------- UI ----------------
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
                        onBlur={validateOnBlur("name_en", rules.name_en)}
                    />
                    <InputError message={errors.name_en} />
                </div>

                {/* NAME PS */}
                <div>
                    <IconLabel htmlFor="name_ps" icon="🛫" text="Pashto Name" />
                    <TextInput
                        id="name_ps"
                        value={data.name_ps}
                        onChange={(e) =>
                            handleChange("name_ps", e.target.value)
                        }
                        onBlur={validateOnBlur("name_ps", rules.name_ps)}
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
                        onBlur={validateOnBlur("name_dr", rules.name_dr)}
                    />
                    <InputError message={errors.name_dr} />
                </div>

                {/* UNIT */}
                <div>
                    <IconLabel htmlFor="unit" icon="📦" text="Service Unit" />
                    <CustomSelect
                        value={data.sgha_service_unit_id}
                        options={units.map((u) => ({
                            value: u.id,
                            label: u.service_name,
                        }))}
                        onChange={(val) =>
                            handleChange("sgha_service_unit_id", val)
                        }
                        onBlur={validateOnBlur(
                            "sgha_service_unit_id",
                            rules.sgha_service_unit_id,
                        )}
                    />
                    <InputError message={errors.sgha_service_unit_id} />
                </div>

                {/* AIRLINE */}
                <div>
                    <IconLabel htmlFor="airline" icon="🏢" text="Airline" />
                    <CustomSelect
                        value={data.airline_id}
                        options={airlines.map((a) => ({
                            value: a.id,
                            label: a.name_en,
                        }))}
                        onChange={(val) => handleChange("airline_id", val)}
                        onBlur={validateOnBlur("airline_id", rules.airline_id)}
                    />
                    <InputError message={errors.airline_id} />
                </div>

                {/* RATE */}
                <div>
                    <IconLabel htmlFor="rate" icon="📊" text="Rate" />
                    <TextInput
                        id="complation_rate"
                        type="number"
                        value={data.complation_rate}
                        onChange={(e) =>
                            handleChange("complation_rate", e.target.value)
                        }
                        onBlur={validateOnBlur(
                            "complation_rate",
                            rules.complation_rate,
                        )}
                    />
                    <InputError message={errors.complation_rate} />
                </div>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    📦 Save Service
                    {submitting && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}

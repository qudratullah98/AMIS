import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";
import SmallLoader from "@/Components/SmallLoader";
import FullPageLoader from "@/Components/FullPageLoader";
import toast from "react-hot-toast";
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
            airline_id: "",
            aircraft_type_id: "",
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
    const [airports, setAirports] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);

    const rules = { 
        sgha_service_unit_id: [required("Service unit is required")],
        airline_id: [required("Airline is required")],
        aircraft_type_id: [required("Aircraft type is required")],
        aircraft_registration: [required("Aircraft registration is required")],
    };

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const [u, a, ap, at] = await Promise.all([
                    axios.get(route("sgha.services_units.json")),
                    axios.get(route("airlines.json")),
                    axios.get(route("airports.json")),
                    axios.get(route("aircraft_types.json")),
                ]);

                setUnits(u.data);
                setAirlines(a.data);
                setAirports(ap.data);
                setAircraftTypes(at.data);
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

   
    // ---------------- SUBMIT ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAll(rules)) return;

        setSubmitting(true);

        try {
            const { data: res } = await axios.post(
                route("flight.store"),
                data,
            );

            onSubmitSuccess?.(res.flight);

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
                {/* AIRPORT */}
                <div>
                    <IconLabel htmlFor="airport" icon="✈️" text="Airport" />

                    <CustomSelect
                        value={data.airport_id}
                        options={airports.map((a) => ({
                            value: a.id,
                            label: a.name_en,
                        }))}
                        onChange={(val) => handleChange("airport_id", val)}
                    />

                    <InputError message={errors.airport_id} />
                </div>

                {/* AIRLINE */}
                <div>
                    <IconLabel htmlFor="unit" icon="📦" text="Service Unit" />

                    <CustomSelect
                        value={data.airline_id}
                        options={airlines.map((u) => ({
                            value: u.id,
                            label: u.name_en,
                        }))}
                        onChange={(val) => handleChange("airline_id", val)}
                    />

                    <InputError message={errors.airline_id} />
                </div>
                {/* AIRCRAFT TYPE */}
                <div>
                    <IconLabel htmlFor="aircraft_type" icon="✈️" text="Aircraft Type" />

                    <CustomSelect
                        value={data.aircraft_type_id}
                        options={aircraftTypes.map((at) => ({
                            value: at.id,
                            label: at.name,
                        }))}
                        onChange={(val) => handleChange("aircraft_type_id", val)}
                    />

                    <InputError message={errors.aircraft_type_id} />
                </div>
                {/* AirCraft registration */}
                <div>
                    <IconLabel
                        htmlFor="aircraft_registration"
                        icon="🛩️"
                        text="Aircraft Registration"
                    />
                    <TextInput
                        id="aircraft_registration"
                        value={data.aircraft_registration}
                        onChange={(e) =>
                            handleChange("aircraft_registration", e.target.value)
                        }
                    />
                    <InputError message={errors.aircraft_registration} />
                </div>

          
 
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

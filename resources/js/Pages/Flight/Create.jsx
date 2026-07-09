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
import CustomDatePicker from "@/Components/CustomDatePicker";
import convertTimestamp from "@/Components/utils/ConvertDate";
import InputLabel from "@/Components/InputLabel";

export default function CreateSghaService({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const { data, setData, processing, errors, reset, setError, clearErrors } =
        useForm({
            airport_id: "",
            airline_id: "",
            aircraft_type_id: "",
            aircraft_registration: "",
            flight_number: "",
            work_order: "",
            charge_note: "",
            arrival_date: "",
            approximate_time_arrival: "",
            departure_date: "",
            approximate_time_departure: "",
        });

    const { validateAll } = useValidation(data, setError, clearErrors);

    const [airlines, setAirlines] = useState([]);
    const [airports, setAirports] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const rules = {
        airport_id: [required("Airport is required")],
        airline_id: [required("Airline is required")],
    };

    const formattime = (value) => {
        if (!value) return "";

        const date = new Date(value);

        if (isNaN(date)) return value;

        return date.toTimeString().slice(0, 5);
    };
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const [a, ap, at] = await Promise.all([
                    axios.get(route("airlines.json")),
                    axios.get(route("airports.json")),
                    axios.get(route("aircraft_types.json")),
                ]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("STEP 1: submit clicked");

        const isValid = validateAll(rules);
        console.log("STEP 2: validation:", isValid);

        if (!isValid) return;

        setSubmitting(true);

        try {
            console.log("STEP 3: sending request", route("flight.store"));
            console.log("DATA:", data);

            const res = await axios.post(route("flight.store"), data);

            console.log("STEP 4: response received", res);

            onSubmitSuccess?.(res.data.flight);
            reset();
        } catch (error) {
            console.log("STEP ERROR:", error);

            if (error.response?.status === 422) {
                setError(error.response.data.errors);
            }
        } finally {
            setSubmitting(false);
        }
    };
    const formatTime = (value) => {
        return new Date(value).toTimeString().slice(0, 8);
    };

    if (loading) return <FullPageLoader message={t("common.loading")} />;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {submitting && (
                <FullPageLoader
                    show={submitting}
                    message={t("common.saving")}
                />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
                {/* AIRPORT */}
                <div>
                    <InputLabel htmlFor="airport_id">Airport 🛩️</InputLabel>
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
                    <InputLabel htmlFor="airline_id">Airline 🛩️</InputLabel>
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
                    <InputLabel htmlFor="aircraft_type_id">
                        Aircraft Type 🛩️
                    </InputLabel>
                    <CustomSelect
                        value={data.aircraft_type_id}
                        options={aircraftTypes.map((at) => ({
                            value: at.id,
                            label: at.name,
                        }))}
                        onChange={(val) =>
                            handleChange("aircraft_type_id", val)
                        }
                    />
                    <InputError message={errors.aircraft_type_id} />
                </div>

                {/* AIRCRAFT REGISTRATION */}
                <div>
                    <InputLabel htmlFor="aircraft_registration">
                        Aircraft Registration 🛩️
                    </InputLabel>
                    <TextInput
                        id="aircraft_registration"
                        value={data.aircraft_registration}
                        onChange={(e) =>
                            handleChange(
                                "aircraft_registration",
                                e.target.value,
                            )
                        }
                    />
                    <InputError message={errors.aircraft_registration} />
                </div>

                {/* FLIGHT NUMBER */}
                <div>
                    <InputLabel htmlFor="flight_number">
                        Flight Number 🛩️
                    </InputLabel>
                    <TextInput
                        id="flight_number"
                        value={data.flight_number}
                        onChange={(e) =>
                            handleChange("flight_number", e.target.value)
                        }
                    />
                    <InputError message={errors.flight_number} />
                </div>

                {/* WORK ORDER */}
                <div>
                    <InputLabel htmlFor="work_order">Work Order 🛩️</InputLabel>
                    <TextInput
                        id="work_order"
                        value={data.work_order}
                        onChange={(e) =>
                            handleChange("work_order", e.target.value)
                        }
                    />
                    <InputError message={errors.work_order} />
                </div>

                {/* CHARGE NOTE */}
                <div>
                    <InputLabel htmlFor="charge_note">
                        Charge Note 🛩️
                    </InputLabel>
                    <TextInput
                        id="charge_note"
                        value={data.charge_note}
                        onChange={(e) =>
                            handleChange("charge_note", e.target.value)
                        }
                    />
                    <InputError message={errors.charge_note} />
                </div>

                {/* ARRIVAL DATE */}
                <div>
                    <InputLabel htmlFor="arrival_date">
                        {t("arrival_date")} 🛩️
                    </InputLabel>
                    <CustomDatePicker
                        handelChange={(e) =>
                            handleChange("arrival_date", convertTimestamp(e))
                        }
                        error={errors.arrival_date}
                        placeholder={t("arrival_date")}
                    />
                </div>
                {/* DEPARTURE DATE */}
                <div>
                    <InputLabel htmlFor="departure_date">
                        {t("departure_date")} 🛩️
                    </InputLabel>
                    <CustomDatePicker
                        handelChange={(e) =>
                            handleChange("departure_date", convertTimestamp(e))
                        }
                        error={errors.departure_date}
                        placeholder={t("departure_date")}
                    />
                </div>

                {/* ARRIVAL TIME */}
                <div>
                    <InputLabel htmlFor="approximate_time_arrival">
                        {t("approximate_time_arrival")} 🛩️
                    </InputLabel>
                    <input
                        type="time"
                        id="approximate_time_arrival"
                        value={data.approximate_time_arrival}
                        onChange={(e) =>
                            handleChange(
                                "approximate_time_arrival",
                                e.target.value,
                            )
                        }
                        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                    <InputError message={errors.approximate_time_arrival} />
                </div>
            </div>
            {/* DEPARTURE TIME */}
            <div>
                <InputLabel htmlFor="approximate_time_departure">
                    {t("approximate_time_departure")} 🛩️
                </InputLabel>
                <input
                    type="time"
                    id="approximate_time_departure"
                    value={data.approximate_time_departure}
                    onChange={(e) =>
                        handleChange(
                            "approximate_time_departure",
                            e.target.value,
                        )
                    }
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <InputError message={errors.approximate_time_departure} />
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || submitting}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                    Save Service
                    {submitting && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}

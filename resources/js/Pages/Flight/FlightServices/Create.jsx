import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import AsyncSelect from "@/Components/AsyncSelect";
import CustomSelect from "@/Components/CustomSelect";
import FullPageLoader from "@/Components/FullPageLoader";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SmallLoader from "@/Components/SmallLoader";
import TextInput from "@/Components/TextInput";

import useValidation from "@/lib/validation/useValidation";
import { required, min } from "@/lib/validation/rules";

export default function CreateFlightService({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [sghaServices, setSghaServices] = useState([]);

    const {
        data,
        setData,
        reset,
        errors,
        setError,
        clearErrors,
    } = useForm({
        flight_id: "",
        sgha_service_id: "",
        count: 1,
    });

    const { validateAll } = useValidation(data, setError, clearErrors);

    const rules = {
        flight_id: [
            required("Flight is required"),
        ],
        sgha_service_id: [
            required("SGHA Service is required"),
        ],
        count: [
            required("Count is required"),
            min(1, "Count must be greater than zero"),
        ],
    };

    /**
     * Load dropdown data
     */
    const loadData = useCallback(async () => {
        try {
            setLoading(true);

            const [servicesRes] = await Promise.all([
                axios.get(route("sgha_services.json")),
            ]);

            setSghaServices(servicesRes.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    /**
     * Generic field update
     */
    const handleChange = (field, value) => {
        setData(field, value);

        if (errors[field]) {
            clearErrors(field);
        }
    };

    /**
     * Flight selected
     */
    const handleFlightSelect = (flight) => {
        handleChange("flight_id", flight.id);
    };

    /**
     * Submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAll(rules)) {
            return;
        }

        try {
            setSubmitting(true);

            const { data: response } = await axios.post(
                route("flight-services.store"),
                data
            );

            toast.success("Flight service created successfully.");

            onSubmitSuccess?.(response.data);

            reset();
        } catch (error) {
            if (error.response?.status === 422) {
                setError(error.response.data.errors);
            } else {
                toast.error("Something went wrong.");
                console.error(error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <FullPageLoader message={t("common.loading")} />;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {submitting && (
                <FullPageLoader
                    show
                    message={t("common.saving")}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-sm p-6">

                {/* Flight */}

                <div>
                    <InputLabel>{t("flight.flight")}</InputLabel>

                    <AsyncSelect
                        apiEndpoint={route("flights.json")}
                        onSelect={handleFlightSelect}
                        formatOption={(flight) =>
                            `${flight.flight_number} - ${flight.aircraft_registration}`
                        }
                        placeholder={t("flight.searchFlightNumber")}
                    />

                    <InputError message={errors.flight_id} />
                </div>

                {/* SGHA Service */}

                <div>
                    <InputLabel>SGHA Service</InputLabel>

                    <CustomSelect
                        value={data.sgha_service_id}
                        options={sghaServices.map((service) => ({
                            value: service.id,
                            label: service.name_en,
                        }))}
                        onChange={(value) =>
                            handleChange("sgha_service_id", value)
                        }
                    />

                    <InputError message={errors.sgha_service_id} />
                </div>

                {/* Count */}

                <div>
                    <InputLabel>Count</InputLabel>

                    <TextInput
                        type="number"
                        min={1}
                        value={data.count}
                        onChange={(e) =>
                            handleChange("count", e.target.value)
                        }
                    />

                    <InputError message={errors.count} />
                </div>

            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-md flex items-center gap-2"
                >
                    Save Flight Service
                    {submitting && <SmallLoader />}
                </button>
            </div>

        </form>
    );
}
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import CustomSelect from "@/Components/CustomSelect";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SmallLoader from "@/Components/SmallLoader";
import FullPageLoader from "@/Components/FullPageLoader";
import toast from "react-hot-toast";

import useValidation from "@/lib/validation/useValidation";
import { required, min } from "@/lib/validation/rules";

export default function CreateFlightService({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const { data, setData, errors, reset, setError, clearErrors } = useForm({
        flight_id: "",
        sgha_service_id: "",
        count: 1,
        approval_status_id: "",
    });

    const { validateAll } = useValidation(data, setError, clearErrors);

    const [flights, setFlights] = useState([]);
    const [sghaServices, setSghaServices] = useState([]);
    const [approvalStatuses, setApprovalStatuses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const rules = {
        flight_id: [required("Flight is required")],

        sgha_service_id: [required("SGHA Service is required")],

        count: [
            required("Count is required"),
            min(1, "Count must be greater than zero"),
        ],

        approval_status_id: [required("Approval status is required")],
    };

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const [flight, service, status] = await Promise.all([
                    axios.get(route("flights.json")),
 
 
                ]);

                setFlights(flight.data);

                setSghaServices(service.data);

                setApprovalStatuses(status.data);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const handleChange = (field, value) => {
        setData(field, value);

        if (errors[field]) {
            clearErrors(field);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const valid = validateAll(rules);

        if (!valid) return;

        setSubmitting(true);

        try {
            const res = await axios.post(route("flight-services.store"), data);

            toast.success("Flight service created successfully");

            onSubmitSuccess?.(res.data.data);

            reset();
        } catch (error) {
            if (error.response?.status === 422) {
                setError(error.response.data.errors);
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <FullPageLoader message={t("common.loading")} />;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {submitting && (
                <FullPageLoader
                    show={submitting}
                    message={t("common.saving")}
                />
            )}

            <div
                className="
grid 
grid-cols-1 
md:grid-cols-2 
gap-6 
bg-white 
p-6 
rounded-xl 
shadow-sm
"
            >
                {/* FLIGHT */}

                <div>
                    <InputLabel>Flight 🛩️</InputLabel>

                    <CustomSelect
                        value={data.flight_id}
                        options={flights.map((f) => ({
                            value: f.id,
                            label: f.flight_number,
                        }))}
                        onChange={(val) => handleChange("flight_id", val)}
                    />

                    <InputError message={errors.flight_id} />
                </div>

                {/* SGHA SERVICE */}

                <div>
                    <InputLabel>SGHA Service 🛩️</InputLabel>

                    <CustomSelect
                        value={data.sgha_service_id}
                        options={sghaServices.map((s) => ({
                            value: s.id,
                            label: s.name,
                        }))}
                        onChange={(val) => handleChange("sgha_service_id", val)}
                    />

                    <InputError message={errors.sgha_service_id} />
                </div>

                {/* COUNT */}

                <div>
                    <InputLabel>Count 🛩️</InputLabel>

                    <TextInput
                        type="number"
                        value={data.count}
                        onChange={(e) => handleChange("count", e.target.value)}
                    />

                    <InputError message={errors.count} />
                </div>

                {/* APPROVAL STATUS */}

                <div>
                    <InputLabel>Approval Status 🛩️</InputLabel>

                    <CustomSelect
                        value={data.approval_status_id}
                        options={approvalStatuses.map((status) => ({
                            value: status.id,
                            label: status.name,
                        }))}
                        onChange={(val) =>
                            handleChange("approval_status_id", val)
                        }
                    />

                    <InputError message={errors.approval_status_id} />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={submitting}
                    className="
px-5
py-2
bg-blue-600
text-white
rounded-lg
hover:bg-blue-700
disabled:opacity-50
flex
items-center
gap-2
"
                >
                    Save Flight Service
                    {submitting && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}

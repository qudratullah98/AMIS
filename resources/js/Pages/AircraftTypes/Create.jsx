import React from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import IconLabel from "@/Components/IconLabel";
import SmallLoader from "@/Components/SmallLoader";

export default function Create({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const {
        data,
        setData,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({
        name: "",
        code: "",
    });

    const [loading, setLoading] = React.useState(false);

    const handleChange = (field, value) => {
        setData(field, value);

        if (errors[field]) {
            clearErrors(field);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        clearErrors();

        setLoading(true);

        try {
            const response = await axios.post(
                route("aircraftTypes.store"),
                data
            );

            toast.success(t("common.createdSuccessfully"));

            onSubmitSuccess?.(response.data.aircraftType);

            reset();
        } catch (error) {
            console.error("Error creating aircraft type:", error);
            if (error.response?.status === 422) {
                Object.entries(error.response.data.errors).forEach(
                    ([field, messages]) => {
                        setError(field, messages[0]);
                    }
                );
            }

            toast.error(t("common.validationError"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">

            <div>
                <IconLabel
                    htmlFor="name"
                    icon="✈️"
                    text={t("airport.aircraftType")}
                />

                <TextInput
                    id="name"
                    value={data.name}
                    onChange={(e) =>
                        handleChange("name", e.target.value)
                    }
                />

                <InputError
                    message={errors.name && t(errors.name)}
                />
            </div>

            <div>
                <IconLabel
                    htmlFor="code"
                    icon="🔤"
                    text={t("airport.aircraftCode")}
                />

                <TextInput
                    id="code"
                    value={data.code}
                    onChange={(e) =>
                        handleChange("code", e.target.value)
                    }
                />

                <InputError
                    message={errors.code && t(errors.code)}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded bg-blue-600 text-white"
            >
                {loading ? (
                    <SmallLoader />
                ) : (
                    t("common.save")
                )}
            </button>

        </form>
    );
}
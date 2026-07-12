import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import IconLabel from "@/Components/IconLabel";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Create({ onSubmitSuccess }) {
    const { data, setData, errors, clearErrors ,setError} = useForm({
        name_en: "",
        name_dr: "",
        name_ps: "",
    });

    const handleChange = (field, value) => {
        setData(field, value);
    }
    const [SmallLoading, setSmallLoading] = useState(false);
    const {t} = useTranslation();

    // Form submission

   const submit = async (e) => {
    e.preventDefault();

    clearErrors(); // Clear previous validation errors

    setSmallLoading(true);

    try {
        const response = await axios.post(route("airline.store"), data);

        if (onSubmitSuccess) {
            onSubmitSuccess(response.data.airline);
        }

        toast.success("Airline created successfully!");
    } catch (err) {
        setError( err.response?.data?.errors || {});
        

        toast.error("Failed to create airline.");
    } finally {
        setSmallLoading(false);
    }
};
    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
                {/* English Name */}
                <div>
                    <IconLabel
                        htmlFor="name_en"
                        icon="✈️"
                        text="English Name"
                    />

                    <TextInput
                        id="name_en"
                        value={data.name_en}
                        onChange={(e) => handleChange("name_en", e.target.value)}
                    />

                    <InputError message={t(errors.name_en)} />
                </div>

                {/* Dari Name */}
                <div>
                    <IconLabel htmlFor="name_dr" icon="🇦🇫" text="Dari Name" />

                    <TextInput
                        id="name_dr"
                        dir="rtl"
                        value={data.name_dr}  
                        onChange={(e) => handleChange("name_dr", e.target.value)}
                    />

                    <InputError message={t(errors.name_dr)} />
                </div>

                {/* Pashto Name */}
                <div>
                    <IconLabel htmlFor="name_ps" icon="🇦🇫" text="Pashto Name" />

                    <TextInput
                        id="name_ps"
                        dir="rtl"
                        value={data.name_ps}
                        onChange={(e) => handleChange("name_ps", e.target.value)}
                    />

                    <InputError message={t(errors.name_ps)} />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={SmallLoading}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                >
                    {SmallLoading ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}

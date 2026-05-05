import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";
import SmallLoader from "@/Components/SmallLoader";
import FullPageLoader from "@/Components/FullPageLoader";
import axios from "axios";

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

    const { data, setData, processing, errors, reset, setError } = useForm({
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
    

    // Fetch dropdown data
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [unitsRes, airlinesRes, statusRes] = await Promise.all([
                    axios.get(route("sgha.services_units.index")), 
                ]);

                setSghaServiceUnits(unitsRes.data); 
            } catch (err) {
                console.error("Error fetching dropdowns:", err);
            } finally {
                setPageLoading(false);
            }
        };
        fetchDropdowns();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        
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
                        required
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
                        required
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
                            label: airline.name_en || `${airline.name_ps} (${airline.name_en})`,
                        }))}
                        value={data.airline_id}
                        onChange={(e) => setData("airline_id", e)}
                        required
                    />
                    <InputError message={errors.airline_id} />
                </div>

                {/* Completion Rate */}
                <div>
                    <IconLabel
                        htmlFor="complation_rate"
                        icon="📊"
                        text={t("Completion Rate (%)")}
                    />
                    <TextInput
                        id="complation_rate"
                        type="number"
                        step="0.01"
                        value={data.complation_rate}
                        onChange={(e) => setData("complation_rate", e.target.value)}
                        required
                    />
                    <InputError message={errors.complation_rate} />
                </div>

                
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || smallLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                >
                    📦 {t("Save SGHA Service")}
                    {smallLoading && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}
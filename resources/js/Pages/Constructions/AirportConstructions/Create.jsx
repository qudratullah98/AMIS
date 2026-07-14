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

export default function CreateConstruction({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const { data, setData, processing, errors, reset, setError } = useForm({
        construction_id: "",
        construction_type_id: "",
        width: "",
        width_unit_id: "",
        length: "",
        length_unit_id: "",
        activity_status_id: "",
        latitude: "",
        longitude: "",
        weaknesses: "",
        requirements: "",
        image: "",
    });
    const [smallLoading, setSmallLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [units, setUnits] = useState([]);
    const [constructions, setConstructions] = useState([]);
    const [constructionType, setConstructionType] = useState([]);




    // Fetch dropdown data
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [unitsRes, constructionsRes, constructionTypeRes] = await Promise.all([
                    axios.get(route("api_units")),
                    axios.get(route("api_constructions")),
                    axios.get(route("api_constructionTypes")),

                ]);

                setUnits(unitsRes.data);
                setConstructions(constructionsRes.data);
                setConstructionType(constructionTypeRes.data);



            } catch (err) {
                console.error("Error fetching dropdowns:", err);
            } finally {
                setPageLoading(false);
            }
        };
        fetchDropdowns();
    }, []);

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSmallLoading(true);
        try {
            const response = await axios.post(route("airport.store"), data);
            reset();
            if (onSubmitSuccess) onSubmitSuccess(response.data.airport);
        } catch (err) {
            setError(err.response.data.errors || {});
            console.error("Error submitting form:", err);
        } finally {
            setSmallLoading(false);
        }
    };

    if (pageLoading) return <FullPageLoader message={t("common.loading")} />;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Grid Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-0 rounded-xl shadow-none">

                {/* CONSTRUCTIONS   */}
                <div>
                    <IconLabel
                        htmlFor="construction_id"
                        text={t("construction.constructions")}
                    />
                    <CustomSelect
                        id="construction_id"
                        value={data.construction_id}
                        options={constructions.map((c) => ({
                            value: c.id,
                            label: c.name_ps+ "  -  " +c.name_en,
                        }))}
                        onChange={(e) => setData("construction_id", e)}
                    />
                    <InputError message={errors.construction_id} />
                </div>

                {/* CONSTRUCTIONS  TYPE  */}
                <div>
                    <IconLabel
                        htmlFor="construction_type_id"
                        text={t("construction.constructionType")}
                    />
                    <CustomSelect
                        id="construction_type_id"
                        value={data.construction_type_id}
                        options={constructionType.map((c) => ({
                            value: c.id,
                            label: c.type_ps+ "  -  " +c.type_en,
                        }))}
                        onChange={(e) => setData("construction_type_id", e)}
                    />
                    <InputError message={errors.construction_type_id} />
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

                {/* IATA */}
                {/* <div>
                    <IconLabel htmlFor="IATA_code" icon="🏷️" text="IATA Code" />
                    <TextInput
                        id="IATA_code"
                        value={data.IATA_code}
                        onChange={(e) => setData("IATA_code", e.target.value)}
                    />
                    <InputError message={errors.IATA_code} />
                </div> */}

            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || smallLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                >
                    {t("common.storInfo")}
                    {smallLoading && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}

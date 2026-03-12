import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function CreateAndEdit({ airport = {}, onSubmit }) {
    const { t } = useTranslation();

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name_ps: airport.name_ps || "",
        name_dr: airport.name_dr || "",
        name_en: airport.name_en || "",
        IATA_code: airport.IATA_code || "",
        ICAO_code: airport.ICAO_code || "",
        type: airport.type || "domestic",
        status_id: airport.status_id || "",
        province_id: airport.province_id || "",
        district_id: airport.district_id || "",
        latitude: airport.latitude || "",
        longitude: airport.longitude || "",
        amsl: airport.amsl || "",
        amsl_unit_id: airport.amsl_unit_id || "",
        area: airport.area || "",
        area_unit_id: airport.area_unit_id || "",
        description: airport.description || "",
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [units, setUnits] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch dropdowns
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [provRes, distRes, unitsRes, statusRes] = await Promise.all([
                    axios.get("/api/provinces"),
                    axios.get("/api/districts"),
                    axios.get("/api/units"),
                    axios.get("/api/statuses"),
                ]);
                setProvinces(provRes.data);
                setDistricts(distRes.data);
                setUnits(unitsRes.data);
                setStatuses(statusRes.data);
            } catch (err) {
                console.error("Error fetching dropdown data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDropdowns();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(data, { post, put, reset });
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name PS */}
            <div>
                <InputLabel htmlFor="name_ps">{t("Name (PS)")}</InputLabel>
                <TextInput
                    id="name_ps"
                    value={data.name_ps}
                    onChange={(e) => setData("name_ps", e.target.value)}
                    className={`${
                        errors.name_ps ? "border-red-500" : "border-gray-300"
                    } transition duration-200 ease-in-out`}
                />
                <InputError message={errors.name_ps} />
            </div>

            {/* Name DR */}
            <div>
                <InputLabel htmlFor="name_dr">{t("Name (DR)")}</InputLabel>
                <TextInput
                    id="name_dr"
                    value={data.name_dr}
                    onChange={(e) => setData("name_dr", e.target.value)}
                    className={`${
                        errors.name_dr ? "border-red-500" : "border-gray-300"
                    } transition duration-200 ease-in-out`}
                />
                <InputError message={errors.name_dr} />
            </div>

            {/* Name EN */}
            <div>
                <InputLabel htmlFor="name_en">{t("Name (EN)")}</InputLabel>
                <TextInput
                    id="name_en"
                    value={data.name_en}
                    onChange={(e) => setData("name_en", e.target.value)}
                    className={`${
                        errors.name_en ? "border-red-500" : "border-gray-300"
                    } transition duration-200 ease-in-out`}
                />
                <InputError message={errors.name_en} />
            </div>

            {/* Province */}
            <div>
                <InputLabel htmlFor="province_id">{t("Province")}</InputLabel>
                <select
                    id="province_id"
                    value={data.province_id}
                    onChange={(e) => setData("province_id", e.target.value)}
                    className={`w-full p-2 border rounded ${
                        errors.province_id ? "border-red-500" : "border-gray-300"
                    }`}
                >
                    <option value="">{t("Select Province")}</option>
                    {provinces.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.province}
                        </option>
                    ))}
                </select>
                <InputError message={errors.province_id} />
            </div>

            {/* District */}
            <div>
                <InputLabel htmlFor="district_id">{t("District")}</InputLabel>
                <select
                    id="district_id"
                    value={data.district_id}
                    onChange={(e) => setData("district_id", e.target.value)}
                    className={`w-full p-2 border rounded ${
                        errors.district_id ? "border-red-500" : "border-gray-300"
                    }`}
                >
                    <option value="">{t("Select District")}</option>
                    {districts
                        .filter((d) => d.province_id === data.province_id)
                        .map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.district_dr}
                            </option>
                        ))}
                </select>
                <InputError message={errors.district_id} />
            </div>

            {/* Add other fields similarly: IATA_code, ICAO_code, type, AMSL, area, units, description */}

            <div className="mt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary"
                >
                    {t("Save Airport")}
                </button>
            </div>
        </form>
    );
}
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

export default function CreateAndEdit({ airport = {}, onSubmitSuccess }) {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
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
    const [smallLoading, setSmallLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    // Fetch dropdown data
    useEffect(() => {
        const fetchDropdowns = async () => {
            setPageLoading(true);
            try {
                const [provRes, unitsRes, statusRes] = await Promise.all([
                    axios.get(route("api_provinces")),
                    axios.get(route("api_units")),
                    axios.get(route("api_statuses")),
                ]);

                setProvinces(provRes.data);
                setUnits(unitsRes.data);
                setStatuses(statusRes.data);
            } catch (err) {
                console.error("Error fetching dropdowns:", err);
            } finally {
                setPageLoading(false);
            }
        };
        fetchDropdowns();
    }, []);

    // Handle province change to fetch districts
    const handleProvinceChange = async (provinceId) => {
        setSmallLoading(true);
        setData("province_id", provinceId);
        try {
            const res = await axios.get(
                route("api_districts_by_province", { province_id: provinceId }),
            );
            setDistricts(res.data);
            setData("district_id", "");
        } catch (err) {
            console.error("Error fetching districts:", err);
        } finally {
            setSmallLoading(false);
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSmallLoading(true);
        try {
            const response = await axios.post(route("airport.store"), data);
            reset();
            if (onSubmitSuccess) onSubmitSuccess(response.data.airport);
        } catch (err) {
            console.error("Error submitting form:", err);
        } finally {
            setSmallLoading(false);
        }
    };

    // if (pageLoading) return <FullPageLoader message={t("common.loading")} />;

    return (
      <>  {pageLoading ?(<FullPageLoader message={t("common.loading")} />) : (
         <form onSubmit={handleSubmit} className="space-y-8">
            {/* Grid Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
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
                    />
                    <InputError message={errors.name_en} />
                </div>

                {/* IATA */}
                <div>
                    <IconLabel htmlFor="IATA_code" icon="🏷️" text="IATA Code" />
                    <TextInput
                        id="IATA_code"
                        value={data.IATA_code}
                        onChange={(e) => setData("IATA_code", e.target.value)}
                    />
                    <InputError message={errors.IATA_code} />
                </div>

                {/* ICAO */}
                <div>
                    <IconLabel htmlFor="ICAO_code" icon="🏷️" text="ICAO Code" />
                    <TextInput
                        id="ICAO_code"
                        value={data.ICAO_code}
                        onChange={(e) => setData("ICAO_code", e.target.value)}
                    />
                    <InputError message={errors.ICAO_code} />
                </div>

                {/* Province */}
                <div>
                    <IconLabel
                        htmlFor="province_id"
                        icon="📍"
                        text={t("Province")}
                    />
                    <CustomSelect
                        id="province_id"
                        options={provinces.map((p) => ({
                            value: p.id,
                            label: p.province,
                        }))}
                        value={data.province_id}
                        onChange={(e) => handleProvinceChange(e)}
                    />
                    <InputError message={errors.province_id} />
                </div>

                {/* District */}
                <div>
                    <IconLabel
                        htmlFor="district_id"
                        icon="📍"
                        text={t("District")}
                    />
                    <CustomSelect
                        id="district_id"
                        value={data.district_id}
                        options={districts.map((d) => ({
                            value: d.id,
                            label: d.district_dr,
                        }))}
                        onChange={(e) => setData("district_id", e)}
                        disabled={!data.province_id || smallLoading}
                    />
                    {smallLoading && <SmallLoader />}
                    <InputError message={errors.district_id} />
                </div>

                {/* Latitude */}
                <div>
                    <IconLabel htmlFor="latitude" icon="🌐" text="Latitude" />
                    <TextInput
                        id="latitude"
                        value={data.latitude}
                        onChange={(e) => setData("latitude", e.target.value)}
                    />
                    <InputError message={errors.latitude} />
                </div>

                {/* Longitude */}
                <div>
                    <IconLabel htmlFor="longitude" icon="🌐" text="Longitude" />
                    <TextInput
                        id="longitude"
                        value={data.longitude}
                        onChange={(e) => setData("longitude", e.target.value)}
                    />
                    <InputError message={errors.longitude} />
                </div>

                {/* AMSL */}
                <div>
                    <IconLabel htmlFor="amsl" icon="⛰️" text="AMSL" />
                    <TextInput
                        id="amsl"
                        value={data.amsl}
                        onChange={(e) => setData("amsl", e.target.value)}
                    />
                    <InputError message={errors.amsl} />
                </div>

                {/* AMSL Unit */}
                <div>
                    <IconLabel
                        htmlFor="amsl_unit_id"
                        icon="📏"
                        text="AMSL Unit"
                    />
                    <CustomSelect
                        id="amsl_unit_id"
                        value={data.amsl_unit_id}
                        options={units.map((u) => ({
                            value: u.id,
                            label: u.unit_ps,
                        }))}
                        onChange={(e) => setData("amsl_unit_id", e)}
                    />
                    <InputError message={errors.amsl_unit_id} />
                </div>

                {/* Area */}
                <div>
                    <IconLabel htmlFor="area" icon="📐" text="Area" />
                    <TextInput
                        id="area"
                        value={data.area}
                        onChange={(e) => setData("area", e.target.value)}
                    />
                    <InputError message={errors.area} />
                </div>

                {/* Area Unit */}
                <div>
                    <IconLabel
                        htmlFor="area_unit_id"
                        icon="📐"
                        text="Area Unit"
                    />
                    <CustomSelect
                        id="area_unit_id"
                        value={data.area_unit_id}
                        options={units.map((u) => ({
                            value: u.id,
                            label: u.unit_ps,
                        }))}
                        onChange={(e) => setData("area_unit_id", e)}
                    />
                    <InputError message={errors.area_unit_id} />
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <IconLabel
                    htmlFor="description"
                    icon="📝"
                    text={t("Description")}
                />
                <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    rows="4"
                />
                <InputError message={errors.description} />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || smallLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                >
                    ✈️ {t("Save Airport")} {smallLoading && <SmallLoader />}
                </button>
            </div>
        </form>
        )}</>
    );
}

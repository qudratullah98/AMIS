import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";
import SmallLoader from "@/Components/SmallLoader";
import IconLabel from "@/Components/IconLabel";
import FullPageLoader from "@/Components/FullPageLoader";
import axios from "axios";

// IconLabel Component

export default function CreateAirport({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const { data, setData, processing, errors, reset, setError } = useForm({
        name_ps: "",
        name_dr: "",
        name_en: "",
        IATA_code: "",
        ICAO_code: "",
        type: "domestic",
        status_id: "",
        province_id: "",
        district_id: "",
        latitude: "",
        longitude: "",
        amsl: "",
        amsl_unit_id: "",
        area: "",
        area_unit_id: "",
        description: "",
        //runways info
        construction_type_id: "",
        width: "",
        width_unit_id: "",
        length: "",
        length_unit_id: "",
        activity_status_id: "",
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [units, setUnits] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [constructionType, setConstructionType] = useState([]);

    const [smallLoading, setSmallLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    // Fetch dropdown data
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [provRes, unitsRes, statusRes, constructionTypeRes] =
                    await Promise.all([
                        axios.get(route("api_provinces")),
                        axios.get(route("api_units")),
                        axios.get(route("api_statuses")),
                        axios.get(route("api_constructionTypes")),
                    ]);

                setProvinces(provRes.data);
                setUnits(unitsRes.data);
                setStatuses(statusRes.data);
                setConstructionType(constructionTypeRes.data);
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white px-6  shadow-none">
                {/* Name PS */}
                <div>
                    <IconLabel
                        htmlFor="name_ps"
                        icon="🛫"
                        text={t("common.namePashto")}
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
                        text={t("common.nameDari")}
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
                        text={t("common.nameEnglish")}
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
                        text={t("common.province")}
                    />
                    <CustomSelect
                        id="province_id"
                        options={provinces.map((p) => ({
                            value: p.id,
                            label: p.province,
                        }))}
                        value={data.province_id}
                        onChange={(e) => handleProvinceChange(e)}
                        placeholder={t("common.selectProvince")}
                    />
                    <InputError message={errors.province_id} />
                </div>

                {/* District */}
                <div>
                    <IconLabel
                        htmlFor="district_id"
                        icon="📍"
                        text={t("common.district")}
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
                                                placeholder={t("common.selectDistrict")}

                    />
                    {smallLoading && <SmallLoader />}
                    <InputError message={errors.district_id} />
                </div>

                {/* Latitude */}
                <div>
                    <IconLabel htmlFor="latitude" icon="🌐" text={t("common.latitude")} />
                    <TextInput
                        id="latitude"
                        value={data.latitude}
                        onChange={(e) => setData("latitude", e.target.value)}
                    />
                    <InputError message={errors.latitude} />
                </div>

                {/* Longitude */}
                <div>
                    <IconLabel htmlFor="longitude" icon="🌐" text={t("common.longitude")} />
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
                    <IconLabel htmlFor="area" icon="📐" text={t("measurement.area")} />
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
            <div className="bg-white px-6  shadow-none">
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
            <hr className=" pb-2" />
            <span className="px-6 font-bold ">{t("common.runwayDetails")}</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white px-6  shadow-none">
                {/* CONSTRUCTIONS  TYPE  */}
                <div>
                    <IconLabel
                        htmlFor="construction_type_id"
                        text={t("input.selectConstructionType")}
                    />
                    <CustomSelect
                        id="construction_type_id"
                        value={data.construction_type_id}
                        options={constructionType.map((c) => ({
                            value: c.id,
                            label: c.type_ps + "  -  " + c.type_en,
                        }))}
                        onChange={(e) => setData("construction_type_id", e)}
                        placeholder={t("input.selectConstructionType")}
                    />
                    <InputError
                        message={
                            errors.construction_type_id
                                ? t(`error.${errors.construction_type_id}`)
                                : ""
                        }
                    ></InputError>
                </div>

                {/* WIDTH    */}
                <div>
                    <IconLabel htmlFor="width" text={t("common.width")} />
                    <TextInput
                        id="width"
                        type="number"
                        min="0"
                        step="any"
                        value={data.width}
                        onChange={(e) => setData("width", e.target.value)}
                        placeholder={t("common.width")}
                    />
                    <InputError
                        message={errors.width ? t(`error.${errors.width}`) : ""}
                    />
                </div>

                {/* WIDTH UNIT ID   */}
                <div>
                    <IconLabel
                        htmlFor="width_unit_id"
                        text={t("common.widthUnit")}
                    />
                    <CustomSelect
                        id="width_unit_id"
                        value={data.width_unit_id}
                        options={units.map((u) => ({
                            value: u.id,
                            label: u.unit_ps + "  -  " + u.unit_en,
                        }))}
                        onChange={(e) => setData("width_unit_id", e)}
                        placeholder={t("input.selectUnit")}
                    />
                    <InputError
                        message={
                            errors.width_unit_id
                                ? t(`error.${errors.width_unit_id}`)
                                : ""
                        }
                    ></InputError>
                </div>

                {/* LENGTH    */}
                <div>
                    <IconLabel htmlFor="length" text={t("common.length")} />
                    <TextInput
                        id="length"
                        type="number"
                        min="0"
                        step="any"
                        value={data.length}
                        onChange={(e) => setData("length", e.target.value)}
                        placeholder={t("common.length")}
                    />
                    <InputError
                        message={
                            errors.length ? t(`error.${errors.length}`) : ""
                        }
                    ></InputError>
                </div>

                {/* LENGTH UNIT ID   */}
                <div>
                    <IconLabel
                        htmlFor="length_unit_id"
                        text={t("common.lengthUnit")}
                    />
                    <CustomSelect
                        id="length_unit_id"
                        value={data.length_unit_id}
                        options={units.map((u) => ({
                            value: u.id,
                            label: u.unit_ps + "  -  " + u.unit_en,
                        }))}
                        onChange={(e) => setData("length_unit_id", e)}
                        placeholder={t("input.selectUnit")}
                    />
                    <InputError
                        message={
                            errors.length_unit_id
                                ? t(`error.${errors.length_unit_id}`)
                                : ""
                        }
                    ></InputError>
                </div>

                {/* ACTIVITY STATUS ID   */}
                <div>
                    <IconLabel
                        htmlFor="activity_status_id"
                        text={t("input.selectActivityState")}
                    />
                    <CustomSelect
                        id="activity_status_id"
                        value={data.activity_status_id}
                        options={statuses.map((s) => ({
                            value: s.id,
                            label: s.status_ps + "  -  " + s.status_en,
                        }))}
                        onChange={(e) => setData("activity_status_id", e)}
                        placeholder={t("input.selectActivityState")}
                    />
                    <InputError
                        message={
                            errors.activity_status_id
                                ? t(`error.${errors.activity_status_id}`)
                                : ""
                        }
                    ></InputError>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || smallLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                >
                    ✈️ {t("cmmon.save")}
                    {smallLoading && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}

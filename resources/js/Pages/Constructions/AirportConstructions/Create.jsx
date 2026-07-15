import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";
import SmallLoader from "@/Components/SmallLoader";
import FullPageLoader from "@/Components/FullPageLoader";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import toast from "react-hot-toast";

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
    const [statuses, setStatuses] = useState([]);

    // Fetch dropdown data
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [
                    unitsRes,
                    constructionsRes,
                    constructionTypeRes,
                    statusRes,
                ] = await Promise.all([
                    axios.get(route("api_units")),
                    axios.get(route("api_constructions")),
                    axios.get(route("api_constructionTypes")),
                    axios.get(route("api_statuses")),
                ]);

                setUnits(unitsRes.data);
                setConstructions(constructionsRes.data);
                setConstructionType(constructionTypeRes.data);
                setStatuses(statusRes.data);
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
            const response = await axios.post(
                route("airportConstructions.store"),
                data,
            );
            reset();
            toast.success(t("common.informationtStoredSuccessfully"));

            if (onSubmitSuccess)
                onSubmitSuccess(response.data.airportConstruction);
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
                            label: c.name_ps + "  -  " + c.name_en,
                        }))}
                        onChange={(e) => setData("construction_id", e)}
                        placeholder={t("input.selectConstruction")}
                    />
                    <InputError
                        message={
                            errors.construction_id
                                ? t(`error.${errors.construction_id}`)
                                : ""
                        }
                    ></InputError>
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
                        // step="any"
                        step="0.01"
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
                        // step="any"
                        step="0.01"
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

                {/* LATITUDE */}
                <div>
                    <IconLabel htmlFor="latitude" text={t("common.latitude")} />
                    <TextInput
                        id="latitude"
                        type="number"
                        min={-90}
                        max={90}
                        value={data.latitude}
                        onChange={(e) => setData("latitude", e.target.value)}
                        placeholder="e.g., 41.40338"
                    />
                    <InputError
                        message={
                            errors.latitude ? t(`error.${errors.latitude}`) : ""
                        }
                    ></InputError>
                </div>

                {/* LONGITUDE */}
                <div>
                    <IconLabel
                        htmlFor="longitude"
                        text={t("common.longitude")}
                    />
                    <TextInput
                        id="longitude"
                        type="number"
                        min={-180}
                        max={180}
                        value={data.longitude}
                        onChange={(e) => setData("longitude", e.target.value)}
                        placeholder="e.g., 2.17403"
                    />
                    <InputError
                        message={
                            errors.longitude
                                ? t(`error.${errors.longitude}`)
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

                <div></div>

                {/* WEAKNESSES */}
                <div>
                    <IconLabel
                        htmlFor="weaknesses"
                        text={t("common.weaknesses")}
                    />
                    <textarea
                        id="weaknesses"
                        value={data.weaknesses}
                        onChange={(e) => setData("weaknesses", e.target.value)}
                        className="w-full border  rounded-lg px-2 focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder={t("common.weaknesses") + "..."}
                    />
                    <InputError
                        message={
                            errors.weaknesses
                                ? t(`error.${errors.weaknesses}`)
                                : ""
                        }
                    ></InputError>
                </div>

                {/* REQUIRMENTS */}
                <div>
                    <IconLabel
                        htmlFor="requirements"
                        text={t("common.requirements")}
                    />
                    <textarea
                        id="requirements"
                        value={data.requirements}
                        onChange={(e) =>
                            setData("requirements", e.target.value)
                        }
                        className="w-full border  rounded-lg px-2 focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder={t("common.requirements") + "..."}
                    />
                    <InputError
                        message={
                            errors.requirements
                                ? t(`error.${errors.requirements}`)
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
                    {t("common.storInfo")}
                    {smallLoading && <SmallLoader />}
                </button>
            </div>
        </form>
    );
}

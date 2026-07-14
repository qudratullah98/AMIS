import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";
import SmallLoader from "@/Components/SmallLoader";
import FullPageLoader from "@/Components/FullPageLoader";
import axios from "axios";
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
        name_ps: "",
        name_dr: "",
        name_en: "",
        code: "",
    });

    const [smallLoading, setSmallLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSmallLoading(true);
        try {
            const response = await axios.post(
                route("constructions.store"),
                data,
            );
            reset();
            toast.success(t("common.informationtStoredSuccessfully"));

            if (onSubmitSuccess) onSubmitSuccess(response.data.construction);
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
                {/* Name PS */}
                <div>
                    <IconLabel
                        htmlFor="name_ps"
                        // icon="🛫"
                        text={t("common.namePashto")}
                    />
                    <TextInput
                        id="name_ps"
                        value={data.name_ps}
                        onChange={(e) => setData("name_ps", e.target.value)}
                        placeholder={t("common.namePashto")}
                    />
                    <InputError
                        message={
                            errors.name_ps ? t(`error.${errors.name_ps}`) : ""
                        }
                    ></InputError>
                </div>

                {/* Name DR */}
                <div>
                    <IconLabel htmlFor="name_dr" text={t("common.nameDari")} />
                    <TextInput
                        id="name_dr"
                        value={data.name_dr}
                        onChange={(e) => setData("name_dr", e.target.value)}
                        placeholder={t("common.nameDari")}
                    />
                    <InputError
                        message={
                            errors.name_dr ? t(`error.${errors.name_dr}`) : ""
                        }
                    ></InputError>
                </div>

                {/* Name EN */}
                <div>
                    <IconLabel
                        htmlFor="name_en"
                        text={t("common.nameEnglish")}
                    />
                    <TextInput
                        id="name_en"
                        value={data.name_en}
                        onChange={(e) => setData("name_en", e.target.value)}
                        placeholder={t("common.nameEnglish")}
                    />
                    <InputError
                        message={
                            errors.name_en ? t(`error.${errors.name_en}`) : ""
                        }
                    ></InputError>
                </div>

                {/* CODE */}
                <div>
                    <IconLabel
                        htmlFor="code"
                        // icon="✈️"
                        text={t("construction.constructionCode")}
                    />
                    <TextInput
                        id="code"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        placeholder={t("construction.constructionCode")}
                        
                    />
                    <InputError
                        message={errors.code ? t(`error.${errors.code}`) : ""}
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

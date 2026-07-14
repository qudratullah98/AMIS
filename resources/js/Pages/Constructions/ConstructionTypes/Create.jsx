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

export default function CreateConstructionType({ onSubmitSuccess }) {
    const { t } = useTranslation();

    const { data, setData, processing, errors, reset, setError } = useForm({
        type_ps: "",
        type_dr: "",
        type_en: "",
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
                route("constructionsType.store"),
                data,
            );
            reset();
            toast.success(t("common.informationtStoredSuccessfully"));

            if (onSubmitSuccess)
                onSubmitSuccess(response.data.constructionType);
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
                {/* type PS */}

                <div>
                    <IconLabel
                        htmlFor="type_ps"
                        // icon="🛫"
                        text={t("construction.constructionTypePashto")}
                    />
                    <TextInput
                        id="type_ps"
                        value={data.type_ps}
                        onChange={(e) => setData("type_ps", e.target.value)}
                        placeholder={t("construction.constructionTypePashto")}
                    />
                    <InputError
                        message={
                            errors.type_ps ? t(`error.${errors.type_ps}`) : ""
                        }
                    ></InputError>
                </div>

                {/* type DR */}
                <div>
                    <IconLabel
                        htmlFor="type_dr"
                        text={t("construction.constructionTypeDari")}
                    />
                    <TextInput
                        id="type_dr"
                        value={data.type_dr}
                        onChange={(e) => setData("type_dr", e.target.value)}
                        placeholder={t("construction.constructionTypeDari")}
                    />
                    <InputError
                        message={
                            errors.type_dr ? t(`error.${errors.type_dr}`) : ""
                        }
                    ></InputError>
                </div>

                {/* type EN */}
                <div>
                    <IconLabel
                        htmlFor="type_en"
                        text={t("construction.constructionTypeEnglish")}
                    />
                    <TextInput
                        id="type_en"
                        value={data.type_en}
                        onChange={(e) => setData("type_en", e.target.value)}
                        placeholder={t("construction.constructionTypeEnglish")}
                    />
                    
                    <InputError
                        message={
                            errors.type_en ? t(`error.${errors.type_en}`) : ""
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

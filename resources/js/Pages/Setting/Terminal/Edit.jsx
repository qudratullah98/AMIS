import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { ArrowDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Edit({ Editable, handleSuccess }) {

    const [companyList, setCompanyList] = useState([]);
    const [routeList, setRouteList] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true); // Loading state for companies
    const [loadingRoutes, setLoadingRoutes] = useState(true); // Loading state for routes
    const [formLoading, setFormLoading] = useState(false); // Loading state for form submission
    const { t } = useTranslation();

    const { data, setData, post, reset, errors } = useForm({
        id: Editable.id,
        companies: Editable.companies ? Editable.companies.map(company => company.id) : [],
        routes: Editable.routes ? Editable.routes.map(route => route.id) : [],
        descriptions: "",
        terminal_name: Editable.terminal_name || "",
        is_approved: Editable.is_approved,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormLoading(true); // Set loading state for form submission

        axios.post(route("setting.terminal.update"), data)
            .then((response) => {
                setFormLoading(false); // Reset loading state after submission
                handleSuccess(response.data); // Call the success handler with response data
            })
            .catch((error) => {
                setFormLoading(false); // Reset loading state in case of error
                console.error("Submission error:", error); // Log error for debugging
                toast.error("An error occurred during submission."); // Notify user about the error
            });
    };

    useEffect(() => {
        setLoadingCompanies(true); // Start loading companies
        axios
            .get(route("setting.getAllCompny"))
            .then((response) => {
                setCompanyList(response.data);
            })
            .catch((error) =>
                console.error("Error fetching companies:", error)
            )
            .finally(() => {
                setLoadingCompanies(false); // End loading companies
            });
    }, []);

    useEffect(() => {
        setLoadingRoutes(true); // Start loading routes
        axios
            .get(route("setting.all_routes"))
            .then((response) => {
                setRouteList(response.data);
            })
            .catch((error) =>
                console.error("Error fetching routes:", error)
            )
            .finally(() => {
                setLoadingRoutes(false); // End loading routes
            });
    }, []);


    const filterOption = (option, inputValue) => {
        return option.data.searchLabel?.toLowerCase().includes(inputValue.toLowerCase());
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="shadow-md rounded-xl p-8 w-full max-w-5xl mx-auto bg-white space-y-6"
        >

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                {/* Terminal Name - Full Width */}
                <div className="flex flex-col md:col-span-2">
                    <InputLabel htmlFor="terminal_name">{t('terminalName')}</InputLabel>
                    <TextInput
                        id="terminal_name"
                        value={data.terminal_name}
                        onChange={(e) => setData("terminal_name", e.target.value)}
                        placeholder={t('terminalName')}
                        className="mt-2"
                        disabled={Editable.is_approved} // Disable input if terminal is approved
                    />
                    {errors.terminal_name && (
                        <span className="text-sm text-red-500 mt-1">{errors.terminal_name}</span>
                    )}
                </div>

                {/* Routes - with fixed dropdown container */}
                <div className="flex flex-col">
                    <InputLabel htmlFor="routes">{t('routes')}</InputLabel>
                    {loadingRoutes ? (
                        <div className="text-gray-500 text-sm mt-2">{t('searching')}</div>
                    ) : (
                        <div className="relative mt-2 z-10">
                            <CustomSelect
                                id="routes"
                                options={routeList.map((item) => ({
                                    label: (
                                        <div className="flex items-center gap-4">
                                            <span className="text-indigo-600 font-semibold">
                                                {item.start_point.province}, {item.start_district.district_dr}
                                            </span>
                                            <ArrowDown />
                                            <span className="text-indigo-600 font-semibold">
                                                {item.end_point.province}, {item.end_district.district_dr}
                                            </span>
                                        </div>
                                    ),
                                    value: item.id,
                                    searchLabel: `${item.start_point.province} ${item.start_district.district_dr} ${item.end_point.province} ${item.end_district.district_dr}`,
                                }))}
                                onChange={(selected) => setData("routes", selected)}
                                value={data.routes}
                                multiple={true}
                                className="w-full"
                                placeholder={t('selectRoute')}
                                filterOption={filterOption}

                            />
                        </div>
                    )}
                    {errors.routes && (
                        <span className="text-sm text-red-500 mt-1">{errors.routes}</span>
                    )}
                </div>

                {/* Companies - with fixed dropdown container */}
                <div className="flex flex-col">
                    <InputLabel htmlFor="companies">{t('companies')}</InputLabel>
                    {loadingCompanies ? (
                        <div className="text-gray-500 text-sm mt-2">{t('searching')}</div>
                    ) : (
                        <div className="relative mt-2 z-20">
                            <CustomSelect
                                id="companies"
                                options={companyList.map((item) => ({
                                    label: item.company_name,
                                    value: item.id,
                                }))}
                                onChange={(selected) => setData("companies", selected)}
                                value={data.companies}
                                multiple={true}
                                className="w-full"
                                placeholder={t('selectCompany')}
                            />
                        </div>
                    )}
                    {errors.companies && (
                        <span className="text-sm text-red-500 mt-1">{errors.companies}</span>
                    )}
                </div>

                {/* Descriptions - Full Width */}
                <div className="flex flex-col md:col-span-2">
                    <InputLabel htmlFor="descriptions">{t('descriptions')}</InputLabel>
                    <TextArea
                        id="descriptions"
                        rows={4}
                        value={data.descriptions}
                        onChange={(e) => setData("descriptions", e.target.value)}
                        className="mt-2"
                        placeholder={t('descriptions')}
                    />
                    {errors.descriptions && (
                        <span className="text-sm text-red-500 mt-1">{errors.descriptions}</span>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                <PrimaryButton
                    disabled={formLoading}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow transition-all duration-300 disabled:opacity-50"
                >
                    {formLoading ? t('saving') : t('save')}
                </PrimaryButton>
            </div>
        </form>

    );
}

export default Edit;

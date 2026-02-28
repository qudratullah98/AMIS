import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import CustomSelect from "@/Components/CustomSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import toast, { LoaderIcon } from "react-hot-toast";
import { useTranslation } from "react-i18next"; 

function ChangeVehicleCompany({ vehicle }) {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation()
    // Fetch companies
    useEffect(() => {
        setLoading(true);
        axios
            .get(route("setting.getAllCompny"))
            .then((response) => {
                setCompanies(response.data);
                setLoading(false);
            })
            .catch((error) => { console.error("Error fetching companies", error) });
    }, []);

    const { data, setData, post, processing } = useForm({
        vehicle_id: vehicle.id,
        old_company: vehicle?.company_id,
        old_company_name: vehicle?.company?.company_name,
        // default is the old company
        company_id: vehicle?.company_id,
        new_company_name: "",
    });


    // Handle form submission
    const handleSave = (e) => {
        e.preventDefault();
        post(route("setting.company.vehicle.updateCompany"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Vehicle company updated successfully.") 

            },

            onError: () => toast?.error("Error updating vehicle company."),
        });
    };


    if (loading) {
        return (
            <div className="flex justify-center my-4">
                <LoaderIcon />
            </div>
        );
    }
    return (
        <form onSubmit={handleSave} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <div className="mb-6">
                <InputLabel className="text-lg font-medium text-gray-800 mb-2">{t('company')}</InputLabel>
                <CustomSelect
                    id="company_id"
                    name="company_id"
                    value={data?.company_id}
                    onChange={(e) => {setData("company_id", e.id);setData("new_company_name", e?.company_name); }}
                    options={companies.map((company) => ({
                        value: company,
                        label: company?.company_name,
                    }))}
                    className="w-full  border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                />
            </div>

            <PrimaryButton
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 transform hover:scale-105"
                disabled={processing}
            >
                {t('changeVehicleCompany')}
            </PrimaryButton>
        </form>

    );
}

export default ChangeVehicleCompany;

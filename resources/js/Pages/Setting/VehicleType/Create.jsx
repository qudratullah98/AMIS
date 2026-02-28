 
import CustomSelect from "@/Components/CustomSelect";  
import TextInput from "@/Components/TextInput"; 
import {  useForm } from "@inertiajs/react";
import axios from "axios";
import { LucideLoader } from "lucide-react";
import React, {  useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function Create({AddVehicleTypeToList}) {
    const { t } = useTranslation();
    const { data, setData,  reset, errors,setError, processing } = useForm({
        name: "",
        vehicle_tonnage_id: null,
    });
    const [VehicleTonnage, setVehicleTonnage] = React.useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
      await axios.post(route("setting.vehicle_type.store"),data).then((response) => {
            toast.success(t("storedSuccessfully"));
            reset();
            AddVehicleTypeToList(response.data.data);
        }).catch((error) => {
            toast.error(t("failedToStore"));
            setError(error.response.data.errors);
        }); 
            
    };
    useEffect(() => {
        fetchDataForCreate();
    }, []);

    const fetchDataForCreate = async () => {
        try {
            const response = await axios.get(
                route("setting.vehicle_type.DataForCreatecreate"),
            );
            const { VehicleTonnages } = response.data;
            setVehicleTonnage(VehicleTonnages);
        } catch (error) {
            toast.error("Failed to load data for creating vehicle type.");
        }
    };
    return (
        <main className="w-full">
        <form onSubmit={handleSubmit}>

            <div className="flex flex-col md:flex-row gap-4 md:items-end">

                {/* Vehicle Name */}
                <div className="flex-1 space-y-1">
                    <label className="text-xs font-semibold text-gray-600">
                        {t("vehicleType")}
                    </label>

                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="مثلاً تیلر"
                        className={`w-full h-10 px-3 text-sm border rounded-lg 
                        bg-gray-50 focus:bg-white
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition
                        ${errors.name ? "border-red-500" : "border-gray-200"}`}
                    />

                    {errors.name && (
                        <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                </div>

                {/* Vehicle Tonnage */}
                <div className="flex-1 space-y-1">
                    <label className="text-xs font-semibold text-gray-600">
                        {t("VehicleTonnage")}
                    </label>

                    <div className="h-10">
                        <CustomSelect
                            options={VehicleTonnage.map((cat) => ({
                                value: cat.id,
                                label: cat.name,
                            }))}
                            value={data.vehicle_tonnage_id}
                            onChange={(value) =>
                                setData("vehicle_tonnage_id", value)
                            }
                        />
                    </div>

                    {errors.vehicle_tonnage_id && (
                        <p className="text-xs text-red-500">
                            {errors.vehicle_tonnage_id}
                        </p>
                    )}
                </div>

                {/* Save Button */}
                <div className="w-full md:w-auto">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`h-10 px-6 rounded-lg text-sm font-semibold text-white
                        flex items-center justify-center gap-2
                        transition shadow-md
                        ${
                            processing
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                        }`}
                    >
                        {processing && (
                            <LucideLoader className="w-4 h-4 animate-spin" />
                        )}
                        {processing ? t("saving") : t("save")}
                    </button>
                </div>

            </div>

        </form>
</main>
    );
}

export default Create;

import CustomSelect from "@/Components/CustomSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function EditVehicleType({editable,handleUpdated}) {
    const {t}= useTranslation()
    const { data, setData, errors } = useForm({
        id: editable.id,
        name: editable.name,
        vehicle_tonnage_id: editable.vehicle_tonnage_id,
    });
    const [loader,setLoader]=useState(false)
    const [vehicleTonnages, setVehicleTonnages] = useState([]);

    const handleSubmit = (e) => {
        setLoader(true)
        e.preventDefault();
        axios.post(route("setting.vehicle_type.update"),data).then((data)=>{
            toast.success(t('updatedSuccessfully'));
                handleUpdated(data)
                setLoader(false)
        })
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
            setVehicleTonnages(VehicleTonnages);
        } catch (error) {
            toast.error("Failed to load data for creating vehicle type.");
        }
    };

    return (
                <div className="bg-gray p-6 rounded-lg ">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Vehicle Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {t('vehicleType')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Vehicle Tonnage */}
                        <div>
                            <label
                                htmlFor="vehicle_tonnage_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {t('vehicleTonnage')}
                            </label>
                           

                            <CustomSelect
                            options={vehicleTonnages?.map((cat) => ({
                                value: cat.id,
                                label: cat.name,
                            }))}
                            value={data.vehicle_tonnage_id}
                            onChange={(value) =>
                                setData("vehicle_tonnage_id", value)
                            }
                        />
                            {errors.vehicle_tonnage_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.vehicle_tonnage_id}
                                </p>
                            )}
                        </div>

                        

                        <div className="flex space-x-2">
                            <PrimaryButton disabled={loader}>{t('update') } {loader && <Loader></Loader>} </PrimaryButton>
                        </div>
                    </form>
                </div>
    );
}

export default EditVehicleType;

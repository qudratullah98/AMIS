import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TextInput from "@/Components/TextInput";
import { Loader } from "lucide-react"; // Import the Loader icon
import axios from "axios";
import convertTimestamp, { convertToShamsi } from "@/Components/utils/ConvertDate";
import CustomDatePicker from "@/Components/CustomDatePicker";
import { useTranslation } from "react-i18next";


function EditFare({ editable }) {
    const {t} =useTranslation();
    const { data, setData, errors, setError } = useForm({
        id: editable.id,
        route_id: editable.route_id,
        vehicle_type_id: editable.vehicle_type_id,
        fare: editable.fare,
        bel_start_date: editable.bel_start_date,
        status: editable.status,
    });

    const [routes, setRoutes] = useState([])
    const [loader, setLoader] = useState(false)
    const [vehicle_types, setVehicleTypes] = useState([])
    useEffect(() => {
        axios.get(route('setting.vehicle_type.allTypes')).then((response) => {
            setVehicleTypes(response.data)
        })
        axios.get(route('setting.all_routes')).then((response) => {
            setRoutes(response.data)
        })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        axios.post(route("setting.fare.update"), data).then((response) => {
            router.visit(route('setting.fares'));
            toast.success(t('updatedSuccessfully'));
            return routes
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                toast.error(error.reset)
                const responseErrors = error.response.data.errors;
                // Push errors to Inertia form
                Object.entries(responseErrors).forEach(([field, messages]) => {
                    setError(field, messages[0]); // فقط پیام اول برای هر فیلد
                });
            }
        }).finally(() => {
            setLoader(false)
        })

    };
    return (
        <div className="p-6 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="route_id">{t('route')}</InputLabel>
                        <CustomSelect
                            id="route_id"
                            options={routes?.map((data) => ({
                                 label: (
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-indigo-600 font-semibold">
                                                    ({data.start_point.province}) {data.start_district.district_dr}
                                                </span>
                                                <span className="text-gray-400 font-bold">←</span>

                                                <span className="text-pink-600 font-semibold">
                                                    ({data.end_point.province}) {data.end_district.district_dr}
                                                </span>
                                            </div>
                                        ), value: data.id,
                                searchLabel: `(${data.start_point.province}) ${data.start_district.district_dr}  ---- (${data.end_point.province}) ${data.end_district.district_dr} `
                            }))}
                            onChange={(e) => setData("route_id", e)}
                            value={data.route_id}
                            disabled={editable.status == "approved"}
                            filterOption={(option, inputValue) =>
                                option.data.searchLabel.toLowerCase().includes(inputValue.toLowerCase())
                            }
                        />
                        {errors.route_id && (
                            <p className="text-red-500 text-sm">{errors.route_id}</p>
                        )}
                    </div>
                    <div>
                        <InputLabel htmlFor="fare">{t('fare')}</InputLabel>
                        <TextInput
                            id="fare"
                            type="number"
                            onChange={(e) => setData("fare", e.target.value)}
                            value={data.fare}
                            placeholder={t('fare')}
                            disabled={editable.status == "approved"}

                        />
                        {errors.fare && (
                            <p className="text-red-500 text-sm">{errors.fare}</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="vehicle_type_id">{t('vehicleType')}</InputLabel>
                        <CustomSelect
                            id="vehicle_type_id"
                            options={vehicle_types?.map((data) => ({
                                label: data.vehicle_name,
                                value: data.id,
                            }))}
                            onChange={(selectedOptions) => {
                                setData("vehicle_type_id", selectedOptions);
                            }}
                            value={data.vehicle_type_id}
                            disabled={editable.status == "approved"}

                        />
                        {errors.vehicle_type_id && (
                            <p className="text-red-500 text-sm">{errors.vehicle_type_id}</p>
                        )}
                    </div>
                    <div>
                        <InputLabel htmlFor="bel_start_date">{t('startDate')}</InputLabel>
                        <CustomDatePicker
                            handelChange={(e) => setData("bel_start_date", convertTimestamp(e))}
                            error={errors.bel_start_date}
                            placeholder={t('startDate')}
                            value={convertToShamsi(editable.bel_start_date)}
                        />

                    </div>
                </div>
                <div className="flex justify-start">
                    <PrimaryButton disabled={loader}>
                        {loader ? <Loader className="animate-spin mr-2" /> : null}
                        {loader ? t('saving') : t('save')}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}

export default EditFare;

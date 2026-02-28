import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";


function EditRoute({ editable ,handleUpdated}) {
    const {t} =useTranslation();
    const { data, setData, post, reset, errors, processing } = useForm({
        id: editable.id,
        start_point: editable.start_point.id,
        start_district: editable.start_district.id,
        end_point: editable.end_point.id,
        end_district: editable.end_district.id,
    });

    const [startDistricts, setStartDistricts] = useState([]);
    const [endDistricts, setEndDistricts] = useState([]);
    const [loadingStart, setLoadingStart] = useState(false);
    const [loadingEnd, setLoadingEnd] = useState(false);
    const [provinces, setProvinces] = useState([]);

    const getAllProvince = async () => {
        await axios.get(route('provinces')).then((response) => {
            setProvinces(response.data)
        })
    }
    useEffect(() => {
        getAllProvince();
    }, []);


    useEffect(() => {
        if (data?.start_point) {

            getProvinceDistrict(data?.start_point, "start");
        }
    }, [data.start_point]);

    useEffect(() => {
        if (data?.start_point) {

            getProvinceDistrict(data?.end_point, "end");
        }
    }, [data.end_point]);

    const getProvinceDistrict = (province_id, type) => {
        if (type === "start") {
            setLoadingStart(true); // Start loading for start districts
        } else {
            setLoadingEnd(true); // Start loading for end districts
        }

        axios
            .get(route("getProvinceDistrict", { province_id }))
            .then((response) => {
                if (type === "start") {
                    setStartDistricts(response.data);
                } else {
                    setEndDistricts(response.data);
                }
            })
            .catch(() => {
                toast.error("خطا در دریافت اطلاعات!");
            })
            .finally(() => {
                if (type === "start") {
                    setLoadingStart(false); // Stop loading for start districts
                } else {
                    setLoadingEnd(false); // Stop loading for end districts
                }
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(route("setting.route.update"),data).then((response)=>{
            toast.success(t('updatedSuccessfully'));
            handleUpdated(response)
        }).catch((error) => {
            if (error.response && error.response.status === 422) {
                // Handle validation errors
                const validationErrors = error.response.data.errors;
                for (const key in validationErrors) {
                    if (validationErrors.hasOwnProperty(key)) {
                        setData(key, data[key]); // Preserve the current value
                        errors[key] = validationErrors[key][0]; // Set the first error message
                    }
                }
            }
                toast.error("خطا در ایجاد مسیر!");

        })

    };

    return (
        <div className="p-6 rounded-lg" dir="rtl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel>{t('startingProvince')}</InputLabel>
                        <CustomSelect
                            options={provinces?.map((data) => ({
                                label: data.province,
                                value: data.id,
                            }))}
                            onChange={(e) =>
                                setData("start_point", e)
                            }
                            value={data.start_point} // Preserve selected value
                        />
                        {errors.start_point && (
                            <p className="text-red-500 text-sm">
                                {errors.start_point}
                            </p>
                        )}
                    </div>
                    <div>
                        <InputLabel>{t('startingDistrict')}</InputLabel>
                        {loadingStart ? (
                            <Loader /> // Show loader for start district
                        ) : (
                            <CustomSelect
                                options={startDistricts?.map(
                                    (data) => ({
                                        label: data.district_dr,
                                        value: data.id,
                                    })
                                )}
                                onChange={(e) =>
                                    setData(
                                        "start_district",
                                        e
                                    )
                                }
                                value={data.start_district} // Preserve selected value
                            />
                        )}
                        {errors.start_district && (
                            <p className="text-red-500 text-sm">
                                {errors.start_district}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel>{t('endingProvince')}</InputLabel>
                        <CustomSelect
                            options={provinces?.map((data) => ({
                                label: data.province,
                                value: data.id,
                            }))}
                            onChange={(e) =>
                                setData("end_point", e)
                            }
                            value={data.end_point} // Preserve selected value
                        />
                        {errors.end_point && (
                            <p className="text-red-500 text-sm">
                                {errors.end_point}
                            </p>
                        )}
                    </div>
                    <div>
                        <InputLabel>{t('endingDistrict')}</InputLabel>
                        {loadingEnd ? (
                            <Loader /> // Show loader for end district
                        ) : (
                            <CustomSelect
                                options={endDistricts?.map((data) => ({
                                    label: data.district_dr,
                                    value: data.id,
                                }))}
                                onChange={(e) =>
                                    setData(
                                        "end_district",
                                        e
                                    )
                                }
                                value={data.end_district} // Preserve selected value
                            />
                        )}
                        {errors.end_district && (
                            <p className="text-red-500 text-sm">
                                {errors.end_district}
                            </p>
                        )}
                    </div>


                </div>
                <div className="flex justify-start">
                    <PrimaryButton disabled={processing}>
                        {t('update')}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}

export default EditRoute;

import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader } from "lucide-react";
import CreateHeader from "@/Components/CreateHeader"; 
import { useTranslation } from "react-i18next";


function CreateTerminal({ provinces }) {
    const {t} =useTranslation();
    const { data, setData, post, reset, errors, processing } = useForm({
        start_point: "",
        start_district: "",
        end_point: "",
        end_district: "",
    });

    const [startDistricts, setStartDistricts] = useState([]);
    const [endDistricts, setEndDistricts] = useState([]);
    const [loadingStart, setLoadingStart] = useState(false); // Loading state for start districts
    const [loadingEnd, setLoadingEnd] = useState(false); // Loading state for end districts

    useEffect(() => {
        if(data.start_point){

            getProvinceDistrict(data?.start_point, "start");
        }
    }, [data.start_point]);

    useEffect(() => {
        if(data.end_point){
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
        post(route("setting.route.store"), {
            onSuccess: () => {
                toast.success(t('storedSuccessfully')); 
                reset();
            },
            onError: (e) => {
                if (e.end_district) {
                    toast.error(e.end_district);
                }else{
                    toast.error("مشکلی پیش آمده است! لطفاً دوباره امتحان کنید.");
                }
            },
        });
    };

    return (
        <AuthenticatedLayout header={<SubHeader title="مسیر جدید" />}>
            <main className="flex-grow w-full max-w-4xl py-6 mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                <CreateHeader title={t('newRoute')} />

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
                                {t('save')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default CreateTerminal;

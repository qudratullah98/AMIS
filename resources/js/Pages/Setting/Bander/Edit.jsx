import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TextInput from "@/Components/TextInput";
import { Loader } from "lucide-react";
import TextArea from "@/Components/TextArea";
import axios from "axios";
import { useTranslation } from "react-i18next";

function EditBander({ editable, handleEdit }) {
    const {t}=useTranslation()
    const { data, setData, errors, setError } = useForm({
        id: editable.id,
        route_id: [...editable.routes.map((data) => { return data.id })],
        province_id: editable.province_id,
        bandar_name: editable.bandar_name,
        descriptions: editable.descriptions,
    });
    const [routes, setRoutes] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [loader, setLoader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        axios.post(route("setting.bander.update"), data)
            .then((response) => {
                toast.success(t('updatedSuccessfully'));
                handleEdit(response);
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
                if (error.response && error.response.status === 422) {
                    setError(error.response.data.errors);
                    toast.error("لطفاً خطاهای فرم را بررسی کنید.");
                } else {
                    toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
                }
            });
    };

    useEffect(() => {

        axios.get(route('setting.all_routes')).then((response) => {
            console.log(response.data[0].id)
            setRoutes(response?.data);
        });
        axios.get(route('provinces')).then((response) => {
            setProvinces(response.data);

        });
    }, [])

    return (
        <div className="p-4 rounded-xl  border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="bandar_name">{t('bandarName')}</InputLabel>
                        <TextInput
                            id="bandar_name"
                            type="text"
                            className="w-full"
                            onChange={(e) => setData("bandar_name", e.target.value)}
                            value={data.bandar_name}
                        />
                        {errors.bandar_name && <p className="text-red-500 text-sm mt-1">{errors.bandar_name}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="province_id">{t('location')}</InputLabel>
                        <CustomSelect
                            id="province_id"
                            options={provinces?.map((data) => ({
                                label: data.province,
                                value: data.id,
                            }))}
                            onChange={(selectedOption) => setData("province_id", selectedOption)}
                            value={data.province_id}
                        />
                        {errors.province_id && <p className="text-red-500 text-sm mt-1">{errors.province_id}</p>}
                    </div>
                </div>
                <div className="w-full cols-span-2">
                    <InputLabel htmlFor="route_id">{t('routes')}</InputLabel>
                    <div className="w-full">
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
                                        ),
                                value: data.id,
                                searchLabel: `(${data.start_point.province}) ${data.start_district.district_dr}  ---- (${data.end_point.province}) ${data.end_district.district_dr} `
                            }))}
                            onChange={(selectedOptions) => setData("route_id", selectedOptions)}
                            value={data.route_id}
                            multiple
                            className="w-full"
                            filterOption={(option, inputValue) =>
                                option.data.searchLabel.toLowerCase().includes(inputValue.toLowerCase())
                            }
                        />
                        {errors.route_id && <p className="text-red-500 text-sm mt-1">{errors.route_id}</p>}
                    </div>

                    <div>
                        <InputLabel htmlFor="descriptions">{t('descriptions')}</InputLabel>
                        <TextArea
                            id="descriptions"
                            className="w-full"
                            onChange={(e) => setData("descriptions", e.target.value)}
                            value={data.descriptions}
                            placeholder={t('descriptions')}
                        />
                        {errors.descriptions && <p className="text-red-500 text-sm mt-1">{errors.descriptions}</p>}
                    </div>
                </div>
                <div className="flex justify-start mt-4">
                    <PrimaryButton disabled={loader} className="flex items-center gap-2 px-6 py-3 rounded-lg">
                        {loader && <Loader className="animate-spin" />}
                        {loader ? t('updating') : t('update')}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}

export default EditBander;

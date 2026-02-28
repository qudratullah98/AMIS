import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import toast from "react-hot-toast";
import TextInput from "@/Components/TextInput";
import { Loader } from "lucide-react"; // Import the Loader icon
import CreateHeader from "@/Components/CreateHeader";
import CustomDatePicker from "@/Components/CustomDatePicker";
import { useTranslation } from "react-i18next";
import convertTimestamp, { convertToShamsi } from "@/Components/utils/ConvertDate";

function CreateFare({ routes, vehicle_types }) {
    const { t } = useTranslation()
    const { data, setData, post, reset, errors, processing } = useForm({
        route_id: "",
        vehicle_type_id: "",
        fare: "",
        bel_start_date: "", 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("setting.fare.store"), {
            onSuccess: () => {
                toast.success(t('storedSuccessfully'));
                reset();
            },
            onError: () => {
                toast.error("مشکلی پیش آمده است! لطفاً دوباره امتحان کنید.");
            },
        });
    };

    const filterOption = (option, inputValue) => {
        return option.data.searchLabel?.toLowerCase().includes(inputValue.toLowerCase());
    };
    return (
        <AuthenticatedLayout header={<SubHeader title="کرایه جدید" />}>
            {/* <SubHeader title={t('newFare')} /> */}

            <main className="flex-grow w-full max-w-4xl py-6 mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* <CreateHeader title=" کرایه جدید" /> */}

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
                                        ),

                                        value: data.id,
                                        searchLabel: `(${data.start_point.province}) ${data.start_district.district_dr}  ---- (${data.end_point.province}) ${data.end_district.district_dr} `
                                    }))}
                                    placeholder={t('selectRoute')}
                                    onChange={(e) => setData("route_id", e)}
                                    value={data.route_id}
                                    filterOption={filterOption}
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
                                    onChange={(e) => setData("max_fare", e.target.value)}
                                    value={data.max_fare}
                                    placeholder={t('maxFare')}
                                />
                                {errors.max_fare && (
                                    <p className="text-red-500 text-sm">{errors.max_fare}</p>
                                )}
                            </div>
                            <div>
                                <InputLabel htmlFor="min_fare">{t('minFare')}</InputLabel>
                                <TextInput
                                    id="min_fare"
                                    type="number"
                                    onChange={(e) => setData("min_fare", e.target.value)}
                                    value={data.min_fare}
                                    placeholder={t('minFare')}
                                />
                                {errors.min_fare && (
                                    <p className="text-red-500 text-sm">{errors.min_fare}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="vehicle_type_id">{t('vehicleType')}</InputLabel>
                                <CustomSelect
                                    id="vehicle_type_id"
                                    options={vehicle_types?.map((data) => ({
                                        label: data.name,
                                        value: data.id,
                                    }))}
                                    onChange={(selectedOptions) => {
                                        setData("vehicle_type_id", selectedOptions);
                                    }}
                                    value={data.vehicle_type_id}
                                    placeholder={t('selectVehicleType')}
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
                                />
                            </div>
                        </div>
                      
                        <div className="flex justify-start">
                            <PrimaryButton disabled={processing}>
                                {processing ? <Loader className="animate-spin mr-2" /> : null}
                                {processing ? t('saving') : t('save')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default CreateFare;

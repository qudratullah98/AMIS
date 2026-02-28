import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import toast from "react-hot-toast";
import TextInput from "@/Components/TextInput";
import { Loader } from "lucide-react";
import TextArea from "@/Components/TextArea";
import CreateHeader from "@/Components/CreateHeader";
import { useTranslation } from "react-i18next";

function CreateTerminal({ routes, provinces }) {
    const {t}=useTranslation()
    const { data, setData, post, reset, errors, processing } = useForm({
        route_id: "",
        province_id: "",
        bandar_name: "",
        descriptions: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("setting.bander.store"), {
            onSuccess: () => {
                toast.success(t('storedSuccessfully'));
                reset();
            },
            onError: () => {
                toast.error("مشکلی پیش آمده است! لطفاً دوباره امتحان کنید.");
            },
        });
    };

    return (
        <AuthenticatedLayout header={<SubHeader title="بندر جدید" />}>
            <main className="flex-grow w-full max-w-4xl py-8 mx-auto px-6 lg:px-10">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <CreateHeader title={t('addNewBandar')} />

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
                                    placeholder={t('location')}
                                />
                                {errors.province_id && <p className="text-red-500 text-sm mt-1">{errors.province_id}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="route_id">{t('route')}</InputLabel>
                                <CustomSelect
                                    id="route_id"
                                    options={routes?.map((data) => ({
                                        label:(
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
                                    onChange={(selectedOptions) => setData("route_id", selectedOptions)}
                                    value={data.route_id}
                                    multiple
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
                            <PrimaryButton disabled={processing} className="flex items-center gap-2 px-6 py-3 rounded-lg">
                                {processing && <Loader className="animate-spin" />}
                                {processing ? t('saving') : t('save')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default CreateTerminal;

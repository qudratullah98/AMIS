import CustomSelect from '@/Components/CustomSelect';
import React, { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function AddRoutes({ selected, handleSuccess }) {
    const { data, setData, errors, setError } = useForm({
        routes: selected?.routes ? selected.routes.map(company => company.id) : [],
    });

    const [routeList, setRouteList] = useState([]);
    const [loadingRoutes, setLoadingRoutes] = useState(false);
    const [EditLoader, setEditLoader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditLoader(true)
        axios.post(route("setting.assign_routes_to_vehicle", { id: selected.id }), {
            vehicle_id: selected,
            route_ids: data.routes,
        })
            .then((response) => {
                toast.success("مسیرها با موفقیت به وسیله اختصاص داده شدند.");
                handleSuccess(response.data);
                setEditLoader(false)
            })
            .catch((error) => {
                setEditLoader(false)

                if (error.response?.data?.errors) {
                    setError(error.response.data.errors);
                }
                toast.error("خطا در اختصاص مسیرها! لطفاً دوباره تلاش کنید.");
            });
    };

    useEffect(() => {
        const fetchRoutes = async () => {
            setLoadingRoutes(true);
            try {
                const response = await axios.get(route('setting.all_routes'));
                setRouteList(response.data);
            } catch (error) {
                console.error('Error fetching routes:', error);
                toast.error("خطا در دریافت لیست مسیرها");
            } finally {
                setLoadingRoutes(false);
            }
        };
        fetchRoutes();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">افزودن مسیر به وسیله</h2>

            {loadingRoutes ? (
                <div className="flex justify-center items-center py-10">
                    <LoaderCircle className="animate-spin text-blue-600" size={32} />
                    <span className="ml-2 text-gray-700">در حال بارگذاری مسیرها...</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <CustomSelect
                            id="routes"
                            options={routeList.map((item) => ({
                                label: (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-indigo-600 font-semibold">
                                            ({item.start_point.province}) {item.start_district.district_dr}
                                        </span>
                                        <span className="text-gray-400 font-bold">←</span>

                                        <span className="text-pink-600 font-semibold">
                                            ({item.end_point.province}) {item.end_district.district_dr}
                                        </span>
                                    </div>
                                ),
                                value: item.id,
                                searchLabel: `${item.start_point.province} ${item.start_district.district_dr} → ${item.end_point.province} ${item.end_district.district_dr}`,

                            }))}
                            onChange={(selectedOptions) => {
                                setData("routes", selectedOptions);
                            }}
                            value={data.routes}
                            multiple={true}
                            className="w-full"
                            placeholder="مسیر مورد نظر را انتخاب کنید"
                            filterOption={(option, inputValue) => {
                                return option.data.searchLabel?.toLowerCase().includes(inputValue.toLowerCase());
                            }}
                        />

                        {errors.routes && (
                            <p className="text-red-500 text-sm mt-1">{errors.routes}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={EditLoader}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            {EditLoader && (
                                <LoaderCircle className="animate-spin" size={18} />
                            )}
                            {EditLoader ? 'در حال ذخیره...' : 'ذخیره مسیرها'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

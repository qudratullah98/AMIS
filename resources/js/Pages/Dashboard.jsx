import MultiLevelBarChart from "@/Charts/MultiLevelBarChart";
import OutCarsMultiLevelBarChart from "@/Charts/OutCarsMultiLevelBarChart";
import VehiclesDonutPieChart from "@/Charts/VehiclesDonutPieChart";
import DriversDonutPieChart from "@/Charts/DriversDonutPieChart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import PieChart from "@/Charts/PieChart";

export default function Dashboard({data}) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
        // header={
        //     <h2 className="text-xl font-semibold leading-tight text-gray-800 ">
        //         Dashboard
        //     </h2>
        // }
        >


            <div className="w-full mt-5  px-5 pb-4 bg-gray-100  rounded-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full pb-0 rounded-lg ">
                        <div className="  bg-gray-200  rounded-lg ">
                            <h2 className="text-lg font-semibold text-gray-900 text-center">
                                {t("todayOutgoingVehicles")}
                            </h2>
                            <div className="chart-container ">
                                {/* <OutCarsMultiLevelBarChart data={data} /> */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 bg-gray-200  rounded-lg ">
                        <div className="chart-container">
                            {/* <PieChart data={data} /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full  px-5 pb-5 bg-gray-100 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* First chart - 2/3 width on md+, full width on small */}
                    <div className="w-full md:w-2/3 bg-gray-200 rounded-lg ">
                        <div className="chart-container">
                            {/* <VehiclesDonutPieChart data={data} /> */}
                        </div>
                    </div>

                    {/* Second chart - 1/3 width on md+, full width on small */}
                    <div className="w-full md:w-1/3 bg-gray-200 rounded-lg ">
                        <div className="chart-container">
                            {/* <DriversDonutPieChart data={data} /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-2/3 bg-gray-200 mb-4 mr-5  rounded-lg ">
                <h2 className="text-lg font-semibold text-gray-900 text-center">
                    {t("last30DaysIncome")}
                </h2>
                <div className="chart-container">
                    {/* <MultiLevelBarChart data={data} /> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

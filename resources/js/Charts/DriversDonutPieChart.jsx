import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTranslation } from "react-i18next";

export default function HalfDonutPieChart({ data }) {
    const { t } = useTranslation();
    const chartRef = useRef(null);
    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                trigger: "item",
            },
            legend: {
                bottom: "5%",
                left: "center",
            },
            series: [
                {
                    //   name: 'Access From',
                    type: "pie",
                    radius: ["40%", "80%"],
                    center: ["50%", "70%"],
                    startAngle: 180,
                    endAngle: 360,
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: "center",
                    },
                    labelLine: {
                        show: false,
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: "bold",
                        },
                    },
                    itemStyle: {
                        borderRadius: 0,
                        // borderColor: "#fff",
                        borderWidth: 0,
                    },
                    data: [
                        {
                            value: data.vehicleOwners,
                            name: t("vehiclesOwners"),
                        },
                        { value: data.vehicleDrivers, name: t("drivers") },
                        {
                            value: data.approvedVehicleOwners,
                            name: t("approvedOwners"),
                        },
                        {
                            value: data.approvedVehicleDrivers,
                            name: t("approvedDrivers"),
                        },
                    ],
                },
            ],
        };

        chartInstance.setOption(option);

        const handleResize = () => chartInstance.resize();
        window.addEventListener("resize", handleResize);

        return () => {
            chartInstance.dispose();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}

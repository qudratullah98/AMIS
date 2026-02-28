import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
 import { useTranslation } from "react-i18next";

export default function VehiclesDonutPieChart({ data }) {
    const chartRef = useRef(null);

    const { t } = useTranslation();

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                trigger: "item",
            },
            legend: {
                show: false,
            },

            series: [
                // Outer pie: data with labels
                {
                    name: t('vehicles'),
                    type: "pie",
                    radius: ["45%", "70%"],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 3,
                        borderColor: "#fff",
                        borderWidth: 1,
                    },
                    label: {
                        show: true,
                        position: "outside",
                        formatter: "{b}: {c}",
                        fontSize: 12,
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: true,
                    },
                    data: [
                        {
                            value: data.totalApprovedVehicles,
                            name: t('totalApprovedVehicles'),
                        },
                        {
                            value: data.totalLargeVehicles,
                            name: t('totalLargeVehicles'),
                        },
                        {
                            value: data.totalSmallVehicles,
                            name: t('totalSmallVehicles'),
                        },
                        {
                            value: data.totalApprovedLargeVehicles,
                            name: t('totalApprovedLargeVehicles'),
                        },
                        {
                            value: data.totalApprovedSmallVehicles,
                            name: t('totalApprovedSmallVehicles'),
                        },
                    ],
                },

                // Inner pie: just for center label
                {
                    type: "pie",
                    radius: ["0%", "34%"],
                    label: {
                        position: "center",
                        formatter: t('totalStoredVehicles'), // 👈 your center label
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#444",
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [{ value: data.totalVehicles, name: "" }],
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

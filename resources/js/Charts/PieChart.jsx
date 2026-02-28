import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTranslation } from "react-i18next";

export default function PieChart({data}) {
const { t } = useTranslation();
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const option = {
            // title: {
            //     text: "Referer of a Website",
            //     subtext: "Fake Data",
            //     left: "center",
            // },

            tooltip: {
                trigger: "item",
            },

            legend: {
                bottom: "0",
                left: "center",
            },
            series: [
                {
                    // name: "Access From",
                    type: "pie",
                    radius: "70%",
                    data: [
                        { value: data.companies, name: t('companies')},
                        { value: data.terminals, name: t('terminals') },
                        { value: data.routes, name: t('routes')},
                        { value: data.bandars, name: t('bandars')},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
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

    return (
        <div
            ref={chartRef}
           style={{ width: "100%", height: "450px" }}
        />
    );
}

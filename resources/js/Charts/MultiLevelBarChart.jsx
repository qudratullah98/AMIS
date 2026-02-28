import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
    GridComponent,
    GraphicComponent,
    TooltipComponent,
    TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useTranslation } from "react-i18next";
import axios from "axios";

echarts.use([
    BarChart,
    GridComponent,
    GraphicComponent,
    TooltipComponent,
    CanvasRenderer,
    TitleComponent,
]);

export default function MultiLevelBarChart({ data }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const optionStackRef = useRef([]);
    const allOptionsRef = useRef({});
    const { t } = useTranslation();

    console.log(data);
    const [allLevelData, setAllLevelData] = useState({
        things: [
            [
                t("smallVehicles"),
                0,
                "things",
                "animals",
                0,
                "sync",
            ],
            [
                t("largeVehicle"),
                data.OutgoingVehicleIncoms[0].total_income,
                "things",
                "getProvencesIncome",
                data.OutgoingVehicleIncoms[0].total_income,
                "async",
            ],
        ],
        animals: [
            [t("dogs"), 3, "animals", "dogs", 3],
            [t("cats"), 4, "animals", "cats", 4],
            [t("birds"), 3, "animals", "birds", 3],
        ],
    });

    const [currentLevel, setCurrentLevel] = useState("things");
    const [isLoading, setIsLoading] = useState(false);

    const goBack = () => {
        const chart = chartInstanceRef.current;
        const stack = optionStackRef.current;
        if (stack.length === 0) return;

        const prevId = stack.pop();
        setCurrentLevel(prevId);

        // Ensure the chart is properly updated with the previous option
        if (allOptionsRef.current[prevId]) {
            chart.setOption(allOptionsRef.current[prevId], {
                replaceMerge: ["series"],
            });
        }
    };

    const generateOptions = () => {
        const options = {};
        Object.entries(allLevelData).forEach(([optionId, dataArray]) => {
            options[optionId] = {
                id: optionId,
                grid: {
                    top: 50,
                    bottom: 50,
                    left: 60,
                    right: 30,
                    containLabel: true,
                },

                tooltip: {
                    trigger: "item",
                    backgroundColor: "#333",
                    borderColor: "#777",
                    borderWidth: 1,
                    textStyle: {
                        color: "#fff",
                        fontSize: 13,
                    },
                    formatter: (params) => {
                        const [name, , , , actualValue] = params.data;
                        return `<strong>${name}</strong><br />${t(
                            "totalIncome"
                        )}: <span style="color:#ffd700">${actualValue}</span>`;
                    },
                },
                xAxis: {
                    type: "category",
                    axisLabel: {
                        rotate: 30,
                        fontSize: 12,
                    },
                },
                yAxis: { minInterval: 1 },
                animationDurationUpdate: 500,
                series: {
                    type: "bar",
                    dimensions: [
                        "name",
                        "displayValue",
                        "groupId",
                        "childGroupId",
                        "actualValue",
                    ],
                    encode: {
                        x: "name",
                        y: "displayValue",
                    },
                    itemStyle: {
                        color: (params) => {
                            const val = params.data[4];
                            if (val > 1000) {
                                return {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        { offset: 0, color: "#1f77b4" },
                                        { offset: 1, color: "#aec7e8" },
                                    ],
                                };
                            } else if (val > 100) {
                                return "#ff7f0e";
                            }
                            return "#2ca02c";
                        },
                    },
                    data: dataArray,
                    universalTransition: {
                        enabled: true,
                    },
                },
                graphic:
                    optionId !== "things"
                        ? [
                              {
                                  type: "text",
                                  left: 20,
                                  top: 0,
                                  style: {
                                      text: t("goBack"),
                                      fontFamily: "Arial, sans-serif",
                                      fontSize: 22,
                                      fill: "#000000",
                                      cursor: "pointer",
                                  },
                                  onclick: goBack,
                              },
                          ]
                        : [],
            };
        });
        return options;
    };

    const getAsyncData = async (dataItem) => {
        const groupId = dataItem[3];
        let fetchedData = [];

        try {
            setIsLoading(true);
            if (groupId === "getProvencesIncome") {
                const response = await axios.get(
                    route("dashboard.allLargeVehiclesRevenueGraph")
                );
                fetchedData = response.data.map((item) => [
                    item.province,
                    item.total_income,
                    groupId,
                    "getIncomByTerminal",
                    item.total_income,
                    "async",
                    item.location_id,
                ]);
            }

            if (groupId === "getIncomByTerminal") {
                const provinceId = dataItem[dataItem.length - 1];
                const response = await axios.get(
                    route("dashboard.getIncomByTerminal", {
                        province: provinceId,
                    })
                );
                fetchedData = response.data.map((item) => [
                    item.terminal_name,
                    item.total_income,
                    groupId,
                    "getcompanyVehicleIncome",
                    item.total_income,
                    "async",
                    item.terminal_id,
                ]);
            }

            if (fetchedData.length > 0) {
                // Push current level to stack before updating
                optionStackRef.current.push(currentLevel);

                setAllLevelData((prev) => ({
                    ...prev,
                    [groupId]: fetchedData,
                }));
                setCurrentLevel(groupId);
            }
        } catch (error) {
            console.error("Error fetching async data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);
        chartInstanceRef.current = chart;

        const handleResize = () => chart.resize();
        window.addEventListener("resize", handleResize);

        allOptionsRef.current = generateOptions();
        chart.setOption(allOptionsRef.current[currentLevel]);

        const handleClick = async (params) => {
            const dataItem = params.data;
            const nextOptionId = dataItem[3];

            if (!nextOptionId) return;

            if (dataItem[5] === "async") {
                if (!allLevelData[nextOptionId]) {
                    chart.showLoading("default", {
                        text: t('searching'),
                        color: "#2ca02c", // Spinner color
                        textColor: "#2ca02c", // Text color to match spinner
                        maskColor: "rgba(255, 255, 255, 0.3)", // Lower opacity (was 0.8)
                        zlevel: 0,
                        textStyle: {
                            fontSize: 40,
                            fontWeight: "bold",
                            fontFamily: "Arial, sans-serif",
                        },
                    });

                    await getAsyncData(dataItem);
                    chart.hideLoading();
                    return;
                }
            }

            if (allOptionsRef.current[nextOptionId]) {
                optionStackRef.current.push(currentLevel);
                setCurrentLevel(nextOptionId);
                chart.setOption(allOptionsRef.current[nextOptionId]);
            }
        };

        chart.off("click");
        chart.on("click", "series", handleClick);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.dispose();
        };
    }, [allLevelData, currentLevel]);

    return (
        <div
            ref={chartRef}
            style={{
                width: "100%",
                height: "500px",
                padding: "0px",
                margin: "0px",
                overflow: "visible",
            }}
        />
    );
}

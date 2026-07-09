import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function EChart({
    option,
    height = "300px",
}) {
    const chartRef = useRef(null);

    useEffect(() => {

        const chart = echarts.init(chartRef.current);

        chart.setOption(option);


        const resizeChart = () => {
            chart.resize();
        };


        window.addEventListener(
            "resize",
            resizeChart
        );


        return () => {
            window.removeEventListener(
                "resize",
                resizeChart
            );

            chart.dispose();
        };


    }, [option]);


    return (
        <div
            ref={chartRef}
            style={{
                width: "100%",
                height: height,
            }}
        />
    );
}
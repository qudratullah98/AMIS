import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import {
    Plane,
    Users,
    Luggage,
    ShieldCheck,
    AlertTriangle,
} from "lucide-react";

import EChart from "@/Components/EChart";

export default function Dashboard({ stats, recentFlights }) {
    const cards = [
        {
            title: "Flights",
            value: stats.flights,
            icon: <Plane className="w-8 h-8 text-blue-600" />,
        },
        {
            title: "Airports",
            value: stats.airports,
            icon: <Plane className="w-8 h-8 text-green-600" />,
        },
        {
            title: "Airlines",
            value: stats.airlines,
            icon: <Users className="w-8 h-8 text-purple-600" />,
        },
        {
            title: "Aircraft Types",
            value: stats.aircraftTypes,
            icon: <Plane className="w-8 h-8 text-red-600" />,
        },
        {
            title: "Equipment",
            value: stats.equipment,
            icon: <Luggage className="w-8 h-8 text-orange-600" />,
        },
        {
            title: "Constructions",
            value: stats.constructions,
            icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
        },
        {
            title: "Districts",
            value: stats.districts,
            icon: <Users className="w-8 h-8 text-cyan-600" />,
        },
        {
            title: "Provinces",
            value: stats.provinces,
            icon: <Users className="w-8 h-8 text-pink-600" />,
        },
    ];

    const flightTrend = [
        { month: "Jan", flights: 120 },
        { month: "Feb", flights: 180 },
        { month: "Mar", flights: 150 },
        { month: "Apr", flights: 220 },
        { month: "May", flights: 300 },
        { month: "Jun", flights: 260 },
    ];

    const flightStatus = [
        { name: "Arrived", value: 450 },
        { name: "Delayed", value: 80 },
        { name: "Cancelled", value: 30 },
        { name: "Scheduled", value: 150 },
    ];

    const airlineData = [
        { name: "Kam Air", flights: 200 },
        { name: "Ariana", flights: 160 },
        { name: "Turkish", flights: 120 },
        { name: "Emirates", flights: 100 },
    ];

    // ECHART OPTIONS

    const flightTrendOption = {
        tooltip: {
            trigger: "axis",
        },

        xAxis: {
            type: "category",
            data: flightTrend.map((item) => item.month),
        },

        yAxis: {
            type: "value",
        },

        series: [
            {
                name: "Flights",
                type: "line",
                smooth: true,
                data: flightTrend.map((item) => item.flights),
                lineStyle: {
                    width: 3,
                },
            },
        ],
    };

    const flightStatusOption = {
        tooltip: {
            trigger: "item",
        },

        legend: {
            bottom: 0,
        },

        series: [
            {
                name: "Flight Status",
                type: "pie",
                radius: "65%",
                data: flightStatus.map((item) => ({
                    name: item.name,
                    value: item.value,
                })),

                label: {
                    show: true,
                },
            },
        ],
    };

    const airlineOption = {
        tooltip: {
            trigger: "axis",
        },

        xAxis: {
            type: "category",
            data: airlineData.map((item) => item.name),
        },

        yAxis: {
            type: "value",
        },

        series: [
            {
                name: "Flights",
                type: "bar",
                barWidth: "40%",
                data: airlineData.map((item) => item.flights),
            },
        ],
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">
                    Airport Management Dashboard
                </h1>

                {/* CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-gray-500 text-sm">
                                    {card.title}
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {card.value}
                                </h2>
                            </div>

                            {card.icon}
                        </div>
                    ))}
                </div>

                {/* CHARTS */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="font-semibold text-lg mb-5">
                            Flight Traffic Trend
                        </h2>

                        <EChart option={flightTrendOption} />
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="font-semibold text-lg mb-5">
                            Flight Status
                        </h2>

                        <EChart option={flightStatusOption} />
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="font-semibold text-lg mb-5">
                            Airline Performance
                        </h2>

                        <EChart option={airlineOption} />
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="font-semibold text-lg mb-5">
                            Operations Overview
                        </h2>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="p-5 bg-blue-50 rounded-xl">
                                <p>Daily Flights</p>
                                <h3 className="text-3xl font-bold">240</h3>
                            </div>

                            <div className="p-5 bg-green-50 rounded-xl">
                                <p>Passengers</p>
                                <h3 className="text-3xl font-bold">12K</h3>
                            </div>

                            <div className="p-5 bg-yellow-50 rounded-xl">
                                <p>Delayed</p>
                                <h3 className="text-3xl font-bold">18</h3>
                            </div>

                            <div className="p-5 bg-red-50 rounded-xl">
                                <p>Alerts</p>
                                <h3 className="text-3xl font-bold">5</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABLES */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-semibold">
                                Recent Flights
                            </h2>

                            <span className="text-gray-500">
                                {recentFlights.length} Flights
                            </span>
                        </div>

                        <table className="min-w-full text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3">Flight No</th>

                                    <th>FLT</th>

                                    <th>Aircraft</th>

                                    <th>Arrival</th>

                                    <th>Departure</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentFlights.length ? (
                                    recentFlights.map((flight) => (
                                        <tr
                                            key={flight.id}
                                            className="border-b hover:bg-blue-50"
                                        >
                                            <td className="px-4 py-3 font-semibold">
                                                {flight.flight_number}
                                            </td>

                                            <td>{flight.flt}</td>

                                            <td>
                                                {flight.aircraft_registration}
                                            </td>

                                            <td>{flight.arrival_date}</td>

                                            <td>{flight.departure_date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-5">
                                            No Flights Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="font-semibold text-lg mb-5">
                            Airport Alerts
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-yellow-50 rounded-lg flex gap-3">
                                <AlertTriangle className="text-yellow-500" />

                                <div>
                                    <b>Flight Delay</b>

                                    <p>Gate A3 delayed by 20 minutes</p>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg flex gap-3">
                                <Luggage className="text-blue-500" />

                                <div>
                                    <b>Baggage</b>

                                    <p>15 unclaimed baggage reported</p>
                                </div>
                            </div>

                            <div className="p-4 bg-red-50 rounded-lg flex gap-3">
                                <ShieldCheck className="text-red-500" />

                                <div>
                                    <b>Security</b>

                                    <p>Terminal 2 inspection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

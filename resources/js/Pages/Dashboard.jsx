import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Plane,
    Users,
    Clock,
    ShieldCheck,
    Luggage,
    AlertTriangle,
} from "lucide-react";

export default function Dashboard({ stats, recentFlights }) {
    console.log(recentFlights);
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

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                {/* Page Title */}
                <h1 className="text-3xl font-bold mb-6">
                    Airport Management Dashboard
                </h1>

                {/* Statistic Cards */}
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

                            <div>{card.icon}</div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Flights Overview
                        </h2>

                        <div className="h-72 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                            Chart Placeholder
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Passenger Statistics
                        </h2>

                        <div className="h-72 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                            Pie Chart Placeholder
                        </div>
                    </div>
                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Flights */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Recent Flights
                            </h2>

                            <span className="text-sm text-gray-500">
                                {recentFlights.length} Flights
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse text-center">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="px-4 py-3 text-center">
                                            Flight No
                                        </th>
                                        <th className="px-4 py-3 text-center">
                                            FLT
                                        </th>
                                        <th className="px-4 py-3 text-center">
                                            Aircraft
                                        </th>
                                        <th className="px-4 py-3 text-center">
                                            Arrival
                                        </th>
                                        <th className="px-4 py-3 text-center">
                                            Departure
                                        </th>
                                    </tr>
                                </thead>

                                     <tbody>
                                {recentFlights.length > 0 ? (
                                    recentFlights.map((flight) => (
                                        <tr
                                            key={flight.id}
                                            className="border-b hover:bg-blue-50 transition"
                                        >
                                            <td className="px-4 py-3 text-center font-semibold">
                                                {flight.flight_number}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {flight.flt}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {flight.aircraft_registration}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {flight.arrival_date}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {flight.departure_date}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-6 text-center text-gray-500"
                                        >
                                            No flights found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Airport Alerts
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                                <AlertTriangle className="text-yellow-500 mt-1" />
                                <div>
                                    <p className="font-medium">Flight Delay</p>
                                    <p className="text-sm text-gray-600">
                                        Gate A3 boarding delayed by 20 minutes.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-lg border border-blue-200 bg-blue-50">
                                <Luggage className="text-blue-500 mt-1" />
                                <div>
                                    <p className="font-medium">Baggage</p>
                                    <p className="text-sm text-gray-600">
                                        15 unclaimed baggage items reported.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-lg border border-red-200 bg-red-50">
                                <ShieldCheck className="text-red-500 mt-1" />
                                <div>
                                    <p className="font-medium">Security</p>
                                    <p className="text-sm text-gray-600">
                                        Security inspection in Terminal 2.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

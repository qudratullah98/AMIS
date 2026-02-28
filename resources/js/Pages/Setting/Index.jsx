import React, { useState, useEffect } from "react";
import DashboardCard from "@/Components/DashboardCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Truck,
    Users,
    Briefcase,
    Building2,
    Map,
    DollarSign,
    Bus,
    Car,
    Ship,
    UserRoundCog,
    LocateFixed,
    Route,
    Flag,
    MapPinned,
    DollarSignIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Index() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [cardStats, setCardStats] = useState({}); // key => numeric value

    const cards = [
        {
            key: "vehicle_type",
            title: t("vehiclesTypes"),
            href: "setting/vehicle_type",
            icon: <Truck className="w-8 h-8 text-slate-700" />,
        },
        {
            key: "owner",
            title: t("vehiclesOwners"),
            href: "setting/owner",
            icon: <Users className="w-8 h-8 text-slate-700" />,
        },
        // {
        //     key: "driver",
        //     title: t("drivers"),
        //     href: "setting/driver",
        //     icon: <UserRoundCog className="w-8 h-8 text-slate-700" />,
        // },
        {
            key: "companie",
            title: t("companies"),
            href: "setting/company",
            icon: <Building2 className="w-8 h-8 text-slate-700" />,
        },
        // {
        //     key: "terminal",
        //     title: t("terminals"),
        //     href: "setting/terminal",
        //     icon: <MapPinned className="w-8 h-8 text-slate-700" />,
        // },
        {
            key: "large_vehicle",
            title: t("largeVehicles"),
            href: "setting/viewAllCompanyVehicles",
            icon: <Bus className="w-8 h-8 text-slate-700" />,
        },
        {
            key: "route",
            title: t("routes"),
            href: "setting/route",
            icon: <Route className="w-8 h-8 text-slate-700" />,
        },
        // {
        //     key: "bander",
        //     title: t("bandars"),
        //     href: "setting/bander",
        //     icon: <Flag className="w-8 h-8 text-slate-700" />,
        // },
    ];

    useEffect(() => {
        axios
            .get(route("getCardStats"))
            .then((res) => {
                setCardStats(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch card stats:", err);
            })
            .finally(() => {
                setTimeout(() => setLoading(false), 500);
            });
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    تنظیمات
                </h2>
            }
        >
            <main className="flex-grow w-full py-6 mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {cards.map((card, index) => (
                            <DashboardCard
                                key={index}
                                href={card.href}
                                title={card.title}
                                count={cardStats[card.key] ?? 0}
                                icon={card.icon}
                                isLoading={loading}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default Index;

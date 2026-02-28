import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Truck,
    Users,
    Building2,
    Car,
    LogOut,
    MapPinned,
    Route,
    ShieldUser,
    Package,
    DoorClosed,
    Monitor,
    BadgeDollarSign,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { permissions } = usePage().props.auth;
    const { t } = useTranslation();
    const location = window.location.pathname;

    // Menu groups
    const menuGroups = {
        settings: [

            {
                title: t("fares"),
                href: "/setting/fare",
                icon: <BadgeDollarSign className="w-5 h-5" />,
                can: permissions.includes("viewFare"),
            },

          ],


        dashboard: [
            {
                title: t("summary"),
                href: "/dashboard",
                icon: <Truck className="w-5 h-5" />,
                can: permissions.includes("viewOutgoingVehicles"),
            },
            {
                title: t("monthlyRevenue"),
                href: "/monthlyRevenue",
                icon: <Monitor className="w-5 h-5" />,
                can: permissions.includes("viewOutgoingVehicles"),
            },
            {
                title: t("largeVehiclesRevenueGraph"),
                href: "/largeVehiclesRevenueGraph",
                icon: <Truck className="w-5 h-5" />,
                can: permissions.includes("viewOutgoingVehicles"),
            },
        ],



        users: [
            {
                title: t("usersList"),
                href: "/users",
                icon: <Users className="w-5 h-5" />,
                can: permissions.includes("viewUsers"),
            },
            {
                title: t("roles"),
                href: "/user/roles",
                icon: <ShieldUser className="w-5 h-5" />,
                can: permissions.includes("manageUsers"),
            },
        ],

        profile: [
            {
                title: t("logout"),
                href: "/logout",
                icon: <LogOut className="w-5 h-5" />,
                can: true,
            },
        ],
    };

    // Determine which menu group to show based on current path
    const getActiveGroup = () => {
        if (location.startsWith("/setting")) return menuGroups.settings;
        if (
            location === "/dashboard"
        )
            return menuGroups.dashboard;

        if (location.startsWith("/users") || location.startsWith("/user/roles"))
            return menuGroups.users;
        if (location === "/logout" || location === "/profile")
            return menuGroups.profile;
        return [];
    };

    const renderLinks = (links) =>
        links.map(
            (item, idx) =>
                item.can && (
                    <Link
                        key={idx}
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            location === item.href
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                ),
        );

    return (
        <header
            className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 px-6 py-3 shadow-md flex items-center justify-between"
            dir="ltr"
        >
            {/* Left-aligned links */}
            <div className="flex flex-wrap gap-2">
                {renderLinks(getActiveGroup())}
            </div>
        </header>
    );
}

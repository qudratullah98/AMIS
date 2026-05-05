import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Truck,
    Users,
    LogOut,
    ShieldUser,
    Monitor,
    PlaneTakeoff,
    Building2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LogoutComponent from "./LogoutComponent";

export default function Header() {
    const { permissions } = usePage().props.auth;
    const { t } = useTranslation();
    const location = window.location.pathname;

    // Menu groups
    const menuGroups = {
        dashboard: [
            {
                title: t("summary"),
                href: "/dashboard",
                icon: <Truck className="w-5 h-5" />,
                can: permissions.includes("viewDashboardMenu"),
            },
            {
                title: t("monthlyRevenue"),
                href: "/monthlyRevenue",
                icon: <Monitor className="w-5 h-5" />,
                can: permissions.includes("viewDashboardMenu"),
            },
            {
                title: t("largeVehiclesRevenueGraph"),
                href: "/largeVehiclesRevenueGraph",
                icon: <Truck className="w-5 h-5" />,
                can: permissions.includes("viewDashboardMenu"),
            },
        ],

        users: [
            {
                title: t("user.users"),
                href: "/users",
                icon: <Users className="w-5 h-5" />,
                can: permissions.includes("viewUsers"),
            },
            {
                title: t("user.roles"),
                href: "/user/roles",
                icon: <ShieldUser className="w-5 h-5" />,
                can: permissions.includes("manageUsers"),
            },
        ],

        airport: [
            {
                title: t("airport.airports"),
                href: "/airports",
                icon: <PlaneTakeoff className="w-5 h-5" />,
                can: true, //permissions.includes("veiwAirports"),
            },
        ],

        airline: [
            {
                title: t("airline.airlines"),
                href: "/airlines",
                icon: <Building2 className="w-5 h-5" />,
                can: true, //permissions.includes("veiwAirports"),
            },
        ],

        aircraft: [
            {
                title: t("airport.aircraftTypes"),
                href: "/airCraftTypes",
                icon: "🚁",
                can: true, //permissions.includes("veiwAirports"),
            },
        ],

        constructions: [
            {
                title: t("construction.constructionsPart"),
                href: "/constructions",
                icon: <PlaneTakeoff className="w-5 h-5" />,
                can: true, //permissions.includes("veiwAirports"),
            },
        ],

        profile: [
            {
                title: t("user.logout"),
                href: "/logout",
                icon: <LogOut className="w-5 h-5" />,
                can: true,
            },
        ],

        airline:[
            {
                title: t("airline.airlines"),
                href: "/airlines",
                icon: <Building2 className="w-5 h-5" />,
                can: true, //permissions.includes("veiwAirports"),
            },
        ]
    };

    // Determine which menu group to show based on current path
    const getActiveGroup = () => {
        if (location === "/dashboard") return menuGroups.dashboard;

        if (
            location.startsWith("/users") ||
            location.startsWith("/user") ||
            location.startsWith("/role")
        )
            return menuGroups.users;
        if (location.startsWith("/airports") || location.startsWith("/airport"))
            return menuGroups.airport;
        if (location.startsWith("/airlines") || location.startsWith("/airline"))
            return menuGroups.airline;
         if (location.startsWith("/aircraft") || location.startsWith("/airCraftTypes"))
            return menuGroups.aircraft;
        if (location.startsWith("/constructions") || location.startsWith("/construction"))
            return menuGroups.constructions;

        if (location === "/logout" || location === "/profile")
            return menuGroups.profile;
        return [];
    };

    const renderLinks = (links) =>
        links.map(
            (item, idx) =>
                item.can &&
                (item.href === "/logout" ? (
                    <LogoutComponent key={idx} />
                ) : (
                    <Link
                        key={idx}
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            item.href
                                .split("/")
                                .filter(Boolean)
                                .some((part) =>
                                    location
                                        .split("/")
                                        .filter(Boolean)
                                        .includes(part),
                                )
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                )),
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

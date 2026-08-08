// Components/Header.js
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
    ChartColumnBig,
    ChartNoAxesColumn,
    Award,
    BookOpen,
    GraduationCap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LogoutComponent from "./LogoutComponent";
import { Button } from "./ui/button";
import useTabStore from "@/stores/tabStore";

export default function Header() {
    const { permissions } = usePage().props.auth;
    const { t } = useTranslation();
    const location = window.location.pathname;
    const { activeTab, changeTab } = useTabStore();


    // Menu groups
    const menuGroups = {
        dashboard: [
            {
                title: t("Dashboard 1"),
                href: "/dashboard",
                icon: <ChartColumnBig className="w-5 h-5" />,
                can: permissions.includes("viewDashboardMenu"),
            },
            {
                title: t("Dashboard 2"),
                href: "/monthlyRevenue",
                icon: <ChartColumnBig className="w-5 h-5" />,
                can: permissions.includes("viewDashboardMenu"),
            },
            {
                title: t("Dashboard 3"),
                href: "/largeVehiclesRevenueGraph",
                icon: <ChartColumnBig className="w-5 h-5" />,
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
                can: true,
            },
        ],

        airline: [
            {
                title: t("airline.airlines"),
                href: "/airlines",
                icon: <Building2 className="w-5 h-5" />,
                can: true,
            },
        ],

        aircraft: [
            {
                title: t("airport.aircraftTypes"),
                href: "/airCraftTypes",
                icon: "🚁",
                can: true,
            },
        ],

        constructions: [
            {
                title: t("construction.constructionsPart"),
                href: "/constructions",
                icon: <PlaneTakeoff className="w-5 h-5" />,
                can: true,
            },
        ],
        flight: [
            {
                title: t("flight.flights"),
                href: "/flights",
                icon: <PlaneTakeoff className="w-5 h-5" />,
                can: true,
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
        
        positions: [
            {
                title: t("tashkilat.educationPart"),
                icon: <GraduationCap className="w-5 h-5" />,
                can: true,
                isbutton: true,
                tabKey: 'educations',
                clickhandler: () => {
                    changeTab('educations');
                }
            },
            {
                title: t("tashkilat.certificatesPart"),
                icon: <Award className="w-5 h-5" />,
                can: true,
                isbutton: true,
                tabKey: 'certificates',
                clickhandler: () => {
                    changeTab('certificates');
                }
            },
            {
                title: t("tashkilat.trainingsPart"),
                icon: <BookOpen className="w-5 h-5" />,
                can: true,
                isbutton: true,
                tabKey: 'courses',
                clickhandler: () => {
                    changeTab('courses');
                }
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
        if (
            location.startsWith("/aircraft") ||
            location.startsWith("/airCraftTypes")
        )
            return menuGroups.aircraft;
        if (
            location.startsWith("/constructions") ||
            location.startsWith("/construction")
        )
            return menuGroups.constructions;
        if (location.startsWith("/flights") || location.startsWith("/flight"))
            return menuGroups.flight;
        if (location.startsWith("/positions") || location.startsWith("/positions"))
            return menuGroups.positions;

        if (location === "/logout" || location === "/profile")
            return menuGroups.profile;
        return [];
    };

    const renderLinks = (links) =>
        links.map((item, idx) => {
            if (!item.can) return null;

            if (item.href === "/logout") {
                return <LogoutComponent key={idx} />;
            }

            if (item?.isbutton) {
                const isActive = activeTab === item.tabKey;
                return (
                    <Button
                        key={idx}
                        onClick={item.clickhandler}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </Button>
                );
            }

            return (
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
                                    .includes(part)
                            )
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                    {item.icon}
                    <span>{item.title}</span>
                </Link>
            );
        });

    return (
        <header
            className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 px-2 py-3 shadow-md flex items-center justify-between"
            dir="ltr"
        >
            {/* Left-aligned links */}
            <div className="flex flex-wrap gap-2">
                {renderLinks(getActiveGroup())}
            </div>
        </header>
    );
}

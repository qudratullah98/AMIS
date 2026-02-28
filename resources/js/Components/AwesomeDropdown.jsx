import { Link, usePage } from "@inertiajs/react";
import {
    Languages,
    UserMinusIcon,
    DoorOpen,
    ChartColumn,
    Users,
    History,
    Settings2,
    ChevronDown,
    Palette,
    Package,
    Monitor,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LogoutComponent from "./LogoutComponent";

const AwesomeDropdown = () => {
    const { permissions } = usePage().props.auth;
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "dr" ? "pa" : "dr");
    };

    const links = [
        {
            href: "/dashboard",
            label: t("dashboard"),
            icon: <ChartColumn className="w-4 h-4" />,
            keyword: "dashboard",
            can: permissions.includes("viewDashboardMenu"),
            accent: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20",
        },
        {
            href: "/setting",
            label: t("setting"),
            icon: <Settings2 className="w-4 h-4" />,
            keyword: "setting",
            can: permissions.includes("viewSettingMenu"),
            accent: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
        },
        // {
        //     href: "/outgoing-vehicles",
        //     label: t("outDoor"),
        //     icon: <DoorClosed className="w-4 h-4" />,
        //     keyword: "outgoing-vehicles",
        //     can: permissions.includes("OutgoingVehicleMenu"),
        //     accent: "text-amber-600 dark:text-amber-400",
        //     bg: "bg-amber-50 dark:bg-amber-900/20",
        // },
        {
            href: "/queues",
            label: t("inDoor"),
            icon: <DoorOpen className="w-4 h-4" />,
            keyword: "queue",
            can: permissions.includes("viewQueues"),
            accent: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-900/20",
        },

        {
            href: "/queue-dashboard",
            label: t("queueDashboard"),
            icon: <Monitor className="w-4 h-4" />,
            keyword: "queue-dashboard",
            can: permissions.includes("viewQueueDashboard"),
            accent: "text-teal-600 dark:text-teal-400",
            bg: "bg-teal-50 dark:bg-teal-900/20",
        },

        {
            href: "/loads",
            label: t("loads"),
            icon: <Package className="w-4 h-4" />,
            keyword: "loads",
            can: permissions.includes("viewLoadesMenu"),
            accent: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-900/20",
        },
        {
            href: "/report",
            label: t("reports"),
            icon: <ChartColumn className="w-4 h-4" />,
            keyword: "report",
            can: permissions.includes("viewRaporMenu"),
            accent: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-900/20",
        },
        {
            href: "/users",
            label: t("users"),
            icon: <Users className="w-4 h-4" />,
            keyword: "user",
            can: permissions.includes("viewUserMenu"),
            accent: "text-rose-600 dark:text-rose-400",
            bg: "bg-rose-50 dark:bg-rose-900/20",
        },
        {
            href: "/log",
            label: t("log"),
            icon: <History className="w-4 h-4" />,
            keyword: "log",
            can: permissions.includes("viewLogMenu"),
            accent: "text-slate-600 dark:text-slate-400",
            bg: "bg-slate-50 dark:bg-slate-800/20",
        },
        {
            href: "/profile",
            label: t("profile"),
            icon: <UserMinusIcon className="w-4 h-4" />,
            keyword: "profile",
            can: true,
            accent: "text-indigo-600 dark:text-indigo-400",
            bg: "bg-indigo-50 dark:bg-indigo-900/20",
        },
    ];

    const pathname = window.location.pathname;

    const currentPage = links.find((link) => pathname === link.href);

    const currentPageLabel = currentPage?.label || t("menu");
    const currentPageIcon = currentPage?.icon || (
        <Palette className="w-5 h-5" />
    );
    const currentPageAccent =
        currentPage?.accent || "text-gray-600 dark:text-gray-400";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative z-50 font-sans">
            {/* Dropdown Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-4 bg-blue-200 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white px-5 py-2 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[220px] justify-between border border-transparent hover:border-white overflow-hidden relative"
            >
                <div className={`flex items-center gap-3 z-10`}>
                    <div
                        className={`flex items-center justify-center w-10 h-5 ${currentPageAccent}`}
                    >
                        {currentPageIcon}
                    </div>
                    <div className="text-left">
                        <span className="font-bold text-sm md:text-base">
                            {currentPageLabel}
                        </span>
                    </div>
                </div>

                <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />

                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/20 animate-pulse blur-xl" />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-72 animate-fade-in">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                            <div className="flex items-center gap-2 justify-center">
                                <div className="w-2 h-1 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Quick Navigation
                                </span>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="max-h-[calc(100vh-250px)] overflow-y-auto p-2 scrollbar-thin">
                            {links.map(
                                ({
                                    href,
                                    label,
                                    icon,
                                    keyword,
                                    can,
                                    accent,
                                    bg,
                                }) =>
                                    can && (
                                        <Link
                                            href={href}
                                            key={href}
                                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                                pathname===href
                                                    ? `${bg} border border-gray-200 dark:border-gray-700 shadow-sm`
                                                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div
                                                className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                                                    pathname===href
                                                        ? "bg-white dark:bg-gray-800 shadow-sm"
                                                        : "bg-gray-50 dark:bg-gray-800"
                                                } ${accent}`}
                                            >
                                                {icon}
                                            </div>
                                            <span
                                                className={`font-medium text-sm ${
                                                    pathname===href
                                                        ? "text-gray-900 dark:text-gray-100"
                                                        : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                                                }`}
                                            >
                                                {label}
                                            </span>
                                        </Link>
                                    ),
                            )}

                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="group w-full flex items-center justify-between px-3 py-2.5 mt-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 border border-gray-200 dark:border-gray-700 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800">
                                        <Languages className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {i18n.language === "dr"
                                            ? "دری ↔ پښتو"
                                            : "پښتو ↔ دری"}
                                    </span>
                                </div>
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-md text-xs font-medium text-blue-700 dark:text-blue-300">
                                    {i18n.language === "dr" ? "دری" : "پښتو"}
                                </span>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-100 dark:border-gray-700 p-3">
                            <LogoutComponent />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AwesomeDropdown;

import { useState, useEffect } from "react";
import {
    ChartColumnBig,
    Settings2,

    Users,
    History,
    UserMinusIcon,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronRight as ChevronRightIcon,
    Languages as EarthIcon,
    Plane,
    Building2,
    Menu,
    Box,
    Layers,
    Clock,
    PlaneLanding,
    Wrench,
    Building,
    MapPinHouse,
    Layers2,
    PlaneTakeoff,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import ApplicationLogo from "./ApplicationLogo";

const Sidebar = () => {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [openItems, setOpenItems] = useState({});
    const [collapsed, setCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const { t, i18n } = useTranslation();
    const { permissions } = usePage().props.auth;
    const currentPath = window.location.pathname;

    // Auto collapse on small screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsed(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.documentElement.dir = i18n.language === "pa" ? "rtl" : "ltr";
    }, [i18n.language]);

    const toggleSubMenu = (keyword, e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenItems((prev) => ({ ...prev, [keyword]: !prev[keyword] }));
    };

    const links = [
        {
            href: "/dashboard",
            label: t("common.dashboard"),
            icon: <ChartColumnBig className="w-5 h-5" />,
            keyword: "dashboard",
            can: permissions.includes("viewDashboardMenu"),
        },
        {
            href: route("airports.index"),
            label: t("airport.airports"),
            icon: <Plane className="w-5 h-5" />,
            keyword: "airport",
            can: permissions.includes("viewAirportMenu") || true,
        },
        // Airlines
        {
            href: route("airline.index"),
            label: t("airline.airlines"),
            icon: <Building2 className="w-5 h-5" />,
            keyword: "airlines",
            can: permissions.includes("viewAirlinesMenu") || true,
        },
        // Aircraf types
        {
            href: route("airCraftType.index"),
            label: t("airport.aircraftTypes") ,
            icon: "🚁",
            keyword: "aircraftTypes",
            can: permissions.includes("viewAirCraftsMenu") || true,
        },

        //SGHA part
        {
            href: "/sgha",
            label: t("sgha.SGHAPart"),
            icon: <Menu className="w-5 h-5" />,
            keyword: "sgha",
            can: permissions.includes("viewSGHAMenu") || true,
            subItems: [
                {
                    href: "",
                    label: t("sgha.sghaServiceUnite"),
                    icon: <Box className="w-4 h-4" />,
                    keyword: "sghaServinceUnite",
                },
                {
                    href: "",
                    label: t("sgha.sghaServices"),
                    icon: <Layers className="w-4 h-4" />,
                    keyword: "sghaServices",
                },

                {
                    href: "",
                    label: t("flight.flyteServices"),
                    icon: <Wrench className="w-4 h-4" />,
                    keyword: "flyteServices",
                },
                {
                    href: "",
                    label: t("flight.flights"),
                    icon: <PlaneTakeoff className="w-4 h-4" />,
                    keyword: "flytes",
                },
            ],
        },

        //Constructions
        {
            href: "/constructions",
            label: t("construction.constructionsPart"),
            icon: <Layers className="w-5 h-5" />,
            keyword: "constructions",
            can: permissions.includes("viewConstructionMenu") || true,
            subItems: [
                {
                    href: "",
                    label: t("construction.constructions"),
                    icon: <Building2 className="w-4 h-4" />,
                    keyword: "constructions",
                },
                {
                    href: "",
                    label: t("construction.airportConstructions"),
                    icon: <MapPinHouse className="w-4 h-4" />,
                    keyword: "airportConstructions",
                },

                {
                    href: "",
                    label: t("construction.constructionTypes"),
                    icon: <Layers2 className="w-4 h-4" />,
                    keyword: "constructionTypes",
                },
            ],
        },
        //Users
        {
            href: "/users",
            label: t("user.users"),
            icon: <Users className="w-5 h-5" />,
            keyword: "user",
            can: permissions.includes("viewUserMenu") || true,
        },
        {
            href: "/log",
            label: t("common.log"),
            icon: <History className="w-5 h-5" />,
            keyword: "log",
            can: permissions.includes("viewLogMenu"),
        },
        {
            href: "/profile",
            label: t("common.profile"),
            icon: <UserMinusIcon className="w-5 h-5" />,
            keyword: "profile",
            can: true,
        },
    ];

    const isActive = (href) => currentPath === href;
    const isChildActive = (subItems) =>
        subItems?.some((sub) => isActive(sub.href));

    return (
        <div
            className={`h-screen bg-white dark:bg-gray-900 flex flex-col transition-all duration-500 ease-in-out border-r border-gray-200 dark:border-gray-800 shadow-md ${
                collapsed ? "w-20" : "w-64"
            }`}
        >
            {/* Header */}
            <div className="relative flex items-center py-6 border-gray-200 dark:border-gray-800">
                <div className="absolute left-1/2 -translate-x-1/2 transform transition-all duration-500 ease-in-out">
                    <Link href="/" className="hover:cursor-pointer">
                        <ApplicationLogo
                            className={`h-auto transition-all duration-500 ${
                                collapsed
                                    ? "w-10 opacity-90"
                                    : "w-20 opacity-100"
                            }`}
                        />
                    </Link>
                </div>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="mr-auto z-10 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    aria-label={
                        collapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    {collapsed ? (
                        <ChevronLeft className="w-4 h-4" />
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 ">
                {links.map((link) => {
                    if (!link.can) return null;

                    const hasSubItems =
                        link.subItems && link.subItems.length > 0;
                    const isParentActive =
                        isActive(link.href) || isChildActive(link.subItems);

                    return (
                        <div key={link.keyword} className="relative">
                            <div
                                className="relative group"
                                onMouseEnter={() =>
                                    setHoveredItem(link.keyword)
                                }
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-3 mx-2 mb-0.5 px-3 py-1.5 rounded-lg transition-all duration-500 ${
                                        collapsed
                                            ? "justify-center"
                                            : "justify-start"
                                    } ${
                                        isParentActive
                                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`transition-colors duration-500 ${
                                            isParentActive
                                                ? "text-gray-900 dark:text-gray-100"
                                                : "text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                                        }`}
                                    >
                                        {link.icon}
                                    </span>

                                    <span
                                        className={`flex-1 text-lg font-medium transition-all duration-500 overflow-hidden whitespace-nowrap ${
                                            collapsed
                                                ? "opacity-0 w-0 ml-0"
                                                : "opacity-100 w-auto ml-2"
                                        }`}
                                    >
                                        {link.label}
                                    </span>

                                    {hasSubItems && !collapsed && (
                                        <button
                                            onClick={(e) =>
                                                toggleSubMenu(link.keyword, e)
                                            }
                                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-500"
                                            aria-label={
                                                openItems[link.keyword]
                                                    ? "Collapse submenu"
                                                    : "Expand submenu"
                                            }
                                        >
                                            {openItems[link.keyword] ? (
                                                <ChevronDown className="w-4 h-4 transition-transform duration-500" />
                                            ) : (
                                                <ChevronRightIcon className="w-4 h-4 transition-transform duration-500" />
                                            )}
                                        </button>
                                    )}
                                </Link>

                                {collapsed && hoveredItem === link.keyword && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-2xl text-white rounded-md whitespace-nowrap z-50 shadow-lg">
                                        {link.label}
                                    </div>
                                )}
                            </div>

                            {hasSubItems && (
                                <div
                                    className={`ml-4 pl-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 ${
                                        openItems[link.keyword] && !collapsed
                                            ? "max-h-96 opacity-100 mt-1 mb-1"
                                            : "max-h-0 opacity-0 mt-0 mb-0"
                                    }`}
                                >
                                    {link.subItems.map((sub) => (
                                        <Link
                                            key={sub.keyword}
                                            href={sub.href}
                                            className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-lg transition-all duration-500 ${
                                                isActive(sub.href)
                                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
                                            }`}
                                        >
                                            <span
                                                className={`w-4 h-4 ${
                                                    isActive(sub.href)
                                                        ? "text-gray-900 dark:text-gray-100"
                                                        : "text-gray-500 dark:text-gray-500"
                                                }`}
                                            >
                                                {sub.icon}
                                            </span>
                                            <span
                                                className={`text-sm transition-all duration-500 overflow-hidden whitespace-nowrap ${
                                                    collapsed
                                                        ? "opacity-0 w-0 ml-0"
                                                        : "opacity-100 w-auto ml-2"
                                                }`}
                                            >
                                                {sub.label}
                                            </span>

                                            {isActive(sub.href) && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 ml-auto" />
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className="relative">
                    <div
                        className="relative group"
                        onMouseEnter={() => setHoveredItem("language")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <button
                            onClick={() =>
                                i18n.changeLanguage(
                                    i18n.language === "dr" ? "pa" : "dr",
                                )
                            }
                            className={`flex items-center gap-3 mx-2 mb-0.5 px-3 py-1.5 rounded-lg transition-all duration-500 ${
                                collapsed ? "justify-center" : "justify-start"
                            } text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200`}
                        >
                            <span className="text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                <EarthIcon className="w-5 h-5" />
                            </span>

                            <span
                                className={`flex-1 text-lg font-medium transition-all duration-500 overflow-hidden whitespace-nowrap ${
                                    collapsed
                                        ? "opacity-0 w-0 ml-0"
                                        : "opacity-100 w-auto ml-2"
                                }`}
                            >
                                {i18n.language === "dr"
                                    ? t("pashto")
                                    : t("dari")}
                            </span>
                        </button>

                        {collapsed && hoveredItem === "language" && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-2xl text-white rounded-md whitespace-nowrap z-50 shadow-lg">
                                {i18n.language === "dr"
                                    ? t("pashto")
                                    : t("dari")}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                <div
                    className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
                >
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {user?.name.charAt(0)}
                        </span>
                    </div>

                    {!collapsed && (
                        <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex items-center gap-2 truncate">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {user?.name}
                                </p>

                                <span className="text-xs font-semibold text-white bg-green-500 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    {user?.roles
                                        ?.map((role) => role.name)
                                        .join(", ") || "No Role"}
                                </span>
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                {user?.email}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

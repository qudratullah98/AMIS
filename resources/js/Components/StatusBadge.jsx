import React from "react";
import {
    CheckCircle,
    XCircle,
    CheckSquare,
    Ban,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const StatusBadge = ({ status }) => {
    const { t } = useTranslation();

    const statusStyles = {
        approved: {
            icon: <CheckCircle className="text-green-500" />,
            label: t("state.approved"),
            bgClass: "",
            textClass: "text-green-700",
        },
        notApproved: {
            icon: <XCircle className="text-yellow-500" />,
            label: t("state.notApproved"),
            bgClass: "",
            textClass: "text-red-700",
        },
        disapproved: {
            icon: <XCircle className="text-yellow-500" />,
            label: t("state.disApproved"),
            bgClass: "",
            textClass: "text-red-700",
        },
        active: {
            icon: <CheckSquare className="text-blue-500" />,
            label: t("state.active"), // ✅ fixed typo
            bgClass: "",
            textClass: "text-blue-700",
        },
        deactive: {
            icon: <Ban className="text-red-500" />,
            label: t("state.deActive"), // ✅ fixed key
            bgClass: "",
            textClass: "text-gray-700",
        },
        expired: {
            icon: <Ban className="text-gray-500" />,
            label: t("state.expired"),
            bgClass: "",
            textClass: "text-gray-700",
        },
        blocked: {
            icon: <Ban className="text-red-500" />,
            label: t("state.blocked"),
            bgClass: "",
            textClass: "text-red-700",
        },
    };

    const statusData = statusStyles[status];

    if (!statusData) return null;

    return (
        <div className={`flex items-center p-2 rounded ${statusData.bgClass} inline-flex group relative`}>
            <div className="mr-1">{statusData.icon}</div>

            <span className={`font-medium mx-1 ${statusData.textClass}`}>
                {statusData.label}
            </span>

            <div className="absolute top-8 transform -translate-x-1/2 ml-20 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                {statusData.label}
            </div>
        </div>
    );
};

export default StatusBadge;

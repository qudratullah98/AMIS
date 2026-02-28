import React from 'react';
import { CheckCircle, XCircle, CheckSquare, Square, Cross, Ban } from 'lucide-react';

const statusStyles = {
    approved: {
        icon: <CheckCircle className="text-green-500" />,
        label: "Approved",
        bgClass: "",
        textClass: "text-green-700",
    },
    notApproved: {
        icon: <XCircle className="text-yellow-500" />,
        label: "Not Approved",
        bgClass: "",
        textClass: "text-red-700",
    },
    disapproved: {
        icon: <XCircle className="text-yellow-500" />,
        label: "Not Approved",
        bgClass: "",
        textClass: "text-red-700",
    },
    active: {
        icon: <CheckSquare className="text-blue-500" />,
        label: "Active",
        bgClass: "",
        textClass: "text-blue-700",
    },
    deactive: {
        icon: <Ban className="text-red-500" />,
        label: "Deactive",
        bgClass: "",
        textClass: "text-gray-700",
    },
    expired: {
        icon: <Ban className="text-gray-500" />,
        label: "Expired",
        bgClass: "",
        textClass: "text-gray-700",
    },
};

const StatusBadge = ({ status }) => {
    const statusData = statusStyles[status];

    if (!statusData) {
        return null; // or return a default style
    }

    return (
        <div className={`flex items-center p-2 rounded ${statusData.bgClass} inline-flex  group`}>
            <div className="mr-1">{statusData.icon}</div>
            <span className={`font-medium ${statusData.textClass}`}>
                {/* {statusData.label} */}
            </span>
            <div className="absolute left-2/1 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                {statusData.label}
            </div>
        </div>
    );
};

export default StatusBadge;

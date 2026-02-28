import React from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Hourglass,
  ListOrdered,
  Truck,
  LogOut,
  Trash2,
  Wrench,
  ToggleRight,
  ToggleLeft,
  HelpCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function StatusIcon({ status }) {
  const { t } = useTranslation();

  // normalize safely
  const normalizedStatus = status?.toString().trim().toLowerCase();

  const statusIconMap = {
    // ---------------- Approval ----------------
    pending: {
      icon: <Clock className="text-amber-500 w-5 h-5" />,
      label: t("pending"),
    },

    approved: {
      icon: <CheckCircle2 className="text-green-600 w-5 h-5" />,
      label: t("approved"),
    },

    denied: {
      icon: <XCircle className="text-red-500 w-5 h-5" />,
      label: t("denied"),
    },

    // ---------------- Queue / Terminal ----------------
    waiting: {
      icon: <Hourglass className="text-yellow-500 w-5 h-5" />,
      label: t("waiting"),
    },

    in_queue: {
      icon: <ListOrdered className="text-blue-500 w-5 h-5" />,
      label: t("inQueue"),
    },

    loading: {
      icon: <Truck className="text-indigo-500 w-5 h-5" />,
      label: t("loading"),
    },

    exited: {
      icon: <LogOut className="text-green-600 w-5 h-5" />,
      label: t("exited"),
    },

    deleted: {
      icon: <Trash2 className="text-gray-500 w-5 h-5" />,
      label: t("deleted"),
    },

    broken: {
      icon: <Wrench className="text-red-600 w-5 h-5" />,
      label: t("broken"),
    },

    // ---------------- Active / Inactive ----------------
    active: {
      icon: <ToggleRight className="text-green-600 w-5 h-5" />,
      label: t("active"),
    },

    inactive: {
      icon: <ToggleLeft className="text-gray-400 w-5 h-5" />,
      label: t("inactive"),
    },
  };

  const statusData = statusIconMap[normalizedStatus] || {
    icon: <HelpCircle className="text-gray-400 w-5 h-5" />,
    label: t("unknownStatus"),
  };

  return (
    <span
      title={statusData.label}
      className="inline-flex items-center justify-center cursor-default"
    >
      {statusData.icon}
    </span>
  );
}

import React from "react";
import { Link } from "@inertiajs/react";
import Skeleton from "./Skeleton";
import { BarChart2, Activity, ArrowRightCircle } from "lucide-react";

const DashboardCard = ({ title, href, icon, isLoading, count, trend }) => {
  const formatNumber = (num) => (num !== undefined && num !== null ? new Intl.NumberFormat().format(num) : "0");

  return (
    <Link
      href={href}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 h-44 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Top section */}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {title}
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {isLoading ? <Skeleton width="100px" height="40px" className="rounded-lg" /> : formatNumber(count)}
          </div>
        </div>

        {/* Icon */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 shadow-md transition-transform duration-300 group-hover:scale-105">
          {icon || <BarChart2 className="w-6 h-6 text-blue-500" />}
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-300">
            View analytics
          </span>
          <div className="w-6 h-[1px] bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-400 transition-all duration-300" />
        </div>

        <div className="flex items-center gap-2">
          {trend && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium">
              <Activity size={14} />
              <span>+{trend}%</span>
            </div>
          )}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 group-hover:bg-blue-50 transition-all duration-300">
            <ArrowRightCircle className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;

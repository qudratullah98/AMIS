import React from "react";
import Pagination from "./Pagination";
import PrimaryButton from "./PrimaryButton";
import { Link } from "@inertiajs/react";
import TableSearchInput from "./TableSearchInput";
import { Plus } from "lucide-react";
import PerPageSelect from "./PerPageSelect";

const DataTable = ({
    columns,
    links,
    AddButtonPath,
    enableButton = false,
    onButtonClick = null,
    buttonLabel = "open",
    enableSearch = true,
    PerPage = true,
    children,
    header = null,
    addButton = true,
    buttonClass = "bg-gray-800 text-white hover:bg-gray-700",
    searchPlaceHolder,
}) => {
    return (
        <div className="p-2  rounded-lg h-">
            {/* Header Section */}
            {/* Header Section */}
            <div
                className="relative flex items-center justify-between mb-4 px-2 py-3
                            bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl
    rounded-md border border-gray-200/60 dark:border-gray-700/50
    shadow-[0_6px_18px_rgba(0,0,0,0.04)]"
            >
                {/* Left Controls (Buttons) */}
                <div className="flex items-center gap-3 z-10">
                    {addButton &&
                        (enableButton ? (
                            <PrimaryButton
                                onClick={onButtonClick}
                                className={`h-8 px-4 rounded-full text-sm font-medium ${buttonClass}`}
                            >
                                {buttonLabel}
                            </PrimaryButton>
                        ) : (
                            <Link
                                id="addBtn"
                                href={AddButtonPath}
                                className="h-8 px-4 inline-flex items-center rounded-full text-sm font-medium text-white
            bg-gradient-to-r from-indigo-500 to-blue-500
            hover:from-indigo-600 hover:to-blue-600
            active:scale-95 transition-all duration-200"
                            >
                                {buttonLabel}
                            </Link>
                        ))}
                </div>

                {/* Center Header */}
                {header && (
                    <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                        {header}
                    </h2>
                )}

                {/* Right Controls (Search + PerPage) */}
                <div className="flex items-center gap-2 z-10">
                    {enableSearch && (
                        <div className="h-8">
                            <TableSearchInput
                                searchPlaceHolder={searchPlaceHolder}
                            />
                        </div>
                    )}
                    {PerPage && <PerPageSelect />}
                </div>
            </div>

            {/* Table Container */}
            <div className=" border border-gray-300 rounded-lg">
                <div
                    className=" "
                    style={{
                        scrollbarWidth: "none",
                    }}
                >
                    <table className="min-w-full border-collapse">
                        <thead className="sticky top-0 bg-gray-100 shadow-sm z-10">
                            <tr>
                                {columns?.map((column, index) => (
                                    <th
                                        key={index}
                                        className="p-3 text-center text-sm font-semibold text-gray-600 border-b border-gray-300 uppercase"
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {children}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-4">
                <Pagination links={links} />
            </div>
        </div>
    );
};

export default DataTable;

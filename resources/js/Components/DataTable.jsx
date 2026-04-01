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
    buttonClass = "px-5 py-2.5  rounded-lg bg-gray-100 text-primary-color-dark  border border-gray-200 hover:bg-gray-200 transition-all duration-500",
    searchPlaceHolder,
}) => {
    return (
        <div className="p-0  rounded-lg h-auto">
            {/* Header Section */}
            {/* Header Section */}
            <div
                className="relative flex items-center justify-between mb-2 px-0 py-3
                            bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl
                                "
            >
                {/* Left Controls (Buttons) */}
                <div className="flex items-center gap-3 z-10">
                    {addButton &&
                        (enableButton ? (
                            <PrimaryButton
                                onClick={onButtonClick}
                                className={` ${buttonClass}`}
                            >
                                {buttonLabel}
                            </PrimaryButton>
                        ) : (
                            <Link
                                id="addBtn"
                                href={AddButtonPath}
                                className="px-5 py-2.5  rounded-lg bg-gray-100 text-primary-color-dark  border border-gray-200 hover:bg-gray-200 transition-all duration-500"
                            >
                                {buttonLabel}
                            </Link>
                        ))}
                </div>

                {/* Center Header */}
                {header && (
                    <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base md:text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                        {header}
                    </h2>
                )}

                {/* Right Controls (Search + PerPage) */}
                <div className="flex items-center gap-2 z-10">
                    {enableSearch && (
                        <div className="">
                            <TableSearchInput
                                searchPlaceHolder={searchPlaceHolder}
                            />
                        </div>
                    )}
                    {PerPage && <PerPageSelect />}
                </div>
            </div>

            {/* Table Container */}
            <div className="border border-gray-300">
                <div
                    style={{
                        scrollbarWidth: "none",
                    }}
                >
                    <table className="min-w-full ">
                        <thead className="sticky top-0 bg-gray-100 shadow-sm z-10">
                            <tr>
                                {columns?.map((column, index) => (
                                    <th
                                        key={index}
                                        className="p-3 text-center text-sm font-semibold text-gray-600 border-b border-gray-200 uppercase"
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
            <div className="mt-3">
                <Pagination links={links} />
            </div>

        </div>
    );
};

export default DataTable;

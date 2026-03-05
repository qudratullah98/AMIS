import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import DataTable from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const FilterForm = ({
    description,
    setDescription,
    causer,
    setCauser,
    onFilter,
    onReset,
}) => (
    <form
        onSubmit={onFilter}
        className="flex flex-col md:flex-row items-center gap-1"
    >
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="جستجو توسط توضیحات"
            className="border rounded-md px-3 py-2 w-full md:w-1/3"
        />
        <input
            type="text"
            value={causer}
            onChange={(e) => setCauser(e.target.value)}
            placeholder="جستجو توسط کاربر"
            className="border rounded-md px-3 py-2 w-full md:w-1/3"
        />
        <div className="flex gap-2">
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                جستجو
            </button>
            <button
                type="button"
                onClick={onReset}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
                پاک‌کردن
            </button>
        </div>
    </form>
);

const LogIndex = () => {
    const { logs = { data: [], links: [] }, filters = {} } = usePage().props;

    const [description, setDescription] = useState(filters.description || "");
    const [causer, setCauser] = useState(filters.causer || "");

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route("log.index"),
            { description, causer },
            { preserveState: true, replace: true },
        );
    };

    const resetFilters = () => {
        setDescription("");
        setCauser("");
        router.get(
            route("log.index"),
            {},
            { preserveState: true, replace: true },
        );
    };

    const columns = [
        { label: "ID", className: "text-center" },
        { label: "Description", className: "text-center" },
        { label: "Causer", className: "text-center" },
        { label: "Date", className: "text-center" },
        // { label: 'Action', className: 'text-center' },
        { label: "Changes", className: "text-center" },
    ];

    return (
        <AuthenticatedLayout>
            <div className="mb-6 p-6 bg-white border rounded-xl shadow-lg">
                <FilterForm
                    description={description}
                    setDescription={setDescription}
                    causer={causer}
                    setCauser={setCauser}
                    onFilter={handleFilter}
                    onReset={resetFilters}
                />
            </div>

            <DataTable
                columns={columns}
                links={logs.links}
                header="لیست لاگ‌ها"
                addButton={false}
                enableSearch={false}
            >
                {logs.data.map((item, i) => (
                    <tr
                        key={item.id || i}
                        className="hover:bg-slate-100 transition-all duration-300 ease-in-out"
                    >
                        <td className="p-3 m-3 text-center text-sm text-gray-600">
                            {item.id}
                        </td>
                        <td className="p-3 m-3 text-center text-sm text-gray-600">
                            {item.description}
                        </td>
                        <td className="p-3 m-3 text-center text-sm text-gray-600">
                            {item.causer?.name || "System"}
                        </td>
                        <td className="p-3 m-3 text-center text-sm text-gray-600">
                            {new Date(item.created_at).toLocaleString()}
                        </td>

                        <td className="p-3 align-top text-sm text-right">
                            <div className=" text-right mx-auto">
                                {/* Old Data */}
                                {item.properties?.old && (
                                    <div className="bg-red-50 border-l-4 border-red-600 p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                        <div className="flex items-center">
                                            <span className="text-red-700 font-semibold text-md">
                                                قدیم
                                            </span>
                                        </div>
                                        <pre className="bg-red-100 p-2 rounded-md text-xs text-gray-800 overflow-auto max-h-20 whitespace-pre-wrap break-words shadow-inner">
                                            {JSON.stringify(
                                                item.properties.old,
                                                null,
                                                2,
                                            )}
                                        </pre>
                                    </div>
                                )}

                                {/* New Data */}
                                {item.properties?.attributes && (
                                    <div className="bg-green-50 border-l-4 border-green-600 p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                        <div className="flex items-center">
                                            <span className="text-green-700 font-semibold text-md">
                                                جدید
                                            </span>
                                        </div>
                                        <pre className="bg-green-100 p-2 rounded-md text-xs text-gray-800 overflow-auto max-h-20 whitespace-pre-wrap break-words shadow-inner">
                                            {JSON.stringify(
                                                item.properties.attributes,
                                                null,
                                                2,
                                            )}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </AuthenticatedLayout>
    );
};

export default LogIndex;

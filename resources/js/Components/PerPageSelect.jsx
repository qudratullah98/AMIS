import { router } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

function PerPageSelect() {
    const [perPage, setPerPage] = useState(() => {
        // Initialize from URL on first render
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get("perPage")) || 10;
    });

    const initialRender = useRef(true);

    // Update URL and reload table when perPage changes
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("perPage", perPage);
        currentUrl.searchParams.set("page", 1); // reset to page 1

        router.visit(currentUrl.toString(), {
            method: "get",
            preserveScroll: true,
            preserveState: false,
            only: [], // specify what data to reload if needed
        });
    }, [perPage]);

    return (
        <div className="relative">
            <select
                value={perPage}
                onChange={(e) => setPerPage(parseInt(e.target.value))}
                className="
    h-8
    pl-3 pr-8
    rounded-full
    border border-gray-200/60
    bg-white/80 backdrop-blur-md
    text-xs font-medium text-gray-800
    hover:border-indigo-300/60
    focus:border-indigo-400
    focus:ring-2 focus:ring-indigo-400/20
    outline-none
    transition-all duration-200
    cursor-pointer
  "
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
}

export default PerPageSelect;

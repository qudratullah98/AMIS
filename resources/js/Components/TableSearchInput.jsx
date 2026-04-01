import { router } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function TableSearchInput({ searchPlaceHolder }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const initialRender = useRef(true);
    const inputRef = useRef(null);

    // Load query from URL on first render
    useEffect(() => {
        const query = new URLSearchParams(window.location.search).get("query") || "";
        setSearchTerm(query);
    }, []);

    // Debounce input changes
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedTerm(searchTerm), 1000);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Send request on debounced input
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const currentQuery = new URLSearchParams(window.location.search).get("query");

        if (debouncedTerm !== currentQuery) {
            const url = new URL(window.location.href);

            if (debouncedTerm) url.searchParams.set("query", debouncedTerm);
            else url.searchParams.delete("query");

            url.searchParams.set("page", 1);
            router.get(url.toString());
        }
    }, [debouncedTerm]);

    // Handle input change
    const handleChange = (e) => setSearchTerm(e.target.value);

    // Clear input and refresh page
    const clearSearch = () => {
        setSearchTerm("");
        setDebouncedTerm("");

        const url = new URL(window.location.href);
        url.searchParams.delete("query");
        url.searchParams.set("page", 1);
        router.get(url.toString());

        inputRef.current?.focus();
    };

    return (
        <div className="relative flex items-center">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={searchPlaceHolder || t("common.search")}
                ref={inputRef}
                autoComplete="off"
                className="
                     py-3 px-5
                    rounded-lg
                    border border-gray-200/60
                    bg-white/70 backdrop-blur-md
                    text-sm text-gray-600
                    placeholder:text-gray-400
                    hover:border-gray-200
                    focus:border-gray-200
                    focus:ring-1 focus:ring-gray-100
                    outline-none
                    transition-all duration-200 ease-in-out
                "
            />

            {searchTerm && (
                <button
                    onClick={clearSearch}
                    className="absolute right-2 text-gray-400 hover:text-red-500 text-xs"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default TableSearchInput;

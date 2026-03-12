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
                placeholder={searchPlaceHolder || t("search")}
                ref={inputRef}
                autoComplete="off"
                className="
                    h-7 px-3 pr-7
                    rounded-full
                    border border-gray-200/60
                    bg-white/70 backdrop-blur-md
                    text-xs text-gray-700
                    placeholder:text-gray-400
                    hover:border-indigo-300/60
                    focus:border-indigo-400
                    focus:ring-2 focus:ring-indigo-400/20
                    outline-none
                    transition-all duration-200
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
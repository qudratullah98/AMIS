// import { router } from "@inertiajs/react";
// import React, { useState, useEffect, useRef } from "react";
// import TextInput from "./TextInput";
// import { useTranslation } from "react-i18next";
// function TableSearchInput() {
//     const { t } = useTranslation();
//     const [searchTerm, setSearchTerm] = useState("");
//     const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
//     const initialRender = useRef(true); // To track the first render
//     const inputRef = useRef(null);
//     // Set default value from URL query parameter
//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         const queryParam = params.get("query") || "";
//         setSearchTerm(queryParam);

//         if (inputRef.current) {
//             inputRef.current.focus();

//             setTimeout(() => {
//                 inputRef.current.setSelectionRange(-1, -1);
//             }, 10);
//         }
//     }, []);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedSearchTerm(searchTerm);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, [searchTerm]);

//     useEffect(() => {
//         if (initialRender.current) {
//             initialRender.current = false;
//             return;
//         }

//         if (
//             debouncedSearchTerm !==
//             new URLSearchParams(window.location.search).get("query")
//         ) {
//             const currentUrl = new URL(window.location.href);
//             currentUrl.searchParams.set("query", debouncedSearchTerm);
//             currentUrl.searchParams.set("page", 1);

//             router.get(currentUrl.toString());
//         }
//     }, [debouncedSearchTerm]);

//     const handleChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <input
//             type="text"
//             defaultValue={searchTerm}
//             id="searchTerm"
//             onChange={handleChange}
//             placeholder={t('search')}
//             ref={inputRef}
//             onBlur={handleChange}
//             autoComplete="off"
//             className="
//             p-2
//             rounded-md
//             border
//             border-gray-300
//             shadow-sm
//             dark:border-gray-700
//             dark:bg-gray-900
//             dark:text-gray-300
//             transition
//             duration-200
//             ease-in-out
//         "
//         />
//     );
// }

// export default TableSearchInput;

import { router } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import TextInput from "./TextInput";
import { useTranslation } from "react-i18next";

function TableSearchInput({ searchPlaceHolder }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const initialRender = useRef(true); // To track the first render
    const inputRef = useRef(null);
    // Set default value from URL query parameter
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const queryParam = params.get("query") || "";
        setSearchTerm(queryParam);

        // if (inputRef.current) {
        //     inputRef.current.focus();

        //     setTimeout(() => {
        //         inputRef.current.setSelectionRange(-1, -1);
        //     }, 10);
        // }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1800);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (
            debouncedSearchTerm !==
            new URLSearchParams(window.location.search).get("query")
        ) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("query", debouncedSearchTerm);
            currentUrl.searchParams.set("page", 1);

            router.get(currentUrl.toString());
        }
    }, [debouncedSearchTerm]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <input
            type="text"
            defaultValue={searchTerm}
            id="searchTerm"
            onChange={handleChange}
            placeholder={searchPlaceHolder || t("search")}
            ref={inputRef}
            onBlur={handleChange}
            autoComplete="on"
            className="
    h-7 px-3
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
    );
}

export default TableSearchInput;

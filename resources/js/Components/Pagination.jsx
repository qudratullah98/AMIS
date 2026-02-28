// import { Link } from "@inertiajs/react";
// import React from "react";
// import { useTranslation } from "react-i18next";

// const Pagination = ({ links }) => {
//     const { t } = useTranslation();

//     if (!links || links.length === 0) return null;

//     const currentLink = links.find(link => link.active && /^\d+$/.test(link.label));
//     const currentPage = currentLink ? Number(currentLink.label) : 1;

//     const lastPageLink = [...links].reverse().find(link => /^\d+$/.test(link.label));
//     const lastPage = lastPageLink ? Number(lastPageLink.label) : 1;

//     const prevLink = links.find(link => link.label.includes("Previous"));
//     const nextLink = links.find(link => link.label.includes("Next"));

//     // Set of pages to show
//     const pagesToShow = new Set();
//     pagesToShow.add(1);
//     pagesToShow.add(lastPage);

//     // Limit to 3 page buttons in the middle
//     let start = Math.max(2, currentPage - 1);
//     let end = Math.min(lastPage - 1, currentPage + 1);

//     if (end - start < 2) {
//         if (start === 2) {
//             end = Math.min(start + 2, lastPage - 1);
//         } else if (end === lastPage - 1) {
//             start = Math.max(end - 2, 2);
//         }
//     }

//     for (let i = start; i <= end; i++) {
//         pagesToShow.add(i);
//     }

//     const numberedLinks = links.filter(link => /^\d+$/.test(link.label));
//     const finalLinks = [];

//     let previousPage = 0;
//     numberedLinks.forEach((link) => {
//         const pageNumber = Number(link.label);
//         if (pagesToShow.has(pageNumber)) {
//             if (previousPage && pageNumber - previousPage > 1) {
//                 finalLinks.push({ label: "...", url: null });
//             }
//             finalLinks.push(link);
//             previousPage = pageNumber;
//         }
//     });

//     // Render function for each link
//     const renderLink = (link, index) => {
//         const isDisabled = !link.url;
//         const isActive = link.active;
//         const label =
//             link.label === "Next &raquo;" ? t("next") :
//             link.label === "&laquo; Previous" ? t("previous") :
//             link.label;

//         const baseClass = "px-3 py-2 mx-1 border rounded text-sm";
//         const activeClass = isActive
//             ? "bg-blue-500 text-white border-blue-500"
//             : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100 transition";
//         const disabledClass = "cursor-not-allowed opacity-50";

//         if (label === "...") {
//             return (
//                 <span key={index} className={`${baseClass} ${disabledClass}`}>...</span>
//             );
//         }

//         if (isDisabled) {
//             return (
//                 <span
//                     key={index}
//                     className={`${baseClass} ${disabledClass}`}
//                     dangerouslySetInnerHTML={{ __html: label }}
//                 />
//             );
//         }

//         return (
//             <Link
//                 preserveScroll
//                 key={index}
//                 href={link.url}
//                 className={`${baseClass} ${activeClass}`}
//                 dangerouslySetInnerHTML={{ __html: label }}
//             />
//         );
//     };

//     return (
//         <div className="flex justify-center mt-5 flex-wrap">
//             {prevLink && renderLink({ ...prevLink, label: "&laquo; Previous" }, "prev")}
//             {finalLinks.map((link, index) => renderLink(link, index))}
//             {nextLink && renderLink({ ...nextLink, label: "Next &raquo;" }, "next")}
//         </div>
//     );
// };

// export default Pagination;


// export default Pagination;
import { Link } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({ links }) => {
    const { t } = useTranslation();

    if (!links || links.length === 0) return null;

    const currentParams = new URLSearchParams(window.location.search);

    const buildUrl = (linkUrl) => {
        if (!linkUrl) return null;
        const newUrl = new URL(linkUrl, window.location.origin);
        // Add missing query params from current URL
        currentParams.forEach((value, key) => {
            if (!newUrl.searchParams.has(key)) {
                newUrl.searchParams.set(key, value);
            }
        });
        return newUrl.pathname + "?" + newUrl.searchParams.toString();
    };

    const currentLink = links.find(link => link.active && /^\d+$/.test(link.label));
    const currentPage = currentLink ? Number(currentLink.label) : 1;

    const lastPageLink = [...links].reverse().find(link => /^\d+$/.test(link.label));
    const lastPage = lastPageLink ? Number(lastPageLink.label) : 1;

    const prevLink = links.find(link => link.label.includes("Previous"));
    const nextLink = links.find(link => link.label.includes("Next"));

    const pagesToShow = new Set();
    pagesToShow.add(1);
    pagesToShow.add(lastPage);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(lastPage - 1, currentPage + 1);

    if (end - start < 2) {
        if (start === 2) {
            end = Math.min(start + 2, lastPage - 1);
        } else if (end === lastPage - 1) {
            start = Math.max(end - 2, 2);
        }
    }

    for (let i = start; i <= end; i++) {
        pagesToShow.add(i);
    }

    const numberedLinks = links.filter(link => /^\d+$/.test(link.label));
    const finalLinks = [];

    let previousPage = 0;
    numberedLinks.forEach((link) => {
        const pageNumber = Number(link.label);
        if (pagesToShow.has(pageNumber)) {
            if (previousPage && pageNumber - previousPage > 1) {
                finalLinks.push({ label: "...", url: null });
            }
            finalLinks.push(link);
            previousPage = pageNumber;
        }
    });

    return (
        <div className="flex justify-center mt-5 flex-wrap gap-2">
            {/* Previous */}
            {prevLink && (
                <Link
                    preserveScroll
                    href={buildUrl(prevLink.url) || "#"}
                    className={`px-4 py-2 border rounded ${
                        prevLink.url
                            ? "text-secondary-color-dark bg-secondary-color-light/60 hover:bg-secondary-color-light border border-tertirary-color-light transition-all duration-500"
                            : "text-gray-400 cursor-not-allowed"
                    }`}
                    style={{ pointerEvents: prevLink.url ? "auto" : "none" }}
                >
                    {t("previous")}
                </Link>
            )}

            {/* Numbers */}
            {finalLinks.map((link, index) =>
                link.url ? (
                    <Link
                        preserveScroll
                        key={index}
                        href={buildUrl(link.url)}
                        className={`px-4 py-2 border rounded ${
                            link.active
                                ? "bg-primary-color-dark/35 border border-primary-color-dark/5 text-white"
                                : "text-primary-color-dark hover:bg-tertiary-color-light/40 transition-all duration-500"
                        }`}
                    >
                        {link.label}
                    </Link>
                ) : (
                    <span key={index} className="px-4 py-2 text-gray-400">...</span>
                )
            )}

            {/* Next */}
            {nextLink && (
                <Link
                    preserveScroll
                    href={buildUrl(nextLink.url) || "#"}
                    className={`px-4 py-2 border rounded ${
                        nextLink.url
                            ? "text-secondary-color-dark bg-secondary-color-light/60 hover:bg-secondary-color-light border border-tertirary-color-light transition-all duration-500"
                            : "text-gray-400 cursor-not-allowed"
                    }`}
                    style={{ pointerEvents: nextLink.url ? "auto" : "none" }}
                >
                    {t("next")}
                </Link>
            )}
        </div>
    );
};

export default Pagination;


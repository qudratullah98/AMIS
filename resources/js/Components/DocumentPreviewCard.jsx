import BASE_URL from "@/BaseUrl";
import { File, X } from "lucide-react";
import React, { useState } from "react";

function DocumentPreviewCard({ fileUrl, title = "Preview", className = "" }) {
    const [hasError, setHasError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const extension = fileUrl?.split(".").pop().toLowerCase();
    const fullUrl = BASE_URL + fileUrl;

    const openModal = () => {
        if (!hasError) setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Small Preview */}
            <div
                onClick={openModal}
                className={`relative w-28 h-32 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300 bg-white flex items-center justify-center cursor-pointer ${className}`}
            >
                {!hasError && ["pdf", "doc", "docx"].includes(extension) ? (
                    <iframe
                        src={fullUrl}
                        title={title}
                        className={`
                                w-32 
                                h-32 
                                pointer-events-none 
                                rounded-xl 
                                shadow-lg 
                                border-2 
                                border-transparent 
                                transition-all 
                                duration-300 
                                ease-in-out
                                hover:shadow-2xl 
                              hover:border-purple-400 
                                hover:scale-105
                                `}
                        scrolling="no"
                        onError={() => setHasError(true)}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    />

                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-red-600">
                        <File size={40} />
                        <span className="text-xs mt-1 text-center px-1">Preview Unavailable</span>
                    </div>
                )}
            </div>

            {/* Fullscreen Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center" onClick={closeModal}>
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white bg-black bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full"
                    >
                        <X size={20} />
                    </button>

                    {!hasError ? (
                        <iframe
                            src={fullUrl}
                            title="Full Preview"
                            className="max-w-[90vw] max-h-[90vh] w-full h-full bg-white rounded-lg"
                            scrolling="no"
                        />
                    ) : (
                        <div className="text-white text-center">
                            <File size={60} className="m-auto" />
                            <p className="text-lg mt-2">Preview not available</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default DocumentPreviewCard;

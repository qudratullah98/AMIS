import React, { useEffect } from "react";
import PrimaryButton from "./PrimaryButton";

const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-lg",
    large: "max-w-3xl",
    xlarge: "max-w-4xl",
    xxlarge: "max-w-6xl",
};

const CustomModal = ({
    show,
    handleClose,
    title,
    children,
    footer,
    size = "medium",
    stopPropagation = true,
    buttonLabel = "Save Changes",
    onsubmit = null,
    buttonDisabled = false,
}) => {
    // ESC key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && show) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [show, handleClose]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center   bg-black/50 backdrop-blur-sm "
            onClick={() => stopPropagation && handleClose()}
        >
            <div
                className={`relative bg-white rounded-3xl shadow-2xl w-full
                ${sizeClasses[size]}
                max-h-[90vh] flex flex-col
                border border-gray-200
                animate-scaleIn`}
                onClick={(e) => e.stopPropagation()}
                dir="ltr"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <button
                        onClick={handleClose}
                        className="flex items-center justify-center
                   w-9 h-9 rounded-full
                   text-gray-500 hover:text-gray-700
                   hover:bg-gray-100
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        ✕
                    </button>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                </div>
                {/* Body */}{" "}
                <div
                    className="overflow-y-auto px-6 py-6 flex-1
                 scrollbar-thin scrollbar-thumb-gray-300
                 hover:scrollbar-thumb-gray-400"
                    dir="rtl"
                >
                    {children}
                </div>
                {/* Footer */}
                {/* ================= FOOTER ================= */}
                {footer !== false && (
                    <div
                        className="sticky bottom-0 flex justify-end items-center gap-3
                      px-6 py-4 border-t
                      bg-white/80 backdrop-blur"
                    >
                        {footer || (
                            <PrimaryButton
                                onClick={onsubmit}
                                disabled={buttonDisabled}
                                className="
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white font-semibold
              px-6 py-2.5 rounded-xl
              shadow-md hover:shadow-lg
              transition-all duration-300
              active:scale-95
            "
                            >
                                {buttonLabel}
                            </PrimaryButton>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomModal;

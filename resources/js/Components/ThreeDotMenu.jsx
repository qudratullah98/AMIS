import { EllipsisVertical } from "lucide-react";
import React, { useState, useEffect } from "react";

const ThreeDotMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOutsideClick = (e) => {
        if (isOpen && !e.target.closest(".dropdown-menu")) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className={`flex items-center justify-center w-7 ${isOpen ? "bg-gray-200" : ""} rounded-full hover:bg-gray-200 focus:outline-none`}
            >
                <EllipsisVertical />
            </button>

            {isOpen && (
                <div className="absolute z-50 left-0 mt-2">
                    {" "}
                    {/* Keep the absolute position and set a higher z-index */}
                    <div className="w-40 max-h-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden dropdown-menu">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThreeDotMenu;

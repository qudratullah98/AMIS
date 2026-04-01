// components/FullPageLoader.jsx
import React from "react";
import ApplicationLogo from "./ApplicationLogo";

export default function FullPageLoader({message}) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white bg-opacity-80">
            <div className="animate-pulse">
                <ApplicationLogo className="w-16 h-16" />
            </div>
            <p className="mt-4 text-gray-700 font-medium">{message}</p>
        </div>
    );
}

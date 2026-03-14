// components/SmallLoader.jsx
import React from "react";

export default function SmallLoader({ className = "w-4 h-4" }) {
    return (
        <span
            className={`border-2 border-t-2 border-gray-200 border-t-blue-600 rounded-full animate-spin inline-block ${className}`}
        />
    );
}
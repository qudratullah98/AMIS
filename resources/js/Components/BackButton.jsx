import React from "react"; 
import { ArrowLeft } from "lucide-react";

function BackButton() {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <button
            onClick={handleBack}
            type="button"
            aria-label="Go Back"
            className="flex right-0 items-center gap-2 px-4 py-2 m-2 text-sm font-medium transition-all duration-300 bg-secondary-color-light/70 
            dark:bg-primary-color-dark text-primary-color-dark dark:text-primary-color-light rounded-full shadow-md 
            hover:bg-primary-color-dark dark:hover:bg-primary-color-light hover:text-primary-color-light 
            dark:hover:text-primary-color-dark hover:shadow-lg"
 
        >
            <ArrowLeft></ArrowLeft>
            
        </button>
    );
}

export default BackButton;

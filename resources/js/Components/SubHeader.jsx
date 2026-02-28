import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import GoBackButton from "./GoBackButton";

function SubHeader({ title }) {
    return (
        <div className="flex items-center justify-between mx-3 my-4 p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-3">
                <Breadcrumbs
                    links={[
                        { name: "صفحه اصلی", href: "/setting" },
                        { name: title },
                    ]}
                />
            </div>

            {/* Right: Go Back Button */}
            <div>
                <GoBackButton />
            </div>
        </div>
    );
}

export default SubHeader;

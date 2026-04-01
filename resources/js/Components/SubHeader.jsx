import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import GoBackButton from "./GoBackButton";
import { useTranslation } from "react-i18next";

function SubHeader({ links = [] }) {
    const { t } = useTranslation();

    // ✅ Default link
    const defaultLink = {
        name: t("common.dashboard"),
        href: "/",
    };

    // ✅ Merge default with incoming links
    const finalLinks = [defaultLink, ...links];

    return (
        <div className="flex items-center justify-between mx-0 my-0 pb-2">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-3">
                <Breadcrumbs links={finalLinks} />
            </div>

            {/* Right: Go Back Button */}
            <div>
                <GoBackButton />
            </div>
        </div>
    );
}

export default SubHeader;

import React from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Ruler, Package, Layers, CheckCircle } from "lucide-react";
import { convertToShamsi } from "@/Components/utils/ConvertDate";

export default function ViewConstruction({ construction }) {
    const { t } = useTranslation();

    const Item = ({ label, value }) => (
        <div className="border-b border-gray-100 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {label}
            </p>
            <p className="mt-1 text-base font-semibold text-gray-900">
                {value || "-"}
            </p>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                    {construction?.construction?.name_ps}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {construction?.construction_type?.type_ps}
                </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                {/* <Item
                    label={t("construction.construction")}
                    value={construction?.construction?.name_ps}
                />

                <Item
                    label={t("construction.constructionType")}
                    value={construction?.construction_type?.type_ps}
                /> */}

                <Item
                    label={t("common.width")}
                    value={
                        construction?.width +
                        " " +
                        construction?.width_unit?.unit_ps
                    }
                />

                <Item
                    label={t("common.length")}
                    value={
                        construction?.length +
                        " " +
                        construction?.length_unit?.unit_ps
                    }
                />

                <Item
                    label={t("state.activityStatus")}
                    value={construction?.activity_status?.status_ps}
                />

                <Item
                    label={t("state.approvalStatus")}
                    value={construction?.approval_status?.name_ps}
                />

                <Item
                    label={t("common.longitude")}
                    value={construction?.longitude}
                />

                <Item
                    label={t("common.latitude")}
                    value={construction?.latitude}
                />
                <Item
                    label={t("common.storedDate")}
                    value={convertToShamsi(construction?.created_at)}
                />
                <div></div>

                <Item
                    label={t("common.weaknesses")}
                    value={construction?.weaknesses}
                />
                <Item
                    label={t("common.requirements")}
                    value={construction?.requirements}
                />
            </div>

            {/* Construction Properties */}
            {construction?.properties?.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {t("common.moreProperties")}
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                                        {t("common.propertyName")}
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                                        {t("common.propertyValue")}
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                                        {t("common.unit")}
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white">
                                {construction.properties.map((property) => (
                                    <tr key={property.id}>
                                        <td className="px-4 py-3">
                                            {property.property_name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {property.property_value}
                                        </td>

                                        <td className="px-4 py-3">
                                            {property.unit?.unit_ps ?? "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// Pages/Tashkilat/DepartmentPosition/Requirements.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useTabStore from "@/stores/tabStore";
import axios from "axios";
import {
    Plus,
    Trash2,
    CheckCircle,
    AlertCircle,
    BookOpen,
    GraduationCap,
    Award,
    Clock,
    Save,
    X,
} from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SubHeader from "@/Components/SubHeader";
import Breadcrumbs from "@/Components/Breadcrumbs";
import GoBackButton from "@/Components/GoBackButton";

function PositionRequirements({ position, requirements, available }) {
    const { t } = useTranslation();
    const { activeTab, changeTab } = useTabStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // State for adding new requirements
    const [newCertificate, setNewCertificate] = useState("");
    const [newCourse, setNewCourse] = useState({
        course_id: "",
        requirement_type: "mandatory",
        validity_months: "",
        description: "",
    });
    const [newEducation, setNewEducation] = useState("");

    // Local state for requirements
    const [certificates, setCertificates] = useState(
        requirements.certificates || [],
    );
    const [courses, setCourses] = useState(requirements.courses || []);
    const [educations, setEducations] = useState(requirements.educations || []);

    const handleAddCertificate = async () => {
        if (!newCertificate) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                route("positions.requirements.add-certificate", position.id),
                { certificate_id: newCertificate, is_required: true },
            );

            setCertificates([...certificates, response.data.requirement]);
            setNewCertificate("");
            setSuccess(t("common.informationtStoredSuccessfully"));

            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.response?.data?.message || t("common.error"));
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourse = async () => {
        if (!newCourse.course_id) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                route("positions.requirements.add-course", position.id),
                newCourse,
            );

            setCourses([...courses, response.data.requirement]);
            setNewCourse({
                course_id: "",
                requirement_type: "mandatory",
                validity_months: "",
                description: "",
            });
            setSuccess(t("common.informationtStoredSuccessfully"));

            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.response?.data?.message || t("common.error"));
        } finally {
            setLoading(false);
        }
    };

    const handleAddEducation = async () => {
        if (!newEducation) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                route("positions.requirements.add-education", position.id),
                { education_level_id: newEducation, is_required: true },
            );

            setEducations([...educations, response.data.requirement]);
            setNewEducation("");
            setSuccess(t("common.informationtStoredSuccessfully"));

            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.response?.data?.message || t("common.error"));
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (type, id) => {
        if (!confirm(t("common.confirmDelete"))) return;

        setLoading(true);

        try {
            const routes = {
                certificate: route(
                    "positions.requirements.remove-certificate",
                    id,
                ),
                course: route("positions.requirements.remove-course", id),
                education: route("positions.requirements.remove-education", id),
            };

            await axios.delete(routes[type]);

            if (type === "certificate") {
                setCertificates(certificates.filter((c) => c.id !== id));
            } else if (type === "course") {
                setCourses(courses.filter((c) => c.id !== id));
            } else if (type === "education") {
                setEducations(educations.filter((e) => e.id !== id));
            }

            setSuccess(t("common.deletedSuccessfully"));
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.response?.data?.message || t("common.error"));
        } finally {
            setLoading(false);
        }
    };

    const getRequirementBadge = (type) => {
        const badges = {
            mandatory: {
                color: "bg-red-100 text-red-800",
                label: t("tashkilat.courseIsMandatory"),
            },
            preferred: {
                color: "bg-yellow-100 text-yellow-800",
                label: t("tashkilat.courseIsPrefered"),
            },
            optional: {
                color: "bg-gray-100 text-gray-800",
                label: t("tashkilat.courseIsOptional"),
            },
        };
        return badges[type] || badges.mandatory;
    };

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case "certificates":
                return (
                    <>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                            <select
                                value={newCertificate}
                                onChange={(e) =>
                                    setNewCertificate(e.target.value)
                                }
                                className="flex-1 px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">
                                    {t(
                                        "tashkilat.selectCertificate",
                                    )}
                                </option>

                                {available.certificates.map((cert) => (
                                    <option key={cert.id} value={cert.id}>
                                        {cert.name}{" "}
                                        {cert.level ? `(${cert.level})` : ""}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddCertificate}
                                disabled={!newCertificate || loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                {t("common.add")}
                            </button>
                        </div>

                        <div className="space-y-2">
                            {certificates.map((req) => (
                                <div
                                    key={req.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Award className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="font-medium">
                                                {req.certificate?.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {req.is_required
                                                    ?  "✅" + t("tashkilat.Required")
                                                    : "❌" + t("tashkilat.notRequired")}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleRemove("certificate", req.id)
                                        }
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            {certificates.length === 0 && (
                                <div className="text-center py-6 text-gray-500">
                                    {t("common.noInfoFound")}
                                </div>
                            )}
                        </div>
                    </>
                );

            case "courses":
                return (
                    <>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <select
                                    value={newCourse.course_id}
                                    onChange={(e) =>
                                        setNewCourse({
                                            ...newCourse,
                                            course_id: e.target.value,
                                        })
                                    }
                                    className="px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">
                                        {t("tashkilat.selectCourse")}
                                    </option>
                                    {available.courses.map((course) => (
                                        <option
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.code} - {course.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={newCourse.requirement_type}
                                    onChange={(e) =>
                                        setNewCourse({
                                            ...newCourse,
                                            requirement_type: e.target.value,
                                        })
                                    }
                                    className="px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="mandatory">
                                        {t("tashkilat.courseIsMandatory")}
                                    </option>
                                    <option value="preferred">
                                        {t("tashkilat.courseIsPrefered")}
                                    </option>
                                    <option value="optional">
                                        {t("tashkilat.courseIsOptional")}
                                    </option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="number"
                                    placeholder={t(
                                        "tashkilat.validityMonths",
                                    )}
                                    value={newCourse.validity_months}
                                    onChange={(e) =>
                                        setNewCourse({
                                            ...newCourse,
                                            validity_months: e.target.value,
                                        })
                                    }
                                    className="px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder={t(
                                        "common.description",
                                    )}
                                    value={newCourse.description}
                                    onChange={(e) =>
                                        setNewCourse({
                                            ...newCourse,
                                            description: e.target.value,
                                        })
                                    }
                                    className="px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={handleAddCourse}
                                disabled={!newCourse.course_id || loading}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                {t("common.add")}
                            </button>
                        </div>

                        <div className="space-y-2">
                            {courses.map((req) => {
                                const badge = getRequirementBadge(
                                    req.requirement_type,
                                );
                                return (
                                    <div
                                        key={req.id}
                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="h-5 w-5 text-green-500" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium">
                                                        {req.course?.name}
                                                    </p>
                                                    <span
                                                        className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}
                                                    >
                                                        {badge.label}
                                                    </span>
                                                </div>
                                                {req.validity_months && (
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {t(
                                                            "tashkilat.validityMonths",
                                                        )}
                                                        : {req.validity_months}{" "}
                                                        {t("tashkilat.monthOrMonths")}
                                                    </p>
                                                )}
                                                {req.description && (
                                                    <p className="text-sm text-gray-500">
                                                        {t("common.descriptions")}: {req.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleRemove("course", req.id)
                                            }
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                );
                            })}
                            {courses.length === 0 && (
                                <div className="text-center py-6 text-gray-500">
                                    {t("common.noInfoFound")}
                                </div>
                            )}
                        </div>
                    </>
                );

            case "educations":
                return (
                    <>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                            <select
                                value={newEducation}
                                onChange={(e) =>
                                    setNewEducation(e.target.value)
                                }
                                className="flex-1 px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">
                                    {t("tashkilat.selectEducationLevel")}
                                </option>
                                {available.educationLevels.map((level) => (
                                    <option key={level.id} value={level.id}>
                                        {level.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddEducation}
                                disabled={!newEducation || loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                {t("common.add")}
                            </button>
                        </div>

                        <div className="space-y-2">
                            {educations.map((req) => (
                                <div
                                    key={req.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="h-5 w-5 text-purple-500" />
                                        <div>
                                            <p className="font-medium">
                                                {req.education_level?.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {req.is_required
                                                    ? "✅" + t("tashkilat.Required")
                                                    : "❌" + t("tashkilat.notRequired")}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleRemove("education", req.id)
                                        }
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            {educations.length === 0 && (
                                <div className="text-center py-6 text-gray-500">
                                    {t("common.noInfoFound")}
                                </div>
                            )}
                        </div>
                    </>
                );

            default:
                return (
                    <div className="text-center py-6 text-gray-500">
                        No tab selected
                    </div>
                );
        }
    };

    return (
        <AuthenticatedLayout
            header={<SubHeader title={t("tashkilat.departmentPositions")} />}
        >
            <div className="flex items-center justify-between mx-0  ">
                <Breadcrumbs
                    links={[
                        { name: t("common.dashboard"), href: "/" },
                        {
                            name: t("tashkilat.departmentPositions"),
                            href: route("department-positions.index"),
                        },
                        { name: t("tashkilat.addRequirements") },
                    ]}
                />
                <GoBackButton />
            </div>

            <div className="bg-white rounded-lg  my-2 px-4 py-2 border border-gray-100 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {t("tashkilat.pleaseAddPositionRequirements")}
                    </h2>
                    <div className="text-sm text-gray-500">
                        {t("tashkilat.totalRequirments")}:{" "}
                        {certificates.length +
                            courses.length +
                            educations.length}
                    </div>
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                        <AlertCircle className="h-5 w-5" />
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        {success}
                    </div>
                )}

                {/* Content */}
                <div className="space-y-4">{renderContent()}</div>
            </div>
        </AuthenticatedLayout>
    );
}

export default PositionRequirements;

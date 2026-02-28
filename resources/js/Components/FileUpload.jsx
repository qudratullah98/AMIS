import React, { useRef, useState, useEffect } from "react";
import BASE_URL from "@/BaseUrl";
import DocumentPreviewCard from "./DocumentPreviewCard";
import { useTranslation } from "react-i18next";

function FileUpload({
    label,
    name,
    onFileSelect,
    defaultImage = null,
    accept = "image/*,.pdf",
    size = "350kb",
}) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [hasDefault, setHasDefault] = useState(!!defaultImage);
    const [error, setError] = useState("");
    const fileref = useRef();
    const {t}=useTranslation()

    useEffect(() => {
        if (defaultImage && !file) {
            setPreview(BASE_URL + defaultImage);
            setHasDefault(true);
        }
    }, [file]);

    const parseSize = (sizeStr) => {
        const size = parseFloat(sizeStr);
        if (sizeStr.toLowerCase().includes("mb")) return size * 1024 * 1024;
        if (sizeStr.toLowerCase().includes("kb")) return size * 1024;
        return size; // assume bytes
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const allowedTypes = accept.split(",").map((type) => type.trim());
        const maxSizeInBytes = parseSize(size);

        // Validate file type
        const isAccepted = allowedTypes.some((type) => {
            if (type.startsWith(".")) {
                return selectedFile.name.toLowerCase().endsWith(type);
            } else {
                return selectedFile.type.startsWith(type);
            }
        });

        if (!isAccepted) {
            setError(t("unvaliedFileType"));
            fileref.current.value = null;
            return;
        }

        // Validate file size
        if (selectedFile.size > maxSizeInBytes) {
            setError(t("maxFileSize300"));
            fileref.current.value = null;
            return;
        }

        setFile(selectedFile);
        setHasDefault(false);
        setError("");
        onFileSelect(selectedFile);

        if (
            selectedFile.type.startsWith("image/") ||
            selectedFile.type.startsWith("video/")
        ) {
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setPreview(null);
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreview(null);
        setHasDefault(false);
        setError("");
        onFileSelect(null);
        if (fileref.current) {
            fileref.current.value = null;
        }
    };

    const getFileExtension = (nameOrUrl = "") => {
        return nameOrUrl?.split(".")?.pop()?.toLowerCase();
    };

    const fileName = file?.name || defaultImage?.split("/").pop();
    const ext = getFileExtension(file?.name || defaultImage);

    return (
        <div className="w-full">
            {!file && !hasDefault && (
                <>
                    <input
                        type="file"
                        id={name}
                        accept={accept}
                        className="mt-1 block w-full text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
                        onChange={handleFileChange}
                        ref={fileref}
                    />
                    {error && (
                        <p className="text-sm text-red-600 mt-1">{error}</p>
                    )}
                </>
            )}

            {(file || hasDefault) && (
                <div className="mt-3 p-3 border rounded-md relative">
                    {(file?.type?.startsWith("image/") ||
                        ["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) &&
                        preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-full h-32 rounded-md object-cover"
                            />
                        )}

                    {file?.type?.startsWith("video/") && preview && (
                        <video
                            src={preview}
                            controls
                            className="max-w-full h-32 rounded-md object-cover"
                        ></video>
                    )}

                    {ext === "pdf" &&
                        (hasDefault ? (
                            <DocumentPreviewCard
                                fileUrl={defaultImage}
                                title={fileName}
                            />
                        ) : (
                            <p className="text-sm text-gray-600">
                                PDF File: {fileName}
                            </p>
                        ))}

                    {(ext === "doc" || ext === "docx") && (
                        <p className="text-sm text-gray-600">
                            Document File: {fileName}
                        </p>
                    )}

                    <button
                        onClick={removeFile}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    );
}

export default FileUpload;

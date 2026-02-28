import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { useTranslation } from "react-i18next";

function AsyncSelect({ onSelect, apiEndpoint, placeholder, formatOption }) {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stopSearching, setStopSearching] = useState(false);
    const { t } = useTranslation();

    const fetchOptions = useCallback(
        async (query) => {
            if (query.length < 2) {
                setOptions([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(apiEndpoint, {
                    params: { query },
                });
                setOptions(response.data);
            } catch (error) {
                // console.error("Error fetching data:", error.response.data.message);
                toast.error(
                    t(error.response?.data?.message) || "Failed to fetch options"
                );
                setOptions([]);
            }
            setLoading(false);
        },
        [apiEndpoint]
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue && !stopSearching) {
                fetchOptions(inputValue);
            }
            if (inputValue.length > 2) {
                setStopSearching(false);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [inputValue, fetchOptions]);

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            {loading && (
                <LoaderIcon
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                />
            )}
            {options.length > 0 && (
                <ul

                    style={{
                        position: "absolute",
                        width: "100%",
                        background: "white",
                        border: "1px solid #ccc",
                        borderTop: "none",
                        borderRadius: "4px",
                        listStyle: "none",
                        padding: "0",
                        margin: "0",
                        maxHeight: "200px",
                        overflowY: "auto",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        zIndex: 10,
                    }}
                >
                    {options?.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                onSelect(item);
                                setOptions([]);
                                setInputValue(formatOption(item));
                                setStopSearching(true);
                            }}
                            style={{
                                padding: "10px 12px",
                                cursor: "pointer",
                                fontSize: "14px",
                                borderBottom: "1px solid #f1f1f1",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#f1f1f1")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "white")
                            }
                        >
                            {formatOption(item)}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

export default AsyncSelect;

// components/ConfirmModal.jsx
import { Loader } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";


const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, loading = false }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-right" dir="rtl">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                    >
                        {t('cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading && <Loader />} {t('yesAccept')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;

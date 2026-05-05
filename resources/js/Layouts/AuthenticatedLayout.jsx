// import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, usePage } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { useTranslation } from "react-i18next";

export default function AuthenticatedLayout({ header, children }) {
    return (
        // SIDEBAR
        <div className="flex min-h-screen bg-gradient-to-r from-zinc-50 to-slate-50 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Head>
                    <title>{header?.title || "Dashboard"}</title>
                </Head>

                <Toaster
                    position="bottom-left"
                    reverseOrder={true}
                    gutter={10}
                    toastOptions={{
                        duration: 4000,
                        removeDelay: 500,
                        style: {
                            background: "rgba(30, 30, 30, 0.7)",
                            backdropFilter: "blur(12px)",
                            color: "#fff",
                            borderRadius: "12px",
                            padding: "14px 18px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            fontSize: "14px",
                        },
                    }}
                />

                {/* Header */}
                <Header />

                {/* Main content */}
                <div className="flex-1 overflow-y-auto p-2">{children}</div>
            </div>
        </div>
    );
}

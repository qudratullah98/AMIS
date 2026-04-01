import React, { useState, useEffect } from "react";
import DashboardCard from "@/Components/DashboardCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Truck, Users, Briefcase, Building2, Map, DollarSign, Terminal, Car, Ship, User, Accessibility } from "lucide-react";

function Index() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const cardData = [
        { title: "لیست کارمندان", href:route('user.index'), icon: <User className="w-8 h-8 text-blue-500" />, stats: [{ value: 200, label: "Total" }, { value: 50, label: "Active" }, { value: 10, label: "Inactive" }] },
        { title: "صلاحیت ها", href: route('role.index'), icon: <Accessibility className="w-8 h-8 text-green-500" />, stats: [{ value: 5, label: "Total" }, { value: 2, label: "Pending" }, { value: 3, label: "Filled" }] },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">تنظیمات</h2>}
        >
            <main className="flex-grow w-full py-6 mx-auto  sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {cardData.map((card, index) => (
                            <DashboardCard key={index} href={card.href} title={card.title} stats={card.stats} icon={card.icon} isLoading={loading} />
                        ))}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default Index;

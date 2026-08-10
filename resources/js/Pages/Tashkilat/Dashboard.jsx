
import React from 'react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    Building2,
    BriefcaseBusiness,
    UserCheck,
    UserRoundX,
    Users,
    CalendarDays,
    Network,
} from 'lucide-react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DepartmentTree from '@/Components/DepartmentTree';

export default function Dashboard({
    stats, 
    recentEmployees,
}) {
    const { t } = useTranslation();

    const statCards = [
        {
            title: t('tashkilat.departments'),
            value: stats.departments,
            icon: Building2,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: t('dashboard.positions'),
            value: stats.positions,
            icon: BriefcaseBusiness,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            title: t('dashboard.filled'),
            value: stats.filled,
            icon: UserCheck,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            title: t('dashboard.vacancies'),
            value: stats.vacancies,
            icon: UserRoundX,
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title={t('dashboard.title')} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-blue-600 p-3 shadow-sm">
                                <Network className="h-6 w-6 text-white" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {t('dashboard.title')}
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    {t('dashboard.description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <div
                                    key={card.title}
                                    className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                {card.title}
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                                {card.value}
                                            </p>
                                        </div>

                                        <div
                                            className={`rounded-xl p-3 ${card.iconBg} transition-transform duration-200 group-hover:scale-110`}
                                        >
                                            <Icon
                                                className={`h-6 w-6 ${card.iconColor}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Department Structure */}
                    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-indigo-100 p-2">
                                    <Building2 className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {t('dashboard.departmentStructure')}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {t('dashboard.departmentStructureDescription')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            <div className="min-h-[500px] rounded-xl border border-gray-100 bg-gray-50">
                                <DepartmentTree
                                    departments={stats.departmentsTree}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Recent Employees */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <Users className="h-5 w-5 text-green-600" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {t('dashboard.recentEmployees')}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {t('dashboard.recentEmployeesDescription')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                             
                                <div className="divide-y divide-gray-100">
                                    {recentEmployees?.map((employee) => (
                                        <div
                                            key={employee.id}
                                            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                                        >
                                            <div className="flex min-w-0 items-center gap-4">
                                                {/* Avatar */}
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                                                    {employee.first_name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-gray-900">
                                                        {employee.first_name}
                                                        -
                                                        {employee.last_name} 
                                                    </p>

                                                    <p className="mt-1 truncate text-sm text-gray-500">
                                                        {employee?.assignments?.vacancy?.vacancy_no || t('dashboard.noPosition')}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-2 text-sm text-gray-400">
                                                <CalendarDays className="h-4 w-4" />

                                                <span>
                                                    {new Date(
                                                        employee.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 

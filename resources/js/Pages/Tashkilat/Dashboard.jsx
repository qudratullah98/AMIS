import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DepartmentTree from '@/Components/DepartmentTree';

export default function Dashboard({ stats, employeesByDepartment, recentEmployees }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="text-sm text-gray-500">Departments</div>
                            <div className="text-2xl font-bold">{stats.departments}</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="text-sm text-gray-500">Positions</div>
                            <div className="text-2xl font-bold">{stats.positions}</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="text-sm text-gray-500">Filled</div>
                            <div className="text-2xl font-bold text-green-600">{stats.filled}</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="text-sm text-gray-500">Vacancies</div>
                            <div className="text-2xl font-bold text-red-600">{stats.vacancies}</div>
                        </div>
                    </div>

                    {/* Department Tree */}
                    <div className="bg-white rounded-lg shadow mb-8">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Department Structure</h2>
                            <p className="text-sm text-gray-500">Parent departments at the top, child departments below</p>
                        </div>
                        <div className="p-4">
                            <DepartmentTree departments={stats.departmentsTree} />
                        </div>
                    </div>

                    {/* Recent Employees */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Recent Employees</h2>
                        </div>
                        <div className="p-6">
                            {recentEmployees.length > 0 ? (
                                <div className="space-y-3">
                                    {recentEmployees.map((employee) => (
                                        <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                            <div>
                                                <p className="font-medium">{employee.name}</p>
                                                <p className="text-sm text-gray-500">{employee.position}</p>
                                            </div>
                                            <span className="text-sm text-gray-400">
                                                {new Date(employee.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No recent employees</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SubHeader from '@/Components/SubHeader';
import { useTranslation } from 'react-i18next';

export default function VehicleHistory({ vehicle}) {
    const{ t} =useTranslation()
  return (
    <AuthenticatedLayout
      header={<h1>{t ? t('vehicleHistory') : 'Vehicle History'}</h1>}
    >
      <Head title={t ? t('vehicleHistory') : 'Vehicle History'} />

      <SubHeader title={t ? t('vehicleHistory') : 'Vehicle History'} />

      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">
            {t ? t('vehicle') : 'Vehicle'} - {vehicle.plate_no}
          </h2>

          {vehicle.histories.length === 0 ? (
            <p className="text-gray-600">{t ? t('noHistoryFound') : 'No history found.'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t ? t('date') : 'Date'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t ? t('action') : 'Action'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t ? t('changedBy') : 'Changed By'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t ? t('oldValue') : 'Old Value'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t ? t('newValue') : 'New Value'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicle.histories.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(history.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {history.action_type.replace(/_/g, ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {history.user?.name ?? 'System'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600 whitespace-pre-wrap max-w-xs truncate">
                        {history.old_value
                          ? JSON.stringify(history.old_value, null, 2)
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-800 whitespace-pre-wrap max-w-xs truncate">
                        {history.new_value
                          ? JSON.stringify(history.new_value, null, 2)
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

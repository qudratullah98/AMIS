import { useForm } from '@inertiajs/react';
import { Loader2Icon, LogOutIcon } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LogoutComponent() {
  const { post, processing } = useForm({});
  const { t } = useTranslation();

  const handleLogout = () => {
    post('/logout', {}, {
      onSuccess: () => console.log('Logged out successfully'),
      onError: (errors) => console.error('Logout failed', errors),
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={processing}
      className={`
        w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        transition-all duration-200 ease-out
        ${processing
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-inner'
          : 'bg-white hover:bg-gray-50 text-gray-800 shadow-sm hover:shadow-md'}
      `}
    >
      {processing ? (
        <>
          <Loader2Icon className="animate-spin w-4 h-4 text-gray-500" />
          <span className="truncate">{t('loggingOut')}</span>
        </>
      ) : (
        <>
          <LogOutIcon className="w-4 h-4 text-gray-700" />
          <span className="truncate">{t('logout')}</span>
        </>
      )}
    </button>
  );
}

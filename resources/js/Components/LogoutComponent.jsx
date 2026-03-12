import { useForm } from '@inertiajs/react';
import { Loader2Icon, LogOutIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LogoutComponent() {
  const { post, processing } = useForm({});
  const { t } = useTranslation();

  const handleLogout = () => {
    post(route('logout'));
  };

  return (
  
      <button
        type="submit"
        disabled={processing}
       onClick={() => post(route('logout'))}
  
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        ${processing
          ? 'bg-gray-200 text-gray-500'
          : 'bg-white hover:bg-gray-50 text-gray-800'}`}
      >
        {processing ? (
          <>
            <Loader2Icon className="animate-spin w-4 h-4" />
            {t('loggingOut')}
          </>
        ) : (
          <>
            <LogOutIcon className="w-4 h-4" />
            {t('logout')}
          </>
        )}
      </button> 
  );
}
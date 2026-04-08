import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import SubHeader from "@/Components/SubHeader";
import { useTranslation } from "react-i18next";

export default function Edit({ mustVerifyEmail, status }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />
            {/* <SubHeader title={t("profile")} /> */}
            <SubHeader links={[{ name: t("common.profile") }]} />

                <div className="mx-auto ">
                    <div className="bg-white p-4 border border-gray-100 sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 border border-gray-100 sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
        </AuthenticatedLayout>
    );
}

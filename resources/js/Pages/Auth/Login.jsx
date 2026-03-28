import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { EarthIcon, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Login({ status, canResetPassword }) {
    const { t, i18n } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const toggleLanguage = () => {
        const currentLanguage = i18n.language;
        const newLanguage = currentLanguage === "dr" ? "pa" : "dr";
        i18n.changeLanguage(newLanguage);
    };
    const [showPassword, setShowPassword] = useState(false);
    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Language switcher at top right */}
            <div
                className="flex justify-end mb-2"
                dir={i18n.language === "en" ? "rtl" : "ltr"}
            >
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-700 bg-sky-200 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-800 dark:hover:bg-indigo-700 rounded-full transition-all duration-200"
                >
                    <EarthIcon size={16} />
                    <span>
                        {i18n.language === "dr" ? t("pashto") : t("dari")}
                    </span>
                </button>
            </div>

            <div className="text-center mb-6">
                {/* <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('loginToYourAcount')}</p>  */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {t("amis")}
                </h2>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-2">
                <div>
                    <InputLabel htmlFor="email" value={t("login.email")} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-sm border-gray-100 focus:border-indigo-100 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder={t("login.enterEmail")}
                    />

                    <InputError message={t(errors.email)} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value={t("login.password")}
                    />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-sm border-gray-100 focus:border-indigo-100 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 pr-10"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder={t("login.enterPassword")}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <InputError message={t(errors.password)} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            {t("login.rememberMe")}
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            {t("login.forgotPassword")}
                        </Link>
                    )}
                </div>
                <div className="pt-4">
                    <PrimaryButton
                        className="w-full py-2 text-black rounded-sm bg-blue-500 hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
                        disabled={processing}
                    >
                        {processing && (
                            <Loader className="animate-spin" size={16} />
                        )}
                        {processing ? t("common.loading") : t("login.enter")}
                    </PrimaryButton>
                </div>

                {/* Optional signup link */}
                {/* <div className="text-center pt-6 text-sm text-gray-600 dark:text-gray-400">
                    {t('noAccount')}{" "}
                    <Link href="/register" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                        {t('signUp')}
                    </Link>
                </div> */}
            </form>
        </GuestLayout>
    );
}

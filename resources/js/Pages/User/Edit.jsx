 
import CreateHeader from "@/Components/CreateHeader";
import CustomSelect from "@/Components/CustomSelect";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader"; 
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react"; 
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function EditUser({ roles ,user,user_roles}) {
    const { t } = useTranslation();
    const { data, setData, post, reset, errors, processing } = useForm({
        id: user.id,
        name: user.name,
        email: user.email,
        password:"",
        password_confirmation: "",
        photo: user.photo, 
        role_id: roles.find(role=> role.name === user_roles[0])?.id || null, 
    });
 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.update"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Company created successfully");
                reset();
            },
            onError: (error) => {
                toast.error(
                    "Something went wrong! Please check your input fild ."
                );
            },
        });
    }; 
 
 

    return (
        <AuthenticatedLayout header={<SubHeader title="کارمند جدید" />}>
                 <SubHeader title={t("changeUserInfo")} />

            <main className="flex-grow w-full max-w-3xl py-8 mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {/* Company Name */}
                        <div>
                            <InputLabel htmlFor="name">{t('name')}</InputLabel>
                            <TextInput
                                id="name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={` ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                value={data.name}
                            />
                            <InputError message={errors.name}></InputError>
                        </div>

                        {/* email */}
                        <div>
                            <InputLabel htmlFor="email">{t('email')}</InputLabel>
                            <TextInput
                                id="email"
                                value={data.email}
                                type="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={` ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                            />
                            <InputError message={errors.email}></InputError>
                        </div>

                        {/* Passwrod */}
                        <div>
                            <InputLabel htmlFor="password">{t('password')}</InputLabel>
                            <TextInput
                                id="password"
                                value={data.password}
                                type="password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className={` ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                
                            />
                            <InputError message={errors.password}></InputError>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <InputLabel htmlFor="password">
                                {t('confirmPassword')}
                            </InputLabel>
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                type="password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className={` ${
                                    errors.password_confirmation
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                            />
                            <InputError
                                message={errors.password_confirmation}
                            ></InputError>
                        </div>

                        {/* photo */}
                        <div>
                            <InputLabel htmlFor="license_start_date">
                                {t('image')}
                            </InputLabel>
                            <FileUpload
                                id="photo"
                                onChange={(e) =>
                                    setData("photo", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.license_start_date}
                            ></InputError>
                        </div>

                        {/* صلاحیت */}
                        <div>
                            <InputLabel htmlFor="license_end_date">
                                {t('role')}
                            </InputLabel>
                            <CustomSelect
                                id="role_id"
                                options={roles.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    };
                                })}
                                onChange={(e) => {
                                    setData("role_id", e);
                                }}
                                value={data.role_id}
                            ></CustomSelect>
                             <InputError
                                message={errors.role_id}
                            ></InputError>
                        </div>

                  

                       
                        {/* Buttons */}
                        <div className="flex space-x-4 col-span-2">
                            <PrimaryButton
                                disabled={processing}
                            >
                                Store
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default EditUser;

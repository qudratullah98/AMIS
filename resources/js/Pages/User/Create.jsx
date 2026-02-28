import BackButton from "@/Components/BackButton";
import CreateHeader from "@/Components/CreateHeader";
import CustomSelect from "@/Components/CustomSelect";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function CreateUser({ roles }) {
    const { t } = useTranslation();
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        photo: "",
        user_type: "",
        role_id: "",
        province_id: "",
        terminal_id: "",
    });

    const user_types = [
        { lable: "Admin", value: "Admin" },
        { lable: "Transport user", value: "Transport_user" },
        { lable: "Bander User", value: "Bander_user" },
        { lable: "Report User", value: "Report_user" },
        { lable: "Genral User", value: "genral_user" },
        { lable: "Company user", value: "Company_user" },
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.store"), {
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
    const [loader, setLoader] = useState(false);
    const [provinces, setprovinces] = useState([]);
    const [terminals, setterminals] = useState([]);
    const [banders, setbanders] = useState([]);
    const [companies, setcompanies] = useState([]);
    const handTypeSelector = async (type) => {
        setData("user_type", type);
        setLoader(true);

        if (type === "genral_user" || type === "Report_user" || type === "Admin") {
            try {
                const response = await axios.get(route("provinces"));
                setprovinces(response.data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        }
        if (type === "Transport_user" || type === "Admin") {
            try {
                const response = await axios.get(
                    route("setting.all_terminals")
                );
                setterminals(response.data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        }
        if (type === "Bander_user" || type === "Admin") {
            try {
                const response = await axios.get(
                    route("setting.allbanders")
                );
                setbanders(response.data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        }
        if (type === "Company_user" || type === "Admin") {
            try {
                const response = await axios.get(
                    route("setting.getAllCompny")
                );
                setcompanies(response.data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        }

        setLoader(false);
    };

    return (
        <AuthenticatedLayout header={<SubHeader title="کارمند جدید" />}>
            <main className="flex-grow w-full max-w-3xl py-8 mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
                    <CreateHeader title={t('addNewUser')}></CreateHeader>
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

                        {/* user _type */}
                        <div>
                            <InputLabel htmlFor="user_type">
                                {t('userType')}
                            </InputLabel>
                            <CustomSelect
                                id="user_type"
                                options={user_types.map((item) => {
                                    return {
                                        value: item.value,
                                        label: item.lable,
                                    };
                                })}
                                onChange={(e) => {
                                    handTypeSelector(e);
                                }}
                                value={data.user_type}
                            ></CustomSelect>
                        </div>

                        {/* dynamic input */}
                        {(data.user_type === "genral_user" || data.user_type === "Report_user" || data.user_type==="Admin") && (
                            <div>
                                {loader ? (
                                    <Loader className="m-6"></Loader>
                                ) : (
                                    <>
                                        <InputLabel htmlFor="province">
                                            province
                                        </InputLabel>
                                        <CustomSelect
                                            id="province"
                                            options={provinces.map((item) => {
                                                return {
                                                    value: item.id,
                                                    label: item.province,
                                                };
                                            })}
                                            onChange={(e) => {
                                                setData("province_id", e);
                                            }}
                                            value={data.province_id}
                                        ></CustomSelect>
                                        <InputError
                                            message={errors.province_id}
                                        ></InputError>
                                    </>
                                )}
                            </div>
                        )}

                        {/* terminals  */}
                        {(data.user_type === "Transport_user" || data.user_type==="Admin") && (
                            <div>
                                {loader ? (
                                    <Loader className="m-6"></Loader>
                                ) : (
                                    <>
                                        <InputLabel htmlFor="terminal">
                                            terminal
                                        </InputLabel>
                                        <CustomSelect
                                            id="terminal"
                                            options={terminals.map((item) => {
                                                return {
                                                    value: item.id,
                                                    label: item.terminal_name,
                                                };
                                            })}
                                            onChange={(e) => {
                                                setData("terminal_id", e);
                                            }}
                                            value={data.terminal_id}
                                        ></CustomSelect>
                                        <InputError
                                            message={errors.terminal_id}
                                        ></InputError>
                                    </>
                                )}
                            </div>
                        )}

                         {/* banders  */}
                         {(data.user_type === "Bander_user" || data.user_type==="Admin") && (
                            <div>
                                {loader ? (
                                    <Loader className="m-6"></Loader>
                                ) : (
                                    <>
                                        <InputLabel htmlFor="bander">
                                            bander
                                        </InputLabel>
                                        <CustomSelect
                                            id="bander"
                                            options={banders.map((item) => {
                                                return {
                                                    value: item.id,
                                                    label: item.bandar_name,
                                                };
                                            })}
                                            onChange={(e) => {
                                                setData("bander_id", e);
                                            }}
                                            value={data.bander_id}
                                        ></CustomSelect>
                                        <InputError
                                            message={errors.bander_id}
                                        ></InputError>
                                    </>
                                )}
                            </div>
                        )}

                          {/* Company  */}
                          {(data.user_type === "Company_user" || data.user_type==="Admin") && (
                            <div>
                                {loader ? (
                                    <Loader className="m-6"></Loader>
                                ) : (
                                    <>
                                        <InputLabel htmlFor="company">
                                            company
                                        </InputLabel>
                                        <CustomSelect
                                            id="company"
                                            options={companies.map((item) => {
                                                return {
                                                    value: item.id,
                                                    label: item.company_name,
                                                };
                                            })}
                                            onChange={(e) => {
                                                setData("company_id", e);
                                            }}
                                            value={data.company_id}
                                        ></CustomSelect>
                                        <InputError
                                            message={errors.company_id}
                                        ></InputError>
                                    </>
                                )}
                            </div>
                        )}
                        {/* Buttons */}
                        <div className="flex space-x-4 col-span-2">
                            <PrimaryButton
                                className="mx-4"
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

export default CreateUser;

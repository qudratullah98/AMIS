import CustomSelect from "@/Components/CustomSelect";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SubHeader from "@/Components/SubHeader";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function CreateCompany({ province,company}) {
    const { t } = useTranslation();
    const company_id = company.id;
    const { data, setData, post, reset, errors ,processing} = useForm({
        branch_name: "",
        company_id: company.id,
        location:'',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("setting.company.branch.store", { company_id }),
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('storedSuccessfully'));
                reset();
            },
            onError: (error) => {
                toast.error("An error occurred while creating branch!");
                console.error(error);
            },
        });
    };

    return (
        <AuthenticatedLayout header={<SubHeader title={` ثبت وسایط برای نمایندګی ${company.company_name} `} />}>
            <SubHeader title={`${t('addBranchToCompany')}  ${company.company_name}`} />

            <main className="flex-grow w-full max-w-3xl py-8 mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {/* Company Name */}
                        {/* <div className="col-span-2">
                            <InputLabel htmlFor="branch_name">
                                نام نمایندګی
                            </InputLabel>
                            <TextInput
                                id="branch_name"
                                onChange={(e) =>
                                    setData("branch_name", e.target.value)
                                }
                                className={` ${
                                    errors.branch_name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                                value={data.branch_name}
                            />
                            <InputError
                                message={errors.branch_name}
                            ></InputError>
                        </div> */}


                        {/*  Province ID */}
                        <div className="col-span-2">
                            <InputLabel htmlFor="location">
                               {t('province')}
                            </InputLabel>
                            <CustomSelect
                            id="location"
                                options={province.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.province,
                                    };
                                })}
                                onChange={(e) => {
                                    setData("location", e)
                                }}
                                value={data.location}
                                placeholder={t('province')}

                            ></CustomSelect>
                            <InputError
                                message={errors.location}
                            ></InputError>
                        </div>








                        {/* branch Color */}
                        <div className="col-span-2">
                            <InputLabel htmlFor="description">
                                {t('descriptions')}
                            </InputLabel>
                            <TextArea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className={` ${
                                    errors.description
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } transition duration-200 ease-in-out`}
                            />
                            <InputError
                                message={errors.description}
                            ></InputError>
                        </div>


                        {/* Buttons */}
                        <div className="flex space-x-4 col-span-2">
                            <PrimaryButton className="mx-4" disabled={processing}>
                                {t('save')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default CreateCompany;

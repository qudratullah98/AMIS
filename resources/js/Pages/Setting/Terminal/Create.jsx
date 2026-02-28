import CreateHeader from "@/Components/CreateHeader";
import CustomSelect from "@/Components/CustomSelect";
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

function CreateTerminal({ provinces }) {
    const{ t} =useTranslation()
    const { data, setData, post, reset, errors, processing } = useForm({
        location: "",
        descriptions: "",
        terminal_name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("setting.terminal.store"), {
            onSuccess: () => {
                toast.success(t('storedSuccessfully')); 
                reset();
            },
            onError: (error) => {
                toast.error("Something went wrong! Please try again.");
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2 title=" ترمینل جدید" />}>
            <SubHeader title={t('newTerminal')} />

            <main className="flex-grow w-full max-w-4xl py-6 mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow-md">

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Vehicle Name */}
                        <div>
                            <InputLabel>{t('terminalName')}</InputLabel>
                            <TextInput
                                onChange={(e) =>
                                    setData("terminal_name", e.target.value)
                                }
                            ></TextInput>

                            {errors.terminal_name && (
                                <p className="text-red-500 text-sm">
                                    {errors.terminal_name}
                                </p>
                            )}
                        </div>

                        {/* Capacity */}
                        <div>
                            <InputLabel>{t('province')}</InputLabel>
                            <CustomSelect
                                options={provinces?.map((data) => ({
                                    label: data.province,
                                    value: data.id,
                                }))}
                                onChange = {(data) =>{setData("location", data)}}
                                value={data.location}
                            />{" "}
                            {errors.location && (
                                <p className="text-red-500 text-sm">
                                    {errors.location}
                                </p>
                            )}
                        </div>
                        <div>
                            <InputLabel>{t('descriptions')}</InputLabel>
                            <TextArea
                                 onChange={(e)=>{setData("descriptions",e.target.value)}}
                            />{" "}
                            {errors.descriptions && (
                                <p className="text-red-500 text-sm">
                                    {errors.descriptions}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-2">
                            <PrimaryButton disabled={processing}>
                                {t('save')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default CreateTerminal;

import FileUpload from "@/Components/FileUpload";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function EditOwner({ editable, handleEdit }) {
    const { t } = useTranslation();

    const { data, setData, post, errors } = useForm({
        id: editable.id,
        name: editable.name,
        father_name: editable.father_name,
        contact_no: editable.contact_no,
        is_approved: editable.is_approved,
        national_id: editable.national_id,
        file: null,
        photo: null,
    });

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all fields manually
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("father_name", data.father_name);
    formData.append("contact_no", data.contact_no);
    formData.append("national_id", data.national_id);
    formData.append("is_approved", data.is_approved ? 1 : 0);

    // Append files only if selected
    if (data.file instanceof File) {
        formData.append("file", data.file);
    }

    if (data.photo instanceof File) {
        formData.append("photo", data.photo);
    }

    axios
        .post(route("setting.owner.update"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            toast.success(t('updatedSuccessfully'));
            handleEdit(response); // pass response to parent
        })
        .catch((error) => {
            console.error("Update failed:", error);
            toast.error("Something went wrong");
        });
};


    return (
        <div className="p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t("editOwner")}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name">{t("name")}</InputLabel>
                    <TextInput
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`${
                            errors.name ? "border-red-500" : "border-gray-300"
                        } transition duration-200 ease-in-out`}
                        disabled={editable.is_approved}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Father Name */}
                <div>
                    <InputLabel htmlFor="father_name">{t("fatherName")}</InputLabel>
                    <TextInput
                        type="text"
                        name="father_name"
                        value={data.father_name}
                        onChange={(e) => setData("father_name", e.target.value)}
                        className={`${
                            errors.father_name ? "border-red-500" : "border-gray-300"
                        } transition duration-200 ease-in-out`}
                        disabled={editable.is_approved}
                    />
                    {errors.father_name && <p className="text-red-500 text-sm mt-1">{errors.father_name}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <InputLabel htmlFor="contact_no">{t("phoneNO")}</InputLabel>
                    <TextInput
                        type="text"
                        name="contact_no"
                        value={data.contact_no}
                        onChange={(e) => setData("contact_no", e.target.value)}
                        className={`${
                            errors.contact_no ? "border-red-500" : "border-gray-300"
                        } transition duration-200 ease-in-out`}
                        disabled={editable.is_approved}
                    />
                    {errors.contact_no && <p className="text-red-500 text-sm mt-1">{errors.contact_no}</p>}
                </div>

                {/* National ID */}
                <div>
                    <InputLabel htmlFor="national_id">{t("nationalID")}</InputLabel>
                    <TextInput
                        type="text"
                        name="national_id"
                        value={data.national_id}
                        onChange={(e) => setData("national_id", e.target.value)}
                        className={`${
                            errors.national_id ? "border-red-500" : "border-gray-300"
                        } transition duration-200 ease-in-out`}
                        disabled={editable.is_approved}
                    />
                    {errors.national_id && <p className="text-red-500 text-sm mt-1">{errors.national_id}</p>}
                </div>

                {/* File Upload */}
                <div>
                    <InputLabel htmlFor="file">{t("documents")}</InputLabel>
                    <FileUpload
                        id="file"
                        label="Upload File"
                        onFileSelect={(file) => setData("file", file)}
                        defaultImage={editable?.file}
                        accept=".pdf,.doc,.docx"
                    />
                    {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                </div>

                {/* Photo Upload */}
                <div>
                    <InputLabel htmlFor="photo">{t("image")}</InputLabel>
                    <FileUpload
                        id="photo"
                        label="Upload Image"
                        onFileSelect={(file) => setData("photo", file)}
                        defaultImage={editable?.photo}
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                    />
                    {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4 col-span-2">
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    >
                        {t("editOwner")}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditOwner;

import { useForm } from "@inertiajs/react";
import PermissionsForm from "./PermissionsForm";
import RoleForm from "./RoleForm";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SubHeader from "@/Components/SubHeader";
import PrimaryButton from "@/Components/PrimaryButton";
import toast from "react-hot-toast";
import CreateHeader from "@/Components/CreateHeader";
import { useTranslation } from "react-i18next";

  

function EditRole({ permission,rolePermissions,role }) {
    const {t} = useTranslation();
    const [selectedPermissions, setSelectedPermissions] = useState([...rolePermissions]);
    const { data, setData, post, reset, errors, processing } = useForm({
        roleId: role.id,
        name: role.name, 
        permissions: selectedPermissions,
    });

const  handleSelect=(data) => {
        // Check if the permission is already selected
        if (!selectedPermissions.includes(data)) {
            // Update the permissions in the form data
            setData("permissions", [...selectedPermissions, data]);
            // Update the selected permissions state
            setSelectedPermissions([...selectedPermissions, data]);
        } else {
            // If already selected, remove it from the list
            const updatedPermissions = selectedPermissions.filter((perm) => perm !== data);
            setData("permissions", updatedPermissions);
            setSelectedPermissions(updatedPermissions);
        }
    }
      
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("role.update"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Role created successfully");
                reset();
            },
            onError: (error) => {
                toast.error("Something went wrong! Please check your input fields.");
            },
        });
    };
   

    return (
        <AuthenticatedLayout header={<SubHeader title="صلاحیت جدید" />}>
           <main className="flex-grow w-full max-w-3xl py-8 mx-auto sm:px-6 lg:px-8">
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <CreateHeader title={t('editRole')}/>

        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
            {/* Role Form */}
            <div className="col-span-1">
                <RoleForm data={data} setData={setData} errors={errors} />
            </div>

            {/* Permissions Form */}
            <div className="col-span-1">
                <PermissionsForm
                    permissions={permission}
                    selectedPermissions={selectedPermissions}
                    setSelectedPermissions={(data)=>{handleSelect(data)}}
                    errors={errors}
                />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 col-span-2 mt-6">
                <PrimaryButton
                    className="mx-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                    disabled={processing}
                >
                    Store
                </PrimaryButton>
                <button
                    type="button"
                    className="mx-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition duration-200"
                    onClick={() => reset()}
                >
                    Reset
                </button>
            </div>
        </form>
    </div>
</main>
        </AuthenticatedLayout>
    );
}

export default EditRole;
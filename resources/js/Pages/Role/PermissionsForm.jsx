// PermissionsForm.js
import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

function PermissionsForm({ permissions, selectedPermissions, setSelectedPermissions, errors }) {
    const [searchTerm, setSearchTerm] = useState("");
    
    // Grouping permissions by type (or any other criteria)
    const groupedPermissions = permissions?.reduce((acc, permission) => {
        const group = permission.type || "Others"; // Assuming permission has a 'type' property
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(permission);
        return acc;
    }, {});

   

    return (
        <div className="mt-4">
            <InputLabel>مجوزها</InputLabel>
            <input
                type="text"
                placeholder="جستجوی مجوزها..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
            />
            <div className="mt-2 max-h-60 overflow-y-auto">
                {Object.entries(groupedPermissions).map(([group, perms]) => (
                    <div key={group} className="mb-4">
                        <h3 className="font-semibold text-lg mt-4">{group}</h3>
                        <div className="flex flex-col space-y-2 mt-2">
                            {perms
                                .filter((permission) =>
                                    permission.name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((permission) => (
                                    <label
                                        key={permission.id}
                                        className="flex items-center p-2 border rounded-lg hover:bg-gray-100 transition duration-200 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPermissions.includes(permission.id)}
                                            onChange={() => setSelectedPermissions(permission.id)}
                                            className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                                        />
                                        <span className="ml-2 text-gray-700 mr-4">{permission.name}</span>
                                    </label>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <InputError message={errors.permissions} />
        </div>
    );
}

export default PermissionsForm;
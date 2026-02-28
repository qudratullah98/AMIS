// RoleForm.js
import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

function RoleForm({ data, setData, errors }) {
    return (
        <div className="mt-4">
            <InputLabel htmlFor="role">نقش</InputLabel>
            <TextInput
                id="role"
                onChange={(e) => setData("name", e.target.value)}
                className={`${
                    errors.name ? "border-red-500" : "border-gray-300"
                } transition duration-200 ease-in-out m-2`}
                value={data.name}
            />
            <InputError message={errors.name} />
        </div>
    );
}

export default RoleForm;
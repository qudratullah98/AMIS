import React from "react";
import Select from "react-select";

const CustomSelect = ({ id, options, onChange, value, multiple = false, placeholder ,disabled=false,filterOption }) => {
    const handleChange = (selectedOptions) => {
        if (multiple) {
            onChange(selectedOptions.map(option => option.value));
        } else {
            onChange(selectedOptions ? selectedOptions.value : "");
        }
    };

    return (
        <Select
            inputId={id}
            options={options}
            isMulti={multiple}
            value={
                multiple
                    ? options?.filter(option => value?.includes(option.value))
                    : options?.find(option =>
                        option.value?.id ? option.value.id === value : option.value === value
                    ) || null
            }
            onChange={handleChange}
            placeholder={placeholder}
            className="flex-1 w-full text-lg text-gray-900 bg-gray-50 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            classNamePrefix="custom-select"
            menuPortalTarget={typeof window !== 'undefined' ? document.body : null} // Fix for SSR too
            styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                menu: base => ({ ...base, zIndex: 9999 }),
            }}
            isDisabled={disabled}
            filterOption={filterOption}
        />
    );
};

export default CustomSelect;

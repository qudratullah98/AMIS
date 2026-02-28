import React from 'react';
import DatePicker from 'react-multi-date-picker';
import transition from "react-element-popper/animations/transition";

import persian from 'react-date-object/calendars/persian';
import localDate from './utils/LocalDate';

import arabic from "react-date-object/calendars/arabic";
import arabic_en from "react-date-object/locales/arabic_en";

import convertTimestamp from './utils/ConvertDate';

const CustomDatePicker = ({
    value,
    handelChange,
    error,
    placeholder,
    disabled,
    calendarPosition,
    type = "persian",
}) => {

    const calendar = type === "qamari" ? arabic : persian;
    const locale = type === "qamari" ? arabic_en : localDate;

    return (
        <div className="w-full flex flex-col">
            <DatePicker
                onChange={date => handelChange(convertTimestamp(date))}
                calendar={calendar}
                locale={locale}
                calendarPosition={calendarPosition}
                animations={[
                    transition({
                        from: 35,
                        transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                    }),
                ]}
                className={`rounded-md shadow-sm w-full border transition duration-300 ease-in-out focus:outline-none ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                containerClassName="w-full"
                inputClass="w-full h-[44px] px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white placeholder-gray-400"
                placeholder={placeholder}
                value={value}
                disabled={disabled}
            />
            {error && <small className="text-red-500 mt-1">{error}</small>}
        </div>
    );
};

export default CustomDatePicker;

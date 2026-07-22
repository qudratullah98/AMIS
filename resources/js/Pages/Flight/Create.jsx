import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import CustomSelect from "@/Components/CustomSelect";
import SmallLoader from "@/Components/SmallLoader";
import FullPageLoader from "@/Components/FullPageLoader";
import useValidation from "@/lib/validation/useValidation";
import { required } from "@/lib/validation/rules";
import CustomDatePicker from "@/Components/CustomDatePicker";
import convertTimestamp from "@/Components/utils/ConvertDate";
import InputLabel from "@/Components/InputLabel";

export default function CreateFlight({ onSubmitSuccess }) {

    const { t } = useTranslation();

    const {
        data,
        setData,
        processing,
        errors,
        reset,
        setError,
        clearErrors
    } = useForm({
        airport_id: "",
        airline_id: "",
        aircraft_type_id: "",
        aircraft_registration: "",
        flight_number: "",
        work_order: "",
        charge_note: "",
        arrival_date: "",
        approximate_time_arrival: "",
        departure_date: "",
        approximate_time_departure: "",
    });


    const { validateAll } = useValidation(
        data,
        setError,
        clearErrors
    );


    const [airlines, setAirlines] = useState([]);
    const [airports, setAirports] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);



    const rules = {
        airport_id: [
            required(t("flight.airport_required"))
        ],
        airline_id: [
            required(t("flight.airline_required"))
        ],
    };



    useEffect(() => {

        const load = async () => {

            try {

                setLoading(true);

                const [
                    airlinesResponse,
                    airportsResponse,
                    aircraftTypesResponse
                ] = await Promise.all([
                    axios.get(route("airlines.json")),
                    axios.get(route("airports.json")),
                    axios.get(route("aircraft_types.json")),
                ]);


                setAirlines(airlinesResponse.data);
                setAirports(airportsResponse.data);
                setAircraftTypes(aircraftTypesResponse.data);


            } finally {

                setLoading(false);

            }

        };


        load();

    }, []);




    const handleChange = (field, value) => {

        setData(field, value);

        if (errors[field]) {
            clearErrors(field);
        }

    };




    const handleSubmit = async (e) => {

        e.preventDefault();


        const isValid = validateAll(rules);


        if (!isValid)
            return;



        setSubmitting(true);


        try {


            const res = await axios.post(
                route("flight.store"),
                data
            );


            onSubmitSuccess?.(
                res.data.flight
            );


            reset();



        } catch (error) {


            if (error.response?.status === 422) {

                setError(
                    error.response.data.errors
                );

            }


        } finally {


            setSubmitting(false);


        }


    };



    if (loading)
        return (
            <FullPageLoader
                message={t("common.loading")}
            />
        );



    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            {submitting && (
                <FullPageLoader
                    show={submitting}
                    message={t("common.saving")}
                />
            )}



            <div className="
            grid grid-cols-1 
            md:grid-cols-2 
            gap-6 
            bg-white 
            p-6 
            rounded-xl 
            shadow-sm
        ">


                <div>

                    <InputLabel>
                        {t("flight.airport")} 🛩️
                    </InputLabel>


                    <CustomSelect

                        value={data.airport_id}

                        options={
                            airports.map(a => ({
                                value: a.id,
                                label: a.name_en
                            }))
                        }

                        onChange={(value) =>
                            handleChange(
                                "airport_id",
                                value
                            )
                        }

                    />


                    <InputError
                        message={errors.airport_id}
                    />

                </div>





                <div>

                    <InputLabel>
                        {t("flight.airline")} 🛩️
                    </InputLabel>


                    <CustomSelect

                        value={data.airline_id}

                        options={
                            airlines.map(a => ({
                                value: a.id,
                                label: a.name_en
                            }))
                        }


                        onChange={(value) =>
                            handleChange(
                                "airline_id",
                                value
                            )
                        }

                    />


                    <InputError
                        message={errors.airline_id}
                    />


                </div>





                <div>

                    <InputLabel>
                        {t("flight.aircraft_type")} 🛩️
                    </InputLabel>


                    <CustomSelect

                        value={data.aircraft_type_id}


                        options={
                            aircraftTypes.map(a => ({
                                value: a.id,
                                label: a.name
                            }))
                        }


                        onChange={(value) =>
                            handleChange(
                                "aircraft_type_id",
                                value
                            )
                        }

                    />


                    <InputError
                        message={errors.aircraft_type_id}
                    />


                </div>            {/* AIRCRAFT REGISTRATION */}
                <div>

                    <InputLabel>
                        {t("flight.aircraft_registration")} 🛩️
                    </InputLabel>


                    <TextInput

                        value={data.aircraft_registration}

                        onChange={(e) =>
                            handleChange(
                                "aircraft_registration",
                                e.target.value
                            )
                        }

                    />


                    <InputError
                        message={errors.aircraft_registration}
                    />

                </div>





                {/* FLIGHT NUMBER */}
                <div>

                    <InputLabel>
                        {t("flight.flight_number")} 🛩️
                    </InputLabel>


                    <TextInput

                        value={data.flight_number}

                        onChange={(e) =>
                            handleChange(
                                "flight_number",
                                e.target.value
                            )
                        }

                    />


                    <InputError
                        message={errors.flight_number}
                    />

                </div>





                {/* WORK ORDER */}
                <div>

                    <InputLabel>
                        {t("flight.work_order")} 🛩️
                    </InputLabel>


                    <TextInput

                        value={data.work_order}

                        onChange={(e) =>
                            handleChange(
                                "work_order",
                                e.target.value
                            )
                        }

                    />


                    <InputError
                        message={errors.work_order}
                    />

                </div>





                {/* CHARGE NOTE */}
                <div>

                    <InputLabel>
                        {t("flight.charge_note")} 🛩️
                    </InputLabel>


                    <TextInput

                        value={data.charge_note}

                        onChange={(e) =>
                            handleChange(
                                "charge_note",
                                e.target.value
                            )
                        }

                    />


                    <InputError
                        message={errors.charge_note}
                    />

                </div>





                {/* ARRIVAL DATE */}
                <div>

                    <InputLabel>
                        {t("flight.arrival_date")} 🛩️
                    </InputLabel>


                    <CustomDatePicker

                        handelChange={(e) =>
                            handleChange(
                                "arrival_date",
                                convertTimestamp(e)
                            )
                        }


                        error={
                            errors.arrival_date
                        }


                        placeholder={
                            t("flight.arrival_date")
                        }

                    />

                </div>





                {/* DEPARTURE DATE */}
                <div>

                    <InputLabel>
                        {t("flight.departure_date")} 🛩️
                    </InputLabel>


                    <CustomDatePicker

                        handelChange={(e) =>
                            handleChange(
                                "departure_date",
                                convertTimestamp(e)
                            )
                        }


                        error={
                            errors.departure_date
                        }


                        placeholder={
                            t("flight.departure_date")
                        }

                    />

                </div>





                {/* ARRIVAL TIME */}
                <div>

                    <InputLabel>
                        {t("flight.approximate_time_arrival")} 🛩️
                    </InputLabel>


                    <input

                        type="time"

                        value={
                            data.approximate_time_arrival
                        }


                        onChange={(e) =>
                            handleChange(
                                "approximate_time_arrival",
                                e.target.value
                            )
                        }


                        className="
                    block w-full px-3 py-2 
                    border rounded-md 
                    shadow-sm 
                    focus:outline-none 
                    focus:ring-blue-500 
                    focus:border-blue-500 
                    sm:text-sm
                    "

                    />


                    <InputError
                        message={
                            errors.approximate_time_arrival
                        }
                    />

                </div>


            </div>





            {/* DEPARTURE TIME */}

            <div>


                <InputLabel>

                    {t("flight.approximate_time_departure")} 🛩️

                </InputLabel>



                <input

                    type="time"


                    value={
                        data.approximate_time_departure
                    }


                    onChange={(e) =>

                        handleChange(
                            "approximate_time_departure",
                            e.target.value
                        )

                    }



                    className="
                block w-full px-3 py-2 
                border rounded-md 
                shadow-sm 
                focus:outline-none 
                focus:ring-blue-500 
                focus:border-blue-500 
                sm:text-sm
                "

                />



                <InputError

                    message={
                        errors.approximate_time_departure
                    }

                />


            </div>





            {/* BUTTON */}

            <div className="flex justify-end">


                <button

                    type="submit"

                    disabled={
                        processing || submitting
                    }


                    className="
                px-5 py-2 
                bg-blue-600 
                text-white 
                rounded-lg 
                hover:bg-blue-700 
                disabled:opacity-50 
                flex items-center gap-2
                "

                >

                    {t("flight.save_service")}


                    {
                        submitting &&
                        <SmallLoader />
                    }


                </button>


            </div>


        </form>
    );
}
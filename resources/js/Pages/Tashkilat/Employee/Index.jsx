import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataTable from "@/Components/Datatable";
import SubHeader from "@/Components/SubHeader";
import CustomModal from "@/Components/CustomModal";
import { useTranslation } from "react-i18next";
import CreateEmployee from "./Create";


function Index({ employees }) {

    const { t } = useTranslation();


    const [data, setData] = useState(
        employees?.data || []
    );


    const [createModal, setCreateModal] = useState(false);



    const columns = [

        {
            label: t("common.NO")
        },

        {
            label: t("tashkilat.employeeNo")
        },

        {
            label: t("tashkilat.name")
        },


        {
            label: t("tashkilat.phone")
        },


        {
            label: t("common.status")
        },


    ];


    return (

        <AuthenticatedLayout

            header={
                <SubHeader
                    title={t("tashkilat.employees")}
                />
            }

        >


            <SubHeader
                links={[
                    {
                        name: t("tashkilat.employees")
                    }
                ]}
            />



            <CustomModal

                show={createModal}

                handleClose={() => setCreateModal(false)}

                title={t("tashkilat.createEmployee")}

                footer={false}

                size="xlarge"

            >

                <CreateEmployee

                    onSubmitSuccess={(employee) => {

                        setCreateModal(false);

                        setData(prev => [
                            employee,
                            ...prev
                        ]);

                    }}

                />


            </CustomModal>





            <DataTable

                columns={columns}

                links={employees.links}

                header={t("tashkilat.employees")}

                enableButton

                buttonLabel={t("tashkilat.createEmployee")}

                onButtonClick={() =>
                    setCreateModal(true)
                }

            >


                {
                    data.map((employee, index) => (

                        <tr key={employee.id}>


                            <td className="p-2 text-center">
                                {index + 1}
                            </td>


                            <td className="p-2 text-center">
                                {employee.employee_no}
                            </td>


                            <td className="p-2 text-center">
                                {employee.first_name}
                                {" "}
                                {employee.last_name}
                            </td>


                            <td className="p-2 text-center">
                                {employee.phone ?? "-"}
                            </td>


                            <td className="p-2 text-center">
                                {employee.status}
                            </td>


                        </tr>

                    ))
                }


            </DataTable>



        </AuthenticatedLayout>


    )


}


export default Index;
import SubHeader from "@/Components/SubHeader";
import TabComponent from "@/Components/TabComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; 
import ChangeVehicleCompany from "./vehicleDetails/ChangeVehicleCompany"; 
import VehicleOwner from "./vehicleDetails/VehicleOwner";
import { useTranslation } from "react-i18next";
import VehicleDetails from "./vehicleDetails/VehicleDetails";

function Edit({ vehicle, vehile_types, plate_grades, plate_provinces }) {
    const { t } = useTranslation();
    const tabs = [t("vehicleDetails.vehicleDetails"), t('vehileCompany'), t('vehicleOwner')];
    if(vehicle.is_approved === 1) {
        tabs.splice(2, 2); // Remove the 'vehileCompany' tab if vehicle is not assigned
    }
    const tabContents = [
        <VehicleDetails
            vehicle={vehicle}
            vehile_types={vehile_types}
            plate_grades={plate_grades}
            plate_provinces={plate_provinces}
        />,
        <ChangeVehicleCompany vehicle={vehicle} />, 
        <VehicleOwner vehicle={vehicle} />,
    ];

    return (
        <AuthenticatedLayout
            header={<h2 title={`Edit Vehicle ${vehicle.id}`} />}
        >
            <SubHeader title={` ${t('vehicleDetails.vehicleDetails')}  ${vehicle.plate_no} `} />

            <TabComponent tabs={tabs} tabContents={tabContents} defaultSelect={0}/>
        </AuthenticatedLayout>
    );
}

export default Edit;

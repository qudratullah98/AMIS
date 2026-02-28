import SubHeader from "@/Components/SubHeader";
import TabComponent from "@/Components/TabComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import VehicleDetails from "../../companyVehicle/vehicleDetails/VehicleDetails";
import VehicleDriver from "../../companyVehicle/vehicleDetails/VehicleDriver";
import VehicleOwner from "../../companyVehicle/vehicleDetails/VehicleOwner";
import ChangeVehicleCompany from "../../companyVehicle/vehicleDetails/ChangeVehicleCompany";

function Edit({ vehicle, vehile_types, plate_grades, plate_provinces }) {
    const tabs = ["Vehicle Details", "Change Vehicle Company", "Vehicle Driver", "Vehicle Owner"];
    const tabContents = [
        <VehicleDetails
            vehicle={vehicle}
            vehile_types={vehile_types}
            plate_grades={plate_grades}
            plate_provinces={plate_provinces}
        />,
        <ChangeVehicleCompany vehicle={vehicle} />,
        <VehicleDriver vehicle={vehicle} />,
        <VehicleOwner vehicle={vehicle} />,
    ];

    return (
        <AuthenticatedLayout
            header={<SubHeader title={`Edit Vehicle ${vehicle.id}`} />}
        >
            <TabComponent tabs={tabs} tabContents={tabContents} defaultSelect={2}/>
        </AuthenticatedLayout>
    );
}

export default Edit;

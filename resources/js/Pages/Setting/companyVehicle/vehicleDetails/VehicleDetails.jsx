import { useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const VehicleDetails = ({
    vehicle,
    vehile_types,
    plate_grades,
    plate_provinces,
    onSave,
}) => {
    const { data, setData, post, reset, errors, processing, onSuccess } =
        useForm({
            vehicle_id: vehicle.id || "",
            company_id: vehicle?.company_id || "",
            vehicle_type: vehicle.vehicle_type || "",
            plate_no: vehicle.plate_no || "",
            plate_grade_id: vehicle.plate_grade_id || "",
            plate_province_id: vehicle.plate_province_id || "",
            engine_no: vehicle.engine_no || "",
            shaci_no: vehicle.shaci_no || "",
            vehicle_type_id: vehicle.vehicle_type_id || "",
            modal: vehicle.modal || "",
            vehicle_color: vehicle.vehicle_color || "",
            image:  "",
            file:  "",
        });
        const { t } = useTranslation();

    // Handle form submission
    const handleSave = (e) => {
      e.preventDefault();
  
      post(route("setting.company.vehicle.update"), {
          preserveScroll: true,
          onSuccess: (response) => {
              toast.success("Vehicle updated successfully");
          },
          onError: (errors) => {
              console.error("Error response:", errors);
              toast.error("Error updating vehicle.");
          },
      });
  };
  

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg space-y-6 rtl border border-gray-200">
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
                <InputLabel className="font-semibold text-gray-700">شرکت</InputLabel>
                <TextInput
                    value={vehicle?.company?.company_name}
                    disabled
                    className="border border-gray-300 p-3 rounded-md w-full bg-gray-100"
                />
                <InputError message={t(errors?.company_name)} />
    
                <InputLabel className="font-semibold text-gray-700">نوع وسیله نقلیه</InputLabel>
                <CustomSelect
                    value={data.vehicle_type_id}
                    onChange={(value) => setData("vehicle_type_id", value)}
                    options={vehile_types.map((item) => ({
                        label: item.name,
                        value: item.id,
                    }))}
                    className="mt-2 border border-gray-300 rounded-md w-full"
                    disabled={vehicle.is_approved} // Disable if vehicle is approved
                />
                <InputError message={errors.vehicle_type_id} />
    
                <InputLabel className="font-semibold text-gray-700">درجه پلیټ</InputLabel>
                <CustomSelect
                    value={data.plate_grade_id}
                    onChange={(value) => setData("plate_grade_id", value)}
                    options={plate_grades?.map((item) => ({
                        label: item.plate_grade,
                        value: item.id,
                    }))}
                    className="mt-2 border border-gray-300  rounded-md w-full"
                    disabled={vehicle.is_approved} // Disable if vehicle is approved

                />
                <InputError message={t(errors.plate_grade_id)} />
    
                <InputLabel className="font-semibold text-gray-700">شماره پلیټ</InputLabel>
                <TextInput
                    value={data.plate_no}
                    onChange={(e) => setData("plate_no", e.target.value)}
                    placeholder="Enter plate number"
                    className="border border-gray-300 p-3 rounded-md w-full mt-2"
                    disabled={vehicle.is_approved} // Disable if vehicle is approved

                />
                <InputError message={t(errors.plate_no)} />
    
                <InputLabel className="font-semibold text-gray-700">رنگ وسیله نقلیه</InputLabel>
                <TextInput
                    value={data.vehicle_color}
                    onChange={(e) => setData("vehicle_color", e.target.value)}
                    placeholder="Enter vehicle color"
                    className="border border-gray-300 p-3 rounded-md w-full mt-2"
                    disabled={vehicle.is_approved} // Disable if vehicle is approved

                />
                <InputError message={t(errors.vehicle_color)} />
            </div>
    
            {/* Column 2 */}
            <div className="space-y-4">
                <InputLabel className="font-semibold text-gray-700">ولایت پلیټ</InputLabel>
                <CustomSelect
                    value={data.plate_province_id}
                    onChange={(value) => setData("plate_province_id", value)}
                    options={plate_provinces.map((item) => ({
                        label: item.province,
                        value: item.id,
                    }))}
                    className="mt-2 border border-gray-300  rounded-md w-full"
                    disabled={vehicle.is_approved} // Disable if vehicle is approved

                />
                <InputError message={t(errors.plate_province_id)} />
    
                <InputLabel className="font-semibold text-gray-700">شماره انجن</InputLabel>
                <TextInput
                    value={data.engine_no}
                    onChange={(e) => setData("engine_no", e.target.value)}
                    placeholder="Enter engine number"
                    className="border border-gray-300 p-3 rounded-md w-full mt-2"
                    disabled={vehicle.is_approved} // Disable if vehicle is approved

                />
                <InputError message={t(errors.engine_no)} />
    
                <InputLabel className="font-semibold text-gray-700">شماره شاسی</InputLabel>
                <TextInput
                    value={data.shaci_no}
                    onChange={(e) => setData("shaci_no", e.target.value)}
                    placeholder="Enter shaci number"
                    className="border border-gray-300 p-3 rounded-md w-full mt-2"
                    disabled={vehicle.is_approved} // Disable if vehicle is approved

                />
                <InputError message={t(errors.shaci_no)} />
    
                <InputLabel className="font-semibold text-gray-700">مدل</InputLabel>
                <TextInput
                    value={data.modal}
                    onChange={(e) => setData("modal", e.target.value)}
                    placeholder="Enter model information"
                    className="border border-gray-300 p-3 rounded-md w-full mt-2"
                    disabled={vehicle.is_approved} // Disable if vehicle is approved

                />
                <InputError message={errors.modal} />
    
                <InputLabel className="font-semibold text-gray-700">تصویر</InputLabel>
                <FileUpload
                    label="تصویر"
                    name="image"
                    onFileSelect={(file) => setData("image", file)}
                    defaultImage={vehicle.image ? vehicle.image : null}
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                />
                <InputError message={errors.image} />
    
                <InputLabel className="font-semibold text-gray-700">فایل</InputLabel>
                <FileUpload
                    label="فایل"
                    name="file"
                    onFileSelect={(file) => setData("file", file)}
                    defaultImage={vehicle.file ? vehicle.file : null}
                />
                <InputError message={errors.file} />
            </div>
    
            {/* Save Button */}
            <div className="col-span-2 flex justify-start">
                <PrimaryButton disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all">ذخیره</PrimaryButton>
            </div>
        </form>
    </div>
    
    );
};

export default VehicleDetails;

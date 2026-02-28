import React, { useState } from "react";
import { Filter as FilterIcon } from "lucide-react";
import CustomModal from "./CustomModal";
import { useTranslation } from "react-i18next";
import SearchByPlate from "@/Pages/Searchs/SearchByPlate";

export default function Filter() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      {/* Minimal clean button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium
          rounded-lg bg-gray-100 hover:bg-gray-200
          text-gray-800 hover:text-gray-900
          shadow-sm hover:shadow-md
          active:scale-95 transition-all duration-200 ease-out"
      >
        <FilterIcon size={16} strokeWidth={2.5} className="text-gray-700" />
        <span className="truncate">{t("SearchYourDesiredVehicle")}</span>
      </button>

      {/* Modal */}
      {showModal && (
        <CustomModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          size="large"
          stopPropagation={false}
          footer={false}
        >
          <SearchByPlate />
        </CustomModal>
      )}
    </div>
  );
}

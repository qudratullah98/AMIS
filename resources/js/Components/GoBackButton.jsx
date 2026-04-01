import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GoBackButton({
  label,
  className = "",
}) {
  const { t } = useTranslation();

  const goBack = () => {
    window.history.back();
  };

  return (
    <Button
      variant="ghost"
      onClick={goBack}
      className={`
        px-2.5
        rounded-md
        flex items-center gap-1.5
        text-xs font-medium
        text-gray-600
        bg-gray-100
        hover:text-gray-700
        hover:bg-gray-200
        active:scale-95
        transition-all duration-200
        ${className}
      `}
    >
      <ArrowLeft className="h-3 w-3" />
      <span className="hidden sm:inline">
        {label || t("common.goBack")}
      </span>
    </Button>
  );
}

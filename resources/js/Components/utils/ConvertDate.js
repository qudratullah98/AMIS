import { DateObject } from "react-multi-date-picker";

// ---- Shamsi (Persian) imports ----
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_en";

// ---- Qamari (Hijri) imports ----
import arabic from "react-date-object/calendars/arabic";
import arabic_en from "react-date-object/locales/arabic_en";

export default function convertTimestamp(timestampMs) {
  const date = new Date(timestampMs);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

// --- Convert Gregorian → Shamsi ---
export function convertToShamsi(gregorianDate) {
  return new DateObject(gregorianDate)
    .convert(persian, persian_fa)
    .format("YYYY-MM-DD");
}

// --- Convert Gregorian → Qamari (Hijri) ---
export function convertToQamari(gregorianDate) {
  return new DateObject(gregorianDate)
    .convert(arabic, arabic_en)
    .format("YYYY-MM-DD");
}

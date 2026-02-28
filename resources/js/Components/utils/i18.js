import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dari from "./dari";
import pashto from "./pashto";

// Resources for different languages
const resources = {
  dr: {
    translation: dari,
  },
  pa: {
    translation: pashto,
  },
};

// Get the current language from localStorage or default to 'pa' (Pashto)
const savedLanguage = localStorage.getItem("language") || "pa";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Use the language from localStorage or default to 'pa'
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Listen for language changes and save the selected language to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;

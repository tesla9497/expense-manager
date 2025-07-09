import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
// Locales
import { enJSON } from "@/locales";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJSON,
    },
  },
  lng: Localization.locale.split("-")[0],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

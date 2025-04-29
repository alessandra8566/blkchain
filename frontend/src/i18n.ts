import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zodTranslationZh from "zod-i18n-map/locales/zh-TW/zod.json";
import zodTranslationEn from "zod-i18n-map/locales/en/zod.json";

import commonZh from "@/locales/zh/common.json";
import videosZh from "@/locales/zh/videos.json";

import commonEn from "@/locales/en/common.json";
import videosEn from "@/locales/en/videos.json";

// determine which language to use
const i18nextLng = (() => {
  const i18nextLng = localStorage.getItem("i18nextLng");
  if (i18nextLng != null) return i18nextLng;
  switch (navigator.language) {
    case "zh-TW":
    case "zh":
      return "zh";
    default:
      return "en";
  }
})();
localStorage.setItem("i18nextLng", i18nextLng);

// initialize i18next
export const zhResources = {
  common: commonZh,
  videos: videosZh,
  zod: zodTranslationZh,
} as const

export const enResources = {
  common: commonEn,
  videos: videosEn,
  zod: zodTranslationEn,
} as const

export const resources = {
  zh: zhResources,
  en: enResources,
} as const

const namespaces = ["common", "videos", "zod"] as const;

i18n.use(initReactI18next).init({
  lng: i18nextLng,
  fallbackLng: "zh",
  ns: namespaces,
  defaultNS: "common",
  resources,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})
z.setErrorMap(zodI18nMap)

export default i18n
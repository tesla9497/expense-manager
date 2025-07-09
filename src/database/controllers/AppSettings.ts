import { useQuery, useRealm } from "@realm/react";
// Types
import { AppSettingsType } from "@/types/database";
// Models
import { AppSettings } from "../model";

export const useAppSettings = () => {
  const realm = useRealm();
  const appSettings = useQuery(AppSettings);

  const updateAppSettings = (appSettings: AppSettingsType) => {
    realm.write(() => {
      realm.create("AppSettings", appSettings, true);
    });
  };

  return {
    appSettings,
    updateAppSettings,
  };
};

import { BSON } from "realm";
import { useQuery, useRealm } from "@realm/react";
// Types
import { GeneralSettingsType } from "@/types/database";
// Models
import { GeneralSettings } from "../model";

export const useGeneralSettings = () => {
  const realm = useRealm();
  const settings = useQuery(GeneralSettings);

  const updateGeneralSettings = (settings: GeneralSettingsType) => {
    realm.write(() => {
      realm.create(
        "GeneralSettings",
        {
          _id: new BSON.ObjectId(),
          ...settings,
        },
        true
      );
    });
  };

  return {
    settings,
    updateGeneralSettings,
  };
};

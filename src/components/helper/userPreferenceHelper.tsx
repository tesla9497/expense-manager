import * as Localization from "expo-localization";
import { useRealm } from "@realm/react";
import { BSON } from "realm";

export const updateUserPreferenceWithLocale = () => {
  const realm = useRealm();
  const locale = Localization.locale;
  const isUSLocale = locale.includes("US");
  const newDateFormat = isUSLocale ? "mm/dd/yyyy" : "dd/mm/yyyy";

  realm.write(() => {
    let preference = realm.objects("UserPreference")[0];
    if (!preference) {
      realm.create("UserPreference", {
        _id: new BSON.ObjectId(),
        currency: "USD",
        language: Localization.locale.split("-")[0],
        date_format: newDateFormat,
        dark_mode: false,
        notifications: true,
      });
    } else {
      preference.date_format = newDateFormat;
      preference.language = Localization.locale.split("-")[0];
    }
  });
};

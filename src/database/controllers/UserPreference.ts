import { useQuery, useRealm } from "@realm/react";
// Types
import { UserPreferenceType } from "@/types/database";
// Models
import { UserPreference } from "../model";

export const useUserPreference = () => {
  const realm = useRealm();
  const userPreference = useQuery(UserPreference);

  const updateUserPreference = (userPreference: UserPreferenceType) => {
    realm.write(() => {
      realm.create("UserPreference", userPreference, true);
    });
  };

  return {
    userPreference,
    updateUserPreference,
  };
};

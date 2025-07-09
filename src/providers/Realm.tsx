import "@/utils/polyfills";
import React, { PropsWithChildren } from "react";
import { RealmProvider } from "@realm/react";
// Models
import {
  Account,
  AccountBalance,
  AppSettings,
  GeneralSettings,
  Transaction,
  User,
  UserPreference,
  Category,
} from "@/database/model";

export default function RealmCustomProvider({ children }: PropsWithChildren) {
  return (
    <RealmProvider
      schema={[
        User,
        Account,
        Transaction,
        AccountBalance,
        GeneralSettings,
        UserPreference,
        AppSettings,
        Category,
      ]}
      schemaVersion={4}
    >
      {children}
    </RealmProvider>
  );
}

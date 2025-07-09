import { BSON } from "realm";

type GeneralSettingsType = {
  _id?: BSON.ObjectId;
  onboarded: boolean;
  defaultAccount?: BSON.ObjectId;
  defaultCategory?: BSON.ObjectId;
  defaultSubcategory?: BSON.ObjectId;
  weekStart?: string;
};

type AccountType = {
  _id?: BSON.ObjectId;
  name: string;
  start_balance: number;
  account_type?: string;
  icon?: string;
  color?: string;
  date: Date;
  created: Date;
  modified: Date;
};

type AccountBalanceType = {
  _id?: BSON.ObjectId;
  account_id: BSON.ObjectId;
  balance: number;
  created: Date;
  modified: Date;
};

type TransactionType = {
  _id?: BSON.ObjectId;
  account_id?: BSON.ObjectId;
  to_account_id?: BSON.ObjectId;
  from_account_id?: BSON.ObjectId;
  transaction_type: string;
  amount: number;
  description: string;
  category?: BSON.ObjectId;
  subcategory?: BSON.ObjectId;
  running_balance?: number;
  to_running_balance?: number;
  from_running_balance?: number;
  date: Date;
  iscleared: boolean;
  created: Date;
  modified: Date;
};

type UserType = {
  _id?: BSON.ObjectId;
  name: string;
  email?: string;
  avatar?: string;
  role: string;
  created: Date;
  modified: Date;
};

type CategoryType = {
  _id?: BSON.ObjectId;
  name: string;
  icon?: string;
  type: string;
  custom?: boolean;
  created: Date;
  modified: Date;
};

type SubCategoryType = {
  _id?: BSON.ObjectId;
  name: string;
  created: Date;
  modified: Date;
};

type UserPreferenceType = {
  _id?: BSON.ObjectId;
  currency: string;
  currency_symbol: string;
  region: string;
  language: string;
  date_format: string;
  dark_mode: boolean;
  notifications: boolean;
  once_done: boolean;
};

type AppSettingsType = {
  _id?: BSON.ObjectId;
  encrypted: boolean;
};

type AccountWithBalance = AccountType & {
  balance: number;
};

export {
  GeneralSettingsType,
  AccountType,
  AccountBalanceType,
  TransactionType,
  UserType,
  CategoryType,
  SubCategoryType,
  UserPreferenceType,
  AppSettingsType,
  AccountWithBalance,
};

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useRealm } from "@realm/react";
import { Alert } from "react-native";
import Realm, { UpdateMode } from "realm";
import {
  Account,
  AccountBalance,
  AppSettings,
  Category,
  GeneralSettings,
  //   SubCategory,
  Transaction,
  User,
  UserPreference,
} from "@/database/model";

// Enable strict mode for Realm
Realm.flags.THROW_ON_GLOBAL_REALM = true;

export const useBackupService = () => {
  const realm = useRealm();

  const initialData = () => {
    realm.create("UserPreference", {
      _id: new Realm.BSON.ObjectId(),
      currency_symbol: "$",
      currency_name: "USD",
      region: "US",
      language: "en",
      date_format: "MM/DD/YYYY",
      dark_mode: false,
      notifications: true,
      once_done: true,
    });
    realm.create("AppSettings", {
      _id: new Realm.BSON.ObjectId(),
      encrypted: false,
    });
    realm.create("GeneralSettings", {
      _id: new Realm.BSON.ObjectId(),
      onboarded: true,
      defaultCategory: new Realm.BSON.ObjectId("664444444444444444444444"),
      defaultSubcategory: null,
      weekStart: "monday",
    });
  };

  const exportData = async () => {
    try {
      if (!realm.isClosed) {
        // Get all data from Realm
        const accounts = realm.objects(Account);
        const accountBalances = realm.objects(AccountBalance);
        const appSettings = realm.objects(AppSettings);
        const categories = realm.objects(Category);
        const generalSettings = realm.objects(GeneralSettings);
        //   const subCategories = realm.objects(SubCategory);
        const transactions = realm.objects(Transaction);
        const users = realm.objects(User);
        const userPreferences = realm.objects(UserPreference);

        // Convert to plain objects
        const data = {
          accounts: accounts.map((account) => ({
            ...account.toJSON(),
            _id: account._id.toString(),
          })),
          accountBalances: accountBalances.map((balance) => ({
            ...balance.toJSON(),
            _id: balance._id.toString(),
            account_id: balance.account_id.toString(),
          })),
          appSettings: appSettings.map((settings) => ({
            ...settings.toJSON(),
            _id: settings._id.toString(),
          })),
          categories: categories.map((category) => ({
            ...category.toJSON(),
            _id: category._id.toString(),
          })),
          generalSettings: generalSettings.map((settings) => ({
            ...settings.toJSON(),
            _id: settings._id.toString(),
            defaultAccount: settings.defaultAccount?.toString(),
          })),
          // subCategories: subCategories.map((subCategory) => ({
          //   ...subCategory.toJSON(),
          //   _id: subCategory._id.toString(),
          //   category: subCategory.category.toString(),
          // })),
          transactions: transactions.map((transaction) => ({
            ...transaction.toJSON(),
            _id: transaction._id.toString(),
            account_id: transaction.account_id?.toString(),
            to_account_id: transaction.to_account_id?.toString(),
            from_account_id: transaction.from_account_id?.toString(),
          })),
          users: users.map((user) => ({
            ...user.toJSON(),
            _id: user._id.toString(),
          })),
          userPreferences: userPreferences.map((preference) => ({
            ...preference.toJSON(),
            _id: preference._id.toString(),
          })),
        };

        // Create a temporary file
        const fileUri = `${
          FileSystem.cacheDirectory
        }realm_backup_${Date.now()}.json`;
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));

        // Share the file
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(fileUri, {
            mimeType: "application/json",
            dialogTitle: "Export Realm Data",
          });
        } else {
          Alert.alert("Error", "Sharing is not available on this device");
        }

        // Clean up
        await FileSystem.deleteAsync(fileUri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to export data");
    }
  };

  const importData = async (jsonData: any) => {
    try {
      if (!realm.isClosed) {
        realm.write(() => {
          // Clear existing data
          realm.deleteAll();

          // Import new data
          if (jsonData.accounts) {
            jsonData.accounts.forEach((account: any) => {
              realm.create("Account", {
                ...account,
                _id: new Realm.BSON.ObjectId(account._id),
                date: new Date(account.date),
                created: new Date(account.created),
                modified: new Date(account.modified),
              });
            });
          }

          if (jsonData.accountBalances) {
            jsonData.accountBalances.forEach((balance: any) => {
              realm.create("AccountBalance", {
                ...balance,
                _id: new Realm.BSON.ObjectId(balance._id),
                account_id: new Realm.BSON.ObjectId(balance.account_id),
                created: new Date(balance.created),
                modified: new Date(balance.modified),
              });
            });
          }

          if (jsonData.appSettings) {
            jsonData.appSettings.forEach((settings: any) => {
              realm.create("AppSettings", {
                ...settings,
                _id: new Realm.BSON.ObjectId(settings._id),
              });
            });
          }

          if (jsonData.categories) {
            jsonData.categories.forEach((category: any) => {
              realm.create("Category", {
                ...category,
                _id: new Realm.BSON.ObjectId(category._id),
                created: new Date(category.created),
                modified: new Date(category.modified),
              });
            });
          }

          if (jsonData.generalSettings) {
            jsonData.generalSettings.forEach((settings: any) => {
              realm.create("GeneralSettings", {
                ...settings,
                _id: new Realm.BSON.ObjectId(settings._id),
                defaultAccount: settings.defaultAccount
                  ? new Realm.BSON.ObjectId(settings.defaultAccount)
                  : undefined,
              });
            });
          }

          // if (jsonData.subCategories) {
          //   jsonData.subCategories.forEach((subCategory: any) => {
          //     realm.create("SubCategory", {
          //       ...subCategory,
          //       _id: new Realm.BSON.ObjectId(subCategory._id),
          //       category: new Realm.BSON.ObjectId(subCategory.category),
          //       created: new Date(subCategory.created),
          //       modified: new Date(subCategory.modified),
          //     });
          //   });
          // }

          if (jsonData.transactions) {
            jsonData.transactions.forEach((transaction: any) => {
              realm.create("Transaction", {
                ...transaction,
                _id: new Realm.BSON.ObjectId(transaction._id),
                account_id: transaction.account_id
                  ? new Realm.BSON.ObjectId(transaction.account_id)
                  : undefined,
                to_account_id: transaction.to_account_id
                  ? new Realm.BSON.ObjectId(transaction.to_account_id)
                  : undefined,
                from_account_id: transaction.from_account_id
                  ? new Realm.BSON.ObjectId(transaction.from_account_id)
                  : undefined,
                date: new Date(transaction.date),
                created: new Date(transaction.created),
                modified: new Date(transaction.modified),
              });
            });
          }

          if (jsonData.users) {
            jsonData.users.forEach((user: any) => {
              realm.create("User", {
                ...user,
                _id: new Realm.BSON.ObjectId(user._id),
                created: new Date(user.created),
                modified: new Date(user.modified),
              });
            });
          }

          if (jsonData.userPreferences) {
            jsonData.userPreferences.forEach((preference: any) => {
              realm.create("UserPreference", {
                ...preference,
                _id: new Realm.BSON.ObjectId(preference._id),
              });
            });
          }
        });

        Alert.alert("Success", "Data imported successfully");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to import data");
    }
  };

  const deleteData = async () => {
    // delete all transactions
    realm.write(() => {
      realm.delete(realm.objects(Transaction));
      realm.delete(realm.objects(AccountBalance));
      realm.delete(realm.objects(UserPreference));
      realm.delete(realm.objects(GeneralSettings));
      realm.delete(realm.objects(AppSettings));
      initialData();
      realm.objects(Account).forEach((account) => {
        realm.create(
          "Account",
          {
            ...account,
            start_balance: 0,
          },
          UpdateMode.All
        );
        realm.create("AccountBalance", {
          _id: new Realm.BSON.ObjectId(),
          account_id: account._id,
          balance: 0,
          created: new Date(),
          modified: new Date(),
        });
      });
    });
  };

  const resetData = async () => {
    try {
      if (!realm.isClosed) {
        realm.write(() => {
          realm.deleteAll();
          // Create new GeneralSettings with onboarded true
          initialData();
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete data");
    }
  };

  return {
    exportData,
    importData,
    deleteData,
    resetData,
  };
};

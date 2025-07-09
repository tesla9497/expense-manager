import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Papa from "papaparse";
import { Alert } from "react-native";
import Realm from "realm";
import { Account, AccountBalance, Transaction } from "@/database/model";

type TransactionRecord = {
  AccountName: string;
  AccountBalance: string | number;
  TransactionID: string;
  TransactionType: string;
  Amount: number;
  Description: string;
  Category: string;
  SubCategory: string;
  RunningBalance: number;
  IsCleared: string;
  Date: string;
};

export const generateCSV = async (
  realm: Realm,
  startDate: Date,
  endDate: Date
): Promise<void> => {
  try {
    const accounts = realm.objects<Account>("Account");
    const accountBalances: Map<string, number | "N/A"> = new Map();

    accounts.forEach((account) => {
      const balanceObj = realm
        .objects<AccountBalance>("AccountBalance")
        .filtered("account_id == $0", account._id)[0];
      accountBalances.set(
        account._id.toString(),
        balanceObj ? balanceObj.balance : "N/A"
      );
    });

    const CHUNK_SIZE = 500;
    const fileName = `transactions_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    const tempFilePath = `${FileSystem.cacheDirectory}${fileName}`;
    let csvString = "";

    for (const account of accounts) {
      const accountBalance =
        accountBalances.get(account._id.toString()) || "N/A";

      const transactions = realm
        .objects<Transaction>("Transaction")
        .filtered(
          "account_id == $0 AND date >= $1 AND date <= $2",
          account._id,
          startDate,
          endDate
        );

      for (let i = 0; i < transactions.length; i += CHUNK_SIZE) {
        const chunk = transactions.slice(i, i + CHUNK_SIZE);

        const transactionData = chunk.map((txn) => ({
          AccountName: account.name,
          AccountBalance: accountBalance,
          TransactionID: txn._id.toString(),
          TransactionType: txn.transaction_type,
          Amount: txn.amount,
          Description: txn.description,
          Category: txn.category,
          SubCategory: txn.subcategory,
          RunningBalance: txn.running_balance,
          IsCleared: txn.iscleared ? "Yes" : "No",
          Date: txn.date.toISOString(),
        }));

        csvString += Papa.unparse(transactionData, { header: i === 0 });

        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    await FileSystem.writeAsStringAsync(tempFilePath, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(tempFilePath);
    } else {
      Alert.alert(
        "Sharing Not Available",
        "Your device does not support file sharing."
      );
    }
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};

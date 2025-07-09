import { BSON } from "realm";
import { useQuery, useRealm } from "@realm/react";
// Models
import { Account } from "../model";
// Types
import { AccountType } from "@/types/database";

export const useFetchAccountDetails = (accountId: BSON.ObjectId) => {
  const accounts = useQuery(Account);
  const fetchAccountDetails = accounts.filtered(`_id == $0`, accountId);

  if (fetchAccountDetails.length > 0) {
    const account = fetchAccountDetails[0];
    if (!account.isValid()) return null;
    return account;
  }
  return null;
};

// Custom hook to manage accounts
export const useAccounts = () => {
  const realm = useRealm();
  const accounts = useQuery<Account>(Account).filter((account) =>
    account.isValid()
  );

  const getAccountDetails = (accountId: BSON.ObjectId) => {
    const account = realm.objectForPrimaryKey<Account>("Account", accountId);
    if (!account) return null;
    if (!account.isValid()) return null;
    return account;
  };

  const addAccount = (account: AccountType) => {
    const newAccountId = new BSON.ObjectId();
    realm.write(() => {
      realm.create("Account", {
        _id: newAccountId,
        ...account,
      });
      realm.create("AccountBalance", {
        account_id: newAccountId,
        balance: account.start_balance,
        created: new Date(),
        modified: new Date(),
      });
      if (accounts.length === 0 || accounts.length === 1) {
        realm.create("GeneralSettings", {
          _id: new BSON.ObjectId(),
          defaultAccount: newAccountId,
          defaultCategory: new BSON.ObjectId("664444444444444444444444"),
          defaultSubcategory: null,
          weekStart: "monday",
        });
      }
    });
  };

  const deleteAccount = (id: BSON.ObjectId) => {
    realm.write(() => {
      const account = realm.objectForPrimaryKey("Account", id);
      if (!account) return;

      const transactions = realm
        .objects("Transaction")
        .filtered(
          "account_id == $0 OR from_account_id == $0 OR to_account_id == $0",
          id
        );

      transactions.forEach((transaction) => {
        const transactionAmount = parseFloat(transaction.amount.toString());
        const transactionDate = transaction.date;

        if (transaction.transaction_type === "Transfer") {
          const fromAccountId = transaction.from_account_id as BSON.ObjectId;
          const toAccountId = transaction.to_account_id as BSON.ObjectId;

          if (fromAccountId?.equals(id) && toAccountId) {
            const toAccount = realm.objectForPrimaryKey("Account", toAccountId);
            if (toAccount) {
              realm
                .objects("Transaction")
                .filtered(
                  "account_id == $0 AND date >= $1",
                  toAccountId,
                  transactionDate
                )
                .forEach((t) => {
                  t.running_balance =
                    (t.running_balance as number) - transactionAmount;
                });

              realm
                .objects("AccountBalance")
                .filtered("account_id == $0", toAccountId, transactionDate)
                .forEach((bal) => {
                  bal.balance = (bal.balance as number) - transactionAmount;
                });
            }
          }

          if (toAccountId?.equals(id) && fromAccountId) {
            const fromAccount = realm.objectForPrimaryKey(
              "Account",
              fromAccountId
            );
            if (fromAccount) {
              realm
                .objects("Transaction")
                .filtered(
                  "account_id == $0 AND date >= $1",
                  fromAccountId,
                  transactionDate
                )
                .forEach((t) => {
                  t.running_balance =
                    (t.running_balance as number) + transactionAmount;
                });

              realm
                .objects("AccountBalance")
                .filtered("account_id == $0", fromAccountId, transactionDate)
                .forEach((bal) => {
                  bal.balance = (bal.balance as number) + transactionAmount;
                });
            }
          }
        }
      });

      realm.delete(transactions);

      const accountBalances = realm
        .objects("AccountBalance")
        .filtered("account_id == $0", id);
      realm.delete(accountBalances);

      realm.delete(account);
    });
  };

  const updateAccount = (account: AccountType) => {
    realm.write(() => {
      realm.create("Account", account, true);
    });
  };

  return {
    accounts,
    getAccountDetails,
    addAccount,
    deleteAccount,
    updateAccount,
  };
};

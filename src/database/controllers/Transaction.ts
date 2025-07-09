import React from "react";
import { BSON } from "realm";
import { useQuery, useRealm } from "@realm/react";
// Types
import { TransactionType } from "@/types/database";
import { Account, Transaction } from "../model";

export const getAllTransactions = () => {
  const transaction = useQuery<Transaction>(Transaction);
  const validTransactions = transaction.filter((t) => t.isValid());
  return validTransactions;
};

const sortTransactions = (a: any, b: any): number => {
  const dateComparison = b.date.getTime() - a.date.getTime();
  if (dateComparison !== 0) return dateComparison;

  const typeOrder = { Income: 0, Expense: 1, Transfer: 2 };
  const typeComparison =
    (typeOrder[a.transaction_type] || 0) - (typeOrder[b.transaction_type] || 0);
  if (typeComparison !== 0) return typeComparison;

  return a._id.toString().localeCompare(b._id.toString());
};

export const getAllTransactionsByAccount = (
  account_id: BSON.ObjectId,
  sortOrder: "asc" | "desc" = "asc"
) => {
  const transactions = useQuery(Transaction)
    .filtered(
      "account_id == $0 OR from_account_id == $0 OR to_account_id == $0",
      account_id
    )
    .sorted("date", sortOrder === "asc");

  return Array.from(transactions).sort(sortTransactions);
};

export const useTransactionById = (
  id: BSON.ObjectId
): Transaction | undefined => {
  const realm = useRealm();

  return React.useMemo(() => {
    return realm.objectForPrimaryKey<Transaction>("Transaction", id);
  }, [realm, id]);
};

export const totalIncomes = () => {
  const transaction = useQuery(Transaction).filtered(
    "transaction_type == $0",
    "Income"
  );
  const validTransactions = transaction.filter((t) => t.isValid());
  return validTransactions.reduce((total, t) => total + t.amount, 0);
};

export const totalExpenses = () => {
  const transaction = useQuery(Transaction).filtered(
    "transaction_type == $0",
    "Expense"
  );
  const validTransactions = transaction.filter((t) => t.isValid());
  return validTransactions.reduce((total, t) => total + t.amount, 0);
};

export const totalMonthlyIncomes = () => {
  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
    0,
    0,
    0,
    0
  );

  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  const transaction = useQuery(Transaction)
    .filtered(
      "transaction_type == $0 AND date >= $1 AND date <= $2",
      "Income",
      startOfMonth,
      endOfMonth
    )
    .filter((t) => t.isValid());
  return transaction.reduce((total, t) => total + t.amount, 0);
};

export const totalMonthlyExpenses = () => {
  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  const transaction = useQuery(Transaction)
    .filtered(
      "transaction_type == $0 AND date >= $1 AND date <= $2",
      "Expense",
      startOfMonth,
      endOfMonth
    )
    .filter((t) => t.isValid());
  return transaction.reduce((total, t) => total + t.amount, 0);
};

export const totalTransfers = () => {
  const transaction = useQuery(Transaction).filtered(
    "transaction_type == $0",
    "Transfer"
  );
  const validTransactions = transaction.filter((t) => t.isValid());
  return validTransactions.reduce((total, t) => total + t.amount, 0);
};

export const recentTransactions = () => {
  const transaction = useQuery<Transaction>(Transaction).sorted("date", true);
  const validTransactions = transaction.filter((t) => t.isValid());
  return Array.from(validTransactions).sort(sortTransactions);
};

export const getRecentTransactions = () => {
  const transactions = useQuery<Transaction>(Transaction);
  const validTransactions = transactions.filter((t) => t.isValid());
  return Array.from(validTransactions).sort(sortTransactions);
};

export const fetchTodayTransactions = () => {
  const transaction = useQuery(Transaction).filtered(
    "date >= $0",
    new Date().setHours(0, 0, 0, 0)
  );
  return transaction;
};

export const fetchTodayTransactionAmount = () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const transaction = useQuery(Transaction).filtered("date >= $0", todayStart);
  return transaction.sum("amount") || 0;
};

export const getLargestTransactionAmount = (realm: Realm) => {
  const transaction = realm.objects(Transaction).max("amount");
  return transaction;
};

export const fetchTransactionAmountWithDate = (
  realm: Realm,
  startDate: Date,
  endDate: Date
) => {
  const givenStartDate = new Date(startDate);

  givenStartDate.setHours(0, 0, 0, 0);

  const givenEndDate = new Date(endDate || new Date());
  givenEndDate.setDate(givenEndDate.getDate() + 1);
  givenEndDate.setHours(0, 0, 0, 0);

  const transaction = realm
    .objects(Transaction)
    .filtered("date >= $0 AND date < $1", givenStartDate, givenEndDate);
  return transaction;
};

export const getNextAvailableTime = (
  realm: Realm,
  date: Date,
  accountId: BSON.ObjectId | null
) => {
  const startOfMinute = new Date(date);
  startOfMinute.setSeconds(0, 0);

  const endOfMinute = new Date(date);
  endOfMinute.setSeconds(59, 999);

  const existingTransactions = realm
    .objects("Transaction")
    .filtered(
      "date >= $0 AND date <= $1 AND (account_id == $2 OR from_account_id == $2 OR to_account_id == $2)",
      startOfMinute,
      endOfMinute,
      accountId
    )
    .sorted("date");

  if (existingTransactions.length === 0) {
    return date;
  }

  let newDate = new Date(date);
  for (let second = 0; second < 60; second++) {
    newDate.setSeconds(second, 0);
    const hasTransactionAtTime = existingTransactions.some(
      (t: any) => t.date.getTime() === newDate.getTime()
    );
    if (!hasTransactionAtTime) {
      return newDate;
    }
  }

  newDate.setMinutes(newDate.getMinutes() + 1);
  newDate.setSeconds(0, 0);
  return newDate;
};

export const useTransaction = () => {
  const realm = useRealm();

  const getFirstTransactionForAccount = (account_id: BSON.ObjectId) => {
    const transactions = realm
      .objects("Transaction")
      .filtered(
        "account_id == $0 OR from_account_id == $0 OR to_account_id == $0",
        account_id
      )
      .sorted("date", false);

    return transactions.length > 0 ? transactions[0] : null;
  };

  const fetchtPreviousTransaction = (account_id: BSON.ObjectId, date: Date) => {
    const transactions = realm
      .objects("Transaction")
      .filtered(
        "(account_id == $0 OR from_account_id == $0 OR to_account_id == $0) AND date <= $1",
        account_id,
        date
      )
      .sorted("date", true);

    if (transactions.length > 0) {
      const sameDateTransactions = transactions.filter(
        (t: any) => (t.date as Date).getTime() <= date.getTime()
      );

      const sortedTransactions = sameDateTransactions.sort(sortTransactions);

      for (const transaction of sortedTransactions) {
        if (transaction.transaction_type === "Transfer") {
          const fromAccountId = transaction.from_account_id as BSON.ObjectId;
          const toAccountId = transaction.to_account_id as BSON.ObjectId;

          if (fromAccountId && fromAccountId.equals(account_id)) {
            return (
              transaction.from_running_balance ?? transaction.running_balance
            );
          }

          if (toAccountId && toAccountId.equals(account_id)) {
            return (
              transaction.to_running_balance ?? transaction.running_balance
            );
          }
        } else if (
          transaction.account_id &&
          (transaction.account_id as BSON.ObjectId).equals(account_id)
        ) {
          return transaction.running_balance;
        }
      }
    }

    const account = realm.objectForPrimaryKey("Account", account_id);
    return account?.start_balance ?? 0;
  };

  const addTransaction = (transaction: TransactionType) => {
    realm.write(() => {
      realm.create("Transaction", {
        _id: new BSON.ObjectId(),
        from_account_id: new BSON.ObjectId(transaction.from_account_id),
        to_account_id: new BSON.ObjectId(transaction.to_account_id),
        ...transaction,
      });
    });
  };

  const updateTransaction = (transaction: TransactionType) => {
    realm.write(() => {
      realm.create("Transaction", transaction, true);
    });
  };

  const updateRunningBalanceOfTransactions = async (
    account_id: BSON.ObjectId,
    date: Date,
    oldRunningBalance: number
  ) => {
    const transactions = realm
      .objects("Transaction")
      .filtered(
        "(account_id == $0 OR from_account_id == $0 OR to_account_id == $0) AND date > $1",
        account_id,
        date
      );

    // For running balance calculation, we need ascending date order
    const sortedTransactions = Array.from(transactions).sort(
      (a: any, b: any) => {
        const dateComparison = a.date.getTime() - b.date.getTime();
        if (dateComparison !== 0) return dateComparison;

        const typeOrder = { Income: 0, Expense: 1, Transfer: 2 };
        const typeComparison =
          (typeOrder[a.transaction_type] || 0) -
          (typeOrder[b.transaction_type] || 0);
        if (typeComparison !== 0) return typeComparison;

        return a._id.toString().localeCompare(b._id.toString());
      }
    );

    let runningBalance = oldRunningBalance;

    realm.write(() => {
      const accountBalance = realm
        .objects("AccountBalance")
        .filtered("account_id == $0", account_id)[0];

      sortedTransactions.forEach((transaction: any) => {
        if (transaction.transaction_type === "Income") {
          runningBalance += transaction.amount as number;
          transaction.running_balance = runningBalance;
        } else if (transaction.transaction_type === "Expense") {
          runningBalance -= transaction.amount as number;
          transaction.running_balance = runningBalance;
        } else if (transaction.transaction_type === "Transfer") {
          const fromAccountId = transaction.from_account_id as BSON.ObjectId;
          const toAccountId = transaction.to_account_id as BSON.ObjectId;

          if (fromAccountId?.equals(account_id)) {
            runningBalance -= transaction.amount as number;
            transaction.from_running_balance = runningBalance;
          }

          if (toAccountId?.equals(account_id)) {
            runningBalance += transaction.amount as number;
            transaction.to_running_balance = runningBalance;
          }
        }
      });

      if (accountBalance) {
        accountBalance.balance = runningBalance;
        accountBalance.modified = new Date();
      }
    });
  };

  const deleteTransaction = (item: TransactionType) => {
    let accountsToUpdate = [];
    if (!item) return;

    if (
      item?.transaction_type === "Income" ||
      item?.transaction_type === "Expense"
    ) {
      const accountDetails = realm.objectForPrimaryKey<Account>(
        "Account",
        item.account_id
      );
      if (accountDetails) {
        accountsToUpdate.push({
          id: accountDetails._id,
          date: accountDetails.date,
          startBalance: accountDetails.start_balance,
        });
      }
    }

    if (item.transaction_type === "Transfer") {
      if (!item.from_account_id || !item.to_account_id) {
        return;
      }
      const fromAccountDetails = realm.objectForPrimaryKey<Account>(
        "Account",
        item.from_account_id
      );
      const toAccountDetails = realm.objectForPrimaryKey<Account>(
        "Account",
        item.to_account_id
      );

      if (fromAccountDetails) {
        accountsToUpdate.push({
          id: fromAccountDetails._id,
          date: fromAccountDetails.date,
          startBalance: fromAccountDetails.start_balance,
        });
      }
      if (toAccountDetails) {
        accountsToUpdate.push({
          id: toAccountDetails._id,
          date: toAccountDetails.date,
          startBalance: toAccountDetails.start_balance,
        });
      }
    }

    const transaction = realm.objectForPrimaryKey("Transaction", item._id);
    if (transaction) {
      if (!realm.isInTransaction) {
        realm.beginTransaction();
      }
      realm.delete(transaction);
      realm.commitTransaction();
    }

    accountsToUpdate.forEach((account) => {
      updateRunningBalanceOfTransactions(
        account.id,
        account.date,
        account.startBalance
      );
    });
  };

  return {
    getFirstTransactionForAccount,
    fetchtPreviousTransaction,
    addTransaction,
    updateTransaction,
    updateRunningBalanceOfTransactions,
    deleteTransaction,
    getRecentTransactions,
  };
};

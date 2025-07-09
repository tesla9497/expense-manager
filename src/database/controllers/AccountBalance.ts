import { BSON } from "realm";
import { useQuery, useRealm } from "@realm/react";
import { Account, AccountBalance } from "../model";

export const useTotalBalance = () => {
  const balances = useQuery(AccountBalance);
  return balances.reduce(
    (total, accountBalance) => total + accountBalance.balance,
    0
  );
};

export const useAccountBalance = (account_id: BSON.ObjectId) => {
  const account = useQuery(Account)?.filtered("_id == $0", account_id);
  if (!account || !account.isValid()) return 0;
  const accountBalance = useQuery(AccountBalance)?.filtered(
    "account_id == $0",
    account_id
  );
  return accountBalance[0]?.balance || 0;
};

export const useUpdateAccountBalance = () => {
  const realm = useRealm();

  const getAccountBalance = (account_id: BSON.ObjectId) => {
    if (!realm) return 0;
    const account = realm.objectForPrimaryKey("Account", account_id);
    if (!account || !account.isValid()) return 0;

    const accountBalance = realm
      .objects("AccountBalance")
      .filtered("account_id == $0", account_id)[0];

    return accountBalance?.isValid() ? accountBalance.balance : 0;
  };

  const updateAccountBalance = (account_id: BSON.ObjectId, balance: number) => {
    realm.write(() => {
      const accountBalance = realm
        .objects("AccountBalance")
        .filtered("account_id == $0", new BSON.ObjectId(account_id))[0];
      if (accountBalance) {
        accountBalance.balance = balance;
        accountBalance.modified = new Date();
      } else {
        realm.create("AccountBalance", {
          account_id,
          balance,
          created: new Date(),
          modified: new Date(),
        });
      }
    });

    // Fetch and return the updated balance
    const accountBalance = realm
      .objects("AccountBalance")
      .filtered("account_id == $0", new BSON.ObjectId(account_id))[0];
    return accountBalance?.balance || 0;
  };

  return { getAccountBalance, updateAccountBalance };
};

import React from "react";
import { BSON } from "realm";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalSearchParams, useRouter } from "expo-router";
// Components
import {
  Button,
  Card,
  Container,
  DatePick,
  HStack,
  Input,
  Screen,
  Text,
  VStack,
  Icon,
} from "@/components/core";
import { useTheme } from "@/context";
import { AlertPortal, AmountInput, Header } from "@/components/custom";
import { Calendar, Delete, Tick } from "@/assets/icons";
import {
  useAccounts,
  useFetchAccountDetails,
  useTransaction,
} from "@/database/controllers";
import { ACCOUNT_TYPES } from "@/database/static/account_types";
import { BottomSheetRef } from "@/types/components.core";

const AccountUpdation = () => {
  const router = useRouter();
  const { Theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const deletePortalRef = React.useRef<BottomSheetRef>(null);

  const { id } = useGlobalSearchParams();
  // Database
  const { updateAccount, deleteAccount } = useAccounts();
  const { updateRunningBalanceOfTransactions, getFirstTransactionForAccount } =
    useTransaction();

  const accountId = id ? new BSON.ObjectId(id.toString()) : null;
  const account = useFetchAccountDetails(accountId);
  const firstTransaction = getFirstTransactionForAccount(accountId);

  const [accountName, setAccountName] = React.useState(account.name || "");
  const [startBalance, setStartBalance] = React.useState(
    account.start_balance.toLocaleString() || ""
  );
  const [accountType, setAccountType] = React.useState(
    ACCOUNT_TYPES?.find((item) => item.name === account.account_type) ||
      ACCOUNT_TYPES[0]
  );
  const [accountColor, setAccountColor] = React.useState(
    account.color || "blue"
  );
  const [date, setData] = React.useState(account.date || new Date());
  React.useEffect(() => {
    setAccountName(account.name || "");
    setStartBalance(account.start_balance.toString() || "");
    setAccountType(
      ACCOUNT_TYPES?.find((item) => item.name === account.account_type) ||
        ACCOUNT_TYPES[0]
    );
    setAccountColor(account.color || "blue");
    setData(account.date || new Date());
  }, [account]);

  const paddingTop = insets.top !== 0 ? insets.top + 10 : 30;

  const handleUpdateAccount = () => {
    updateAccount({
      _id: accountId,
      name: accountName,
      start_balance: parseFloat(startBalance),
      account_type: accountType.name,
      icon: accountType.icon,
      color: accountColor,
      date: date,
      modified: new Date(),
      created: account.created,
    });
    updateRunningBalanceOfTransactions(
      accountId,
      date,
      parseFloat(startBalance)
    );
    router.back();
  };

  const handleDeleteAccount = () => {
    deletePortalRef.current?.close();
    deleteAccount(accountId);
    router.back();
  };

  return (
    <Screen>
      <Container>
        <Header title="account.edit.title" />
      </Container>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Theme.color.base.primary,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            minHeight: height,
            paddingTop: paddingTop,
            paddingBottom: 32,
          }}
        >
          <AmountInput
            title="account.edit.amount.label"
            amount={startBalance}
            onchangeAmount={setStartBalance}
          />
          <Container sx={{ paddingTop: 16 }}>
            <Input
              label="account.edit.name.label"
              placeholder="account.edit.name.placeholder"
              fullWidth
              value={accountName}
              onChangeText={(text) => setAccountName(text)}
            />
            <DatePick
              label="Date"
              placeholder="eg. 01/01/2023"
              type="date"
              date={date}
              maxDate={
                firstTransaction?.date instanceof Date
                  ? firstTransaction.date
                  : undefined
              }
              onDateChange={(newdate) => setData(newdate)}
              rightIcon={<Calendar width={20} height={20} />}
            />
            <Text
              text="account.edit.type.label"
              variant="label"
              size="large"
              style={{ marginBottom: 8 }}
            />
          </Container>
          <View>
            <HStack
              scrollable
              spacing={8}
              style={{ marginTop: 12 }}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              {ACCOUNT_TYPES?.map((item: any, index: number) => (
                <VStack
                  spacing={4}
                  key={index}
                  style={{ alignItems: "center" }}
                >
                  <Card
                    bgColor={
                      accountType.name === item.name
                        ? Theme.color.background.navicon.primary
                        : Theme.color.base.secondary
                    }
                    sx={{
                      width: 70,
                      height: 70,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onTouchEnd={() => setAccountType(item)}
                  >
                    <Icon name={item.icon} width={40} height={40} />
                  </Card>
                  <Text
                    text={item.name || "Unknown"}
                    variant="label"
                    size="small"
                    color={Theme.color.text.primary.default}
                  />
                </VStack>
              ))}
            </HStack>
          </View>
          <Container sx={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text
                text="account.edit.color.label"
                variant="label"
                size="medium_promenent"
                color={Theme.color.text.primary.default}
                style={{ marginTop: 10, marginBottom: 4 }}
              />
              <HStack
                justify="space-between"
                style={{ width: "100%", marginTop: 8 }}
              >
                {Object.keys(Theme.color.background.account).map(
                  (key, index) => (
                    <View
                      key={index}
                      style={{
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: Theme.border.radius.x10,
                        backgroundColor: Theme.color.background.account[key],
                      }}
                      onTouchEnd={() => {
                        setAccountColor(key);
                      }}
                    >
                      {accountColor === key && (
                        <Tick
                          color={Theme.color.text.secondary.default}
                          width={20}
                          height={20}
                        />
                      )}
                    </View>
                  )
                )}
              </HStack>
            </View>
            <Button
              title="account.edit.actions.update"
              fullWidth
              disabled={
                !account._id ||
                !account.name ||
                (account.start_balance && account.start_balance === null)
                  ? true
                  : false
              }
              style={{ marginTop: 24 }}
              onPress={handleUpdateAccount}
            />
            <Button
              variant="text"
              title="account.edit.actions.delete"
              fullWidth
              color={Theme.color.background.navicon.primary}
              disabled={!account._id}
              onPress={() => deletePortalRef.current?.open()}
            />
          </Container>
          <AlertPortal
            ref={deletePortalRef}
            title="account.edit.delete.title"
            message="account.edit.delete.message"
            confirmText="account.edit.delete.confirm"
            confirmButtonProps={{
              leftIcon: (
                <Delete
                  width={24}
                  height={24}
                  color={Theme.color.text.primary.default}
                />
              ),
              style: { gap: 4 },
              color: `${Theme.color.button.secondary.default}90`,
            }}
            onConfirm={handleDeleteAccount}
            closeText="Cancel"
            onClose={() => deletePortalRef.current?.close()}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default AccountUpdation;

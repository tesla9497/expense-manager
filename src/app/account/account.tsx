import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { useRealm } from "@realm/react";
// Components
import {
  Button,
  Card,
  Container,
  DatePick,
  HStack,
  Screen,
  Text,
  VStack,
  Icon,
} from "@/components/core";
import { useTheme } from "@/context";
import { Add, Calendar, Right, Save, Empty } from "@/assets/icons";
import {
  useAccounts,
  useTotalBalance,
  useUpdateAccountBalance,
  useUserPreference,
} from "@/database/controllers";
import { Header, AlertPortal } from "@/components/custom";
import { generateCSV } from "@/components/utils";
import {
  AccountType,
  AccountWithBalance,
  UserPreferenceType,
} from "@/types/database";
import { BottomSheetRef } from "@/types/components.core";

const Account = () => {
  const router = useRouter();
  const { Theme } = useTheme();
  const realm = useRealm();
  const dateManagementRef = React.useRef<BottomSheetRef>(null);

  const { userPreference } = useUserPreference();
  const { accounts: getAccount } = useAccounts();
  const { getAccountBalance } = useUpdateAccountBalance();
  const totalBalance = useTotalBalance();

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const accounts: AccountType[] = React.useMemo(() => {
    return Array.from(getAccount);
  }, [getAccount]);
  const userPreferenceData: UserPreferenceType = React.useMemo(() => {
    return userPreference[0];
  }, [userPreference]);

  const AccountsList = ({ accounts, userPreference }) => {
    if (!accounts || accounts.length === 0) {
      return (
        <Container
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 32,
            rowGap: 16,
          }}
        >
          <Empty width={100} height={100} />
          <View style={{ rowGap: 4 }}>
            <Text
              text="account.no_accounts"
              variant="title"
              size="small"
              align="center"
            />
            <Text
              text="account.no_accounts_desc"
              variant="label"
              size="medium"
              align="center"
            />
          </View>
          <Button
            variant="outlined"
            title="account.create_account"
            onPress={() => router.push("/account/account_creation")}
            style={{
              borderStyle: "dotted",
              alignSelf: "center",
              borderRadius: Theme.border.radius.x4,
            }}
            color={Theme.color.stroke_border.tonal_blue}
            textStyle={{
              color: Theme.color.stroke_border.tonal_blue,
              ...Theme.typography.label.medium_promenent,
            }}
          />
        </Container>
      );
    }
    const memorizedAccounts = React.useMemo(() => {
      return accounts.slice(0, 5);
    }, [accounts]);
    const accountBalances: AccountWithBalance[] = memorizedAccounts.map(
      (account: AccountType) => {
        const balance = getAccountBalance(account._id);
        return { ...account, balance };
      }
    );

    return (
      <FlatList
        style={{ flex: 1 }}
        data={accountBalances}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <Card
            sx={{ width: "100%", padding: 12 }}
            bgColor={Theme.color.background.account[item.color]}
          >
            <Pressable onPress={() => router.push(`/account/${item._id}`)}>
              <HStack spacing={8}>
                <Icon name={item.icon} width={50} height={50} />
                <VStack style={{ flex: 1 }}>
                  <Text
                    text={item.name}
                    variant="label"
                    size="large_promenent"
                    color={Theme.color.text.secondary.default}
                  />
                  <Text
                    text={item.account_type}
                    variant="label"
                    size="small"
                    color={Theme.color.text.secondary.default}
                  />
                </VStack>
                <VStack spacing={4} style={{ alignItems: "flex-end" }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: Theme.border.radius.x10,
                      backgroundColor: Theme.color.base.primary,
                    }}
                  >
                    <Right width={20} height={20} />
                  </View>
                  <Text
                    text={`${
                      userPreference?.currency_symbol
                    }${item.balance.toFixed(2)}`}
                    variant="title"
                    size="large"
                    color={Theme.color.text.secondary.default}
                  />
                </VStack>
              </HStack>
            </Pressable>
          </Card>
        )}
        ListFooterComponent={() => (
          <Pressable
            style={{
              height: 72,
              width: 72,
              alignSelf: "center",
              marginVertical: 16,
              borderRadius: Theme.border.radius.x10,
              backgroundColor: Theme.color.background.input.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push("/account/account_creation")}
          >
            <Add width={32} height={32} />
          </Pressable>
        )}
      />
    );
  };

  return (
    <Screen>
      <Container
        sx={{
          flex: 1,
        }}
      >
        <Header
          title="account.title"
          rightComponents={
            <Button
              style={{ paddingVertical: 2, gap: 4 }}
              rightIcon={
                <Save width={20} height={20} color={Theme.color.base.primary} />
              }
              title="account.export_button"
              onPress={() => dateManagementRef.current.open()}
            />
          }
        />
        <HStack
          style={{ width: "100%", marginBottom: 16 }}
          align="center"
          justify="space-between"
        >
          <Text
            text="account.net_worth"
            variant="label"
            size="small"
            color={Theme.color.text.primary.default}
          />
          <Text
            text={`${userPreferenceData?.currency_symbol}${totalBalance.toFixed(
              2
            )}`}
            variant="title"
            size="large"
            color={Theme.color.text.primary.default}
          />
        </HStack>
        <AccountsList accounts={accounts} userPreference={userPreferenceData} />
      </Container>
      <AlertPortal
        ref={dateManagementRef}
        title="account.export.title"
        message="account.export.message"
        confirmText="account.export.actions.cancel"
        closeText="account.export.actions.save"
        confirmButtonProps={{
          style: { backgroundColor: Theme.color.background.navicon.primary },
        }}
        onClose={() => {
          dateManagementRef.current.close();
          generateCSV(realm, startDate, endDate);
        }}
        onConfirm={() => dateManagementRef.current.close()}
        containerStyle={{
          alignItems: "stretch",
          backgroundColor: Theme.color.base.secondary,
          padding: 16,
          borderRadius: 20,
        }}
      >
        <View style={{ flex: 1, marginTop: 8 }}>
          <DatePick
            label="account.export.date_picker.start_date.label"
            placeholder="account.export.date_picker.start_date.placeholder"
            type="date"
            date={startDate}
            onDateChange={(newdate) => setStartDate(newdate)}
            rightIcon={<Calendar width={20} height={20} />}
          />
          <DatePick
            label="account.export.date_picker.end_date.label"
            placeholder="account.export.date_picker.end_date.placeholder"
            type="date"
            date={endDate}
            onDateChange={(newdate) => setEndDate(newdate)}
            rightIcon={<Calendar width={20} height={20} />}
          />
        </View>
      </AlertPortal>
    </Screen>
  );
};

export default Account;

import React, { useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Link, useRouter } from "expo-router";
// Components
import {
  Button,
  Card,
  Container,
  Divider,
  HStack,
  Screen,
  Text,
  VStack,
  Icon,
} from "@/components/core";
import { useTheme } from "@/context";
import {
  Expense,
  Income,
  Right,
  NoTransactions,
  TransactionNew,
  Empty,
} from "@/assets/icons";
import {
  useAccounts,
  useAccountBalance,
  totalMonthlyExpenses,
  totalMonthlyIncomes,
  useUserPreference,
  recentTransactions,
  useFetchAccountDetails,
  useTransaction,
  useCategory,
} from "@/database/controllers";
import {
  AccountType,
  AccountWithBalance,
  TransactionType,
  UserPreferenceType,
} from "@/types/database";
import { SwipeableCard } from "@/components/custom";

const Home = () => {
  const router = useRouter();
  const { Theme } = useTheme();
  const { userPreference } = useUserPreference();
  const { accounts } = useAccounts();
  const openRowRef = useRef<Swipeable | null>(null);
  const totalIncome = totalMonthlyIncomes();
  const totalExpense = totalMonthlyExpenses();
  const recentTransaction = recentTransactions().slice(0, 20);
  const { category } = useCategory();
  const userPreferenceData = React.useMemo(() => {
    return userPreference[0];
  }, [userPreference]);

  const AccountsList = ({ accounts, userPreference }) => {
    if (!accounts || accounts.length === 0) return null;
    const memorizedAccounts = React.useMemo(() => {
      return accounts.slice(0, 5);
    }, [accounts]);
    const accountBalances: AccountWithBalance[] =
      memorizedAccounts?.length > 0
        ? memorizedAccounts?.map((account: AccountType) => {
            const balance = account?._id ? useAccountBalance(account._id) : 0;
            return { ...account, balance };
          })
        : [];

    return (
      <FlatList
        data={accountBalances}
        keyExtractor={(item) => item._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <Card
            sx={{
              padding: 8,
              alignSelf: "flex-start",
              maxHeight: 100,
              width: 175,
              rowGap: 8,
            }}
            bgColor={Theme.color.background.account[item.color]}
          >
            <Pressable onPress={() => router.push(`/account/${item._id}`)}>
              <HStack spacing={8}>
                <Icon name={item.icon} width={28} height={28} />
                <VStack style={{ flex: 1 }}>
                  <Text
                    text={item.name}
                    variant="label"
                    size="medium_promenent"
                    color={Theme.color.text.secondary.default}
                  />
                  <Text
                    text={item.account_type}
                    variant="label"
                    size="small"
                    color={Theme.color.text.secondary.default}
                  />
                </VStack>
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
              </HStack>
              <Text
                text={`${
                  userPreference?.currency_symbol
                }${item.balance?.toFixed(2)}`}
                variant="title"
                size="large"
                color={Theme.color.text.secondary.default}
              />
            </Pressable>
          </Card>
        )}
      />
    );
  };

  const RecentTransactions: React.FC<{
    item: TransactionType;
    userPreference: UserPreferenceType;
    openRowRef: React.MutableRefObject<Swipeable | null>;
  }> = ({ item, userPreference, openRowRef }) => {
    if (!item) return null;
    const accountDetails = useFetchAccountDetails(item.account_id);
    const router = useRouter();
    const { deleteTransaction } = useTransaction();

    return (
      <SwipeableCard
        onDuplicate={() =>
          router.push({
            pathname: "/transfer/duplicate_transfer",
            params: { id: item._id.toString() },
          })
        }
        onDelete={() => deleteTransaction(item)}
        openRowRef={openRowRef}
      >
        <Card
          sx={{
            padding: 8,
            width: "100%",
          }}
          bgColor={Theme.color.background.transaction.primary}
        >
          <Pressable onPress={() => router.push(`/transfer/${item._id}`)}>
            <HStack spacing={8}>
              <View style={{ width: 50, height: 50 }}>
                <Icon
                  name={
                    item.category
                      ? category.find((itm) => itm._id.equals(item.category))
                          ?.icon
                      : "Others"
                  }
                />
              </View>
              <VStack style={{ flex: 1 }}>
                <Text
                  text={item.transaction_type}
                  variant="body"
                  size="large"
                />
                <Text
                  text={accountDetails?.name || ""}
                  variant="body"
                  size="medium"
                  color={Theme.color.text.tertiary.default}
                />
              </VStack>
              <VStack spacing={4} style={{ alignItems: "flex-end" }}>
                <Text
                  text={`${
                    item.transaction_type !== "Transfer"
                      ? item.transaction_type === "Expense"
                        ? "-"
                        : "+"
                      : ""
                  }${userPreference?.currency_symbol}${item.amount?.toFixed(
                    2
                  )}`}
                  variant="body"
                  size="large"
                  color={
                    item.transaction_type !== "Transfer"
                      ? item.transaction_type === "Expense"
                        ? Theme.color.text.error.primary
                        : Theme.color.text.success.primary
                      : Theme.color.text.primary.default
                  }
                />
                <Text
                  text={new Date(item.date).toLocaleString("en-UK", {
                    month: "short",
                    day: "numeric",
                  })}
                  variant="body"
                  size="medium"
                  color={Theme.color.text.tertiary.default}
                />
              </VStack>
            </HStack>
          </Pressable>
        </Card>
      </SwipeableCard>
    );
  };

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <Container sx={{ paddingVertical: 16, rowGap: 8 }}>
          <View style={{ rowGap: 8 }}>
            <Text
              text="home.monthly_summary"
              variant="label"
              size="large_promenent"
            />
            <Card sx={{ paddingHorizontal: 8, paddingVertical: 12 }}>
              <HStack>
                <VStack style={{ flex: 1, gap: 4, alignItems: "center" }}>
                  <HStack spacing={4} align="center">
                    <Income />
                    <Text
                      text="home.income"
                      variant="label"
                      size="large"
                      color={Theme.color.text.secondary.default}
                    />
                  </HStack>
                  <Text
                    text={`${userPreferenceData?.currency_symbol || "₹"}${
                      totalIncome || 0
                    }`}
                    variant="title"
                    size="large"
                    color={Theme.color.text.secondary.default}
                  />
                </VStack>
                <Divider vertical />
                <VStack style={{ flex: 1, gap: 4, alignItems: "center" }}>
                  <HStack spacing={4} align="center">
                    <Expense />
                    <Text
                      text="home.expense"
                      variant="label"
                      size="large"
                      color={Theme.color.text.secondary.default}
                    />
                  </HStack>
                  <Text
                    text={`${userPreferenceData?.currency_symbol || "₹"}${
                      totalExpense || 0
                    }`}
                    variant="title"
                    size="large"
                    color={Theme.color.text.secondary.default}
                  />
                </VStack>
              </HStack>
            </Card>
          </View>
          {accounts?.length > 0 && (
            <HStack style={{ width: "100%" }} justify="space-between">
              <Text text="home.accounts" variant="title" size="medium" />
              <Link
                style={{ paddingLeft: 10, paddingVertical: 4 }}
                href="/account/account"
              >
                <Text
                  text="home.view_all"
                  variant="label"
                  size="large_promenent"
                  color={Theme.color.text.linktext.primary}
                />
              </Link>
            </HStack>
          )}
        </Container>
        <View>
          <AccountsList
            accounts={accounts}
            userPreference={userPreferenceData}
          />
        </View>
        {accounts?.length > 0 ? (
          <Container sx={{ marginTop: 16, flex: 1 }}>
            <HStack style={{ width: "100%" }} justify="space-between">
              <Text
                text="home.recent_transactions"
                variant="title"
                size="medium"
              />
              {recentTransaction?.length > 0 && (
                <Link
                  style={{ paddingLeft: 10, paddingVertical: 4 }}
                  href="/transfer/transaction"
                >
                  <Text
                    text="home.search"
                    variant="label"
                    size="large_promenent"
                    color={Theme.color.text.linktext.primary}
                  />
                </Link>
              )}
            </HStack>
            {recentTransaction?.length > 0 ? (
              <FlatList
                style={{ flex: 1 }}
                data={recentTransaction}
                keyExtractor={(item) => item._id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 16 }}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                  <RecentTransactions
                    item={item}
                    userPreference={userPreferenceData}
                    openRowRef={openRowRef}
                  />
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "50%",
                  alignSelf: "center",
                  rowGap: 8,
                }}
              >
                <TransactionNew width={50} height={50} />
                <Text
                  text="home.no_transactions"
                  variant="title"
                  size="small"
                />
                <Text
                  text="home.no_transactions_desc"
                  variant="label"
                  size="medium"
                  align="center"
                />
                <NoTransactions />
              </View>
            )}
          </Container>
        ) : (
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
                text="home.no_accounts"
                variant="title"
                size="small"
                align="center"
              />
              <Text
                text="home.no_accounts_desc"
                variant="label"
                size="medium"
                align="center"
              />
            </View>
            <Button
              variant="outlined"
              title="home.create_account"
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
        )}
      </View>
    </Screen>
  );
};

export default Home;

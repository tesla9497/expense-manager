import React, { useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Swipeable } from "react-native-gesture-handler";
import { useFocusEffect } from "expo-router";
import { BSON } from "realm";
// Components
import {
  Card,
  Container,
  HStack,
  IconButton,
  Screen,
  Text,
  VStack,
  Icon,
} from "@/components/core";
import { Header, SwipeableCard } from "@/components/custom";
import { useTheme } from "@/context";
import {
  getAllTransactionsByAccount,
  useAccountBalance,
  useFetchAccountDetails,
  useTransaction,
  useUserPreference,
  useCategory,
} from "@/database/controllers";
import { Add, Edit } from "@/assets/icons";
import { TransactionType, UserPreferenceType } from "@/types/database";

const AccountDetails = () => {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const { Theme } = useTheme();

  const { userPreference } = useUserPreference();
  const userPreferenceData = React.useMemo(
    () => userPreference[0],
    [userPreference]
  );

  const accountId = new BSON.ObjectId(id?.toString());

  const account = useFetchAccountDetails(accountId);
  const accountBalance = useAccountBalance(account?._id) || 0;
  const { category } = useCategory();
  const isLoading = !account;

  const TransactionFlatlist = ({ account }) => {
    const transactions = getAllTransactionsByAccount(account._id);

    const openRowRef = useRef<Swipeable | null>(null);

    return (
      <FlatList
        style={{ flex: 1 }}
        data={transactions}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={() => (
          <VStack
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 32,
            }}
          >
            <Text
              text="account.details.no_transactions"
              variant="body"
              size="large"
              color={Theme.color.text.tertiary.default}
            />
          </VStack>
        )}
        renderItem={({ item }) => (
          <Transactions
            item={item}
            userPreference={userPreferenceData}
            openRowRef={openRowRef}
          />
        )}
        ListFooterComponent={() => (
          <Text
            text={`Starting Balance: ${userPreferenceData?.currency_symbol}${account.start_balance}`}
            variant="body"
            size="small"
            style={{ padding: 8 }}
            align="right"
          />
        )}
      />
    );
  };

  const Transactions: React.FC<{
    item: TransactionType;
    userPreference: UserPreferenceType;
    openRowRef: React.MutableRefObject<Swipeable | null>;
  }> = ({ item, userPreference, openRowRef }) => {
    if (!item) return null;
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
                  text={`account.details.transaction.${item.transaction_type.toLowerCase()}`}
                  variant="body"
                  size="large"
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
              <VStack spacing={4} style={{ alignItems: "flex-end" }}>
                <Text
                  text={`${
                    item.transaction_type === "Expense"
                      ? "-"
                      : item.transaction_type === "Transfer"
                      ? item.from_account_id.equals(account._id)
                        ? "-"
                        : "+"
                      : "+"
                  }${userPreference?.currency_symbol}${item.amount}`}
                  variant="body"
                  size="large"
                  color={
                    item.transaction_type === "Expense" ||
                    (item.transaction_type === "Transfer" &&
                      item.from_account_id.equals(account._id))
                      ? Theme.color.text.error.primary
                      : Theme.color.text.success.primary
                  }
                />
                <Text
                  text={`${userPreference?.currency_symbol}${
                    item.transaction_type === "Transfer"
                      ? item.from_account_id.equals(account._id)
                        ? item.from_running_balance.toString()
                        : item.to_running_balance.toString()
                      : item.running_balance.toString()
                  }`}
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

  useFocusEffect(
    React.useCallback(() => {
      if (!account) {
        router.back();
      }
    }, [account])
  );

  return (
    <Screen>
      <Container sx={{ flex: 1 }}>
        <Header title="account.details.title" />
        {isLoading ? (
          <Text text="account.details.loading" />
        ) : (
          <>
            <Card
              sx={{
                width: "100%",
                padding: 8,
                rowGap: 8,
                marginBottom: 16,
              }}
              bgColor={Theme.color.background.account[account.color]}
            >
              <Pressable
                onPress={() => router.push(`/account/edit/${account._id}`)}
              >
                <HStack spacing={8}>
                  <View style={{ flex: 1, paddingHorizontal: 4 }}>
                    <Icon name={account.icon} width={50} height={50} />
                  </View>

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
                    <Edit width={20} height={20} />
                  </View>
                </HStack>
                <HStack>
                  <VStack style={{ flex: 1, paddingHorizontal: 4 }}>
                    <Text
                      text={account.name}
                      variant="title"
                      size="medium"
                      color={Theme.color.text.secondary.default}
                    />
                    <Text
                      text={account.account_type}
                      variant="label"
                      size="medium"
                      color={Theme.color.text.secondary.default}
                    />
                  </VStack>
                  <Text
                    text={`${userPreferenceData?.currency_symbol}${accountBalance}`}
                    variant="headline"
                    size="small"
                    color={Theme.color.text.secondary.default}
                  />
                </HStack>
              </Pressable>
            </Card>
            <HStack style={{ width: "100%" }} justify="space-between">
              <Text
                style={{ flex: 1 }}
                text="account.details.transactions"
                variant="title"
                size="medium"
              />
              <IconButton
                onPress={() =>
                  router.push({
                    pathname: "/transfer/create_transfer",
                    params: { account_id: account._id.toString() },
                  })
                }
              >
                <Add />
              </IconButton>
            </HStack>
            <TransactionFlatlist account={account} />
          </>
        )}
      </Container>
    </Screen>
  );
};

export default AccountDetails;

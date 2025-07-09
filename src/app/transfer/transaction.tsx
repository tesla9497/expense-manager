import React from "react";
import { FlatList, ScrollView, useWindowDimensions, View } from "react-native";
import { useRealm } from "@realm/react";
import { BSON } from "realm";
import { useTranslation } from "react-i18next";
// Components
import {
  BottomSheet,
  Button,
  Card,
  Container,
  DatePick,
  Divider,
  HStack,
  IconButton,
  Screen,
  Text,
  VStack,
  Icon,
} from "@/components/core";
import { Header } from "@/components/custom";
import {
  fetchTransactionAmountWithDate,
  useAccounts,
  useFetchAccountDetails,
  useUserPreference,
  useCategory,
} from "@/database/controllers";
import { useTheme } from "@/context";
import { TransactionType, UserPreferenceType } from "@/types/database";
import { Calendar, Filter } from "@/assets/icons";
import { RangeSlider } from "@/components/core/MultiSlider";
import { getLargestTransactionAmount } from "@/database/controllers/Transaction";
import { BottomSheetRef } from "@/types/components.core";

const defaultFilters = {
  startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  sort_by: "Date Desc",
  trasaction_type: "All",
  category: "All",
  subcategory: "All",
  amount: {
    min: 0,
    max: null,
  },
  account: "All",
};

const Transaction = () => {
  const realm = useRealm();
  const { Theme } = useTheme();
  const bottomSheetRef = React.useRef<BottomSheetRef>(null);
  const { t } = useTranslation();

  const { height: screenHeight } = useWindowDimensions();

  const [recentTransactions, setRecentTransactions] = React.useState<
    TransactionType[]
  >([]);
  const [filters, setFilters] = React.useState(defaultFilters);
  const [tempFilters, setTempFilters] = React.useState(defaultFilters);

  const { userPreference } = useUserPreference();
  const userPreferenceData = React.useMemo(
    () => userPreference[0],
    [userPreference]
  );

  const { accounts } = useAccounts();
  const { category } = useCategory();
  React.useEffect(() => {
    const maxAmount = getLargestTransactionAmount(realm);
    const filteredTransactions = fetchTransactionAmountWithDate(
      realm,
      filters.startDate,
      filters.endDate
    );
    setTempFilters((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        max: maxAmount,
      },
    }));
    setFilters((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        max: Number(filteredTransactions.max("amount")),
      },
    }));
  }, []);

  React.useEffect(() => {
    const filteredTransactions = fetchTransactionAmountWithDate(
      realm,
      filters.startDate,
      filters.endDate
    );
    setRecentTransactions(Array.from(filteredTransactions));
  }, [filters]);

  const maxTransactionAmount =
    Number(getLargestTransactionAmount(realm)) || 10000;

  const transactions = React.useMemo(() => {
    let filteredTransactions = fetchTransactionAmountWithDate(
      realm,
      filters.startDate,
      filters.endDate
    );

    if (filters.account !== "All") {
      filteredTransactions = filteredTransactions.filtered(
        "account_id == $0 || from_account_id == $0 || to_account_id == $0",
        new BSON.ObjectId(filters.account)
      );
    }

    if (filters.trasaction_type !== "All") {
      filteredTransactions = filteredTransactions.filtered(
        "transaction_type == $0",
        filters.trasaction_type
      );
    }

    if (filters.category !== "All") {
      filteredTransactions = filteredTransactions.filtered(
        "category == $0",
        new BSON.ObjectId(filters.category)
      );
    }

    if (filters.subcategory !== "All") {
      filteredTransactions = filteredTransactions.filtered(
        "sub_category == $0",
        filters.subcategory
      );
    }

    if (filters.amount.min !== 0) {
      filteredTransactions = filteredTransactions.filtered(
        "amount >= $0",
        filters.amount.min
      );
    }

    if (filters.amount.max !== maxTransactionAmount) {
      filteredTransactions = filteredTransactions.filtered(
        "amount <= $0",
        filters.amount.max
      );
    }

    switch (filters.sort_by) {
      case "Date Asc":
        filteredTransactions = filteredTransactions.sorted("date");
        break;
      case "Date Desc":
        filteredTransactions = filteredTransactions.sorted("date", true);
        break;
      case "Amount Asc":
        filteredTransactions = filteredTransactions.sorted("amount");
        break;
      case "Amount Desc":
        filteredTransactions = filteredTransactions.sorted("amount", true);
        break;
    }

    return Array.from(filteredTransactions);
  }, [filters]);

  const totalExpense = React.useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.transaction_type === "Expense")
        .reduce((total, transaction) => total + transaction.amount, 0),
    [recentTransactions, transactions]
  );

  const totalIncome = React.useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.transaction_type === "Income")
        .reduce((total, transaction) => total + transaction.amount, 0),
    [recentTransactions, transactions]
  );

  const RecentTransactions: React.FC<{
    item: TransactionType;
    userPreference: UserPreferenceType;
  }> = ({ item, userPreference }) => {
    if (!item) return null;
    const accountDetails = useFetchAccountDetails(item.account_id);

    return (
      <Card
        sx={{
          padding: 8,
          width: "100%",
        }}
        bgColor={Theme.color.background.transaction.primary}
      >
        <HStack spacing={8}>
          <View style={{ width: 50, height: 50 }}>
            <Icon
              name={
                item.category
                  ? category.find((itm) => itm._id.equals(item.category))?.icon
                  : "Others"
              }
              width={50}
              height={50}
            />
          </View>
          <VStack style={{ flex: 1 }}>
            <Text text={item.transaction_type} variant="body" size="large" />
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
                item.transaction_type === "Transfer"
                  ? ""
                  : item.transaction_type === "Expense"
                  ? "-"
                  : "+"
              }${userPreference?.currency_symbol}${item.amount}`}
              variant="body"
              size="large"
              color={
                item.transaction_type === "Transfer"
                  ? Theme.color.text.primary.default
                  : item.transaction_type === "Expense"
                  ? Theme.color.text.error.primary
                  : Theme.color.text.success.primary
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
      </Card>
    );
  };

  return (
    <Screen>
      <Container>
        <Header title="transaction.list.title" />
        <View>
          <HStack
            style={{ width: "100%", paddingBottom: 8 }}
            align="center"
            justify="space-between"
          >
            <Text
              text={`${filters.startDate?.toLocaleDateString()} - ${filters.endDate?.toLocaleDateString()}`}
              variant="title"
              size="medium"
            />
            <IconButton onPress={() => bottomSheetRef.current?.open()}>
              <Filter />
            </IconButton>
          </HStack>
          <VStack style={{ width: "100%", paddingVertical: 8 }} spacing={4}>
            <HStack spacing={1}>
              <Text
                text="transaction.list.total.expense"
                variant="title"
                size="small"
                style={{ minWidth: 100 }}
              />
              <Text text=" - " variant="title" size="medium" />
              <Text
                text={`${
                  userPreferenceData?.currency_symbol
                }${totalExpense?.toFixed(2)}`}
                variant="title"
                size="medium"
                color={Theme.color.background.navicon.primary}
              />
            </HStack>
            <HStack spacing={1}>
              <Text
                text="transaction.list.total.income"
                variant="title"
                size="small"
                style={{ minWidth: 100 }}
              />
              <Text text=" - " variant="title" size="medium" />
              <Text
                text={`${
                  userPreferenceData?.currency_symbol
                }${totalIncome?.toFixed(2)}`}
                variant="title"
                size="medium"
                color={Theme.color.background.success.secondary}
              />
            </HStack>
          </VStack>
        </View>
      </Container>
      <Divider />

      <Container sx={{ flex: 1 }}>
        {transactions?.length > 0 && (
          <FlatList
            style={{ flex: 1 }}
            scrollEventThrottle={16}
            data={transactions}
            keyExtractor={(item) => item._id?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 16 }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            renderItem={({ item }) => (
              <RecentTransactions
                item={item}
                userPreference={userPreferenceData}
              />
            )}
          />
        )}
      </Container>
      <BottomSheet
        ref={bottomSheetRef}
        padding={16}
        style={{ height: screenHeight * 0.9 }}
      >
        <View style={{ flex: 1, width: "100%" }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <HStack
              justify="space-between"
              style={{ width: "100%", marginBottom: 12 }}
            >
              <Text
                text="transaction.list.filter.title"
                variant="headline"
                size="small"
              />
              <Button
                variant="outlined"
                title="transaction.list.filter.reset"
                onPress={() => {
                  setFilters({
                    ...defaultFilters,
                    amount: {
                      ...defaultFilters.amount,
                      max: Number(maxTransactionAmount),
                    },
                  });
                  setTempFilters({
                    ...defaultFilters,
                    amount: {
                      ...defaultFilters.amount,
                      max: Number(maxTransactionAmount),
                    },
                  });
                  bottomSheetRef.current?.close();
                }}
                style={{
                  paddingVertical: 2,
                  borderWidth: 1.2,
                  backgroundColor: Theme.color.button.primary.hovered + "60",
                }}
                color={Theme.color.button.primary.default}
              />
            </HStack>
            <VStack spacing={8}>
              <Text
                text="transaction.list.filter.account"
                variant="title"
                size="large"
              />
              <HStack spacing={8} scrollable>
                {[
                  { _id: "All", name: "All" },
                  ...recentTransactions
                    .flatMap((item) => [
                      item.account_id
                        ? accounts?.find((account) =>
                            account._id?.equals(item.account_id)
                          )
                        : null,
                      item.from_account_id
                        ? accounts?.find((account) =>
                            account._id?.equals(item.from_account_id)
                          )
                        : null,
                      item.to_account_id
                        ? accounts?.find((account) =>
                            account._id?.equals(item.to_account_id)
                          )
                        : null,
                    ])
                    .filter(
                      (account): account is NonNullable<typeof account> =>
                        account !== null && account !== undefined
                    )
                    .filter(
                      (value, index, self) =>
                        self.findIndex(
                          (t) => t._id?.toString() === value._id?.toString()
                        ) === index
                    ),
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    color={
                      tempFilters.account === item._id?.toString()
                        ? Theme.color.background.success.secondary
                        : Theme.color.button.primary.default
                    }
                    title={item.name}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor:
                        tempFilters.account === item._id?.toString()
                          ? `${Theme.color.background.success.secondary}30`
                          : "transparent",
                    }}
                    onPress={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        account: item._id?.toString(),
                      }))
                    }
                  />
                ))}
              </HStack>
            </VStack>
            <VStack spacing={8}>
              <Text
                text="transaction.list.filter.type"
                variant="title"
                size="large"
              />
              <HStack spacing={8} scrollable>
                {["All", "Transfer", "Expense", "Income"].map((item, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    color={
                      tempFilters.trasaction_type === item
                        ? Theme.color.background.success.secondary
                        : Theme.color.button.primary.default
                    }
                    title={t(
                      `transaction.list.filter.types.${item.toLowerCase()}`
                    )}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor:
                        tempFilters.trasaction_type === item
                          ? `${Theme.color.background.success.secondary}30`
                          : "transparent",
                    }}
                    onPress={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        trasaction_type: item,
                      }))
                    }
                  />
                ))}
              </HStack>
            </VStack>
            <VStack spacing={8}>
              <Text
                text="transaction.list.filter.category"
                variant="title"
                size="large"
              />
              <HStack spacing={8} scrollable>
                {[
                  { category: "All" },
                  ...Array.from(
                    new Set(
                      recentTransactions
                        .map((item) => item.category)
                        .filter((item) => item !== null && item !== undefined)
                        .filter((catId) =>
                          category?.some((cat) => cat?._id?.equals(catId))
                        )
                    )
                  ).map((category) => ({ category })),
                ]?.map((item) => (
                  <Button
                    key={item.category?.toString()}
                    variant="outlined"
                    color={
                      tempFilters.category === item.category?.toString()
                        ? Theme.color.background.success.secondary
                        : Theme.color.button.primary.default
                    }
                    title={
                      item.category === "All"
                        ? "All"
                        : category.find(
                            (itm) =>
                              itm._id.toString() === item.category?.toString()
                          )?.name
                    }
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor:
                        tempFilters.category === item.category?.toString()
                          ? `${Theme.color.background.success.secondary}30`
                          : "transparent",
                    }}
                    onPress={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        category:
                          item.category === "All"
                            ? "All"
                            : category
                                .find((itm) => itm._id.equals(item.category))
                                ?._id?.toString(),
                      }))
                    }
                  />
                ))}
              </HStack>
            </VStack>
            <VStack spacing={8}>
              <Text
                text="transaction.list.filter.amount"
                variant="title"
                size="large"
              />
              <HStack spacing={8}>
                <RangeSlider
                  values={[
                    tempFilters.amount.min,
                    tempFilters.amount.max || Number(maxTransactionAmount),
                  ]}
                  min={0}
                  max={Number(maxTransactionAmount)}
                  onValuesChange={(value) => {
                    setTempFilters((prev) => ({
                      ...prev,
                      amount: {
                        min: value[0],
                        max: value[1],
                      },
                    }));
                  }}
                />
              </HStack>
            </VStack>
            <VStack spacing={8}>
              <Text
                text={t("transaction.list.filter.date")}
                variant="title"
                size="large"
              />
              <DatePick
                label={t("transaction.list.filter.date_picker.start.label")}
                placeholder={t(
                  "transaction.list.filter.date_picker.start.placeholder"
                )}
                type="date"
                variant="outlined"
                date={tempFilters.startDate}
                onDateChange={(date) =>
                  setTempFilters((prev) => ({ ...prev, startDate: date }))
                }
                rightIcon={<Calendar width={20} height={20} />}
              />
              <DatePick
                label={t("transaction.list.filter.date_picker.end.label")}
                placeholder={t(
                  "transaction.list.filter.date_picker.end.placeholder"
                )}
                type="date"
                variant="outlined"
                date={tempFilters.endDate}
                onDateChange={(date) =>
                  setTempFilters((prev) => ({ ...prev, endDate: date }))
                }
                rightIcon={<Calendar width={20} height={20} />}
              />
            </VStack>
            <VStack spacing={8} style={{ marginBottom: 16 * 2 }}>
              <Text
                text="transaction.list.filter.sort.title"
                variant="title"
                size="large"
              />
              <HStack spacing={8} scrollable>
                {[
                  t("transaction.list.filter.sort.date_asc"),
                  t("transaction.list.filter.sort.date_desc"),
                  t("transaction.list.filter.sort.amount_asc"),
                  t("transaction.list.filter.sort.amount_desc"),
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    color={
                      tempFilters.sort_by === item
                        ? Theme.color.background.success.secondary
                        : Theme.color.button.primary.default
                    }
                    title={item}
                    style={{
                      flex: 1,
                      backgroundColor:
                        tempFilters.sort_by === item
                          ? `${Theme.color.background.success.secondary}30`
                          : "transparent",
                    }}
                    onPress={() =>
                      setTempFilters((prev) => ({ ...prev, sort_by: item }))
                    }
                  />
                ))}
              </HStack>
            </VStack>
            <Divider />
            <HStack spacing={8} style={{ marginTop: 16 * 2 }}>
              <Button
                title="transaction.list.filter.apply"
                textParams={{ count: "(6)" }}
                variant="contained"
                color={Theme.color.button.primary.default}
                style={{ flex: 1, gap: 8 }}
                rightIcon={<Filter width={20} height={20} color="white" />}
                onPress={() => {
                  setFilters(tempFilters);
                  bottomSheetRef.current?.close();
                }}
              />
            </HStack>
          </ScrollView>
        </View>
      </BottomSheet>
    </Screen>
  );
};

export default Transaction;

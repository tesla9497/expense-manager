import React from "react";
import { BSON } from "realm";
import { ScrollView, View } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useRealm } from "@realm/react";
import { useTranslation } from "react-i18next";
// Components
import {
  Button,
  Card,
  Chip,
  Container,
  HStack,
  Input,
  Screen,
  Switch,
  Text,
  Icon,
} from "@/components/core";
import {
  Header,
  AmountInput,
  SelectionBottomSheet,
  CreateCategoryModal,
} from "@/components/custom";
import { useTheme } from "@/context";
import { DownArrow } from "@assets/icons/DownArrow";
import { Calendar } from "@assets/icons/Calendar";
import { DatePick } from "@/components/core/DatePicker";
import { AccountType, TransactionType } from "@/types/database";
import {
  useAccounts,
  useTransaction,
  useGeneralSettings,
  useTransactionById,
} from "@/database/controllers";
import { getNextAvailableTime } from "@/database/controllers/Transaction";
import { useCategory } from "@/database/controllers/Category";
import { BottomSheetRef } from "@/types/components.core";

const UpdateTransfer = () => {
  const router = useRouter();
  const { Theme } = useTheme();
  const realm = useRealm();
  const { id } = useGlobalSearchParams();
  const { t } = useTranslation();

  const categorySheetRef = React.useRef<BottomSheetRef>(null);

  const { settings } = useGeneralSettings();
  const { accounts, getAccountDetails } = useAccounts();
  const {
    fetchtPreviousTransaction,
    addTransaction,
    updateRunningBalanceOfTransactions,
  } = useTransaction();
  const { category, addCategory } = useCategory();

  const EXPENSE_CATEGORIES = category.filter((item) => item.type === "Expense");
  const INCOME_CATEGORIES = category.filter((item) => item.type === "Income");

  const generalSettingData = React.useMemo(() => {
    return settings[0];
  }, [settings]);

  const objectId = React.useMemo(() => {
    return typeof id === "string" ? new BSON.ObjectId(id) : null;
  }, [id]);

  const transaction = useTransactionById(objectId) || null;

  const cleanTransaction = React.useMemo(() => {
    if (!transaction) return null;
    const { _id, ...rest } = transaction;

    return {
      ...rest,
      running_balance: null,
      to_running_balance: null,
      from_running_balance: null,
      date: new Date(),
      created: new Date(),
      modified: new Date(),
    };
  }, [transaction]);

  const [transferData, setTransferData] = React.useState<TransactionType>(
    cleanTransaction || {
      account_id: generalSettingData.defaultAccount || accounts[0]?._id,
      to_account_id: null,
      from_account_id: null,
      transaction_type: "Expense",
      amount: null,
      description: "",
      category: generalSettingData.defaultCategory
        ? new BSON.ObjectId(generalSettingData.defaultCategory)
        : null,
      subcategory: null,
      iscleared: true,
      running_balance: null,
      to_running_balance: null,
      from_running_balance: null,
      date: new Date(),
      created: new Date(),
      modified: new Date(),
    }
  );
  const [selectedData, setSelectedData] = React.useState("category");
  const [isCategoryModalVisible, setIsCategoryModalVisible] =
    React.useState(false);

  React.useEffect(() => {
    if (transferData.transaction_type !== "Transfer") {
      if (transaction.transaction_type === transferData.transaction_type) {
        return setTransferData((prev) => ({
          ...prev,
          category: transaction.category,
        }));
      }

      setTransferData((prev) => ({
        ...prev,
        category: generalSettingData.defaultCategory,
      }));
    }
  }, [transferData.transaction_type]);

  React.useEffect(() => {
    if (cleanTransaction) {
      setTransferData(cleanTransaction);
    }
  }, [cleanTransaction]);

  React.useEffect(() => {
    if (transferData.transaction_type !== "Transfer") {
      if (transferData.account_id) {
        const memorisedAccountData = getAccountDetails(transferData.account_id);
        const accountCreatedDate = new Date(memorisedAccountData?.date);

        const isCurrentDateLessThanAccountDate =
          accountCreatedDate > new Date();
        if (isCurrentDateLessThanAccountDate) {
          const accpountCreatedTime = new Date(accountCreatedDate).getHours();
          const newTimeWithGreaterTime = new Date(accountCreatedDate).setHours(
            accpountCreatedTime + 1,
            0,
            0,
            0
          );
          setTransferData((prev) => ({
            ...prev,
            date: new Date(newTimeWithGreaterTime),
          }));
        }
      }
    } else {
      if (transferData.from_account_id && transferData.to_account_id) {
        const memorizedFromAccountData = getAccountDetails(
          transferData.from_account_id
        );
        const memorizedToAccountData = getAccountDetails(
          transferData.to_account_id
        );

        const fromAccountDate = new Date(memorizedFromAccountData?.date);
        const toAccountDate = new Date(memorizedToAccountData?.date);

        const laterAccountDate =
          fromAccountDate > toAccountDate ? fromAccountDate : toAccountDate;

        if (laterAccountDate > new Date()) {
          const accountCreatedTime = new Date(laterAccountDate).getHours();
          const newTimeWithGreaterTime = new Date(laterAccountDate).setHours(
            accountCreatedTime + 1,
            0,
            0,
            0
          );
          const nextAvailableTime = getNextAvailableTime(
            realm,
            new Date(newTimeWithGreaterTime),
            transferData.from_account_id
          );
          setTransferData((prev) => ({
            ...prev,
            date: new Date(nextAvailableTime),
          }));
        }
      }
    }
  }, [
    transferData.account_id,
    transferData.to_account_id,
    transferData.from_account_id,
  ]);

  const handleTransferData = (key: string, value: any) => {
    setTransferData((prev) => ({ ...prev, [key]: value }));
  };

  const TRANSFER_VARIANTS = React.useMemo(() => {
    const baseVariants = [
      {
        label: "Expense",
        icon: "Expense",
        iconColor: Theme.color.background.fail.primary,
      },
      {
        label: "Income",
        icon: "Income",
        iconColor: Theme.color.background.success.primary,
      },
    ];

    if (accounts.length > 1) {
      baseVariants.push({
        label: "Transfer",
        icon: "TransferNew",
        iconColor: Theme.color.background.link.primary,
      });
    }

    return baseVariants;
  }, [accounts]);

  const handleCategorySelection = (type: string) => {
    const timeoutId = setTimeout(() => {
      setSelectedData(type);
      categorySheetRef.current?.open();
    }, 0);

    return () => clearTimeout(timeoutId);
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    const accountCreatedDate = accounts.find((item) =>
      item._id.equals(transferData.account_id)
    )?.date;

    let finalDate = new Date(date);

    // Check if date is before account creation
    if (accountCreatedDate && finalDate <= accountCreatedDate) {
      const accountCreatedTime = new Date(accountCreatedDate).getHours();
      finalDate = new Date(accountCreatedDate);
      finalDate.setHours(accountCreatedTime + 1, 0, 0, 0);
    }

    // Get next available time slot
    if (transferData.transaction_type === "Transfer") {
      if (transferData.from_account_id && transferData.to_account_id) {
        const fromDate = getNextAvailableTime(
          realm,
          finalDate,
          transferData.from_account_id
        );
        const toDate = getNextAvailableTime(
          realm,
          fromDate,
          transferData.to_account_id
        );

        finalDate = toDate;
      }
    } else {
      if (transferData.account_id) {
        finalDate = getNextAvailableTime(
          realm,
          finalDate,
          transferData.account_id
        );
      }
    }
    handleTransferData("date", finalDate);
  };

  const handleCreateTransaction = async () => {
    if (!transferData.amount) {
      return;
    }

    const transactionAmount = parseFloat(transferData.amount.toString());

    if (
      transferData.transaction_type === "Income" ||
      transferData.transaction_type === "Expense"
    ) {
      if (!transferData.account_id) {
        return;
      }
      const previousBalance =
        fetchtPreviousTransaction(transferData.account_id, transferData.date) ||
        0;
      const updatedBalance =
        transferData.transaction_type === "Income"
          ? (previousBalance as number) + transactionAmount
          : (previousBalance as number) - transactionAmount;
      addTransaction({
        ...transferData,
        from_account_id: null,
        to_account_id: null,
        from_running_balance: null,
        to_running_balance: null,
        amount: transactionAmount,
        running_balance: updatedBalance,
      });

      updateRunningBalanceOfTransactions(
        transferData.account_id,
        transferData.date,
        updatedBalance
      );
    }

    if (transferData.transaction_type === "Transfer") {
      if (!transferData.from_account_id || !transferData.to_account_id) {
        return;
      }

      const fromAccountBalance =
        fetchtPreviousTransaction(
          transferData.from_account_id,
          transferData.date
        ) || 0;
      const toAccountBalance =
        fetchtPreviousTransaction(
          transferData.to_account_id,
          transferData.date
        ) || 0;

      const updatedFromBalance =
        (fromAccountBalance as number) - transactionAmount;
      const updatedToBalance = (toAccountBalance as number) + transactionAmount;
      addTransaction({
        ...transferData,
        account_id: null,
        running_balance: null,
        amount: Number(transactionAmount),
        transaction_type: "Transfer",
        from_account_id: transferData.from_account_id,
        to_account_id: transferData.to_account_id,
        from_running_balance: updatedFromBalance,
        to_running_balance: updatedToBalance,
      });

      await updateRunningBalanceOfTransactions(
        transferData.from_account_id,
        transferData.date,
        updatedFromBalance
      );
      await updateRunningBalanceOfTransactions(
        transferData.to_account_id,
        transferData.date,
        updatedToBalance
      );
    }

    router.back();
  };

  const handleAddCategory = (category: {
    name: string;
    type: "Income" | "Expense";
    icon: string;
  }) => {
    addCategory({
      name: category.name,
      icon: category.icon,
      type: category.type,
      custom: true,
      created: new Date(),
      modified: new Date(),
    });
    setIsCategoryModalVisible(false);
  };

  return (
    <Screen>
      <Container>
        <Header title="transaction.create.title" />
      </Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container sx={{ flex: 1, paddingBottom: 16 }}>
          <HStack
            style={{
              width: "100%",
              padding: 4,
              backgroundColor: Theme.color.base.secondary,
              borderRadius: Theme.border.radius.x10,
              marginBottom: 12,
            }}
            spacing={8}
          >
            {TRANSFER_VARIANTS.map((item) => (
              <Chip
                key={item.label}
                leftIcon={
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: Theme.border.radius.x10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: item.iconColor,
                    }}
                  >
                    <Icon
                      name={item.icon}
                      width={22}
                      height={22}
                      color={Theme.color.text.secondary.default}
                    />
                  </View>
                }
                label={t(`transaction.create.type.${item.label.toLowerCase()}`)}
                bgColor={
                  transferData.transaction_type === item.label
                    ? item.iconColor
                    : "transparent"
                }
                textColor={
                  transferData.transaction_type === item.label
                    ? Theme.color.text.secondary.default
                    : Theme.color.text.primary.default
                }
                style={{ flex: 1 }}
                onPress={() =>
                  handleTransferData("transaction_type", item.label)
                }
              />
            ))}
          </HStack>
          <AmountInput
            title={`transaction.create.amount.title.${transferData.transaction_type.toLowerCase()}`}
            amount={transferData.amount?.toString() || ""}
            onchangeAmount={(text: string) =>
              handleTransferData("amount", text || null)
            }
          />
          {transferData.transaction_type === "Transfer" && (
            <>
              <Input
                label="transaction.create.account.from.label"
                placeholder="transaction.create.account.from.placeholder"
                editable={false}
                inputRootStyle={{ flex: 1 }}
                onTouchEnd={() => handleCategorySelection("from_account_id")}
                value={
                  accounts.find((item) =>
                    item._id.equals(transferData.from_account_id)
                  )?.name
                }
                rightIcon={<DownArrow width={20} height={20} />}
                textStyle={{ color: Theme.color.text.primary.default }}
              />
              <Input
                label="transaction.create.account.to.label"
                placeholder="transaction.create.account.to.placeholder"
                editable={false}
                inputRootStyle={{ flex: 1 }}
                onTouchEnd={() => handleCategorySelection("to_account_id")}
                value={
                  accounts.find((item) =>
                    item._id.equals(transferData.to_account_id)
                  )?.name
                }
                rightIcon={<DownArrow width={20} height={20} />}
                textStyle={{ color: Theme.color.text.primary.default }}
              />
            </>
          )}
          <DatePick
            label="transaction.create.date.label"
            placeholder="transaction.create.date.placeholder"
            type="date"
            minDate={
              transferData.transaction_type === "Transfer"
                ? transferData.from_account_id && transferData.to_account_id
                  ? new Date(
                      Math.max(
                        new Date(
                          accounts.find((item) =>
                            item._id.equals(transferData.from_account_id)
                          )?.date || 0
                        ).getTime(),
                        new Date(
                          accounts.find((item) =>
                            item._id.equals(transferData.to_account_id)
                          )?.date || 0
                        ).getTime()
                      )
                    )
                  : undefined
                : accounts.find((item) =>
                    item._id.equals(transferData.account_id)
                  )?.date
            }
            date={transferData.date}
            onDateChange={handleDateChange}
            rightIcon={<Calendar width={20} height={20} />}
          />

          <HStack spacing={12}>
            {transferData.transaction_type !== "Transfer" && (
              <Input
                label="transaction.create.category.label"
                placeholder="transaction.create.category.placeholder"
                editable={false}
                inputRootStyle={{ flex: 1 }}
                onTouchEnd={() => handleCategorySelection("category")}
                value={
                  transferData.transaction_type === "Income"
                    ? transferData.category
                      ? INCOME_CATEGORIES.find((item) =>
                          item._id.equals(transferData.category)
                        )?.name
                      : ""
                    : transferData.category
                    ? EXPENSE_CATEGORIES.find((item) =>
                        item._id.equals(transferData.category)
                      )?.name
                    : ""
                }
                rightIcon={<DownArrow width={20} height={20} />}
                textStyle={{ color: Theme.color.text.primary.default }}
              />
            )}
          </HStack>
          {transferData.transaction_type !== "Transfer" && (
            <Input
              label="transaction.create.account.label"
              placeholder="transaction.create.account.placeholder"
              rightIcon={<DownArrow width={20} height={20} />}
              editable={false}
              onTouchEnd={() => handleCategorySelection("account_id")}
              value={
                accounts.find((item) =>
                  item._id.equals(transferData.account_id)
                )?.name
              }
              textStyle={{ color: Theme.color.text.primary.default }}
            />
          )}
          <Card
            bgColor={Theme.color.base.secondary}
            sx={{ padding: 8, marginBottom: 12 }}
          >
            <HStack spacing={4} align="flex-end">
              <Text
                text="transaction.create.cleared"
                variant="label"
                size="large"
              />
              <Switch
                value={transferData.iscleared}
                onValueChange={(newValue) =>
                  handleTransferData("iscleared", newValue)
                }
                thumbColor={
                  transferData.iscleared
                    ? Theme.color.text.secondary.default
                    : Theme.color.text.tertiary.default
                }
                inactiveColor={
                  transferData.iscleared
                    ? Theme.color.background.success.primary
                    : Theme.color.text.secondary.default
                }
              />
            </HStack>
          </Card>
          <Input
            label="transaction.create.note.label"
            placeholder="transaction.create.note.placeholder"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={transferData.description}
            onChangeText={(text) => handleTransferData("description", text)}
          />
          <Button
            title="transaction.create.button"
            fullWidth
            disabled={
              (transferData?.amount && transferData.amount === null) ||
              (transferData.transaction_type !== "Transfer"
                ? !transferData.account_id
                : !transferData.from_account_id || !transferData.to_account_id)
            }
            onPress={handleCreateTransaction}
          />
        </Container>
      </ScrollView>
      <SelectionBottomSheet
        title={
          selectedData === "category"
            ? "transaction.create.category.title"
            : "transaction.create.account.label"
        }
        onAdd={() => setIsCategoryModalVisible(true)}
        data={
          selectedData === "category"
            ? (transferData.transaction_type === "Income"
                ? INCOME_CATEGORIES
                : EXPENSE_CATEGORIES
              ).map(({ _id, name, icon }) => ({ _id, name, icon }))
            : selectedData === "from_account_id"
            ? accounts.filter(
                (account) => !account._id.equals(transferData.to_account_id)
              )
            : selectedData === "to_account_id"
            ? accounts.filter(
                (account) => !account._id.equals(transferData.from_account_id)
              )
            : accounts.map((account) => ({
                ...account,
              }))
        }
        ref={categorySheetRef}
        selected={transferData[selectedData]}
        onTouchEnd={(item: AccountType) => {
          handleTransferData(selectedData, item._id);
          categorySheetRef.current?.close();
        }}
      />
      <CreateCategoryModal
        visible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
        onSave={handleAddCategory}
        initialData={{
          name: "",
          type:
            transferData.transaction_type === "Income" ? "Income" : "Expense",
          icon: "",
        }}
      />
    </Screen>
  );
};

export default UpdateTransfer;

import React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
// Components
import {
  Button,
  Card,
  Container,
  DatePick,
  HStack,
  Input,
  Text,
  VStack,
  Icon,
} from "@/components/core";
import { useTheme } from "@/context";
import { AmountInput, Header } from "@/components/custom";
import { Badge, Calendar, Handshake, Tick } from "@/assets/icons";
import { useAccounts } from "@/database/controllers";
import { ACCOUNT_TYPES } from "@/database/static/account_types";

const AccountCreation = () => {
  const router = useRouter();
  const { Theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  // Database
  const { accounts, addAccount } = useAccounts();

  const [accountName, setAccountName] = React.useState("");
  const [startBalance, setStartBalance] = React.useState("");
  const [accountType, setAccountType] = React.useState(ACCOUNT_TYPES[0]);
  const [accountColor, setAccountColor] = React.useState("blue");
  const [date, setData] = React.useState(new Date());

  const resetForm = () => {
    setAccountName("");
    setStartBalance("");
    setAccountType(ACCOUNT_TYPES[0]);
    setAccountColor("blue");
    setData(new Date());
  };

  const paddingTop = insets.top !== 0 ? insets.top + 10 : 30;

  const handleCreateAccount = () => {
    const newAccount = {
      name: accountName,
      start_balance: parseFloat(startBalance),
      account_type: accountType.name,
      icon: accountType.icon,
      color: accountColor,
      date: date,
      created: new Date(),
      modified: new Date(),
    };
    addAccount(newAccount);
    resetForm();
    if (accounts.length <= 0) {
      router.replace("/account/success");
    } else {
      router.back();
    }
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Theme.color.base.primary,
        }}
      >
        <View
          style={{
            flex: 1,
            minHeight: height,
            paddingTop: accounts.length !== 0 ? paddingTop : 0,
          }}
        >
          {accounts.length !== 0 && (
            <Container>
              <Header title="account.create.title" />
            </Container>
          )}
          {accounts.length === 0 && (
            <Container
              sx={{
                paddingBottom: 8,
                paddingTop: insets.top !== 0 ? insets.top + 10 : 30,
                backgroundColor: Theme.color.base.secondary,
                borderBottomLeftRadius: Theme.border.radius.x6,
                borderBottomRightRadius: Theme.border.radius.x6,
              }}
            >
              <HStack align="flex-end">
                <Link href="/home">
                  <Text
                    text="account.create.skip"
                    color={Theme.color.text.linktext.primary}
                  />
                </Link>
              </HStack>
              <View>
                <HStack spacing={8} justify="center">
                  <Text text="Welcome," variant="headline" size="large" />
                  <Handshake width={40} height={40} />
                </HStack>
                <Text
                  text="account.create.subtitle1"
                  variant="headline"
                  size="large"
                />
              </View>
              <HStack spacing={8} justify="center" style={{ marginTop: 4 }}>
                <Badge />
                <Text
                  text="account.create.subtitle2"
                  variant="label"
                  size="medium"
                />
              </HStack>
            </Container>
          )}
          <AmountInput
            title="account.create.amount_input_title"
            amount={startBalance}
            onchangeAmount={setStartBalance}
          />
          <Container sx={{ paddingTop: 16 }}>
            <Input
              label="account.create.name_label"
              placeholder="account.create.name_placeholder"
              fullWidth
              value={accountName}
              onChangeText={(text) => setAccountName(text)}
            />
            <DatePick
              label="account.create.date_label"
              placeholder="account.create.date_placeholder"
              type="date"
              date={date}
              onDateChange={(newdate) => setData(newdate)}
              rightIcon={<Calendar width={20} height={20} />}
            />
            <Text
              text="account.create.type_label"
              variant="label"
              size="medium_promenent"
              color={Theme.color.text.primary.default}
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
                    text={item.name || "account.create.unknown"}
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
                text="account.create.color_label"
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
              title="account.create.create_button"
              fullWidth
              disabled={!accountName || !startBalance}
              style={{ marginTop: 24 }}
              onPress={handleCreateAccount}
            />
          </Container>
        </View>
      </ScrollView>
    </>
  );
};

export default AccountCreation;

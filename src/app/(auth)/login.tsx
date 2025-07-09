import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Link, useRouter } from "expo-router";
// Components
import {
  Screen,
  Button,
  HStack,
  Text,
  Card,
  Input,
  Divider,
  IconButton,
} from "@/components/core";
import { useTheme } from "@/context";
import { EyeClose, EyeOpen, Mail, Password } from "@/assets/icons";
import { useUserDatabase } from "@/database/controllers";
import { APP_INFO } from "@/config/appInfo";

const Login = () => {
  const router = useRouter();
  const { Theme } = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const { createUser } = useUserDatabase();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const newUser = {
    name: "Guest",
    email: "",
    avatar: "",
    role: "guest",
    created: new Date(),
    modified: new Date(),
  };

  const handleSkip = () => {
    createUser(newUser);
    router.replace("/account/account_creation");
  };

  const handleLogin = () => {};

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: "center", padding: 16, rowGap: 16 }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingBottom: 32,
          }}
        >
          <HStack align="flex-end" style={{ paddingBottom: "20%" }}>
            <Button
              variant="text"
              title="login.skip"
              color={Theme.color.text.linktext.primary}
              onPress={handleSkip}
            />
          </HStack>
          <Text
            variant="body"
            size="large"
            text="login.welcome"
            params={{ app_name: APP_INFO.appName }}
            style={{ width: "70%" }}
            align="center"
          />
        </View>
        <Divider />
        <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}>
          <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
            <Text
              text="login.title"
              variant="title"
              size="large"
              align="center"
              style={{ textTransform: "uppercase" }}
            />
            <Card
              bgColor={Theme.color.base.secondary}
              sx={{ width: "100%", padding: 16 }}
            >
              <Input
                label="login.email.label"
                placeholder="login.email.placeholder"
                fullWidth
                leftIcon={<Mail />}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="login.password.label"
                placeholder="login.password.placeholder"
                leftIcon={<Password />}
                rightIcon={
                  <IconButton onPress={handleTogglePassword}>
                    {showPassword ? <EyeClose /> : <EyeOpen />}
                  </IconButton>
                }
                secureTextEntry={showPassword}
                fullWidth
              />
              <Text
                text="login.forgot_password"
                color={Theme.color.text.linktext.primary}
                align="right"
              />
              <Button
                title="login.login_button"
                fullWidth
                variant="contained"
                onPress={handleLogin}
                style={{ marginTop: 16 }}
              />
            </Card>
            <HStack align="center" spacing={8}>
              <Text text="login.no_account" />
              <Link href="/(auth)/signup">
                <Text
                  text="login.signup"
                  color={Theme.color.text.linktext.primary}
                />
              </Link>
            </HStack>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Screen>
  );
};

export default Login;

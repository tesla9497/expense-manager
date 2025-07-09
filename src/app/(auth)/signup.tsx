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
  IconButton,
} from "@/components/core";
import { useTheme } from "@/context";
import { EyeClose, EyeOpen, Mail, Password, User } from "@/assets/icons";
import { useUserDatabase } from "@/database/controllers";

const SignUp = () => {
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

  const handleSignUp = () => {};

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
              title="signup.skip"
              color={Theme.color.text.linktext.primary}
              onPress={handleSkip}
            />
          </HStack>
        </View>
        <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}>
          <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
            <Text
              text="signup.title"
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
                label="signup.name.label"
                placeholder="signup.name.placeholder"
                fullWidth
                leftIcon={<User />}
              />
              <Input
                label="signup.email.label"
                placeholder="signup.email.placeholder"
                fullWidth
                leftIcon={<Mail />}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="signup.password.label"
                placeholder="signup.password.placeholder"
                leftIcon={<Password />}
                rightIcon={
                  <IconButton onPress={handleTogglePassword}>
                    {showPassword ? <EyeClose /> : <EyeOpen />}
                  </IconButton>
                }
                secureTextEntry={showPassword}
                fullWidth
              />
              <Button
                title="signup.signup_button"
                fullWidth
                variant="contained"
                onPress={handleSignUp}
              />
            </Card>
            <HStack align="center" spacing={8}>
              <Text text="signup.have_account" />
              <Link href="/(auth)/login">
                <Text
                  text="signup.login"
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

export default SignUp;

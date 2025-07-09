import React from "react";
import { View } from "react-native";
// Components
import { Container, Screen, Text } from "@/components/core";
import { useTheme } from "@/context";
import { Header } from "@/components/custom";
import { useUserDatabase } from "@/database/controllers";

const Profile = () => {
  const { Theme } = useTheme();

  const { user } = useUserDatabase();

  return (
    <Screen>
      <Container sx={{ flex: 1, alignItems: "center" }}>
        <Header title="profile.title" />
        <View
          style={{
            width: 84,
            height: 84,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: Theme.border.radius.x10,
            backgroundColor: Theme.color.background.input.primary,
          }}
        >
          {/* <Image source={require("@/assets/images/profile.png")} /> */}
        </View>
        <Text text={user[0].name} variant="title" size="large" />
      </Container>
    </Screen>
  );
};

export default Profile;

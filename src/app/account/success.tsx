import React from "react";
import { useWindowDimensions, View } from "react-native";
import { useRouter } from "expo-router";
// Components
import { Button, Card, Container, Screen, Text } from "@/components/core";
import { ArrowForward, Happy } from "@/assets/icons";
import { useTheme } from "@/context";

const Success = () => {
  const router = useRouter();
  const { Theme } = useTheme();
  const { height } = useWindowDimensions();

  return (
    <Screen>
      <Container sx={{ flex: 1, paddingVertical: 16 }}>
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 16 }}>
          <Card
            bgColor={Theme.color.background.success.primary}
            sx={{ padding: 16, height: height / 1.7 }}
          >
            <Happy width={90} height={90} />
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text
                variant="display"
                size="small"
                color={Theme.color.text.primary.default}
                text="success.title"
              />
            </View>
          </Card>
        </View>
        <Button
          title="success.button"
          fullWidth
          rightIcon={<ArrowForward />}
          color={Theme.color.background.navicon.primary}
          onPress={() => router.replace("/(tabs)/home")}
        />
      </Container>
    </Screen>
  );
};

export default Success;

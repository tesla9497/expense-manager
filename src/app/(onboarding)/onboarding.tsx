import React from "react";
import { FlatList, useWindowDimensions, View, ViewStyle } from "react-native";
import { useRouter } from "expo-router";
// Components
import { useTheme } from "@/context";
import { Button, Card, HStack, Screen, Text } from "@/components/core";
import { ArrowForward, Cashs, Wallet } from "@/assets/icons";
import { useGeneralSettings, useUserDatabase } from "@/database/controllers";
import { APP_INFO } from "@/config/appInfo";

const Onboarding = () => {
  const router = useRouter();
  const { Theme } = useTheme();

  const { settings, updateGeneralSettings } = useGeneralSettings();
  const { createUser } = useUserDatabase();

  const generalSettingData = React.useMemo(() => {
    return settings[0];
  }, [settings]);

  const { width, height } = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const ON_BOARDING_DATA = [
    {
      icon: <Wallet width={90} height={90} />,
      text: "onboarding.wallet",
      params: { app_name: APP_INFO.appName },
      cardColor: Theme.color.base.secondary,
      textColor: Theme.color.text.primary.default,
    },
    {
      icon: <Cashs width={90} height={90} />,
      text: "onboarding.cash",
      cardColor: Theme.color.base.teritory,
      textColor: Theme.color.text.secondary.default,
    },
  ];

  const newUser = {
    name: "Guest",
    email: "",
    avatar: "",
    role: "guest",
    created: new Date(),
    modified: new Date(),
  };

  const handleOnboarding = () => {
    updateGeneralSettings({ ...generalSettingData, onboarded: true });
    createUser(newUser);
    router.replace("/account/account_creation");
  };

  const container: ViewStyle = {
    flex: 1,
    backgroundColor: Theme.color.base.primary,
  };

  return (
    <Screen>
      <View style={container}>
        <FlatList
          data={ON_BOARDING_DATA}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          onScroll={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / width);
            setIndex(index);
          }}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: width,
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: 12,
                paddingHorizontal: 16,
              }}
            >
              <Card
                sx={{ width: "100%", padding: 24, height: height / 1.7 }}
                bgColor={item.cardColor}
              >
                {item.icon}
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <Text
                    variant="display"
                    size="small"
                    text={item.text}
                    color={item.textColor}
                    params={item.params}
                  />
                </View>
              </Card>
            </View>
          )}
        />
        <View
          style={{ width: width, paddingBottom: 24, paddingHorizontal: 16 }}
        >
          <HStack align="center">
            {ON_BOARDING_DATA.map((_, idx) => (
              <View
                key={idx}
                style={{
                  width: 15,
                  height: 6,
                  borderRadius: Theme.border.radius.x10,
                  backgroundColor:
                    idx === index
                      ? Theme.color.base.teritory
                      : Theme.color.base.secondary,
                  margin: 4,
                }}
              />
            ))}
          </HStack>
          <Button
            variant="contained"
            title="onboarding.button"
            color={Theme.color.button.secondary.default}
            fullWidth
            rightIcon={<ArrowForward />}
            style={{ marginTop: 24 }}
            onPress={handleOnboarding}
          />
        </View>
      </View>
    </Screen>
  );
};

export default Onboarding;

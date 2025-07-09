import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
// Components
import { useTheme } from "@/context/ThemeContext";
import { Home, Settings, Add } from "@/assets/icons";
import { useAccounts } from "@/database/controllers";
import { TabBarProps } from "@/types/components.custom";

export const TabBar: React.FC<TabBarProps> = ({ state, navigation }) => {
  const router = useRouter();
  const { Theme } = useTheme();
  const { accounts } = useAccounts();

  const styles = StyleSheet.create({
    tabBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 60,
      marginHorizontal: 10,
      marginBottom: 10,
      borderRadius: Theme.border.radius.x5,
      paddingHorizontal: 20,
      backgroundColor: Theme.color.background.navbar.primary,
    },
    addButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Theme.border.radius.x5,
      backgroundColor: Theme.color.background.navicon.primary,
    },
  });

  const isHomeFocused = state.index === 0;
  const isSettingsFocused = state.index === 1;

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        onPress={() => navigation.navigate("home")}
        style={{ alignItems: "center" }}
      >
        <Home
          color={
            isHomeFocused
              ? Theme.color.background.navicon.primary
              : Theme.color.text.primary.default
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (accounts.length > 0) {
            router.push("/transfer/create_transfer");
          } else {
            router.push("/account/account_creation");
          }
        }}
      >
        <Add />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("settings")}
        style={{ alignItems: "center" }}
      >
        <Settings
          color={
            isSettingsFocused
              ? Theme.color.background.navicon.primary
              : Theme.color.text.primary.default
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

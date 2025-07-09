import React from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Context
import { useTheme } from "@/context/ThemeContext";
import { ScreenProps } from "@/types/components.core";

export const Screen: React.FC<ScreenProps> = ({ children, styles }) => {
  const insets = useSafeAreaInsets();
  const { Theme } = useTheme();
  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: Theme.color.base.primary,
        ...styles,
      }}
    >
      {children}
    </View>
  );
};

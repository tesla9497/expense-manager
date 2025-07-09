import React from "react";
import { View, StyleSheet } from "react-native";
// Context
import { useTheme } from "@/context/ThemeContext";
import { DividerProps } from "@/types/components.core";

export const Divider: React.FC<DividerProps> = ({
  color,
  thickness = 1,
  vertical = false,
}) => {
  const {} = useTheme();
  return (
    <View
      style={[
        vertical
          ? { width: thickness, ...styles.vertical }
          : { height: thickness, ...styles.horizontal },
        { backgroundColor: color || "#ccc" },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: { width: "100%" },
  vertical: { height: "100%" },
});

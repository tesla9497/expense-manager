import React from "react";
import { StyleSheet, View } from "react-native";
// Context
import { useTheme } from "@/context/ThemeContext";
import { CardProps } from "@/types/components.core";

export const Card: React.FC<CardProps & React.ComponentProps<typeof View>> = ({
  children,
  bgColor,
  borderRadius,
  borderRadiusFull = false,
  sx,
  ...props
}) => {
  const { Theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: bgColor || Theme.color.base.teritory,
      borderRadius: borderRadiusFull
        ? Theme.border.radius.x10
        : borderRadius || Theme.border.radius.x6,
      ...sx,
    },
  });
  return (
    <View style={styles.container} {...props}>
      {children}
    </View>
  );
};

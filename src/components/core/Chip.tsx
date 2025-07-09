import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
// Context
import { useTheme } from "@/context/ThemeContext";
import { ChipProps } from "@/types/components.core";

export const Chip: React.FC<
  ChipProps & React.ComponentProps<typeof TouchableOpacity>
> = ({
  label,
  onPress,
  onDelete,
  leftIcon,
  rightIcon,
  deletable = false,
  style,
  textStyle,
  deleteProps,
  variant = "contained",
  bgColor,
  borderColor,
  textColor,
  spacing,
  ...props
}) => {
  const { Theme } = useTheme();

  const isOutlined = variant === "outlined";

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: Theme.border.radius.x10,
      borderWidth: isOutlined ? 1 : 0,
      borderColor: borderColor || Theme.color.stroke_border.primary,
      backgroundColor: bgColor || Theme.color.base.primary,
      gap: spacing || 4,
    },
    deleteIcon: {
      marginLeft: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      onPress={onPress}
      {...props}
    >
      {leftIcon && leftIcon}
      <Text style={[styles.label, { color: textColor }, textStyle]}>
        {label}
      </Text>
      {rightIcon && rightIcon}
      {deletable && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteIcon}>
          {deleteProps && deleteProps}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

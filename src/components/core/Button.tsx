import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
// Components
import { Text } from "@/components/core/Text";
import { useTheme } from "@/context/ThemeContext";
import { useContrastTextColor } from "@hooks/useContrastTextColor";
import { ButtonProps } from "@/types/components.core";

export const Button: React.FC<
  ButtonProps & React.ComponentPropsWithoutRef<typeof TouchableOpacity>
> = ({
  title,
  onPress,
  variant = "contained",
  fullWidth = false,
  leftIcon,
  rightIcon,
  color,
  style,
  textStyle,
  disabled = false,
  textParams,
  ...rest
}) => {
  const { Theme } = useTheme();
  const contrastColor = useContrastTextColor(
    color || Theme.color.button.primary.default
  );

  const styles = StyleSheet.create({
    base: {
      width: fullWidth ? "100%" : "auto",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Theme.border.radius.x5,
      padding: 12,
      marginVertical: 8,
    },
    contained: {
      backgroundColor: color || Theme.color.button.primary.default,
    },
    outlined: {
      borderWidth: 1,
      borderColor: color || Theme.color.button.primary.default,
    },
    text: {
      backgroundColor: "transparent",
      padding: 0,
      margin: 0,
    },
    textBase: {
      ...Theme.typography.body.medium,
    },
    containedText: {
      color: contrastColor,
      ...Theme.typography.title.medium,
    },
    outlinedText: { ...Theme.typography.title.medium, color: color },
    textText: {
      color: color,
      ...Theme.typography.label.large_promenent,
    },
    disabled: { opacity: 0.5 },
    icon: { marginRight: 8 },
  });

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === "contained" && styles.contained,
        variant === "outlined" && styles.outlined,
        variant === "text" && styles.text,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      onPress={onPress}
      {...rest}
    >
      {leftIcon && leftIcon}
      {title && title !== "" && (
        <Text
          style={[
            styles.textBase,
            variant === "contained"
              ? styles.containedText
              : variant === "outlined"
              ? styles.outlinedText
              : variant === "text"
              ? styles.textText
              : textStyle,
            textStyle,
          ]}
          text={title}
          params={textParams}
        />
      )}
      {rightIcon && rightIcon}
    </TouchableOpacity>
  );
};

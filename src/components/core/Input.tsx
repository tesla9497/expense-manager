import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useQuery } from "@realm/react";
import { useTranslation } from "react-i18next";
// Components
import { Text } from "@/components/core/Text";
import { useTheme } from "@/context/ThemeContext";
import { UserPreference } from "@/database/model/UserPreference";
import { InputProps } from "@/types/components.core";

export const Input: React.FC<
  InputProps & React.ComponentProps<typeof TextInput>
> = ({
  variant = "contained",
  label,
  placeholder,
  leftIcon,
  rightIcon,
  type = "text",
  secureTextEntry,
  error = false,
  helperText = "",
  fullWidth = false,
  inputRootStyle,
  onTouchEnd,
  textStyle,
  maxLength = 100,
  ...rest
}) => {
  const { Theme } = useTheme();
  const user_preference = useQuery(UserPreference);
  const { t } = useTranslation();
  // Password Input
  const isSecure = type === "password" || secureTextEntry;
  // Date Input
  const isDate = type === "date";
  const dateFormat = user_preference[0]?.date_format || "dd/mm/yyyy";
  const keyboardType = isDate ? "numeric" : "default";
  const placeholderText = isDate ? dateFormat || "dd/mm/yyyy" : placeholder;
  const isEditable = isDate ? false : true;

  const styles = StyleSheet.create({
    container: {
      // width: fullWidth ? "100%" : "auto",
      marginBottom: 16,
    },
    label: {
      marginBottom: 4,
      ...Theme.typography.label.medium_promenent,
      color: Theme.color.text.primary.default,
    },
    inputContainer: {
      width: fullWidth ? "100%" : "auto",
      minWidth: 10,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Theme.color.background.input.primary,
      borderRadius: Theme.border.radius.x4,
      padding: 8,
    },
    inputOutlined: {
      borderWidth: 1,
      borderColor: error
        ? Theme.color.stroke_border.teritory
        : Theme.color.stroke_border.primary,
    },
    input: { flex: 1, paddingHorizontal: 8 },
    icon: { marginHorizontal: 8 },
  });

  return (
    <View style={[styles.container, inputRootStyle]}>
      {label && <Text style={styles.label} text={label} />}
      <View
        style={[
          styles.inputContainer,
          variant === "outlined" && styles.inputOutlined,
        ]}
        onTouchEnd={onTouchEnd}
      >
        {leftIcon && leftIcon}
        <TextInput
          style={[styles.input, textStyle]}
          placeholder={t(placeholderText)}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          editable={isEditable}
          maxLength={maxLength}
          {...rest}
        />
        {rightIcon && rightIcon}
      </View>
      {error && helperText && helperText !== "" && (
        <Text
          variant="label"
          size="small_promenent"
          color={Theme.color.stroke_border.teritory}
          text={helperText}
        />
      )}
    </View>
  );
};

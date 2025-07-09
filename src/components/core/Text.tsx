import React from "react";
import { Text as RNText, TextStyle, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
// Context
import { useTheme } from "@/context/ThemeContext";
// Theme
import {
  FontFamily,
  TypographySizeType,
  TypographyType,
} from "@/theme/typography";

import { TextProps } from "@/types/components.core";

export const Text: React.FC<
  TextProps & React.ComponentProps<typeof RNText>
> = ({
  variant = "body",
  size = "medium",
  style,
  children,
  color,
  text,
  align,
  params,
}) => {
  const { Theme } = useTheme();
  const { t } = useTranslation();

  const translatedText = text ? t(text, params) : children;
  const typography = Theme.typography[variant][size];

  const styles = StyleSheet.create({
    text: {
      fontFamily:
        `${FontFamily}_${Theme.typography[variant][size].fontWeight}` ||
        `${FontFamily}_400`,
      textAlign: align || "left",
      color: Theme.color.text.primary.default,
    },
  });

  return (
    <RNText style={[styles.text, typography, { color }, style]}>
      {translatedText as any}
    </RNText>
  );
};

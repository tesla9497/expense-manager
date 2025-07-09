import { LightThemeColor, ColorType } from "./color/color";
import { Typography, TypographyType } from "./typography";
import { Shadow, ShadowType } from "./shadow/shadow";
import { Spacing, SpacingType } from "./spacing/spacing";
import { Border, BorderType } from "./border/border";

export type ThemeType = {
  color: ColorType;
  typography: TypographyType;
  shadow: ShadowType;
  spacing: SpacingType;
  border: BorderType;
};

export const LightTheme: ThemeType = {
  color: LightThemeColor,
  typography: Typography,
  shadow: Shadow,
  spacing: Spacing,
  border: Border,
};

import { TypographyType } from "@/theme/typography";
import { TypographySizeType } from "@/theme/typography";
import { ReactNode } from "react";
import { ViewStyle, TextStyle, StyleProp, TextInputProps } from "react-native";

interface BasePortalProps {
  children: React.ReactNode;
  backdrop?: boolean;
  padding?: number;
  disableBackPress?: boolean;
  style?: StyleProp<ViewStyle>;
}

type BasePortalRef = {
  open: () => void;
  close: () => void;
};

interface BottomSheetProps {
  duration?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
  backdropColor?: string;
  showPanHandle?: boolean;
}

interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  variant?: "contained" | "outlined" | "text";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
  color?: string;
  textStyle?: TextStyle;
  disabled?: boolean;
  textParams?: Record<string, string>;
}
interface CardProps {
  children: React.ReactNode;
  bgColor?: string;
  borderRadius?: number;
  borderRadiusFull?: boolean;
  sx?: ViewStyle;
}
interface ChipProps {
  label: string;
  onPress?: () => void;
  onDelete?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  deletable?: boolean;
  deleteProps?: React.ReactNode | string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
  variant?: "contained" | "outlined";
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  spacing?: number;
}
interface ContainerProps {
  children: React.ReactNode;
  sx?: ViewStyle;
}
interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  dateContainerStyle?: ViewStyle;
}
interface DividerProps {
  color?: string;
  thickness?: number;
  vertical?: boolean;
}
interface HStackProps {
  children: React.ReactNode;
  spacing?: number;
  align?: "center" | "flex-start" | "flex-end";
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  style?: ViewStyle;
  scrollable?: boolean;
  contentContainerStyle?: ViewStyle;
}

interface IconProps {
  name: string;
  width?: number;
  height?: number;
  color?: string;
}

interface IconButtonProps {
  children: React.ReactNode;
  sx?: ViewStyle;
}

interface InputProps extends TextInputProps {
  variant?: "contained" | "outlined";
  label?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "text" | "password" | "date";
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  inputRootStyle?: ViewStyle;
  onTouchEnd?: () => void;
  textStyle?: TextStyle;
  maxLength?: number;
}

interface LoadingOverlayProps {
  visible: boolean;
}

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

interface RangeSliderProps {
  values?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValuesChange?: (values: number[]) => void;
}

interface ScreenProps {
  children?: ReactNode;
  styles?: ViewStyle;
}

interface SwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  size?: number;
}

interface TextProps {
  variant?: keyof TypographyType;
  size?: keyof TypographySizeType;
  style?: TextStyle | TextStyle[];
  children?: string | React.ReactNode;
  color?: string;
  text?: string;
  align?: "left" | "center" | "right";
  params?: Record<string, any>;
}

interface VStackProps {
  spacing?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

export type {
  BasePortalProps,
  BasePortalRef,
  BottomSheetProps,
  BottomSheetRef,
  ButtonProps,
  CardProps,
  ChipProps,
  ContainerProps,
  DatePickerProps,
  DividerProps,
  HStackProps,
  IconProps,
  IconButtonProps,
  InputProps,
  LoadingOverlayProps,
  ModalProps,
  RangeSliderProps,
  ScreenProps,
  SwitchProps,
  TextProps,
  VStackProps,
};

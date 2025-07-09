import React from "react";
import { ViewStyle } from "react-native";
import { Button, Text } from "@/components/core";
import { BottomSheetProps } from "@/types/components.core";
import { CurrencyType } from "@/database/static/currency";
import { AccountType } from "./database";
import { BSON } from "realm";

interface AlertPortalProps extends BottomSheetProps {
  title?: string;
  message?: string;
  message2?: string;
  closeText?: string;
  confirmText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  closeButtonProps?: Partial<React.ComponentProps<typeof Button>>;
  confirmButtonProps?: Partial<React.ComponentProps<typeof Button>>;
  titleProps?: Partial<React.ComponentProps<typeof Text>>;
  messageProps?: Partial<React.ComponentProps<typeof Text>>;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
}

interface AmountInputProps {
  title?: string;
  amount?: string;
  onchangeAmount?: (amount: string) => void;
}

interface CreateCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (category: {
    name: string;
    type: "Income" | "Expense";
    icon: string;
  }) => void;
  initialData?: {
    name: string;
    type: "Income" | "Expense";
    icon: string;
  };
}

interface HeaderProps {
  title: string;
  rightComponents?: React.ReactNode;
}

type SelectionItem =
  | AccountType
  | CurrencyType
  | { name: string; icon: string; _id?: string | BSON.ObjectId };

interface SelectionBottomSheetProps extends BottomSheetProps {
  title?: string;
  data?: SelectionItem[];
  onTouchEnd?: (item: SelectionItem) => void;
  selected?: string | BSON.ObjectId;
  itemType?: any;
  onAdd?: () => void;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  onDuplicate: () => void;
  onDelete: () => void;
  openRowRef: React.MutableRefObject<any>;
}

interface TabBarProps {
  state: any;
  navigation: any;
}

export type {
  AlertPortalProps,
  AmountInputProps,
  CreateCategoryModalProps,
  HeaderProps,
  SelectionItem,
  SelectionBottomSheetProps,
  SwipeableCardProps,
  TabBarProps,
};

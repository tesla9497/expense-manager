import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { IconButtonProps } from "@/types/components.core";

export const IconButton: React.FC<
  IconButtonProps & React.ComponentPropsWithoutRef<typeof Pressable>
> = ({ children, sx, ...props }) => {
  const container: ViewStyle = {
    borderRadius: 1000,
    padding: 4,
    alignSelf: "flex-start",
    width: "auto",
    ...sx,
  };
  return (
    <Pressable style={container} {...props}>
      {children}
    </Pressable>
  );
};

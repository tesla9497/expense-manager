import React from "react";
import { View } from "react-native";
import { ContainerProps } from "@/types/components.core";

export const Container: React.FC<
  ContainerProps & React.ComponentProps<typeof View>
> = ({ children, sx }) => {
  return <View style={[{ paddingHorizontal: 16 }, sx]}>{children}</View>;
};

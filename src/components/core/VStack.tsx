import React from "react";
import { View } from "react-native";
import { VStackProps } from "@/types/components.core";

export const VStack: React.FC<
  VStackProps & React.ComponentProps<typeof View>
> = ({ spacing = 0, children, style }) => {
  return (
    <View style={[{ flexDirection: "column", gap: spacing }, style]}>
      {children}
    </View>
  );
};

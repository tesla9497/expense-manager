import React from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { HStackProps } from "@/types/components.core";

export const HStack: React.FC<
  HStackProps & React.ComponentProps<typeof View & typeof ScrollView>
> = ({
  spacing = 0,
  children,
  align = "flex-start",
  justify = "flex-start",
  style,
  scrollable = false,
  contentContainerStyle,
  ...rest
}) => {
  return scrollable ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        { alignItems: "center", gap: spacing },
        contentContainerStyle,
      ]}
      style={[
        {
          flexDirection: "row",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: spacing,
          justifyContent: justify,
          alignSelf: align,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

import React from "react";
import { View } from "react-native";
import { useTheme } from "@/context";
import { getIcon } from "@/components/utils";
import { Text } from "./Text";
import { IconProps } from "@/types/components.core";

export const Icon: React.FC<IconProps> = ({
  name,
  width = 50,
  height = 50,
  color,
}) => {
  const { Theme } = useTheme();
  const IconComponent = getIcon(name);

  if (!IconComponent) {
    return (
      <View
        style={{
          width,
          height,
          borderRadius: Theme.border.radius.x5,
          backgroundColor: Theme.color.base.secondary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          text={`${name?.slice(0, 3) || "NA"}`}
          variant="title"
          size="medium"
          color={Theme.color.text.tonal.default}
        />
      </View>
    );
  }

  return <IconComponent width={width} height={height} color={color} />;
};

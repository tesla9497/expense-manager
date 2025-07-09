import React from "react";
import { useRouter } from "expo-router";
// Components
import { HStack, IconButton, Text } from "../core";
import { useTheme } from "@/context";
import { ArrowBackward } from "@/assets/icons";
import { HeaderProps } from "@/types/components.custom";

export const Header: React.FC<HeaderProps> = ({ title, rightComponents }) => {
  const router = useRouter();
  const { Theme } = useTheme();

  return (
    <HStack spacing={12} style={{ width: "100%", marginBottom: 16 }}>
      <IconButton
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: Theme.border.radius.x10,
          backgroundColor: Theme.color.background.input.primary,
        }}
        onPress={() => router.back()}
      >
        <ArrowBackward />
      </IconButton>
      <Text style={{ flex: 1 }} text={title} variant="title" size="medium" />
      {rightComponents}
    </HStack>
  );
};

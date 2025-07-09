import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@/context";
import { LoadingOverlayProps } from "@/types/components.core";

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  const { Theme } = useTheme();

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator
        size="large"
        color={Theme.color.background.navicon.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

import React from "react";
import {
  Modal as RNModal,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/context";
import { Text } from "./Text";
import { Icon } from "./Icon";
import { ModalProps } from "@/types/components.core";

const windowHeight = Dimensions.get("window").height;

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const { Theme } = useTheme();

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    modalContent: {
      width: "100%",
      backgroundColor: Theme.color.base.primary,
      borderRadius: Theme.border.radius.x5,
      padding: 16,
      maxHeight: windowHeight * 0.8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
  });

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text text={title || ""} variant="title" size="large" />
            <TouchableOpacity onPress={onClose}>
              <Icon name="Cross" width={24} height={24} />
            </TouchableOpacity>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </RNModal>
  );
};

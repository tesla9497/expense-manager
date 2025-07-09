import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// Components
import { Text, Input, HStack, Button, Modal, Icon } from "../core";
import { chunkArray } from "../helper/arrayHelper";
import { useTheme } from "@/context";
import { CreateCategoryModalProps } from "@/types/components.custom";

const ICONS = [
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Health",
  "Education",
  "Bills",
  "Groceries",
  "Gifts",
  "Salary",
  "Investment",
  "Others",
  "Home",
  "Car",
  "Clothing",
  "Travel",
];

export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
}) => {
  const { Theme } = useTheme();
  const [name, setName] = React.useState(initialData?.name || "");
  const [type, setType] = React.useState<"Income" | "Expense">(
    initialData?.type || "Expense"
  );
  const [selectedIcon, setSelectedIcon] = React.useState(
    initialData?.icon || ""
  );

  React.useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setSelectedIcon(initialData.icon);
    }
  }, [initialData]);

  const handleSave = () => {
    if (!name || !selectedIcon) return;
    onSave({ name, type, icon: selectedIcon });
    handleReset();
  };

  const handleReset = () => {
    setName("");
    setType("Expense");
    setSelectedIcon("");
    onClose();
  };

  const styles = StyleSheet.create({
    typeTab: {
      flex: 1,
      padding: 12,
      alignItems: "center",
      borderRadius: Theme.border.radius.x10,
    },
    iconGrid: {
      flexDirection: "row",
      paddingVertical: 16,
    },
    iconColumn: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    iconItem: {
      padding: 8,
      alignItems: "center",
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: Theme.border.radius.x10,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <Modal
      visible={visible}
      onClose={handleReset}
      title="custom_components.create_category_modal.title"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <Input
          label="custom_components.create_category_modal.name.label"
          placeholder="custom_components.create_category_modal.name.placeholder"
          value={name}
          onChangeText={setName}
        />

        <View style={{ marginVertical: 16 }}>
          <Text
            text="custom_components.create_category_modal.type.label"
            variant="label"
            size="large"
            style={{ marginBottom: 8 }}
          />
          <HStack spacing={12}>
            <TouchableOpacity
              style={[
                styles.typeTab,
                {
                  backgroundColor:
                    type === "Expense"
                      ? Theme.color.background.fail.primary
                      : Theme.color.base.secondary,
                },
              ]}
              onPress={() => setType("Expense")}
            >
              <Text
                text="custom_components.create_category_modal.type.expense"
                color={
                  type === "Expense"
                    ? Theme.color.text.secondary.default
                    : Theme.color.text.primary.default
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeTab,
                {
                  backgroundColor:
                    type === "Income"
                      ? Theme.color.background.success.primary
                      : Theme.color.base.secondary,
                },
              ]}
              onPress={() => setType("Income")}
            >
              <Text
                text="custom_components.create_category_modal.type.income"
                color={
                  type === "Income"
                    ? Theme.color.text.secondary.default
                    : Theme.color.text.primary.default
                }
              />
            </TouchableOpacity>
          </HStack>
        </View>

        <Text
          text="custom_components.create_category_modal.icon.label"
          variant="label"
          size="large"
          style={{ marginBottom: 8 }}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.iconGrid}>
            {chunkArray(ICONS, 2).map((col, colIdx) => (
              <View key={colIdx} style={styles.iconColumn}>
                {col.map((icon: string) => (
                  <TouchableOpacity
                    key={icon}
                    style={styles.iconItem}
                    onPress={() => setSelectedIcon(icon)}
                  >
                    <View
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor:
                            selectedIcon === icon
                              ? type === "Income"
                                ? Theme.color.background.success.primary
                                : Theme.color.background.fail.primary
                              : Theme.color.base.secondary,
                        },
                      ]}
                    >
                      <Icon
                        name={icon}
                        width={24}
                        height={24}
                        color={
                          selectedIcon === icon
                            ? Theme.color.text.secondary.default
                            : Theme.color.text.primary.default
                        }
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        <HStack spacing={12} style={{ marginTop: 16 }}>
          <Button
            title="custom_components.create_category_modal.actions.cancel"
            variant="outlined"
            style={{ flex: 1 }}
            onPress={handleReset}
          />
          <Button
            title="custom_components.create_category_modal.actions.save"
            style={{ flex: 1 }}
            disabled={!name || !selectedIcon}
            onPress={handleSave}
          />
        </HStack>
      </KeyboardAvoidingView>
    </Modal>
  );
};

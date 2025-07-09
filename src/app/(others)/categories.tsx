import React from "react";
import { View, Pressable, Animated, FlatList } from "react-native";
import { BSON } from "realm";
// Components
import {
  Button,
  Container,
  Screen,
  Text,
  HStack,
  VStack,
  Divider,
  Icon,
} from "@/components/core";
import { Header, CreateCategoryModal, AlertPortal } from "@/components/custom";
import { useTheme } from "@/context";
import { useCategory } from "@/database/controllers";
import { Delete } from "@/assets/icons";
import { BottomSheetRef } from "@/types/components.core";

const Categories = () => {
  const { Theme } = useTheme();
  const { category, addCategory, updateCategory, deleteCategory } =
    useCategory();
  const [type, setType] = React.useState<"Income" | "Expense">("Expense");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
  const deletePortalRef = React.useRef<BottomSheetRef>(null);
  const [categoryToDelete, setCategoryToDelete] = React.useState<string | null>(
    null
  );

  const animationRefs = React.useRef<{ [key: string]: Animated.Value }>({});

  const getAnimationValue = (id: string) => {
    if (!animationRefs.current[id]) {
      animationRefs.current[id] = new Animated.Value(0);
    }
    return animationRefs.current[id];
  };

  const animateItem = (id: string, index: number) => {
    const animValue = getAnimationValue(id);
    animValue.setValue(0);

    Animated.timing(animValue, {
      toValue: 1,
      duration: 300,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    Object.keys(animationRefs.current).forEach((key) => {
      animationRefs.current[key].setValue(0);
    });

    filteredCategories.forEach((cat, index) => {
      animateItem(cat._id.toString(), index);
    });
  }, [type, category]);

  const filteredCategories = React.useMemo(() => {
    return category.filter((cat) => cat.type === type && cat.custom);
  }, [category, type]);

  const handleAddCategory = (categoryData: {
    name: string;
    type: "Income" | "Expense";
    icon: string;
  }) => {
    addCategory({
      ...categoryData,
      custom: true,
      created: new Date(),
      modified: new Date(),
    });
  };

  const handleEditCategory = (categoryData: {
    name: string;
    type: "Income" | "Expense";
    icon: string;
  }) => {
    if (selectedCategory) {
      updateCategory({
        ...selectedCategory,
        ...categoryData,
        modified: new Date(),
      });
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCategoryToDelete(id);
    deletePortalRef.current?.open();
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      const BJSONED_ID = new BSON.ObjectId(categoryToDelete);
      deleteCategory(BJSONED_ID);
      setCategoryToDelete(null);
      deletePortalRef.current?.close();
    }
  };

  const renderItem = ({ item: cat, index }: { item: any; index: number }) => {
    const animValue = getAnimationValue(cat._id.toString());
    return (
      <Animated.View
        style={{
          opacity: animValue,
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <HStack spacing={16} style={{ paddingVertical: 16 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: Theme.border.radius.x10,
              backgroundColor:
                type === "Income"
                  ? Theme.color.background.success.primary
                  : Theme.color.background.fail.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name={cat.icon}
              width={20}
              height={20}
              color={Theme.color.text.secondary.default}
            />
          </View>
          <Text
            text={cat.name}
            variant="body"
            size="large"
            style={{ fontWeight: "500", flex: 1 }}
          />
          {cat.custom && (
            <HStack spacing={16}>
              <Button
                variant="text"
                title="categories.actions.edit"
                onPress={() => {
                  setSelectedCategory(cat);
                  setIsModalVisible(true);
                }}
              />
              <Button
                variant="text"
                title="categories.actions.delete"
                color={Theme.color.stroke_border.tonal_red}
                onPress={() => handleDeleteCategory(cat._id.toString())}
              />
            </HStack>
          )}
        </HStack>
        {index < filteredCategories.length - 1 && (
          <Divider color={Theme.color.stroke_border.primary} />
        )}
      </Animated.View>
    );
  };

  const EmptyListComponent = () => (
    <VStack
      spacing={16}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 32,
      }}
    >
      <Icon
        name="folder"
        width={48}
        height={48}
        color={Theme.color.text.tertiary.default}
      />
      <Text
        text="categories.empty.title"
        params={{ type: type?.toLowerCase() || "" }}
        variant="body"
        size="large"
        color={Theme.color.text.tertiary.default}
        align="center"
      />
      <Text
        text="categories.empty.description"
        variant="body"
        size="medium"
        color={Theme.color.text.tertiary.default}
        align="center"
      />
    </VStack>
  );

  return (
    <Screen>
      <Container sx={{ flex: 1 }}>
        <Header title="categories.title" />
        <VStack spacing={32} style={{ padding: 24, flex: 1 }}>
          <HStack spacing={8}>
            <Pressable
              style={[
                {
                  flex: 1,
                  padding: 16,
                  borderRadius: Theme.border.radius.x10,
                  backgroundColor:
                    type === "Expense"
                      ? Theme.color.background.fail.primary
                      : "transparent",
                  borderWidth: 1,
                  borderColor: Theme.color.stroke_border.primary,
                },
              ]}
              onPress={() => setType("Expense")}
            >
              <Text
                text="categories.type.expense"
                color={
                  type === "Expense"
                    ? Theme.color.text.secondary.default
                    : Theme.color.text.primary.default
                }
                align="center"
                style={{ fontWeight: "500" }}
              />
            </Pressable>
            <Pressable
              style={[
                {
                  flex: 1,
                  padding: 16,
                  borderRadius: Theme.border.radius.x10,
                  backgroundColor:
                    type === "Income"
                      ? Theme.color.background.success.primary
                      : "transparent",
                  borderWidth: 1,
                  borderColor: Theme.color.stroke_border.primary,
                },
              ]}
              onPress={() => setType("Income")}
            >
              <Text
                text="categories.type.income"
                color={
                  type === "Income"
                    ? Theme.color.text.secondary.default
                    : Theme.color.text.primary.default
                }
                align="center"
                style={{ fontWeight: "500" }}
              />
            </Pressable>
          </HStack>

          <FlatList
            data={filteredCategories}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={EmptyListComponent}
          />
        </VStack>

        <Pressable
          style={{
            position: "absolute",
            bottom: 32,
            right: 32,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: Theme.color.button.primary.default,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={() => {
            setSelectedCategory(null);
            setIsModalVisible(true);
          }}
        >
          <Icon
            name="plus"
            width={24}
            height={24}
            color={Theme.color.text.secondary.default}
          />
        </Pressable>
      </Container>

      <CreateCategoryModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedCategory(null);
        }}
        onSave={(categoryData) => {
          if (selectedCategory) {
            handleEditCategory(categoryData);
          } else {
            handleAddCategory(categoryData);
          }
          setIsModalVisible(false);
          setSelectedCategory(null);
        }}
        initialData={
          selectedCategory
            ? {
                name: selectedCategory.name,
                type: selectedCategory.type,
                icon: selectedCategory.icon,
              }
            : {
                name: "",
                type: type,
                icon: "",
              }
        }
      />

      <AlertPortal
        ref={deletePortalRef}
        title="categories.delete_modal.title"
        message="categories.delete_modal.message"
        confirmText="categories.delete_modal.confirm"
        confirmButtonProps={{
          leftIcon: (
            <Delete
              width={24}
              height={24}
              color={Theme.color.text.primary.default}
            />
          ),
          style: { gap: 4 },
          color: `${Theme.color.button.secondary.default}90`,
        }}
        closeText="categories.delete_modal.cancel"
        onConfirm={confirmDeleteCategory}
        onClose={() => {
          deletePortalRef.current?.close();
          setCategoryToDelete(null);
        }}
      />
    </Screen>
  );
};

export default Categories;

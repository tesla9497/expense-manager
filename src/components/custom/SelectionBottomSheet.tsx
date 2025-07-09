import React, { forwardRef } from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomSheet, Card, HStack, IconButton, Text, Icon } from "../core";
import { useTheme } from "@/context";
import { Add } from "@assets/icons/Add";
import {
  SelectionBottomSheetProps,
  SelectionItem,
} from "@/types/components.custom";
import { BottomSheetRef } from "@/types/components.core";

export const SelectionBottomSheet = forwardRef<
  BottomSheetRef,
  SelectionBottomSheetProps
>(({ title, data, onTouchEnd, selected, onAdd }, ref) => {
  const { Theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const PADDING = 16;
  const ITEM_WIDTH = 76;
  const NUM_COLUMNS = width < 768 ? 4 : 5;
  const availableWidth = width - 2 * PADDING;
  const totalItemsWidth = NUM_COLUMNS * ITEM_WIDTH;
  const remainingSpace = availableWidth - totalItemsWidth;
  const gap = remainingSpace / (NUM_COLUMNS - 1);

  return (
    <BottomSheet ref={ref}>
      <View style={{ flex: 1, width: "100%" }}>
        <HStack
          justify="space-between"
          style={{ width: "100%", paddingHorizontal: 16, marginBottom: 12 }}
        >
          <Text text={title} variant="label" size="medium_promenent" />
          {onAdd && (
            <IconButton onPress={onAdd}>
              <Add width={20} height={20} />
            </IconButton>
          )}
        </HStack>
        <FlatList
          style={{ maxHeight: 300, padding: 16 }}
          data={data as SelectionItem[]}
          keyExtractor={(item, index) => index.toString() + item.name}
          contentContainerStyle={{ gap: 12, paddingBottom: insets.bottom + 32 }}
          columnWrapperStyle={{ gap: gap }}
          renderItem={({ item }) => (
            <View style={{ width: ITEM_WIDTH }}>
              <Card
                sx={{
                  height: ITEM_WIDTH,
                  width: ITEM_WIDTH,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                bgColor={
                  selected?.toString() === item._id?.toString() ||
                  selected === item.name
                    ? Theme.color.background.navicon.primary
                    : Theme.color.base.secondary
                }
                onTouchEnd={() => onTouchEnd(item)}
              >
                <Icon name={item.icon} width={36} height={36} />
              </Card>
              <Text
                text={item.name}
                variant="label"
                size="small"
                align="center"
              />
            </View>
          )}
          numColumns={NUM_COLUMNS}
        />
      </View>
    </BottomSheet>
  );
});

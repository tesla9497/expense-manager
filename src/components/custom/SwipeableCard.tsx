import React, { useRef, useEffect } from "react";
import {
  Pressable,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { Delete, Duplicate } from "@/assets/icons";
import { useTheme } from "@/context";
import { Text } from "../core/Text";
import { AlertPortal } from "../custom/AlertPortal";
import { BottomSheetRef } from "@/types/components.core";
import { SwipeableCardProps } from "@/types/components.custom";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onDuplicate,
  onDelete,
  openRowRef,
}) => {
  const { Theme } = useTheme();
  const deletePortalRef = useRef<BottomSheetRef>(null);
  const position = useRef(new Animated.Value(0)).current;
  const currentPosition = useRef(0);

  useEffect(() => {
    const listenerId = position.addListener(({ value }) => {
      currentPosition.current = value;
    });

    return () => {
      position.removeListener(listenerId);
    };
  }, []);

  const handleDuplicate = () => {
    onDuplicate();
    resetPosition();
  };

  const handleDelete = async () => {
    deletePortalRef.current?.close();
    onDelete();
    resetPosition();
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx } = gestureState;
        return Math.abs(dx) > 5;
      },
      onPanResponderGrant: () => {
        if (openRowRef.current && openRowRef.current !== position) {
          Animated.spring(openRowRef.current, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
        openRowRef.current = position;
        position.setOffset(currentPosition.current);
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;
        if (currentPosition.current < 0) {
          position.setValue(dx);
        } else if (dx < 0) {
          position.setValue(dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        position.flattenOffset();

        if (currentPosition.current < 0) {
          if (dx > SWIPE_THRESHOLD) {
            resetPosition();
          } else {
            Animated.timing(position, {
              toValue: -SCREEN_WIDTH * 0.4,
              duration: SWIPE_OUT_DURATION,
              useNativeDriver: true,
            }).start();
          }
        } else {
          if (dx < -SWIPE_THRESHOLD) {
            Animated.timing(position, {
              toValue: -SCREEN_WIDTH * 0.4,
              duration: SWIPE_OUT_DURATION,
              useNativeDriver: true,
            }).start();
          } else {
            resetPosition();
          }
        }
      },
    })
  ).current;

  const opacity = position.interpolate({
    inputRange: [-SCREEN_WIDTH * 0.4, 0],
    outputRange: [1, 0],
  });

  const renderRightActions = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4,
        gap: 4,
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: SCREEN_WIDTH * 0.4,
        zIndex: -1,
      }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          opacity,
        }}
      >
        <Pressable
          onPress={handleDuplicate}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            height: "100%",
            backgroundColor: `${Theme.color.premium_card.text.secondary}10`,
            borderRadius: 8,
          }}
        >
          <Duplicate
            width={25}
            height={25}
            color={Theme.color.premium_card.text.secondary}
          />
          <Text
            text="custom_components.swipeable_card.actions.duplicate"
            variant="body"
            size="small"
            color={Theme.color.premium_card.text.secondary}
          />
        </Pressable>

        <Pressable
          onPress={() => deletePortalRef.current?.open()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            height: "100%",
            backgroundColor: `${Theme.color.text.error.primary}10`,
            borderRadius: 8,
          }}
        >
          <Delete width={25} height={25} />
          <Text
            text="custom_components.swipeable_card.actions.delete"
            variant="body"
            size="small"
            color={Theme.color.text.error.primary}
          />
        </Pressable>
      </Animated.View>
    </View>
  );

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateX: position }],
        }}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
      {renderRightActions()}
      <AlertPortal
        ref={deletePortalRef}
        title="custom_components.swipeable_card.delete_modal.title"
        message="custom_components.swipeable_card.delete_modal.message"
        confirmText="custom_components.swipeable_card.delete_modal.confirm"
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
        closeText="custom_components.swipeable_card.delete_modal.cancel"
        onConfirm={handleDelete}
        onClose={() => {
          deletePortalRef.current?.close();
          resetPosition();
        }}
      />
    </View>
  );
};

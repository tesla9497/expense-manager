import React, { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  TouchableOpacity,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { Portal } from "@gorhom/portal";
import { useTheme } from "@/context";
import { BottomSheetProps, BottomSheetRef } from "@/types/components.core";

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    { duration = 500, style, children, backdropColor, showPanHandle = false },
    ref
  ) => {
    const { Theme } = useTheme();
    const { width: screenWidth, height: screenHeight } =
      Dimensions.get("window");

    const translateY = useSharedValue(screenHeight);
    const [backdropPointerEvents, setBackdropPointerEvents] = useState<
      "auto" | "none"
    >("none");

    const open = () => {
      runOnJS(setBackdropPointerEvents)("auto");
      translateY.value = withTiming(0, { duration });
    };

    const close = () => {
      translateY.value = withTiming(screenHeight, { duration }, () => {
        runOnJS(setBackdropPointerEvents)("none");
      });
    };

    useImperativeHandle(ref, () => ({ open, close }));

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: any) => {
        ctx.startY = translateY.value;
      },
      onActive: (event, ctx: any) => {
        translateY.value = Math.max(ctx.startY + event.translationY, 0);
      },
      onEnd: (event) => {
        if (event.translationY > 100) {
          translateY.value = withTiming(screenHeight, { duration }, () => {
            runOnJS(setBackdropPointerEvents)("none");
          });
          runOnJS(close)();
        } else {
          translateY.value = withTiming(0, { duration });
          runOnJS(setBackdropPointerEvents)("auto");
        }
      },
    });

    const progress = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const backdropStyle = useAnimatedStyle(() => ({
      opacity: withTiming(translateY.value === screenHeight ? 0 : 1, {
        duration,
      }),
    }));

    const sheetStyles = StyleSheet.create({
      flex: {
        width: screenWidth,
        height: "100%",
      },
      sheet: {
        padding: 16,
        maxHeight: "100%",
        paddingTop: showPanHandle ? 8 : 16,
        width: screenWidth,
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: Theme.border.radius.x7,
        borderTopLeftRadius: Theme.border.radius.x7,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      },
      backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: backdropColor || "rgba(0, 0, 0, 0.5)",
      },
      panHandle: {
        width: 65,
        height: 7,
        backgroundColor: Theme.color.base.secondary,
        borderRadius: Theme.border.radius.x10,
        alignSelf: "center",
        marginBottom: 8,
      },
    });

    return (
      <Portal>
        <Animated.View
          style={[sheetStyles.backdrop, backdropStyle]}
          pointerEvents={backdropPointerEvents}
        >
          <TouchableOpacity
            style={sheetStyles.flex}
            onPress={() => runOnJS(close)()}
            hitSlop={20}
          />
        </Animated.View>
        <Animated.View style={[sheetStyles.sheet, progress, style]}>
          {showPanHandle && (
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={sheetStyles.panHandle} />
            </PanGestureHandler>
          )}
          {children}
        </Animated.View>
      </Portal>
    );
  }
);

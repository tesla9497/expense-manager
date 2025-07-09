import React, { useImperativeHandle, useState, useEffect, useRef } from "react";
import { Pressable, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Portal } from "@gorhom/portal";
// Types
import { BasePortalProps, BasePortalRef } from "@/types/components.core";

export const BasePortal = React.forwardRef<BasePortalRef, BasePortalProps>(
  (
    { children, padding, backdrop = true, disableBackPress = false, style },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const [show, setShow] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(100)).current;

    useEffect(() => {
      if (show) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 100,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [show, fadeAnim, slideAnim]);

    useImperativeHandle(
      ref,
      () => ({
        open: () => setShow(true),
        close: () => setShow(false),
      }),
      []
    );

    const handleClose = () => {
      if (!disableBackPress) {
        setShow(false);
      }
    };

    return (
      <Portal>
        {show && (
          <>
            <Animated.View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: backdrop
                  ? "rgba(0, 0, 0, 0.3)"
                  : "transparent",
                zIndex: 1,
                opacity: fadeAnim,
              }}
              pointerEvents="auto"
            >
              <Pressable
                style={{
                  flex: 1,
                  width: "100%",
                }}
                onPress={handleClose}
              />
            </Animated.View>
            <Animated.View
              style={[
                {
                  paddingBottom: insets.bottom + 8,
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
                  backgroundColor: "white",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: padding ?? 16,
                  paddingHorizontal: padding ?? 0,
                  zIndex: 2,
                  transform: [{ translateY: slideAnim }],
                },
                style,
              ]}
              pointerEvents="auto"
            >
              {children}
            </Animated.View>
          </>
        )}
      </Portal>
    );
  }
);
